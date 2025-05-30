// src/screens/RiskViewScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getMonitoringHistory, MonitoringData } from '../../storage/storage';
import styles from '../styles/StyleScreen.styles'; // Importando os estilos

export default function RiskViewScreen() {
  const [latestData, setLatestData] = useState<MonitoringData | null>(null);

  useEffect(() => {
    const loadLatest = async () => {
      const history = await getMonitoringHistory();
      if (history.length > 0) {
        setLatestData(history[history.length -1]);
      } else {
        setLatestData(null);
      }
    };
    loadLatest();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível de Risco Atual</Text>
      {latestData ? (
        <>
          <Text>Data: {latestData.date}</Text>
          <Text>Umidade do Solo: {latestData.soilMoisture}%</Text>
          <Text>Inclinação: {latestData.slope}°</Text>
          <Text style={[styles.risk, {
            color:
              latestData.riskLevel === 'Alto' ? 'red' :
              latestData.riskLevel === 'Médio' ? 'orange' : 'green'
          }]}>
            Risco: {latestData.riskLevel}
          </Text>
        </>
      ) : (
        <Text>Nenhum dado disponível para análise.</Text>
      )}
    </View>
  );
}

