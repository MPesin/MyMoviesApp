import {MovieItem} from '../services';
import {store} from '../redux/store';
import {ADD_FAVORITE, FavoritesActionTypes, REMOVE_FAVORITE} from '../redux';

export class FavoritesHandler {
  private isFavorite(movie: MovieItem): boolean {
    const favorites = store.getState().favorites.favorites;
    const contains = favorites.findIndex(item => item.id === movie.id) > 0;
    return contains;
  }

  public addRemoveFavoriteMovie(movie: MovieItem) {
    let action: FavoritesActionTypes = {type: ADD_FAVORITE, payload: movie};
    const isFavorite = this.isFavorite(movie);
    if (isFavorite) {
      action = {type: REMOVE_FAVORITE, payload: movie.id};
    }
    store.dispatch(action);
  }
}
