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
    store.dispatch(addFavorite(movie));
    await this.storageManager.saveMovieAsync(movie);
  }
}
