// src/types/types.ts
export type MonitoringData = {
  date: string;
  soilMoisture: number;
  slope: number;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
};

export type RootTabParamList = {
  'Bem-vindo': undefined;
  'Inserir Dados': undefined;
  'Visualizar Riscos': undefined;
  'Histórico': undefined;
  'Ações': undefined;
};
