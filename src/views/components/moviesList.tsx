import React, {useState, useEffect} from 'react';
import {FlatList, View, Platform} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {MoviesHandler, StorageManager} from '../../models';
import {ApiRepo} from '../../repos';
import {ListItemRenderer} from '../components';
import {RootState, useAppSelector} from '../../redux';
import {MovieItem} from '../../services';

const PLATFORM =
  Platform.OS === 'ios' || Platform.OS === 'android' ? Platform.OS : 'default';
const moviesSelector = (state: RootState) => state.movies;
const moviesHandler = new MoviesHandler(new ApiRepo(), new StorageManager());
try {
  moviesHandler.updateMoviesAsync();
} catch (err) {
  console.error(err);
}

export function MoviesList() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [listData, setListData] = useState<MovieItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<MovieItem[]>([]);
  let storeData = useAppSelector(moviesSelector).movies;

  useEffect(() => {
    if (searchText === '') {
      setListData(storeData);
    } else {
      setListData(searchData);
    }
  }, [storeData, searchData, searchText]);

  async function onEndReachedEvent() {
    try {
      await moviesHandler.fetchMoreMoviesAsync();
    } catch (err) {
      console.error(err);
    }
  }

  async function onRefreshEvent() {
    try {
      setIsRefreshing(true);
      if (searchText) {
        onChangeTextEvent(searchText);
      } else {
        refresh();
      }
      setIsRefreshing(false);
    } catch (err) {
      console.error(err);
    }
  }

  function refresh() {
    try {
      moviesHandler.resetPageToOne();
      setListData(storeData);
    } catch (err) {
      console.error(err);
    }
  }

  async function onChangeTextEvent(toSearch: string) {
    try {
      setSearchText(toSearch);
      const findResult = await moviesHandler.searchMovieByTitleAsync(toSearch);
      if (findResult) {
        setSearchData(findResult);
        setListData(findResult);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View>
      <SearchBar
        platform={PLATFORM}
        placeholder="Search for a movie title"
        onChangeText={onChangeTextEvent}
        onCancel={onRefreshEvent}
        value={searchText}
      />
      <FlatList
        data={listData}
        renderItem={ListItemRenderer}
        refreshing={isRefreshing}
        onRefresh={onRefreshEvent}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReachedEvent}
      />
    </View>
  );
}
