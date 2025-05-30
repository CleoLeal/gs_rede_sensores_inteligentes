// screens/RiskViewScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MonitoringData, RiskLevel } from '../types/types'; // Importar tipos

export default function RiskViewScreen() {
  const [latestData, setLatestData] = useState<MonitoringData | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>({ text: 'Nenhum dado para análise', color: '#CCC' });
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar os dados mais recentes do AsyncStorage
  const fetchData = useCallback(async () => {
    setLoading(true); // Ativa o estado de carregamento
    try {
      const storedData = await AsyncStorage.getItem('@monitoring_data');
      if (storedData) {
        const data: MonitoringData[] = JSON.parse(storedData);
        if (data.length > 0) {
          const lastEntry = data[data.length - 1]; // Pega o último registro para análise
          setLatestData(lastEntry);
          analyzeRisk(lastEntry); // Analisa o risco do último registro
        } else {
          // Se não há dados, reseta o estado
          setLatestData(null);
          setRiskLevel({ text: 'Nenhum dado para análise', color: '#CCC' });
        }
      } else {
        // Se não há dados no storage, reseta o estado
        setLatestData(null);
        setRiskLevel({ text: 'Nenhum dado para análise', color: '#CCC' });
      }
    } catch (error) {
      console.error('Erro ao carregar dados para visualização de risco:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados para análise de risco.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  }, []);

  // useEffect para carregar os dados na montagem inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependência fetchData para garantir que seja chamada se a função mudar (raro para useCallback)

  // useFocusEffect para recarregar os dados sempre que a tela for focada
  // Isso garante que, ao voltar da tela de inserção de dados, o risco seja atualizado
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Função para analisar o risco com base nos dados de umidade e inclinação
  const analyzeRisk = (data: MonitoringData) => {
    const { umidadeSolo, inclinacao } = data;

    let level: 'Baixo' | 'Médio' | 'Alto' | 'Nenhum dado para análise' = 'Baixo';
    let color = '#4CAF50'; // Verde para Baixo

    // Lógica de simulação de risco
    // Estes são valores de exemplo; em um sistema real, seriam baseados em estudos geotécnicos.
    if (umidadeSolo > 70 && inclinacao > 10) {
      level = 'Alto';
      color = '#FF5733'; // Laranja para Alto (ou vermelho, dependendo da preferência)
    } else if (umidadeSolo > 50 || inclinacao > 5) {
      level = 'Médio';
      color = '#FFC300'; // Amarelo para Médio
    }

    setRiskLevel({ text: level, color: color });
  };

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados para análise de risco...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Visualização de Riscos</Text>
      {latestData ? (
        <View style={styles.dataCard}>
          <Text style={styles.dataText}>
            <Text style={styles.dataLabel}>Área Monitorada:</Text> {latestData.area}
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.dataLabel}>Umidade do Solo:</Text> {latestData.umidadeSolo}%
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.dataLabel}>Inclinação:</Text> {latestData.inclinacao} graus
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.dataLabel}>Última Atualização:</Text> {latestData.timestamp}
          </Text>
          {/* Badge que mostra o nível de risco com cor dinâmica */}
          <View style={[styles.riskBadge, { backgroundColor: riskLevel.color }]}>
            <Text style={styles.riskText}>Nível de Risco: {riskLevel.text}</Text>
          </View>
          {/* Mensagem de alerta adicional para risco alto */}
          {riskLevel.text === 'Alto' && (
            <Text style={styles.alertMessage}>
              ALERTA: Risco ALTO de deslizamento! Medidas preventivas são urgentes.
            </Text>
          )}
        </View>
      ) : (
        // Mensagem se não houver dados para análise
        <Text style={styles.noDataText}>Nenhum dado recente para análise. Insira dados na tela de Inserção de Dados Ambientais.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  dataCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  dataLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  riskBadge: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  riskText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  alertMessage: {
    fontSize: 16,
    color: '#D8000C',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFD2D2',
    borderRadius: 5,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});