# Chef Ferreira Organiza — Plataforma Integrada de Gestão de Eventos e Gastronomia

Protótipo navegável de alta fidelidade desenvolvido com a biblioteca **Semantic UI (Fomantic-UI)**, JavaScript ES6 reativo e persistência local, projetado especialmente para buffets, catering, espaços de eventos e empresas de gastronomia.

---

## 🚀 Como Executar

Não é necessário instalar ferramentas adicionais de compilação ou banco de dados. O projeto foi estruturado para execução imediata:

1. **Opção 1: Direto no Navegador**
   - Dê um duplo clique no arquivo [`index.html`](index.html) ou arraste-o para o Google Chrome, Edge ou Firefox.

2. **Opção 2: Via Servidor Local (ex: Live Server ou npx serve)**
   ```powershell
   npx -y serve c:\Users\bruna60822786\Desktop\chef-ferreira-organiza
   ```
   Acesse: `http://localhost:3000`

---

## 🌟 O Grande Diferencial: O Fluxo Integrado

Diferente de sistemas fragmentados (onde CRM, planilha de compras, agenda e controle de estoque não se comunicam), o **Chef Ferreira Organiza** coloca o **Evento como Hub Central da Operação**:

```
150 Convidados Cadastrados
         ↓
ChefBot IA calcula insumos, bebidas e brigada com margem de 35%
         ↓
Consulta automática do Estoque (Câmaras Frias e Adega)
         ↓
Identifica faltas e gera Ordens de Compra por fornecedor homologado
         ↓
Escala a equipe e sincroniza a agenda (Google Calendar)
         ↓
Emite Nota de Saída formal e abre o Checklist de Execução do Dia D
         ↓
DRE Comparativo apura Custo Previsto vs Realizado e Rentabilidade Líquida
         ↓
CRM Pós-Venda coleta NPS e monitora oportunidades de recompra
```

Para demonstrar esse fluxo em 1 clique, use o botão **"Simular Fluxo Completo (150 Convidados)"** no topo da tela!

---

## 📋 Módulos Implementados (F01 a F15)

- **F01 - Login & Seletor de Unidades**: Alternância entre unidades operacionais (*Matriz Jardins*, *Catering Faria Lima*, *Espaço Campinas*) e perfis de acesso.
- **F02 - Dashboard Executivo**: Resumo dos 4 eventos do mês, faturamento projetado de R$ 162.600, alertas de estoque crítico e gráfico de previsto vs realizado.
- **F03 - Agenda & Google Calendar**: Calendário interativo com blocos de Montagem, Recepção e Desmontagem, verificação de conflitos e simulação de sincronização bidirecional.
- **F04 - Clientes & CRM**: Pipeline Kanban com 6 fases (*Novo Contato*, *Orçamento Solicitado*, *Proposta Enviada*, *Negociação*, *Aprovado*, *Pós-Venda*), cadastro de leads, filtros e histórico.
- **F05 - Central do Evento**: Cadastro e visão geral de eventos com convidados, duração, local, serviços e cardápio.
- **F06 - Orçamento Inteligente com IA**: Assistente "ChefBot IA" que dimensiona gramaturas, proteínas, bebidas, margem de segurança e brigada, calculando o preço de venda ideal com justificativas técnicas.
- **F07 - Fornecedores**: Catálogo com avaliações, prazos de entrega e cotações de carnes nobres, hortifrúti orgânico, bebidas e locação de materiais.
- **F08 - Compras & Solicitações**: Geração automática de pedidos de compra pelo cálculo `Demanda Cardápio - Estoque Disponível = Pedido`.
- **F09 - Estoque & Depósitos**: Controle por Câmaras Frias, Adega Climatizada e Depósito Seco, com alertas de estoque mínimo e insuficiente.
- **F10 - Fichas Técnicas & Receitas**: Fichas gastronômicas com fator de correção (FC), rendimento e **simulador interativo de reajuste de insumo em tempo real**.
- **F11 - Equipe & Mão de Obra**: Escala de brigada (Chefs, Cozinheiros, Maitre, Garçons, Barmans, Limpeza) com diárias, atribuições e detecção de conflitos.
- **F12 - Execução & Checklist**: Timeline operacional ao vivo do dia do evento (-4h, -3h, 0h, +2h, +7h) com barra de progresso em tempo real.
- **F13 - Notas de Saída**: Emissão formal de retirada de estoque com autorização do Chef Ferreira e conferência de devolução de sobras e quebras.
- **F14 - Custos & DRE**: Demonstrativo de Custo Previsto vs Custo Realizado por categoria (Alimentos, Bebidas, Brigada, Locação, Logística, Imprevistos) e gráfico de barras.
- **F15 - CRM Pós-Venda & Relatórios**: Coleta de NPS 10, depoimentos de clientes e identificação de oportunidades de recompra.

---

## 🛠️ Tecnologias Utilizadas

- **Framework Visual**: [Semantic UI / Fomantic-UI](https://fomantic-ui.com/)
- **Ícones**: FontAwesome integrado pelo Semantic UI
- **Gráficos Interativos**: Chart.js
- **Motor Reativo**: JavaScript ES6 com persistência em `localStorage`
- **Tipografia**: Google Fonts (*Outfit* e *Playfair Display*)
