import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './components/navigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
