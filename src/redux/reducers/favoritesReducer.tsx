import {MovieItem} from '../../models';
import {
  ADD_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_FAVORITE,
  FavoritesActionTypes,
  isFetchFavoriteActionPayload,
} from '../types';

interface FavoritesState {
  favorites: MovieItem[];
}

const initalState: FavoritesState = {favorites: []};

function addFavoriteToState(
  state: FavoritesState,
  favorite: MovieItem,
): FavoritesState {
  state.favorites.push(favorite);
  return state;
}

function removeFavoriteFromState(
  state: FavoritesState,
  movie: MovieItem,
): FavoritesState {
  const index = state.favorites.findIndex(item => item.id === movie.id);
  state.favorites.slice(index, 1);
  return state;
}

export function favoritesReducer(
  state: FavoritesState = initalState,
  action: FavoritesActionTypes,
): FavoritesState {
  switch (action.type) {
    case ADD_FAVORITE: {
      const newState = addFavoriteToState(state, action.payload);
      return {
        ...newState,
      };
    }
    case REMOVE_FAVORITE: {
      const newState = removeFavoriteFromState(state, action.payload);
      return {
        ...newState,
      };
    }
    case FETCH_FAVORITES: {
      const isActionValid = isFetchFavoriteActionPayload(action);
      const favorites: MovieItem[] = isActionValid ? action.payload : [];
      return {
        ...state,
        favorites: favorites,
      };
    }
    default: {
      return state;
    }
  }
}
