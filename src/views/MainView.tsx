import React from 'react';
import MoviesView from './MoviesView';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export const MainView = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Movies"
        tabBarOptions={{
          activeTintColor: 'darkblue',
        }}>
        <Tab.Screen
          name="Movies"
          component={MoviesView}
          options={{
            tabBarLabel: 'Movies',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="movie" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
