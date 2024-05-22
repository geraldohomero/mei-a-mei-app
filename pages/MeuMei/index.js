import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import GraficoMes from '../../components/Graficos/GraficoMes';
import GraficoAno from '../../components/Graficos/GraficoAno';


const Faturamento = () => {
  const [grafico, setGrafico] = React.useState('mes');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Button title="MÊS" onPress={() => setGrafico('mes')} />
          <Button title="ANO" onPress={() => setGrafico('ano')} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          {grafico === 'mes' ? (
            <GraficoMes style={styles.grafico} />
          ) : (
            <GraficoAno style={styles.grafico} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grafico: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
  },
});

export default Faturamento;