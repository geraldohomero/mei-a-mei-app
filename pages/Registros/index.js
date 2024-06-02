import { useState, useEffect } from "react";
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';

import API_URLS, { API_URL } from "../../config/apiUrls";

const Registros = () => {
  const [faturamentos, setFaturamentos] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchTokenAndDecode = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.nameid);
      }
    };

    fetchTokenAndDecode();
  }, []);

  useEffect(() => {
    if (userId) {
      Promise.all([
        fetch(`${API_URLS.FATURAMENTOS}`).then((response) => response.json()),
        fetch(`${API_URLS.DESPESAS}`).then((response) => response.json()),
        fetch(`${API_URLS.PRODUTOS}`).then((response) => response.json()),
        fetch(`${API_URLS.SERVICOS}`).then((response) => response.json()),
      ])
        .then(
          ([faturamentosData, despesasData, produtosData, servicosData]) => {
            setFaturamentos(
              faturamentosData.filter((fat) => fat.usuarioId === userId)
            );
            setDespesas(despesasData.filter((des) => des.usuarioId === userId));
            setProdutos(produtosData.filter((pro) => pro.usuarioId === userId));
            setServicos(servicosData.filter((ser) => ser.usuarioId === userId));
          }
        )
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [userId]);

  const handleExcluirRegistro = async (tipo, id) => {
    try {
      let url;
      switch (tipo) {
        case "Faturamentos":
          url = `${API_URLS.FATURAMENTOS}/${id}`;
          break;
        case "Despesas":
          url = `${API_URLS.DESPESAS}/${id}`;
          break;
        case "Produtos":
          url = `${API_URLS.PRODUTOS}/${id}`;
          break;
        case "Servicos":
          url = `${API_URLS.SERVICOS}/${id}`;
          break;
        default:
          throw new Error(`Tipo desconhecido: ${tipo}`);
      }

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir o ${tipo}`);
      }

      // Restante do código...
    } catch (error) {
      console.error(`Erro ao excluir o ${tipo}: `, error);
    }
  };

  const renderTable = (head, data, renderRow, title) => (
    <View>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={head} style={styles.head} />
        {data.map((rowData, index) => (
          <Row key={index} data={renderRow(rowData)} />
        ))}
      </Table>
    </View>
  );

  const renderFaturamentosRow = (fat) => {
    return [
      fat.dataFaturamento,
      fat.nome,
      fat.produtoId === "Produto" ? produto?.nome : "",
      fat.servicoId === "Serviço" ? servico?.nome : "",
      fat.meioDePagamento,
      fat.valor.toString(),
      <IconButton
        icon="delete"
        color="red"
        size={20}
        onPress={() => handleExcluirRegistro("Faturamentos", fat.id)}
      />
    ];
  };

  const renderDespesasRow = (des) => {
    return [
      des.dataDespesa,
      des.nome,
      des.categoriasId,
      des.valor.toString(),
      <IconButton
        icon="delete"
        color="red"
        size={20}
        onPress={() => handleExcluirRegistro("Despesas", des.id)}
      />
    ];
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Registros de vendas</Text>
        {renderTable(
          ["Data", "Venda", "Produto", "Serviço", "Meio de Pagamento", "Valor", ""],
          faturamentos,
          renderFaturamentosRow,
          "Faturamentos"
        )}
      </View>
      <View style={styles.box}>
        <Text>Registros de despesas</Text>
        {renderTable(
          ["Data", "Despesa", "Categoria", "Valor", ""],
          despesas,
          renderDespesasRow,
          "Despesas"
        )}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  box: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffc107',
    borderRadius: 8
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
});

export default Registros;