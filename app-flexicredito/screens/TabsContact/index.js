import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderComponent from '../../components/Header';

import ContactListScreen from './ContactListScreen';
import ContactScreen from './ContactScreen';

const TabNavigatorContact = createBottomTabNavigator (
  {
    ContactList: {
      screen: ContactListScreen,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return <Icon name="list" size={30} color={tintColor} />;
        },
        // tabBarOnPress: (scene, jumpToIndex) => {
        //     console.log(scene)
        //   scene.navigation.navigate ('ContactList');
        // },
      },
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return <Icon name="address-book" size={30} color={tintColor} />;
        },
        // tabBarOnPress: (scene, jumpToIndex) => {
        //   scene.navigation.navigate ('Contact');
        // },
      },
    },
  },
  {
    initialRouteName: 'ContactList',
  }
);

const ContactStack = createStackNavigator ({
  Tabs: {
    screen: TabNavigatorContact,
    navigationOptions: {
      header: props => <HeaderComponent {...props} />,
    },
  },
});

export default createAppContainer (ContactStack);
