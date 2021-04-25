import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {MoviesHandler} from '../../models';
import {FSSampleRepo} from '../../repos';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const moviesHandler = new MoviesHandler(new FSSampleRepo());
const moviesSelector = (state: RootState) => state.movies;

export function MoviesList() {
  useEffect(() => {
    moviesHandler.updateMovies();
  }, []);

  return (
    <FlatList
      data={useAppSelector(moviesSelector).movies}
      renderItem={ListItemRenderer}
    />
  );
}
