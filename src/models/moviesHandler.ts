import {Repo} from '../repos';
import {store} from '../redux/store';
import {requestMovies, addMovies} from '../redux';
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
    await this.setFavoritesFromStorageAsync(movies);
    store.dispatch(requestMovies(movies));
  }

  public async setFavoritesFromStorageAsync(movies: MovieItem[]) {
    try {
      const favoritesIDs = await this.storageManager.getAllStoredIDsAsync();
      movies.forEach(movie => {
        const movieIDString = `${movie.id}`;
        const findResult = favoritesIDs.find(id => id === movieIDString);
        if (findResult) {
          movie.isFavorite = true;
        }
      });
    } catch (err) {}
  }

  public async fetchMoreMoviesAsync() {
    const movies = await this.repo.getTopRatedByPageAsync(++this.moviesPage);
    store.dispatch(addMovies(movies));
  }

  public resetPageToOne() {
    this.moviesPage = 1;
  }
}
