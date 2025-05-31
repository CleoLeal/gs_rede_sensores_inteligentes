//importações necessárias
import React from 'react';
import { View, Text, Button } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/types';
import styles from '../styles/StyleScreen.styles'; 

// definição do tipo de propriedades para a tela
type Props = BottomTabScreenProps<RootTabParamList, 'Bem-vindo'>;

// componente funcional para a tela de boas-vindas
export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container_welcome}>
      <Text style={styles.title_welcome}>Alerta Deslizamento</Text>
      <Text style={styles.subtitle_welcome}>Monitore sua segurança. Preveja riscos.</Text>
      <Button
        title="Começar"
        onPress={() => navigation.navigate('Inserir Dados')}
        color="#9370DB"
      />
    </View>
  );
}