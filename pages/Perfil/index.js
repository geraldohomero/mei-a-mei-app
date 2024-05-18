import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Dialog from "react-native-dialog";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [showId, setShowId] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");
  const [token, setToken] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken && decodedToken.nameid;


        console.log('userId:', userId);

        if (userId) {
          axios.get(`http://10.0.2.2:5062/api/Usuarios/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              setUsuario(response.data);
            })
            .catch((error) => {
              console.error('Erro ao recuperar os dados do usuário:', error);
            });
        } else {
          console.error('Erro: userId está indefinido');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = (field) => {
    setFieldToEdit(field);
    setNewValue(''); // Limpa o estado newValue
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };


  const handleConfirm = () => {
    const updatedUser = { ...usuario, [fieldToEdit.toLowerCase()]: newValue };
    // Aqui você pode fazer a chamada para a API para atualizar o usuário
    axios.put(`http://10.0.2.2:5062/api/Usuarios/${usuario.id}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setUsuario(updatedUser);
        } else {
          throw new Error(`Erro ao atualizar o usuário: ${response.status} ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar o usuário:", error);
      });
    setDialogVisible(false);
  };

  const handleLogoff = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
    navigation.navigate('StackNavigator');
  };

  if (!usuario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>ID:</Text> {showId && <Text>{usuario.id}</Text>}</Text>
        <Button mode="contained" onPress={() => setShowId(!showId)}>{showId ? 'Esconder' : 'Mostrar'}</Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>Nome:</Text> {usuario.nome}</Text>
        <Button mode="contained" onPress={() => handleEdit('Nome')}>Editar</Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {usuario.email}</Text>
        <Button mode="contained" onPress={() => handleEdit('Email')}>Editar</Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' }}>
        <Text><Text style={{ fontWeight: 'bold' }}>CNPJ:</Text> {usuario.cnpj}</Text>
        <Button mode="contained" onPress={() => handleEdit('CNPJ')}>Editar</Button>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button mode="contained" onPress={handleLogoff}>Sair</Button>
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Editar {fieldToEdit}</Dialog.Title>
          <Dialog.Input onChangeText={setNewValue} value={newValue} />
          <Dialog.Button label="Cancelar" onPress={handleCancel} />
          <Dialog.Button label="OK" onPress={handleConfirm} />
        </Dialog.Container>
      </View>
    </View>

  );
}

export default Perfil;