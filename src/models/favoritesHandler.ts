import {MovieItem} from '../services';
import {store} from '../redux';
import {addFavorite, removeFavorite} from '../redux';

export class FavoritesHandler {
  public addRemoveFavoriteMovie(movie: MovieItem) {
    if (movie.isFavorite) {
      store.dispatch(removeFavorite(movie));
    } else {
      store.dispatch(addFavorite(movie));
    }
  }
}
