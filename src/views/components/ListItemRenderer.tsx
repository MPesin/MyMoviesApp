import React, {useEffect, useState} from 'react';
import {Card, Button, Icon, Text, Rating} from 'react-native-elements';
import {View, StyleSheet, Image} from 'react-native';
import {FavoritesHandler, MovieItem} from '../../models';
import {RootState, useAppSelector} from '../../redux';

const ICON_FAVORIVE_SELECTED = 'heart';
const ICON_FAVORIVE_NOT_SELECTED = 'heart-outline';

const favoritesHandler = new FavoritesHandler();
const favoriteSelector = (state: RootState) => state.favorites;

export function ListItemRenderer({item}: {item: MovieItem}) {
  const [iconName, setIconName] = useState(ICON_FAVORIVE_NOT_SELECTED);

  const favorites = useAppSelector(favoriteSelector).favorites; // subscribe to changes in favorites in the store.

  useEffect(() => {
    const favMovie = favorites.find(favorite => favorite.id === item.id);
    let isFavorite = false;
    if (favMovie) {
      isFavorite = favMovie.isFavorite;
    }
    const targetIconName = isFavorite
      ? ICON_FAVORIVE_SELECTED
      : ICON_FAVORIVE_NOT_SELECTED;
    setIconName(targetIconName);
  }, [iconName, favorites, item.id]);

  return (
    <Card>
      <View style={style.rowContainer}>
        <Image source={{uri: item.poster}} style={style.image} />
        <View style={style.detailsContainer}>
          <Text h3>{item.title}</Text>
          <View style={style.rowContainer}>
            <Rating imageSize={20} readonly startingValue={item.rating} />
            <Text h4>{item.year}</Text>
            <Button
              icon={
                <Icon
                  type="material-community"
                  size={30}
                  name={iconName}
                  color="red"
                />
              }
              type="solid"
              onPress={_ => favoritesHandler.addRemoveFavoriteMovie(item)}
            />
          </View>
        </View>
      </View>
    </Card>
  );
}

const style = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'flex-start',
  },
  detailsContainer: {
    height: '100%',
    resizeMode: 'contain',
    flex: 3,
    alignSelf: 'flex-end',
  },
});
