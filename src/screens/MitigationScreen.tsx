// screens/MitigationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MitigationScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Não foi possível abrir a URL', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ações de Mitigação e Prevenção</Text>

      <View style={styles.section}>
        <MaterialIcons name="warning" size={30} color="#D8000C" style={styles.icon} />
        <Text style={styles.sectionTitle}>Em Caso de Alerta de Risco Alto:</Text>
        <Text style={styles.itemText}>
          • Evacue a área imediatamente, se possível, para um local seguro.
        </Text>
        <Text style={styles.itemText}>
          • Siga as orientações das autoridades locais (Defesa Civil).
        </Text>
        <Text style={styles.itemText}>
          • Não retorne à área antes de receber autorização oficial.
        </Text>
        <Text style={styles.itemText}>
          • Ajude vizinhos e pessoas com dificuldades de locomoção.
        </Text>
      </View>

      <View style={styles.section}>
        <MaterialIcons name="build" size={30} color="#007BFF" style={styles.icon} />
        <Text style={styles.sectionTitle}>Medidas Preventivas Gerais:</Text>
        <Text style={styles.itemText}>
          • Evite construir em áreas de risco (encostas íngremes, margens de rios).
        </Text>
        <Text style={styles.itemText}>
          • Mantenha o terreno limpo, sem acúmulo de lixo ou entulho.
        </Text>
        <Text style={styles.itemText}>
          • Realize obras de contenção e drenagem, se necessário e com orientação profissional.
        </Text>
        <Text style={styles.itemText}>
          • Plante vegetação adequada para estabilizar o solo, evitando grandes árvores que possam desestabilizar.
        </Text>
      </View>

      <View style={styles.section}>
        <MaterialIcons name="phone" size={30} color="#28A745" style={styles.icon} />
        <Text style={styles.sectionTitle}>Contatos Importantes:</Text>
        <Text style={styles.itemText}>
          • <Text style={styles.boldText}>Defesa Civil:</Text> 199
        </Text>
        <Text style={styles.itemText}>
          • <Text style={styles.boldText}>Bombeiros:</Text> 193
        </Text>
        <Text style={styles.itemText}>
          • <Text style={styles.boldText}>SAMU:</Text> 192
        </Text>
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => openLink('http://www.defesacivil.gov.br')}
      >
        <Text style={styles.linkButtonText}>Acesse o site da Defesa Civil</Text>
        {/* CORREÇÃO AQUI */}
        <MaterialIcons name="open-in-new" size={20} color="#FFF" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  linkButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});