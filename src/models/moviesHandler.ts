import {Repo} from '../repos';
import {store} from '../redux/store';
import {addMovies} from '../redux';
import {StorageManager} from '.';
import {MovieItem} from '../services';

export class MoviesHandler {
  repo: Repo;
  moviesPage: number = 1;
  storageManager: StorageManager;

  constructor(repo: Repo, storageManager: StorageManager) {
    this.repo = repo;
    this.storageManager = storageManager;
  }

  /**
   * updateMovies updates the store with the movies from the repository.
   */
  public async updateMoviesAsync() {
    const movies = await this.repo.getTopRatedAsync();
    const moviesWithFavorites = await this.setFavoritesFromStorageAsync(movies);
    store.dispatch(addMovies(moviesWithFavorites));
  }

  private async setFavoritesFromStorageAsync(movies: MovieItem[]) {
    try {
      const favoritesIDs = await this.storageManager.getAllStoredIDsAsync();
      favoritesIDs.forEach(async favoriteID => {
        const resultIndex = movies.findIndex(movie => movie.id === +favoriteID);
        if (resultIndex >= 0) {
          movies[resultIndex].isFavorite = true;
        } else {
          const fetched = await this.fetchMovieByIdAsync(+favoriteID);
          if (fetched) {
            fetched.isFavorite = true;
            movies.push(fetched);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async fetchMovieByIdAsync(
    id: number,
  ): Promise<MovieItem | undefined> {
    const requestedMovie = await this.repo.getMovieByID(id);
    if (requestedMovie) {
      return requestedMovie;
    }
    return undefined;
  }

  public async fetchMoreMoviesAsync() {
    const movies = await this.repo.getTopRatedByPageAsync(++this.moviesPage);
    store.dispatch(addMovies(movies));
  }

  public resetPageToOne() {
    this.moviesPage = 1;
  }

  public async searchMovieByTitleAsync(title: string) {
    let results: MovieItem[] = [];
    try {
      results = await this.repo.searchByMovieTitle(title);
    } catch (err) {
      console.log(err);
    }
    return results;
  }
}
