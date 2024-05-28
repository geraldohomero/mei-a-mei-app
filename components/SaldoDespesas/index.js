import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import API_URLS, { API_URL } from "../../config/apiUrls";


const SaldoDespesas = () => {
  const [userId, setUserId] = useState(null);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [periodo, setPeriodo] = useState('mes');

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.nameid);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`${API_URLS.DESPESAS}`)
        .then((response) => response.json())
        .then((despesasData) => {
          const userDespesas = despesasData.filter(
            (fat) => fat.usuarioId === userId
          );

          const totalDespesas = userDespesas.reduce(
            (acc, cur) => acc + cur.valor,
            0
          );

          setTotalDespesas(totalDespesas);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Despesas: {totalDespesas}</Text>
      <View style={styles.buttonContainer}>
        <Button title="MÊS" onPress={() => setPeriodo('mes')} />
        <Button title="ANO" onPress={() => setPeriodo('ano')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: 'red',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SaldoDespesas;