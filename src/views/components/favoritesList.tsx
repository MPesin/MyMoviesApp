import React from 'react';
import {FlatList} from 'react-native';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';
const moviesSelector = (state: RootState) => state.movies;

export function FavoritesList() {
  return (
    <FlatList
      data={useAppSelector(moviesSelector).movies.filter(
        movie => movie.isFavorite,
      )}
      renderItem={ListItemRenderer}
    />
  );
}
