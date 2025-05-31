//importando
import AsyncStorage from '@react-native-async-storage/async-storage';

//storage para armazenar dados de monitoramento
export type MonitoringData = {
  date: string;
  soilMoisture: number;
  slope: number;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
};

const STORAGE_KEY = '@monitoring_data';

//storage para salvar dados de monitoramento
export const saveMonitoringData = async (data: MonitoringData) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: MonitoringData[] = stored ? JSON.parse(stored) : [];
    parsed.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

//storage para obter histórico de monitoramento
export const getMonitoringHistory = async (): Promise<MonitoringData[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao obter histórico:', error);
    return [];
  }
};

//storage para limpar dados de monitoramento
export const clearMonitoringData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};
