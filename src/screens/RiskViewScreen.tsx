// src/screens/RiskViewScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMonitoringHistory, MonitoringData } from '../../storage/storage';
import styles from '../styles/StyleScreen.styles';

export default function RiskViewScreen() {
  const [latestData, setLatestData] = useState<MonitoringData | null>(null);

  const loadLatest = async () => {
    const history = await getMonitoringHistory();
    if (history.length > 0) {
      setLatestData(history[history.length - 1]);
    } else {
      setLatestData(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLatest();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível de Risco Atual</Text>
      {latestData ? (
        <>
          <Text>Data: {latestData.date}</Text>
          <Text>Umidade do Solo: {latestData.soilMoisture}%</Text>
          <Text>Inclinação: {latestData.slope}°</Text>
          <Text
            style={[
              styles.risk,
              {
                color:
                  latestData.riskLevel === 'Alto'
                    ? 'red'
                    : latestData.riskLevel === 'Médio'
                    ? 'orange'
                    : 'green',
              },
            ]}
          >
            Risco: {latestData.riskLevel}
          </Text>
        </>
      ) : (
        <Text>Nenhum dado disponível para análise.</Text>
      )}
    </View>
  );
}
