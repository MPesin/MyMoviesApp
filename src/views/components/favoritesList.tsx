import React from 'react';
import {FlatList} from 'react-native';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';

const favoritesSelector = (state: RootState) => state.favorites;

export function FavoritesList() {
  return (
    <FlatList
      data={useAppSelector(favoritesSelector).favorites}
      renderItem={ListItemRenderer}
    />
  );
}
