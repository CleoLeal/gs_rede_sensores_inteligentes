# 🌱 Sistema de Monitoramento de Riscos - React Native
Este projeto é um aplicativo mobile desenvolvido com **React Native** para auxiliar no monitoramento de riscos ambientais com base em **dados de umidade do solo (%)** e **inclinação do terreno (°)**. Ele calcula o nível de risco e armazena os dados localmente.

---

## 📱 Funcionalidades

- Inserção manual de dados de:
  - Umidade do solo (%)
  - Inclinação do solo (°)
- Cálculo automático do nível de risco:
  - **Baixo**
  - **Médio**
  - **Alto**
- Salvamento dos dados com data e hora
- Visualização do histórico de medições
- Exibição de alertas para entradas inválidas

---

## 🧠 Lógica de Risco

A lógica de risco é definida da seguinte forma:

- **Alto**: Umidade > 80% **e** Inclinação > 30°
- **Médio**: Umidade > 50% **e** Inclinação > 15°
- **Baixo**: Demais casos

---

## 📷 Interface

O app possui uma interface simples e responsiva com navegação por abas, incluindo:

- **Home**: tela de boas-vindas
- **Inserir**: onde o usuário insere os dados
- **Visualizar**: onde o usuário vê o risco calculado
- **Histórico**: mostra os dados salvos localmente
- **Ação**: orientações possíveis baseadas no risco

---

## 📁 Estrutura de Pastas
📂src<br>
┣ 📂screens<br>
┃ ┗ 📄DataInputScreen.tsx<br>
┃ ┗ 📄HistoryScreen.tsx<br>
┃ ┗ 📄MitigationScreen.tsx<br>
┃ ┗ 📄RiskCalculationScreen.tsx<br>
┃ ┗ 📄WelcomeScreen.tsx<br>
┣ 📂types<br>
┃ ┗ 📄types.ts<br>
┣ 📂storage<br>
┃ ┗ 📄storage.ts<br>

---

## 🛠 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- Armazenamento local com **AsyncStorage**
---

## 🙍‍♀️🙍‍♂️ Integrantes

- Ana Julia Oliveira da Silva - 552578
- Cléo Victtor Leal - 552571
- Murilo Watanabe Lympius - 550454
---