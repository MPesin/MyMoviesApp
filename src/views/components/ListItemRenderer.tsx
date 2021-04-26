import React from 'react';
import {Card, Button, Icon, Text, Rating} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FavoritesHandler, MovieItem} from '../../models';

const ICON_FAVORIVE_SELECTED = 'heart';
const ICON_FAVORIVE_NOT_SELECTED = 'heart-outline';
const favoritesHandler = new FavoritesHandler();

export function ListItemRenderer({item}: {item: MovieItem}) {
  const iconName = item.isFavorite
    ? ICON_FAVORIVE_SELECTED
    : ICON_FAVORIVE_NOT_SELECTED;
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
              buttonStyle={style.favoriteButton}
              type="solid"
              onPress={_ => favoritesHandler.addRemoveFavoriteMovie(item)}
              TouchableComponent={TouchableOpacity}
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
  favoriteButton: {
    backgroundColor: 'transparent',
  },
});
