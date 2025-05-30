import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { saveMonitoringData } from '../../storage/storage';
import styles from '../styles/StyleScreen.styles';

export default function DataInputScreen() {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [slope, setSlope] = useState('');

  const calculateRiskLevel = (moisture: number, slope: number): 'Baixo' | 'Médio' | 'Alto' => {
    if (moisture > 80 && slope > 30) return 'Alto';
    if (moisture > 50 && slope > 15) return 'Médio';
    return 'Baixo';
  };

  const handleSave = async () => {
    const moistureNum = Number(soilMoisture);
    const slopeNum = Number(slope);

    if (isNaN(moistureNum) || isNaN(slopeNum)) {
      Alert.alert('Erro', 'Por favor, insira valores numéricos válidos.');
      return;
    }

    const riskLevel = calculateRiskLevel(moistureNum, slopeNum);
    const data = {
      date: new Date().toLocaleString(),
      soilMoisture: moistureNum,
      slope: slopeNum,
      riskLevel,
    };

    await saveMonitoringData(data);
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    setSoilMoisture('');
    setSlope('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Umidade do Solo (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={soilMoisture}
        onChangeText={setSoilMoisture}
        placeholder="Ex: 70"
      />
      <Text style={styles.label}>Inclinação do Solo (°)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={slope}
        onChangeText={setSlope}
        placeholder="Ex: 20"
      />
      <Button title="Salvar Dados" onPress={handleSave} color="#9370DB" />
    </View>
  );
}
