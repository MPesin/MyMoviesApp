import {MovieItem} from '../../models';
import {ADD_MOVIE, FETCH_MOVIES, MoviesActionTypes} from '../types';

interface MoviesState {
  movies: MovieItem[];
}

const initalState: MoviesState = {movies: []};

export function moviesReducer(
  state: MoviesState = initalState,
  action: MoviesActionTypes,
): MoviesState {
  switch (action.type) {
    case ADD_MOVIE: {
      state.movies.push(action.payload);
      return {
        ...state,
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
