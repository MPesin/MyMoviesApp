import {MovieItem} from '../../models';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';

export interface FetchMoviesAction {
  type: typeof FETCH_MOVIES;
  payload: MovieItem[];
}

export interface AddMovieAction {
  type: typeof ADD_MOVIE;
  payload: MovieItem;
}

export type MoviesActionTypes = FetchMoviesAction | AddMovieAction;
