// screens/HistoryScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MonitoringData } from '../types/types'; // Importar tipos

export default function HistoryScreen() {
  const [historyData, setHistoryData] = useState<MonitoringData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Carrega os dados de monitoramento do AsyncStorage.
   * Os dados são revertidos para que os registros mais recentes apareçam primeiro.
   */
  const loadHistory = useCallback(async () => {
    setLoading(true); // Ativa o indicador de carregamento
    try {
      // Tenta obter os dados armazenados sob a chave '@monitoring_data'
      const storedData = await AsyncStorage.getItem('@monitoring_data');
      // console.log('HistoryScreen: Dados brutos do AsyncStorage:', storedData); // Log de depuração

      if (storedData) {
        // Se houver dados, faz o parse da string JSON para um array de MonitoringData
        const parsedData: MonitoringData[] = JSON.parse(storedData);
        // console.log('HistoryScreen: Dados parseados do AsyncStorage:', parsedData); // Log de depuração

        // Verifica se parsedData é um array e se contém itens
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Define o estado historyData, revertendo o array para mostrar os mais recentes primeiro
          setHistoryData(parsedData.reverse());
          // console.log('HistoryScreen: Histórico definido (revertido):', parsedData.reverse()); // Log de depuração
        } else {
          // Se o array estiver vazio ou inválido, define o histórico como vazio
          setHistoryData([]);
          // console.log('HistoryScreen: Dados parseados, mas array vazio ou inválido.'); // Log de depuração
        }
      } else {
        // Se não houver dados no AsyncStorage, define o histórico como vazio
        setHistoryData([]);
        // console.log('HistoryScreen: Nenhum dado encontrado no AsyncStorage.'); // Log de depuração
      }
    } catch (error) {
      // Em caso de erro (ex: JSON inválido), loga o erro e exibe um alerta
      console.error('HistoryScreen: Erro ao carregar histórico:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
      // console.log('HistoryScreen: Carregamento finalizado. Loading:', false); // Log de depuração
    }
  }, []); // Dependência vazia, a função é estável e memorizada

  // useEffect para carregar o histórico na montagem inicial do componente
  // Garante que os dados sejam carregados assim que a tela aparece pela primeira vez
  useEffect(() => {
    loadHistory();
  }, [loadHistory]); // Dependência 'loadHistory' para eslint, mas como é useCallback sem deps, é estável.

  // useFocusEffect para recarregar o histórico sempre que a tela for focada
  // Essencial para que o histórico seja atualizado ao navegar de volta para esta tela (ex: após inserir novos dados)
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory]) // Dependência 'loadHistory'
  );

  /**
   * Função para renderizar cada item individual na FlatList.
   * Recebe um objeto com a propriedade 'item' que é do tipo MonitoringData.
   */
  const renderItem = ({ item }: { item: MonitoringData }) => (
    <View style={styles.historyItem}>
      <Text style={styles.itemTitle}>{item.area}</Text>
      <Text>
        <Text style={styles.itemLabel}>Umidade do Solo:</Text> {item.umidadeSolo}%
      </Text>
      <Text>
        <Text style={styles.itemLabel}>Inclinação:</Text> {item.inclinacao} graus
      </Text>
      <Text>
        <Text style={styles.itemLabel}>Data/Hora:</Text> {item.timestamp}
      </Text>
    </View>
  );

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Monitoramento</Text>
      {historyData.length > 0 ? (
        // Se houver dados no historyData, renderiza a FlatList
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Usa o 'id' único de cada item como chave
          contentContainerStyle={styles.listContent}
        />
      ) : (
        // Se não houver dados, exibe a mensagem de que não há histórico
        <Text style={styles.noHistoryText}>Nenhum histórico de monitoramento disponível.</Text>
      )}
    </View>
  );
}

// Estilos para o componente HistoryScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F0F8FF', // Fundo claro para a tela
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20, // Garante que o último item não fique colado na borda inferior
  },
  historyItem: {
    backgroundColor: '#FFF', // Fundo branco para cada card de histórico
    padding: 15,
    borderRadius: 8,
    marginBottom: 10, // Espaçamento entre os cards
    shadowColor: '#000', // Sombra para efeito 3D
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2, // Elevação para Android
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  noHistoryText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});