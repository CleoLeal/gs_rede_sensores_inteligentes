import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './src/screens/WelcomeScreen';
import DataInputScreen from './src/screens/DataInputScreen';
import RiskViewScreen from './src/screens/RiskViewScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import MitigationScreen from './src/screens/MitigationScreen';

import { RootTabParamList } from './src/types/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Bem-vindo"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Bem-vindo':
                iconName = 'home-outline';
                break;
              case 'Inserir Dados':
                iconName = 'create-outline';
                break;
              case 'Visualizar Riscos':
                iconName = 'alert-circle-outline';
                break;
              case 'Histórico':
                iconName = 'time-outline';
                break;
              case 'Ações':
                iconName = 'hand-left-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4B0082',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#4B0082',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 5,
            marginBottom: 10,
            backgroundColor: '#fff',
          },
        })}
      >
        <Tab.Screen 
          name="Bem-vindo" 
          component={WelcomeScreen} 
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen 
          name="Inserir Dados" 
          component={DataInputScreen} 
          options={{ tabBarLabel: 'Inserir' }}
        />
        <Tab.Screen 
          name="Visualizar Riscos" 
          component={RiskViewScreen} 
          options={{ tabBarLabel: 'Visualizar' }}
        />
        <Tab.Screen 
          name="Histórico" 
          component={HistoryScreen} 
          options={{ tabBarLabel: 'Histórico' }}
        />
        <Tab.Screen 
          name="Ações" 
          component={MitigationScreen} 
          options={{ tabBarLabel: 'Ação' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
