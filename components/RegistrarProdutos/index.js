import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../config/apiUrls';
import { jwtDecode } from 'jwt-decode';

const RegistrarProdutos = ({ navigation, route }) => {
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState('');
  const [nome, setNome] = useState('');
  const [token, setToken] = useState(''); // Adicionado estado para o token

  const fetchProdutos = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const response = await axios.get(API_URLS.PRODUTOS, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        setProdutos(response.data);
      } else {
        throw new Error('Erro ao buscar produtos: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Falha ao buscar produtos: ' + error.message);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleAddProduct = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');

      if (!jwtToken) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = jwtDecode(jwtToken);
      const usuarioId = decodedToken && decodedToken.nameid;

      const produto = {
        nome,
        usuarioId
      };

      const response = await axios.post(API_URLS.PRODUTOS, produto, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
        fetchProdutos(); // Atualize a lista de produtos após adicionar um novo
      } else {
        throw new Error('Erro ao adicionar produto: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Alert.alert('Erro', 'Falha ao adicionar produto: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URLS.PRODUTOS}/${id}`)
      .then(() => {
        setProdutos(produtos.filter(produto => produto.id !== id));
      })
      .catch(error => {
        console.error('Error deleting produto:', error);
        Alert.alert('Erro', 'Falha ao excluir produto: ' + error.message); // Alerta para o usuário
      });
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Salvar" onPress={handleAddProduct} />

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={produtos.filter(produto => produto.nome && produto.nome.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nome}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => handleEdit(item.id)} />
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  searchBar: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
});

export default RegistrarProdutos;

