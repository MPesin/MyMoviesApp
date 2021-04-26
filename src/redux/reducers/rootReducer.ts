import {combineReducers} from 'redux';
import {moviesReducer} from './moviesReducer';
import {favoritesReducer} from './favoritesReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
});
