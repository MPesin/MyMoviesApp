import {MovieItem} from '../../models';

export const FETCH_FAVORITES = 'FETCH_FAVORITE';
export const ADD_FAVORITE = 'ADD_MOVIE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface FetchFavoriteAction {
  type: typeof FETCH_FAVORITES;
  payload: MovieItem[];
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: MovieItem;
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: string;
}

export type FavoritesActionTypes =
  | FetchFavoriteAction
  | AddFavoriteAction
  | RemoveFavoriteAction;

export function isFetchFavoriteActionPayload(
  object: FavoritesActionTypes,
): object is FetchFavoriteAction {
  return (object as FetchFavoriteAction).payload !== undefined;
}
