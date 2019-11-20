import React from 'react';
import { Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import SideBar from './components/SideBar';
import HeaderComponent from './components/Header';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailScreen';
import ContactTabsStack from './screens/TabsContact'
import LoginScreen from './screens/LoginScreen';

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
})

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Inicio',
      header: props => <HeaderComponent {...props} />,
    }
  }
})

const DetailStack = createStackNavigator({
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      title: 'Detalle',
      header: props => <HeaderComponent {...props} />,
    }
  }
})

const AppDrawer = createDrawerNavigator(
  {
    Login: {
      screen: LoginStack,
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Inicio',
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={16} color={tintColor} />
        ),
      }
    },
    Details: {
      screen: DetailStack,
      navigationOptions: {
        title: 'Detalle',
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={16} color={tintColor} />
        )
      }
    },
    Contact: {
      screen: ContactTabsStack,
      navigationOptions: {
        title: 'Contacto',
        drawerIcon: ({ tintColor }) => (
          <Icon name="address-book" size={16} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Contact',
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.70,
    hideStatusBar: true,
    contentOptions:{
      activeBackgroundColor: '#0078F0',
      activeTintColor: '#FFFFFF',
      itemsContainerStyle: {
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        marginHorizontal: 8,
        borderRadius: 4,
      },
      itemStyle: {
        borderRadius: 4
      },
    },
  }
)

export default createAppContainer(AppDrawer);