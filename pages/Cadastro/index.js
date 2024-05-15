import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleCadastro = () => {
    // Aqui você pode lidar com a lógica de cadastro
    console.log(nome, email, senha, razaoSocial);
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../assets/Logo.png')}
        style={{ width: 100, height: 100 }}
      />
      <TextInput
        mode="outlined"
        label="Razão Social"
        value={razaoSocial}
        onChangeText={setNome}
        style={{ width: '80%', marginBottom: 10 }}
      />
      <TextInput
        mode="outlined"
        label="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        style={{ width: '80%', marginBottom: 10 }}
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
        secureTextEntry={!senhaVisivel}
        style={{ width: '80%', marginBottom: 10 }}
        right={
          <TextInput.Icon
            name={senhaVisivel ? "eye-off" : "eye"}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
          />
        }
      />
      <TextInput
        mode="outlined"
        label="Confirmar senha"
        secureTextEntry
        style={{ width: '80%', marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleCadastro}>
        Cadastrar
      </Button>
    </View>
  );
}