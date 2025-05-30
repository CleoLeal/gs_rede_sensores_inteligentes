// screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/types'; // Importar tipos

type WelcomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Bem-vindo'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerta Deslizamento</Text>
      <Text style={styles.subtitle}>
        Monitore sua segurança. Preveja riscos.
      </Text>
      <Button
        title="Começar"
        onPress={() => navigation.navigate('Inserir Dados')}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
  },
});