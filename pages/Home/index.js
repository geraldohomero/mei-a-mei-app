import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Cadastro from '../Cadastro';
import Login from '../Login';

export default function Home({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Image
        source={require('../../assets/Logo.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Paragraph style={{ marginBottom: 20 }}>Nunca foi tão fácil gerenciar o seu MEI</Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('Login')} style={{ marginBottom: 10 }}>
        Login
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Cadastro')} style={{ marginBottom: 10 }}>
        Cadastro
      </Button>
    </View>
  );
}