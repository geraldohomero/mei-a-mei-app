import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import RecuperarSenha from '../RecuperarSenha';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Aqui você pode lidar com a lógica de login
    console.log(email, senha);
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