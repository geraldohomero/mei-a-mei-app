import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from './navigators/StackNavigator';
import TabNavigator from './navigators/TabNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(userToken ? true : false);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // Ou algum componente de carregamento
  }

  return isLoggedIn ? <TabNavigator /> : <StackNavigator />;
}