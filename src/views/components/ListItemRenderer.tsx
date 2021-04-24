import React from 'react';
import {Card, Icon, Text, Rating} from 'react-native-elements';
import {View, StyleSheet, Image} from 'react-native';
import {MovieItem} from '../../models';

const ICON_FAVORIVE_SELECTED = 'heart';
const ICON_FAVORIVE_NOT_SELECTED = 'heart-outline';

export function listItemRenderer({item}: {item: MovieItem}) {
  const isFavoriteSelected = false; // TODO - get value using redux.
  let iconName = isFavoriteSelected
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
            <Icon
              type="material-community"
              size={30}
              name={iconName}
              color="red"
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
