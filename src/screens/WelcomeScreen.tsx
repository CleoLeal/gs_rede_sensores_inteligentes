// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/types';
import styles from '../styles/StyleScreen.styles'; // Importando os estilos


type Props = BottomTabScreenProps<RootTabParamList, 'Bem-vindo'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container_welcome}>
      <Text style={styles.title_welcome}>Alerta Deslizamento</Text>
      <Text style={styles.subtitle_welcome}>Monitore sua segurança. Preveja riscos.</Text>
      <Button
        title="Começar"
        onPress={() => navigation.navigate('Inserir Dados')}
        color="#4CAF50"
      />
    </View>
  );
}