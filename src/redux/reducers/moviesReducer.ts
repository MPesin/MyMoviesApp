import {MovieItem} from '../../models';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_MOVIES,
  MoviesActionTypes,
} from '../types';

export interface MoviesState {
  movies: MovieItem[];
}

export const initalState: MoviesState = {movies: []};

export function moviesReducer(
  state: MoviesState = initalState,
  action: MoviesActionTypes,
): MoviesState {
  switch (action.type) {
    case ADD_FAVORITE: {
      const movies = setMovieToFavorite(state, action.payload);
      return {
        movies: movies,
      };
    }
    case REMOVE_FAVORITE: {
      const movies = setMovieToNotFavorite(state, action.payload);
      return {
        movies: movies,
      };
    }
    case FETCH_MOVIES: {
      return {
        ...state,
        movies: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

function setMovieToFavorite(state: MoviesState, movie: MovieItem) {
  return setMovieIsFavorite(state, movie, true);
}

function setMovieToNotFavorite(state: MoviesState, movie: MovieItem) {
  return setMovieIsFavorite(state, movie, false);
}

function setMovieIsFavorite(
  state: MoviesState,
  movie: MovieItem,
  isFavorite: boolean,
) {
  return state.movies.map(item => {
    if (item.id === movie.id) {
      item.isFavorite = isFavorite;
      return item;
    }

    return item;
  });
}
