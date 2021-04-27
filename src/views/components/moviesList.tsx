import React, {useState} from 'react';
import {FlatList, Button} from 'react-native';
import {MoviesHandler} from '../../models';
import {ApiRepo} from '../../repos';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const moviesSelector = (state: RootState) => state.movies;
const moviesHandler = new MoviesHandler(new ApiRepo());
moviesHandler.updateMoviesAsync();

export function MoviesList() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function updateMovieStore() {
    try {
      await moviesHandler.fetchMoreMoviesAsync();
    } catch (err) {}
  }

  async function refresh() {
    try {
      setIsRefreshing(true);
      await moviesHandler.updateMoviesAsync();
      moviesHandler.resetPageToOne();
      setIsRefreshing(false);
    } catch (err) {}
  }

  return (
    <FlatList
      data={useAppSelector(moviesSelector).movies}
      renderItem={ListItemRenderer}
      refreshing={isRefreshing}
      onRefresh={refresh}
      onEndReachedThreshold={0.3}
      onEndReached={updateMovieStore}
    />
  );
}
