// importações necessárias
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { saveMonitoringData } from '../../storage/storage';
import styles from '../styles/StyleScreen.styles';

export default function DataInputScreen() {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [slope, setSlope] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // função para calcular o nível de risco com base na umidade e inclinação
  const calculateRiskLevel = (moisture: number, slope: number): 'Baixo' | 'Médio' | 'Alto' => {
    if (moisture > 80 && slope > 30) return 'Alto';
    if (moisture > 50 && slope > 15) return 'Médio';
    return 'Baixo';
  };

  // função para lidar com o salvamento dos dados
  const handleSave = async () => {
    setError('');
    setSuccess('');

    // validação dos campos de entrada
    if (soilMoisture.trim() === '' || slope.trim() === '') {
      setError('Todos os campos devem ser preenchidos.');
      return;
    }

    // conversão dos valores de entrada para números e validação
    const moistureNum = Number(soilMoisture);
    const slopeNum = Number(slope);

    if (
      isNaN(moistureNum) || isNaN(slopeNum) ||
      !/^\d+(\.\d+)?$/.test(soilMoisture) || !/^\d+(\.\d+)?$/.test(slope)
    ) {
      setError('Por favor, insira apenas números válidos.');
      return;
    }

    if (moistureNum < 0 || moistureNum > 100) {
      setError('A umidade do solo deve estar entre 0% e 100%.');
      return;
    }

    if (slopeNum < 0 || slopeNum > 90) {
      setError('A inclinação do solo deve estar entre 0° e 90°.');
      return;
    }

    // salvar os dados
    const riskLevel = calculateRiskLevel(moistureNum, slopeNum);
    const data = {
      date: new Date().toLocaleString(),
      soilMoisture: moistureNum,
      slope: slopeNum,
      riskLevel,
    };

    await saveMonitoringData(data);

    // limpar os campos após salvar
    setSoilMoisture('');
    setSlope('');

    // exibir mensagem de sucesso
    setSuccess('Dados salvos com sucesso!');

    // esconder a mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Umidade do Solo (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={soilMoisture}
        onChangeText={setSoilMoisture}
        placeholder="Ex: 90"
      />

      <Text style={styles.label}>Inclinação do Solo (°)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={slope}
        onChangeText={setSlope}
        placeholder="Ex: 30"
      />

      {/* exibe mensagem de erro se houver */}
      {error !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

      {/* exibe mensagem de sucesso se houver */}
      {success !== '' && <Text style={{ color: 'green', marginBottom: 10 }}>{success}</Text>}

      <Button title="Salvar Dados" onPress={handleSave} color="#9370DB" />
    </View>
  );
}
