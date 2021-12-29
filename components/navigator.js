import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Search from '../screens/search';
import Detail from '../screens/detail';
import Navbar from './nav';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            // headerBackTitleVisible: false,
            // headerTitle: '',
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
            // headerTitle: '',
            header: ({navigation}) => (
              <Navbar main={false} navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            // headerBackTitleVisible: true,
            // headerTitle: '',
            header: ({navigation}) => (
              <Navbar main={false} navigation={navigation} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
