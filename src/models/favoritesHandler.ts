import {MovieItem} from '../services';
import {store} from '../redux';
import {addFavorite, addMovies, removeFavorite} from '../redux';
import {StorageManager} from '.';

export class FavoritesHandler {
  storageManager: StorageManager;

  constructor(storageManager: StorageManager) {
    this.storageManager = storageManager;
  }

  public async addRemoveFavoriteMovieAsync(movie: MovieItem) {
    if (movie.isFavorite) {
      await this.removeFavoriteAsync(movie);
    } else {
      await this.addFavoriteAsync(movie);
    }
  }

  public async removeFavoriteAsync(movie: MovieItem) {
    store.dispatch(removeFavorite(movie));
    await this.storageManager.deleteMovieAsync(movie);
  }

  public async addFavoriteAsync(movie: MovieItem) {
    const isFavorite = await this.checkIfInFavoritesAsync(movie);
    if (isFavorite) {
      return;
    }
    store.dispatch(addFavorite(movie));
    await this.storageManager.saveMovieAsync(movie);
  }

  private async checkIfInFavoritesAsync(movie: MovieItem): Promise<boolean> {
    try {
      const stored = await this.storageManager.getAllStoredIDsAsync();
      const thisMovieID = stored.find(id => +id === movie.id);
      return thisMovieID ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  /**
   * If the @param movie isn't in the store then add it.
   */
  private checkMovieInStoreOrSaveMovie(movie: MovieItem) {
    const isInStore = this.checkInStore(movie);
    if (!isInStore) {
      movie.isFavorite = true;
      store.dispatch(addMovies([movie]));
    }
  }

  private checkInStore(movie: MovieItem): boolean {
    const currentMoviesState = store.getState().movies.movies;
    let isInStore = false;
    let i = 0;
    for (i; i < currentMoviesState.length; i++) {
      if (currentMoviesState[i].id === movie.id) {
        isInStore = true;
        break;
      }
    }
    return isInStore;
  }
}
