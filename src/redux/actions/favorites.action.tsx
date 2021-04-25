import {
  FETCH_FAVORITES,
  ADD_FAVORITE,
  FetchFavoriteAction,
  AddFavoriteAction,
  RemoveFavoriteAction,
  REMOVE_FAVORITE,
} from '../types';
import {ActionCreator} from 'redux';
import {MovieItem} from '../../services';

export const requestFavorites: ActionCreator<FetchFavoriteAction> = (
  favorites: MovieItem[],
) => {
  return {type: FETCH_FAVORITES, payload: favorites};
};

export const addFavorite: ActionCreator<AddFavoriteAction> = (
  newFavorite: MovieItem,
) => {
  return {type: ADD_FAVORITE, payload: newFavorite};
};

export const removeFavorite: ActionCreator<RemoveFavoriteAction> = (
  indexToRemove: number,
) => {
  return {type: REMOVE_FAVORITE, payload: indexToRemove};
};
