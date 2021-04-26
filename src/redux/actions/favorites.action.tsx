import {
  ADD_FAVORITE,
  AddFavoriteAction,
  RemoveFavoriteAction,
  REMOVE_FAVORITE,
} from '../types';
import {ActionCreator} from 'redux';
import {MovieItem} from '../../services';

export const addFavorite: ActionCreator<AddFavoriteAction> = (
  movie: MovieItem,
) => {
  return {type: ADD_FAVORITE, payload: movie};
};

export const removeFavorite: ActionCreator<RemoveFavoriteAction> = (
  movie: MovieItem,
) => {
  return {type: REMOVE_FAVORITE, payload: movie};
};
