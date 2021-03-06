import React from 'react';
import {Card, Button, Icon, Text} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FavoritesHandler} from '../../models';
import {MovieItem} from '../../services';
import {StorageManager} from '../../models';

const ICON_FAVORIVE_SELECTED = 'heart';
const ICON_FAVORIVE_NOT_SELECTED = 'heart-outline';

const favoritesHandler = new FavoritesHandler(new StorageManager());

export function ListItemRenderer({item}: {item: MovieItem}) {
  const iconName = item.isFavorite
    ? ICON_FAVORIVE_SELECTED
    : ICON_FAVORIVE_NOT_SELECTED;
  return (
    <Card>
      <View style={style.rowContainer}>
        <Image source={{uri: item.poster}} style={style.image} />
        <View style={style.detailsContainer}>
          <Card.Title style={style.cardTitle}>{item.catagory}</Card.Title>
          <Text h3>{item.title}</Text>
          <View style={style.rowContainer}>
            <View style={style.rowContainer}>
              <Icon
                type="material-community"
                size={25}
                name="star"
                color="#FDCC0D"
              />
              <Text h4>{item.rating}</Text>
              <Text>/10</Text>
            </View>
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
              onPress={async _ =>
                favoritesHandler.addRemoveFavoriteMovieAsync(item)
              }
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
    marginStart: 10,
  },
  favoriteButton: {
    backgroundColor: 'transparent',
  },
  cardTitle: {
    alignSelf: 'flex-start',
  },
});
