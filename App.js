import React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MeuMei from './pages/MeuMei';
import Gerenciamento from './pages/Gerenciamento';
import Registros from './pages/Registros';
import Perfil from './pages/Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'MeuMei') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Gerenciamento') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Registros') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="MeuMei"
          component={MeuMei}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/Logo.png')}
                  style={{ width: 40, height: 40 }}
                />
                <Text>MeuMei</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Gerenciamento"
          component={Gerenciamento}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/Logo.png')}
                  style={{ width: 40, height: 40 }}
                />
                <Text>Gerenciamento</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Registros"
          component={Registros}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/Logo.png')}
                  style={{ width: 40, height: 40 }}
                />
                <Text>Registros</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/Logo.png')}
                  style={{ width: 40, height: 40 }}
                />
                <Text>Perfil</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}