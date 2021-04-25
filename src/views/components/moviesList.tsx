import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {MoviesHandler} from '../../models';
import {FSSampleRepo} from '../../repos';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const moviesSelector = (state: RootState) => state.movies;
const favoritesSelector = (state: RootState) => state.favorites;
const moviesHandler = new MoviesHandler(new FSSampleRepo());

export function MoviesList() {
  const movies = useAppSelector(moviesSelector).movies;
  useAppSelector(favoritesSelector); // update when add/remove movie from favorites.

  useEffect(() => {
    moviesHandler.updateMovies();
  }, [movies]);

  return <FlatList data={movies} renderItem={ListItemRenderer} />;
}
