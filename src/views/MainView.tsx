import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../themes/Styles';

const MainView = () => {
  return (
    <View style={Styles.mainView}>
      <Text style={Styles.mainText}>Hello World</Text>
    </View>
  );
};

export default MainView;
