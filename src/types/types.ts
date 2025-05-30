export interface MonitoringData {
  timestamp: string;
  umidadeSolo: number;
  inclinacao: number;
  riskLevel?: 'Baixo' | 'Médio' | 'Alto';
}

export type RootTabParamList = {
  'Bem-vindo': undefined;
  'Inserir Dados': undefined;
  'Visualizar Riscos': undefined;
  'Histórico': undefined;
  'Ações': undefined;
};
