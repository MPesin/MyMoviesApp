import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {MovieItem, MoviesHandler} from '../models';
import {FSSampleRepo} from '../repos';
import {ListItemRenderer} from './components';

export default function MoviesView() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  useEffect(() => {
    const moviesHandler = new MoviesHandler(new FSSampleRepo());
    const moviesData = moviesHandler.loadMoviesFromRepo();
    setMovies(moviesData);
  }, [movies]);

  return <FlatList data={movies} renderItem={ListItemRenderer} />;
}
