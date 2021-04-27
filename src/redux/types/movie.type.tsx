import {MovieItem} from '../../models';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface FetchMoviesAction {
  type: typeof FETCH_MOVIES;
  payload: MovieItem[];
}

export interface AddMoviesAction {
  type: typeof ADD_MOVIES;
  payload: MovieItem[];
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: MovieItem;
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: MovieItem;
}

export type FavoritesActionTypes = AddFavoriteAction | RemoveFavoriteAction;

export type MoviesActionTypes =
  | FetchMoviesAction
  | AddMoviesAction
  | FavoritesActionTypes;
