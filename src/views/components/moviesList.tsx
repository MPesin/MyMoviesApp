import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {MoviesHandler} from '../../models';
import {FSSampleRepo} from '../../repos';
import {listItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const moviesSelector = (state: RootState) => state.movies;

export function MoviesList() {
  useEffect(() => {
    const moviesHandler = new MoviesHandler(new FSSampleRepo());
    moviesHandler.updateMovies();
  }, []);

  return (
    <FlatList
      data={useAppSelector(moviesSelector).movies}
      renderItem={listItemRenderer}
    />
  );
}
