// types/types.ts
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface MonitoringData {
  id: number;
  umidadeSolo: number;
  inclinacao: number;
  area: string;
  timestamp: string; // Formato de string para data e hora
}

export interface RiskLevel {
  text: 'Baixo' | 'Médio' | 'Alto' | 'Nenhum dado para análise';
  color: string;
}

// Tipos para a navegação
export type RootTabParamList = {
  'Bem-vindo': undefined;
  'Inserir Dados': undefined;
  'Visualizar Riscos': undefined;
  'Histórico': undefined;
  'Ações': undefined;
};

// Exemplo de tipo para as props de navegação de uma tela específica
// Não é estritamente necessário para todas as telas se você não estiver passando params,
// mas é bom para referência.
export type DataInputScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Inserir Dados'>,
  any // Pode ser refinado para props de stack navigator se houver
>;