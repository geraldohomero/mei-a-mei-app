import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import GraficoMes from '../../components/Graficos/GraficoMes';
import GraficoAno from '../../components/Graficos/GraficoAno';
import SaldoDespesas from '../../components/SaldoDespesas';
import SaldoVendas from '../../components/SaldoVendas';

const Faturamento = () => {
  const [grafico, setGrafico] = React.useState('mes');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.horizontalContainer}>
        <View style={styles.equalFlexItem}>
          <SaldoVendas />
        </View>
        <View style={styles.equalFlexItem}>
          <SaldoDespesas />
        </View>
      </View>
      <View style={styles.graphAndButtonsContainer}>
        {grafico === 'mes' ? (
          <GraficoMes style={styles.centeredGraph} />
        ) : (
          <GraficoAno style={styles.centeredGraph} />
        )}
        <View style={styles.buttonContainer}>
          <View style={styles.equalFlexItem}>
            <Button title="MÊS" onPress={() => setGrafico('mes')} />
          </View>
          <View style={styles.equalFlexItem}>
            <Button title="ANO" onPress={() => setGrafico('ano')} />
          </View>
        </View>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  equalFlexItem: {
    flex: 1,
  },
  graphAndButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    margin: 55,
  },
  centeredGraph: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
  },
});

export default Faturamento;