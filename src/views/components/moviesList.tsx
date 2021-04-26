import React from 'react';
import {FlatList} from 'react-native';
import {MoviesHandler} from '../../models';
import {FSSampleRepo} from '../../repos';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const moviesSelector = (state: RootState) => state.movies;
const moviesHandler = new MoviesHandler(new FSSampleRepo());
moviesHandler.updateMovies();

export function MoviesList() {
  return (
    <FlatList
      data={useAppSelector(moviesSelector).movies}
      renderItem={ListItemRenderer}
    />
  );
}
