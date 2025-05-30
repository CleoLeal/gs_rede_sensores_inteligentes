import AsyncStorage from '@react-native-async-storage/async-storage';

export type MonitoringData = {
  date: string;
  soilMoisture: number;
  slope: number;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
};

export const saveMonitoringData = async (data: MonitoringData) => {
  const stored = await AsyncStorage.getItem('@monitoring_data');
  const parsed = stored ? JSON.parse(stored) : [];
  parsed.push(data);
  await AsyncStorage.setItem('@monitoring_data', JSON.stringify(parsed));
};

export const getMonitoringHistory = async (): Promise<MonitoringData[]> => {
  const stored = await AsyncStorage.getItem('@monitoring_data');
  return stored ? JSON.parse(stored) : [];
};
