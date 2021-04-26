import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {MoviesHandler} from '../../models';
import {ApiRepo} from '../../repos';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const moviesSelector = (state: RootState) => state.movies;
const moviesHandler = new MoviesHandler(new ApiRepo());
moviesHandler.updateMovies();

export function MoviesList() {
  const [isRefreshing, setisRefreshing] = useState(false);
  async function updateMovieStore() {
    setisRefreshing(true);
    await moviesHandler.updateMovies();
    setisRefreshing(false);
  }

  return (
    <FlatList
      data={useAppSelector(moviesSelector).movies}
      renderItem={ListItemRenderer}
      refreshing={isRefreshing}
      onRefresh={updateMovieStore}
      //onEndReached={updateMovieStore}
      //onEndReachedThreshold={3}
    />
  );
}
