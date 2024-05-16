import React, { useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7097/api/Usuarios/authenticate', {
        email: email,
        password: senha,
      });

      const data = response.data;
      const token = data.jwtToken;

      if (token) {
        console.log('Token JWT via E-mail: ' + token);
        // Aqui você pode navegar para a página inicial
        navigation.navigate('TabNavigator');
      } else {
        throw new Error('Token não encontrado');
      }

      // Armazena o token no AsyncStorage
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao fazer login', error);
      Alert.alert('Erro ao fazer login', error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../assets/Logo.png')} // Substitua pelo caminho para a sua logo
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
        value={senha}
        onChangeText={setSenha}
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