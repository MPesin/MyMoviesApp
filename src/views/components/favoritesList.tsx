import React from 'react';
import {FlatList} from 'react-native';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const moviesSelector = (state: RootState) => state.movies;

export function FavoritesList() {
  return (
    <SafeAreaView>
      <FlatList
        data={useAppSelector(moviesSelector).movies.filter(
          movie => movie.isFavorite,
        )}
        renderItem={ListItemRenderer}
      />
    </SafeAreaView>
  );
}
