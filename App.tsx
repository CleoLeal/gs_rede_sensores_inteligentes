// App.tsx
import 'react-native-gesture-handler'; // Importante para react-navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importe seus tipos
import { RootTabParamList } from './src/types/types';

// Importe suas telas
import WelcomeScreen from './src/screens/WelcomeScreen';
import DataInputScreen from './src/screens/DataInputScreen';
import RiskViewScreen from './src/screens/RiskViewScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import MitigationScreen from './src/screens/MitigationScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Bem-vindo"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

            if (route.name === 'Bem-vindo') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Inserir Dados') {
              iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            } else if (route.name === 'Visualizar Riscos') {
              iconName = focused ? 'alert-octagon' : 'alert-octagon-outline';
            } else if (route.name === 'Histórico') {
              iconName = focused ? 'history' : 'history';
            } else if (route.name === 'Ações') {
              iconName = focused ? 'information' : 'information-outline';
            } else {
              iconName = 'circle'; // Fallback icon
            }
            return (
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Bem-vindo"
          component={WelcomeScreen}
          options={{ title: 'Bem-vindo' }}
        />
        <Tab.Screen
          name="Inserir Dados"
          component={DataInputScreen}
          options={{ title: 'Inserir Dados' }}
        />
        <Tab.Screen
          name="Visualizar Riscos"
          component={RiskViewScreen}
          options={{ title: 'Visualizar Riscos' }}
        />
        <Tab.Screen
          name="Histórico"
          component={HistoryScreen}
          options={{ title: 'Histórico' }}
        />
        <Tab.Screen
          name="Ações"
          component={MitigationScreen}
          options={{ title: 'Ações' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}