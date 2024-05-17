import React, { useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    const response = await axios.post('http://10.0.2.2:5062/api/Usuarios/authenticate', {
      email: email,
      senha: password,
    });

    const data = response.data;
    const token = data.jwtToken;

    if (token) {
      console.log('Token JWT via E-mail: ' + token);
      // Redefinir o histórico de navegação após o login
      navigation.reset({
        index: 0,
        routes: [{ name: 'MyTabs' }],
      });
    } else {
      throw new Error('Token não encontrado');
    }

    // Armazena o token no AsyncStorage
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao armazenar o token:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../assets/Logo.png')}
        style={{ width: 100, height: 100 }}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: '80%', marginBottom: 10 }}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: '80%', marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('RecuperarSenha')}>
        Esqueceu a senha?
      </Button>
    </View>
  );
}