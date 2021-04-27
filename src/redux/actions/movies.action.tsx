import {
  FETCH_MOVIES,
  ADD_MOVIES,
  FetchMoviesAction,
  AddMoviesAction,
} from '../types';
import {ActionCreator} from 'redux';
import {MovieItem} from '../../services';

export const requestMovies: ActionCreator<FetchMoviesAction> = (
  movies: MovieItem[],
) => {
  return {type: FETCH_MOVIES, payload: movies};
};

export const addMovies: ActionCreator<AddMoviesAction> = (
  movies: MovieItem[],
) => {
  return {type: ADD_MOVIES, payload: movies};
};
