//importações necessárias
import React, { useState, useCallback } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MonitoringData, getMonitoringHistory, clearMonitoringData } from '../../storage/storage';
import styles from '../styles/StyleScreen.styles';

export default function HistoryScreen() {
  // estado para armazenar o histórico de monitoramento
  const [history, setHistory] = useState<MonitoringData[]>([]);
  
  // função para carregar o histórico de monitoramento
  const loadHistory = async () => {
    const data = await getMonitoringHistory();
    setHistory(data);
  };

  // função para limpar os dados de monitoramento
  const handleClear = async () => {
    await clearMonitoringData();
    Alert.alert('Sucesso', 'Dados excluídos!');
    setHistory([]);
  };

  // efeito para carregar o histórico quando a tela é focada
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );
  // renderização do componente
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Monitoramento</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>Nenhum dado registrado.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Data: {item.date}</Text>
              <Text>Umidade do Solo: {item.soilMoisture}%</Text>
              <Text>Inclinação: {item.slope}°</Text>
              <Text>Risco: {item.riskLevel}</Text>
            </View>
          )}
        />
      )}
      <View style={styles.btn}>
        <Button title="Excluir Histórico" onPress={handleClear} color="#D32F2F" />
      </View>
    </View>
  );
}
