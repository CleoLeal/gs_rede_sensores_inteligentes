// screens/DataInputScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList, MonitoringData } from '../types/types'; // Importar tipos

type DataInputScreenProps = BottomTabScreenProps<RootTabParamList, 'Inserir Dados'>;

export default function DataInputScreen({ navigation }: DataInputScreenProps) {
  const [umidadeSolo, setUmidadeSolo] = useState<string>('');
  const [inclinacao, setInclinacao] = useState<string>('');
  const [area, setArea] = useState<string>('');

  const saveData = async () => {
    // 1. Validação inicial
    if (!umidadeSolo || !inclinacao || !area) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    // Adicionando validação para números, que estava faltando no seu trecho
    if (isNaN(parseFloat(umidadeSolo)) || isNaN(parseFloat(inclinacao))) {
      Alert.alert('Erro', 'Umidade e Inclinação devem ser números válidos.');
      return;
    }


    const newEntry: MonitoringData = {
      id: Date.now(), // ID único baseado no timestamp atual
      umidadeSolo: parseFloat(umidadeSolo),
      inclinacao: parseFloat(inclinacao),
      area: area,
      timestamp: new Date().toLocaleString(), // Data e hora atual formatada
    };

    // --- AQUI COMEÇAM OS console.log's ---

    // Log 1: O que será salvo
    console.log('DataInputScreen: Dados que serão salvos:', newEntry);

    try {
      // Log 2: Tentando obter dados existentes
      console.log('DataInputScreen: Tentando obter dados existentes do AsyncStorage...');
      const storedData = await AsyncStorage.getItem('@monitoring_data');

      // Log 3: Dados brutos obtidos do AsyncStorage
      console.log('DataInputScreen: Dados existentes (bruto) antes de salvar:', storedData);

      // Log 4: Tentando fazer o parse dos dados
      let data: MonitoringData[] = [];
      if (storedData) {
        data = JSON.parse(storedData);
      }
      console.log('DataInputScreen: Dados existentes (parseados) antes de adicionar:', data);

      // Log 5: Dados após adicionar a nova entrada
      data.push(newEntry);
      console.log('DataInputScreen: Dados APÓS adicionar nova entrada:', data);

      // Log 6: Salvando os dados no AsyncStorage
      console.log('DataInputScreen: Salvando dados atualizados no AsyncStorage...');
      await AsyncStorage.setItem('@monitoring_data', JSON.stringify(data));
      
      // Log 7: Confirmação de salvamento
      console.log('DataInputScreen: Dados salvos com sucesso no AsyncStorage!');

      Alert.alert('Sucesso', 'Dados registrados com sucesso!');
      setUmidadeSolo('');
      setInclinacao('');
      setArea('');
      navigation.navigate('Visualizar Riscos');
    } catch (error) {
      // Log 8: Em caso de erro ao salvar
      console.error('DataInputScreen: ERRO ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível registrar os dados.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Dados Ambientais</Text>
      <Text style={styles.label}>Umidade do Solo (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 60"
        value={umidadeSolo}
        onChangeText={setUmidadeSolo}
      />

      <Text style={styles.label}>Inclinação do Terreno (graus)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 15"
        value={inclinacao}
        onChangeText={setInclinacao}
      />

      <Text style={styles.label}>Área Monitorada</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Morro da Glória"
        value={area}
        onChangeText={setArea}
      />

      <Button title="Registrar Dados" onPress={saveData} color="#007BFF" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
});