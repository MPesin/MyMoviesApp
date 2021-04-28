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
   * updateMoviesAsync updates the store with the movies from the repository.
   */
  public async updateMoviesAsync() {
    try {
      let movies = await this.repo.getTopRatedAsync();
      movies = await this.setFavoritesFromStorageAsync(movies);
      store.dispatch(addMovies(movies));
    } catch (err) {
      console.error(err);
    }
  }

  private async setFavoritesFromStorageAsync(
    movies: MovieItem[],
  ): Promise<MovieItem[]> {
    const favoritesIDs = await this.storageManager.getAllStoredIDsAsync();
    let i = 0;
    for (i; i < favoritesIDs.length; i++) {
      const idInt = parseInt(favoritesIDs[i]);
      const resultIndex = movies.findIndex(movie => movie.id === idInt);
      if (resultIndex >= 0) {
        movies[resultIndex].isFavorite = true;
      } else {
        try {
          const fetched = await this.fetchMovieByIdAsync(idInt);
          if (fetched) {
            fetched.isFavorite = true;
            movies.push(fetched);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    return movies;
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
    try {
      const movies = await this.repo.getTopRatedByPageAsync(++this.moviesPage);
      store.dispatch(addMovies(movies));
    } catch (err) {
      console.error(err);
    }
  }

  public resetPageToOne() {
    this.moviesPage = 1;
  }

  public async searchMovieByTitleAsync(title: string) {
    let results: MovieItem[] = [];
    try {
      results = await this.repo.searchByMovieTitle(title);
    } catch (err) {
      console.error(err);
    }
    return results;
  }
}
