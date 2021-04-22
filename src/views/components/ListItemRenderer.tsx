import React from 'react';
import {Card, Icon, Text, Rating} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
import {MovieItem} from '../../models';

const ICON_FAVORIVE_SELECTED = 'heart';
const ICON_FAVORIVE_NOT_SELECTED = 'heart-outline';

export function ListItemRenderer({item}: {item: MovieItem}) {
  const isFavoriteSelected = false; // TODO - get value using redux.
  let iconName = isFavoriteSelected
    ? ICON_FAVORIVE_SELECTED
    : ICON_FAVORIVE_NOT_SELECTED;

  return (
    <Card>
      <Text h3>{item.title}</Text>
      <View style={style.row}>
        <Rating imageSize={20} readonly startingValue={item.rating} />
        <Text h4>{item.year}</Text>
      </View>
      <Icon type="material-community" size={40} name={iconName} color="red" />
      <Card.Image
        source={{
          uri: item.poster,
        }}
      />
    </Card>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
