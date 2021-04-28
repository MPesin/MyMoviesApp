import {MovieItem} from '../services';
import {store} from '../redux';
import {addFavorite, removeFavorite} from '../redux';
import {StorageManager} from '.';

export class FavoritesHandler {
  storageManager: StorageManager;

  constructor(storageManager: StorageManager) {
    this.storageManager = storageManager;
  }

  public async addRemoveFavoriteMovieAsync(movie: MovieItem) {
    try {
      if (movie.isFavorite) {
        await this.removeFavoriteAsync(movie);
      } else {
        await this.addFavoriteAsync(movie);
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async removeFavoriteAsync(movie: MovieItem) {
    try {
      store.dispatch(removeFavorite(movie));
      await this.storageManager.deleteMovieAsync(movie);
    } catch (err) {
      console.error(err);
    }
  }

  public async addFavoriteAsync(movie: MovieItem) {
    try {
      store.dispatch(addFavorite(movie));
      await this.storageManager.saveMovieAsync(movie);
    } catch (err) {
      console.error(err);
    }
  }
}
