import React from 'react';
import {FlatList} from 'react-native';
import {MoviesHandler} from '../models';
import {FSRepo} from '../repos';
import {ListItemRenderer} from './components';
//import {Styles} from '../themes';

export default function MoviesView() {
  const moviesHandler = new MoviesHandler(new FSRepo());
  const moviesData = moviesHandler.loadAllMovies();
  return <FlatList data={moviesData} renderItem={ListItemRenderer} />;
}
