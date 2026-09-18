/**
 * CHEF FERREIRA ORGANIZA - BASE DE DADOS INICIAL (SEED DATA)
 * Dados demonstrativos realistas para operação gastronômica de eventos
 */

const INITIAL_DATA = {
  // Unidades operacionais
  units: [
    { id: "u1", name: "Buffet Chef Ferreira - Matriz Jardins (SP)", city: "São Paulo - SP", address: "Rua Oscar Freire, 1420", phone: "(11) 3088-4500" },
    { id: "u2", name: "Catering Corporativo & Eventos - Faria Lima", city: "São Paulo - SP", address: "Av. Brigadeiro Faria Lima, 3477", phone: "(11) 3290-7700" },
    { id: "u3", name: "Espaço Villa Ferreira - Eventos Sociais", city: "Campinas - SP", address: "Rod. José Roberto Magalhães, km 12", phone: "(19) 3755-1100" }
  ],

  // Usuário ativo e perfis
  currentUser: {
    id: "usr1",
    name: "Chef Rodrigo Ferreira",
    role: "Chef Executivo & Proprietário",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80",
    activeUnitId: "u1"
  },

  // Clientes & Leads (CRM)
  clients: [
    {
      id: "cli-01",
      name: "Dra. Marina Albuquerque & Rodrigo Neves",
      type: "Pessoa Física (Noivos)",
      email: "marina.albuquerque@email.com",
      phone: "(11) 98765-4321",
      leadSource: "Instagram / Indicação Cerimonial",
      stage: "Aprovado",
      company: "-",
      totalSpent: 52500,
      notes: "Casamento dos sonhos para 150 convidados. Exigem menu harmonizado com carnes nobres e opção vegetariana.",
      createdAt: "2026-08-10"
    },
    {
      id: "cli-02",
      name: "TechVentures Capital Brasil",
      type: "Pessoa Jurídica",
      email: "eventos@techventures.com.br",
      phone: "(11) 97654-1122",
      leadSource: "Google Ads",
      stage: "Negociação",
      company: "TechVentures Capital",
      totalSpent: 29600,
      notes: "Jantar corporativo de encerramento de rodada para 80 executivos e investidores.",
      createdAt: "2026-09-02"
    },
    {
      id: "cli-03",
      name: "Juliana Mendes & Família",
      type: "Pessoa Física",
      email: "juliana.mendes@globo.com",
      phone: "(11) 99123-8877",
      leadSource: "Cliente Recorrente",
      stage: "Proposta Enviada",
      company: "-",
      totalSpent: 38500,
      notes: "Festa de 40 anos com Coquetel Volante e Estação de Risotos ao Vivo.",
      createdAt: "2026-09-05"
    },
    {
      id: "cli-04",
      name: "Banco Santander - Diretoria Corporate",
      type: "Pessoa Jurídica",
      email: "corporate.events@santander.com.br",
      phone: "(11) 98222-3344",
      leadSource: "Parceria Corporativa",
      stage: "Orçamento Solicitado",
      company: "Banco Santander",
      totalSpent: 75000,
      notes: "Coffee break premium contínuo de 2 dias para 200 participantes em convenção.",
      createdAt: "2026-09-12"
    },
    {
      id: "cli-05",
      name: "Lucas Brandão & Camila Siqueira",
      type: "Pessoa Física",
      email: "lucas.brandao@adv.br",
      phone: "(11) 98111-9900",
      leadSource: "Indicação Espaço Villa Ferreira",
      stage: "Novo Contato",
      company: "-",
      totalSpent: 0,
      notes: "Solicitaram contato para mini-wedding de 60 pessoas em outono.",
      createdAt: "2026-09-15"
    },
    {
      id: "cli-06",
      name: "Dra. Beatriz Toledo",
      type: "Pessoa Física",
      email: "btoledo.dermato@clinica.com",
      phone: "(11) 98999-4455",
      leadSource: "Instagram",
      stage: "Pós-Venda",
      company: "Clínica Toledo",
      totalSpent: 42000,
      notes: "Jantar de lançamento de congresso médico realizado com sucesso no último mês.",
      createdAt: "2026-07-20"
    }
  ],

  // Eventos Principais
  events: [
    {
      id: "EV-2026-042",
      title: "Casamento Marina Albuquerque & Rodrigo Neves",
      clientId: "cli-01",
      clientName: "Dra. Marina Albuquerque & Rodrigo Neves",
      type: "Casamento Requintado",
      unitId: "u1",
      date: "2026-09-26",
      setupTime: "14:00",
      startTime: "19:30",
      endTime: "03:00",
      venue: "Casa Petra - Moema, São Paulo - SP",
      guestCount: 150,
      vegetarianCount: 15,
      childrenCount: 8,
      durationHours: 7,
      status: "Confirmado", // Confirmado, Em Montagem, Em Execução, Concluído, Orçamento
      services: ["Buffet Franco-Americano", "Open Bar Botânico Premium", "Mesa de Doces Finos", "Madrugada Gastronômica (Lanchinhos)", "Brigada Completa de Salão"],
      budget: {
        totalRevenue: 52500,
        estimatedCost: 34100,
        actualCost: 35240,
        projectedMarginPct: 35.0,
        actualMarginPct: 32.8,
        aiGenerated: true
      },
      googleCalendarSynced: true,
      googleEventId: "gcal_evt_998124_ferreira",
      notes: "Noivos solicitaram degustação prévia aprovada. Entrada triunfal com Champagne e Ostras frescas."
    },
    {
      id: "EV-2026-043",
      title: "Jantar Anual de Investidores - TechVentures",
      clientId: "cli-02",
      clientName: "TechVentures Capital Brasil",
      type: "Jantar Corporativo VIP",
      unitId: "u2",
      date: "2026-09-28",
      setupTime: "16:00",
      startTime: "19:00",
      endTime: "23:30",
      venue: "Rooftop Faria Lima Hub, SP",
      guestCount: 80,
      vegetarianCount: 8,
      childrenCount: 0,
      durationHours: 4.5,
      status: "Orçamento",
      services: ["Jantar Empratado 4 Tempos", "Harmonização de Vinhos Selecionados", "Maitre e Garçons Bilíngues"],
      budget: {
        totalRevenue: 29600,
        estimatedCost: 19200,
        actualCost: 0,
        projectedMarginPct: 35.1,
        actualMarginPct: 0,
        aiGenerated: true
      },
      googleCalendarSynced: true,
      googleEventId: "gcal_evt_771239_tech",
      notes: "Cardápio executivo com trufas e vinhos tintos do Douro."
    },
    {
      id: "EV-2026-044",
      title: "Comemoração 40 Anos - Juliana Mendes",
      clientId: "cli-03",
      clientName: "Juliana Mendes & Família",
      type: "Aniversário Social",
      unitId: "u3",
      date: "2026-10-03",
      setupTime: "13:00",
      startTime: "17:00",
      endTime: "01:00",
      venue: "Espaço Villa Ferreira - Salão Nobre, Campinas",
      guestCount: 110,
      vegetarianCount: 12,
      childrenCount: 14,
      durationHours: 8,
      status: "Confirmado",
      services: ["Estação de Risotos ao Vivo", "Finger Foods Premium", "Bar de Gin & Caipirinhas Artesanais"],
      budget: {
        totalRevenue: 38500,
        estimatedCost: 25100,
        actualCost: 0,
        projectedMarginPct: 34.8,
        actualMarginPct: 0,
        aiGenerated: true
      },
      googleCalendarSynced: true,
      googleEventId: "gcal_evt_553201_juliana",
      notes: "Música ao vivo e Ilha de Antepastos mediterrânea funcionando a noite inteira."
    },
    {
      id: "EV-2026-041",
      title: "Simpósio Internacional de Dermatologia",
      clientId: "cli-06",
      clientName: "Dra. Beatriz Toledo",
      type: "Congresso Científico / Jantar",
      unitId: "u1",
      date: "2026-08-22",
      setupTime: "15:00",
      startTime: "19:00",
      endTime: "23:00",
      venue: "Espaço Transamérica Jardins",
      guestCount: 120,
      vegetarianCount: 20,
      childrenCount: 0,
      durationHours: 4,
      status: "Concluído",
      services: ["Coquetel de Abertura", "Jantar Empratado", "Mesa de Cafés Especiais & Petit Fours"],
      budget: {
        totalRevenue: 42000,
        estimatedCost: 27800,
        actualCost: 28450,
        projectedMarginPct: 33.8,
        actualMarginPct: 32.2,
        aiGenerated: true
      },
      googleCalendarSynced: true,
      googleEventId: "gcal_evt_112004_toledo",
      notes: "Evento executado com elogio unânime da comissão organizadora. NPS: 10."
    }
  ],

  // Fichas Técnicas & Receitas (F10)
  recipes: [
    {
      id: "REC-01",
      name: "Filé Mignon ao Poivre Vert com Mousseline de Mandioquinha",
      category: "Pratos Principais",
      yieldPortions: 10,
      prepTimeMinutes: 45,
      correctionFactorAvg: 1.15,
      sellingSuggestedPrice: 78.00,
      description: "Medalhão de filé mignon grelhado ao ponto, molho cremoso de pimenta verde fresca flambada no conhaque, servido sobre suave mousseline de mandioquinha e azeite trufado.",
      ingredients: [
        { id: "ING-01", name: "Filé Mignon Bovino Limpo (Peça)", grossQty: 2.2, unit: "kg", unitCost: 68.00, netQty: 1.9, fc: 1.15, totalCost: 149.60 },
        { id: "ING-02", name: "Pimenta Verde em Grãos Fresca", grossQty: 0.1, unit: "kg", unitCost: 95.00, netQty: 0.1, fc: 1.0, totalCost: 9.50 },
        { id: "ING-03", name: "Creme de Leite Fresco Pasteurizado 35%", grossQty: 0.8, unit: "L", unitCost: 28.00, netQty: 0.8, fc: 1.0, totalCost: 22.40 },
        { id: "ING-04", name: "Mandioquinha Especial", grossQty: 2.0, unit: "kg", unitCost: 14.50, netQty: 1.6, fc: 1.25, totalCost: 29.00 },
        { id: "ING-05", name: "Manteiga Extra sem Sal", grossQty: 0.25, unit: "kg", unitCost: 44.00, netQty: 0.25, fc: 1.0, totalCost: 11.00 },
        { id: "ING-06", name: "Conhaque Fundador Nacional", grossQty: 0.15, unit: "L", unitCost: 55.00, netQty: 0.15, fc: 1.0, totalCost: 8.25 }
      ],
      portionCost: 22.98,
      totalCost: 229.75
    },
    {
      id: "REC-02",
      name: "Risoto de Queijo Brie com Aspargos Frescos e Amêndoas Laminadas",
      category: "Guarnições & Pratos Quentes",
      yieldPortions: 12,
      prepTimeMinutes: 40,
      correctionFactorAvg: 1.10,
      sellingSuggestedPrice: 52.00,
      description: "Arroz carnaroli italiano cozido em caldo de legumes artesanal com vinho branco seco, queijo brie cremoso fundido, aspargos verdes salteados na manteiga e lâminas crocantes de amêndoas tostadas.",
      ingredients: [
        { id: "ING-07", name: "Arroz Carnaroli Italiano", grossQty: 1.0, unit: "kg", unitCost: 24.00, netQty: 1.0, fc: 1.0, totalCost: 24.00 },
        { id: "ING-08", name: "Queijo Brie Francês / Nacional Premium", grossQty: 0.7, unit: "kg", unitCost: 89.00, netQty: 0.7, fc: 1.0, totalCost: 62.30 },
        { id: "ING-09", name: "Aspargos Verdes Frescos", grossQty: 0.8, unit: "kg", unitCost: 58.00, netQty: 0.65, fc: 1.23, totalCost: 46.40 },
        { id: "ING-10", name: "Vinho Branco Seco Sauvignon Blanc", grossQty: 0.4, unit: "L", unitCost: 35.00, netQty: 0.4, fc: 1.0, totalCost: 14.00 },
        { id: "ING-11", name: "Amêndoas em Lâminas", grossQty: 0.2, unit: "kg", unitCost: 90.00, netQty: 0.2, fc: 1.0, totalCost: 18.00 },
        { id: "ING-12", name: "Queijo Parmesão Grana Duro", grossQty: 0.25, unit: "kg", unitCost: 110.00, netQty: 0.25, fc: 1.0, totalCost: 27.50 }
      ],
      portionCost: 16.02,
      totalCost: 192.20
    },
    {
      id: "REC-03",
      name: "Ilha Gourmet de Antepastos & Queijos Artesanais da Mantiqueira",
      category: "Entradas & Ilhas Gastronômicas",
      yieldPortions: 30,
      prepTimeMinutes: 60,
      correctionFactorAvg: 1.05,
      sellingSuggestedPrice: 45.00,
      description: "Composição suntuosa com queijos artesanais brasileiros, presunto cru tipo Parma, focaccias de alecrim assadas na hora, figos frescos caramelizados e geleia de pimenta da casa.",
      ingredients: [
        { id: "ING-13", name: "Presunto Cru Tipo Parma Fatiado", grossQty: 1.2, unit: "kg", unitCost: 135.00, netQty: 1.2, fc: 1.0, totalCost: 162.00 },
        { id: "ING-14", name: "Queijo Canastra e Queijo Azul Mantiqueira", grossQty: 1.8, unit: "kg", unitCost: 85.00, netQty: 1.8, fc: 1.0, totalCost: 153.00 },
        { id: "ING-15", name: "Focaccia Artesanal com Alecrim e Flor de Sal", grossQty: 2.5, unit: "kg", unitCost: 32.00, netQty: 2.5, fc: 1.0, totalCost: 80.00 },
        { id: "ING-16", name: "Figos Frescos Maduros", grossQty: 1.5, unit: "kg", unitCost: 42.00, netQty: 1.35, fc: 1.11, totalCost: 63.00 },
        { id: "ING-17", name: "Castanhas de Caju e Nozes Pecan", grossQty: 0.8, unit: "kg", unitCost: 88.00, netQty: 0.8, fc: 1.0, totalCost: 70.40 }
      ],
      portionCost: 17.61,
      totalCost: 528.40
    },
    {
      id: "REC-04",
      name: "Coquetel Gin Tônica Botânico Floral",
      category: "Open Bar & Bebidas",
      yieldPortions: 20,
      prepTimeMinutes: 20,
      correctionFactorAvg: 1.0,
      sellingSuggestedPrice: 32.00,
      description: "Gin London Dry importado com infusão de zimbro, cardamomo, pepino fresco laminado, água tônica premium e gelo cristal translúcido.",
      ingredients: [
        { id: "ING-18", name: "Gin London Dry Tanqueray / Bombay", grossQty: 1.0, unit: "L", unitCost: 110.00, netQty: 1.0, fc: 1.0, totalCost: 110.00 },
        { id: "ING-19", name: "Água Tônica Fever Tree / Schweppes Premium", grossQty: 20, unit: "un", unitCost: 4.80, netQty: 20, fc: 1.0, totalCost: 96.00 },
        { id: "ING-20", name: "Especiarias Botânicas & Zimbro", grossQty: 0.1, unit: "kg", unitCost: 60.00, netQty: 0.1, fc: 1.0, totalCost: 6.00 },
        { id: "ING-21", name: "Gelo Filtrado Cristal em Cubos Esféricos", grossQty: 10, unit: "kg", unitCost: 2.50, netQty: 10, fc: 1.0, totalCost: 25.00 }
      ],
      portionCost: 11.85,
      totalCost: 237.00
    }
  ],

  // Fornecedores Homologados (F07)
  suppliers: [
    {
      id: "FORN-01",
      name: "Frigorífico & Carnes Nobres Prime Beef SP",
      category: "Carnes Nobres & Aves",
      cnpj: "18.334.892/0001-44",
      contactPerson: "Carlos Eduardo (Gerente Comercial)",
      phone: "(11) 3662-9010",
      email: "pedidos@primebeefsp.com.br",
      rating: 4.9,
      leadTimeDays: 2,
      paymentTerms: "Faturado 28 dias boleto",
      products: ["Filé Mignon", "Ancho Black Angus", "Carré de Cordeiro", "Pato Confit"]
    },
    {
      id: "FORN-02",
      name: "Hortifrúti & Orgânicos da Terra Verde",
      category: "Hortifrúti & Legumes Orgânicos",
      cnpj: "24.991.043/0001-90",
      contactPerson: "Dona Neide Santos",
      phone: "(11) 98344-2200",
      email: "contato@terraverdeorganicos.com.br",
      rating: 4.8,
      leadTimeDays: 1,
      paymentTerms: "À vista com 5% ou 14 dias",
      products: ["Mandioquinha", "Aspargos", "Ervas Frescas", "Brotos Comestíveis", "Frutas Nobres"]
    },
    {
      id: "FORN-03",
      name: "Empório & Importadora Gran Cru Bebidas",
      category: "Vinhos, Destilados & Champagnes",
      cnpj: "09.112.443/0001-12",
      contactPerson: "Fabrício Silveira (Sommelier)",
      phone: "(11) 3144-8800",
      email: "vendascorporate@grancrubr.com.br",
      rating: 5.0,
      leadTimeDays: 3,
      paymentTerms: "Faturado 30/60 dias",
      products: ["Gin Tanqueray", "Vodka Cîroc", "Vinho Tinto Douro", "Espumante Brut", "Água Tônica"]
    },
    {
      id: "FORN-04",
      name: "Laticínios & Queijos Artesanais Serra da Bocaina",
      category: "Queijos Nobres & Laticínios",
      cnpj: "31.782.551/0001-08",
      contactPerson: "Mateus Ribeiro",
      phone: "(12) 3122-4411",
      email: "distribuicao@serrabocaina.ind.br",
      rating: 4.7,
      leadTimeDays: 2,
      paymentTerms: "Faturado 21 dias",
      products: ["Queijo Brie", "Parmesão Grana", "Creme de Leite Fresco", "Manteiga Extra"]
    },
    {
      id: "FORN-05",
      name: "D'Festa Locação de Louças, Taças & Mobiliário",
      category: "Locação de Materiais & Estrutura",
      cnpj: "15.421.908/0001-33",
      contactPerson: "Cláudia Rezende",
      phone: "(11) 2291-7722",
      email: "atendimento@dfestalocacoes.com.br",
      rating: 4.6,
      leadTimeDays: 4,
      paymentTerms: "50% sinal + 50% após evento",
      products: ["Sousplats Dourados", "Taças Cristal Bohemia", "Prataria de Buffet", "Rechauds Inox"]
    }
  ],

  // Estoque Atual por Unidade / Depósito (F09)
  inventory: [
    {
      id: "EST-01",
      name: "Filé Mignon Bovino Limpo (Peça)",
      category: "Proteínas Resfriadas",
      unitId: "u1",
      warehouse: "Câmara Fria 01 (Carnes)",
      unit: "kg",
      currentQty: 18.0,
      minQty: 25.0,
      reservedForEvents: 12.0,
      unitCost: 68.00,
      status: "Abaixo do Mínimo",
      supplierId: "FORN-01"
    },
    {
      id: "EST-02",
      name: "Arroz Carnaroli Italiano (1kg)",
      category: "Secos & Grãos",
      unitId: "u1",
      warehouse: "Depósito Seco Principal",
      unit: "kg",
      currentQty: 45.0,
      minQty: 20.0,
      reservedForEvents: 15.0,
      unitCost: 24.00,
      status: "Normal",
      supplierId: "FORN-04"
    },
    {
      id: "EST-03",
      name: "Queijo Brie Francês / Nacional Premium",
      category: "Laticínios & Queijos",
      unitId: "u1",
      warehouse: "Câmara Fria 02 (Laticínios)",
      unit: "kg",
      currentQty: 6.5,
      minQty: 10.0,
      reservedForEvents: 8.0,
      unitCost: 89.00,
      status: "Crítico/Insuficiente",
      supplierId: "FORN-04"
    },
    {
      id: "EST-04",
      name: "Gin London Dry Tanqueray 750ml",
      category: "Bebidas & Destilados",
      unitId: "u1",
      warehouse: "Adega Climatizada",
      unit: "L",
      currentQty: 14.0,
      minQty: 12.0,
      reservedForEvents: 10.0,
      unitCost: 110.00,
      status: "Normal",
      supplierId: "FORN-03"
    },
    {
      id: "EST-05",
      name: "Água Tônica Premium 200ml",
      category: "Bebidas & Refrigerantes",
      unitId: "u1",
      warehouse: "Depósito de Bebidas",
      unit: "un",
      currentQty: 180,
      minQty: 120,
      reservedForEvents: 150,
      unitCost: 4.80,
      status: "Normal",
      supplierId: "FORN-03"
    },
    {
      id: "EST-06",
      name: "Aspargos Verdes Frescos",
      category: "Hortifrúti Fresco",
      unitId: "u1",
      warehouse: "Câmara Fria 03 (Vegetais)",
      unit: "kg",
      currentQty: 2.0,
      minQty: 5.0,
      reservedForEvents: 4.0,
      unitCost: 58.00,
      status: "Crítico/Insuficiente",
      supplierId: "FORN-02"
    },
    {
      id: "EST-07",
      name: "Mandioquinha Especial Lavada",
      category: "Hortifrúti Fresco",
      unitId: "u1",
      warehouse: "Câmara Fria 03 (Vegetais)",
      unit: "kg",
      currentQty: 12.0,
      minQty: 15.0,
      reservedForEvents: 10.0,
      unitCost: 14.50,
      status: "Abaixo do Mínimo",
      supplierId: "FORN-02"
    },
    {
      id: "EST-08",
      name: "Taça Cristal Bohemia Vinho Tinto / Água",
      category: "Materiais & Louças",
      unitId: "u1",
      warehouse: "Almoxarifado de Materiais",
      unit: "un",
      currentQty: 320,
      minQty: 200,
      reservedForEvents: 250,
      unitCost: 18.50,
      status: "Normal",
      supplierId: "FORN-05"
    }
  ],

  // Compras & Solicitações Automáticas (F08)
  purchaseOrders: [
    {
      id: "ORD-2026-088",
      eventId: "EV-2026-042",
      eventName: "Casamento Marina Albuquerque (150 convidados)",
      supplierId: "FORN-01",
      supplierName: "Frigorífico & Carnes Nobres Prime Beef SP",
      createdAt: "2026-09-18",
      deliveryDate: "2026-09-24",
      status: "Aprovado / Aguardando Entrega",
      items: [
        { name: "Filé Mignon Bovino Limpo", qty: 25.0, unit: "kg", unitCost: 68.00, total: 1700.00 }
      ],
      totalAmount: 1700.00
    },
    {
      id: "ORD-2026-089",
      eventId: "EV-2026-042",
      eventName: "Casamento Marina Albuquerque (150 convidados)",
      supplierId: "FORN-04",
      supplierName: "Laticínios & Queijos Artesanais Serra da Bocaina",
      createdAt: "2026-09-18",
      deliveryDate: "2026-09-24",
      status: "Pendente de Envio",
      items: [
        { name: "Queijo Brie Francês / Nacional", qty: 12.0, unit: "kg", unitCost: 89.00, total: 1068.00 },
        { name: "Creme de Leite Fresco 35%", qty: 15.0, unit: "L", unitCost: 28.00, total: 420.00 }
      ],
      totalAmount: 1488.00
    },
    {
      id: "ORD-2026-090",
      eventId: "EV-2026-042",
      eventName: "Casamento Marina Albuquerque (150 convidados)",
      supplierId: "FORN-02",
      supplierName: "Hortifrúti & Orgânicos da Terra Verde",
      createdAt: "2026-09-18",
      deliveryDate: "2026-09-25",
      status: "Pendente de Envio",
      items: [
        { name: "Aspargos Verdes Frescos", qty: 10.0, unit: "kg", unitCost: 58.00, total: 580.00 },
        { name: "Mandioquinha Especial Lavada", qty: 25.0, unit: "kg", unitCost: 14.50, total: 362.50 }
      ],
      totalAmount: 942.50
    }
  ],

  // Equipe & Mão de Obra (F11)
  staff: [
    {
      id: "STF-01",
      name: "Rodrigo Ferreira",
      role: "Chef Executivo",
      type: "Fixo (Sócio)",
      phone: "(11) 99988-1122",
      dailyRate: 1200.00,
      specialty: "Criação, Gestão e Finalização de Pratos Nobres",
      assignedEvents: ["EV-2026-042", "EV-2026-043"],
      status: "Escalado",
      conflict: false
    },
    {
      id: "STF-02",
      name: "Chef André Valadares",
      role: "Sous Chef de Cozinha",
      type: "Fixo Mensalista",
      phone: "(11) 98711-2233",
      dailyRate: 450.00,
      specialty: "Controle de Produção Quente e Mise en Place",
      assignedEvents: ["EV-2026-042"],
      status: "Escalado",
      conflict: false
    },
    {
      id: "STF-03",
      name: "Renata Cordeiro",
      role: "Maitre de Salão / Cerimonial Operacional",
      type: "Freelancer VIP",
      phone: "(11) 99455-6677",
      dailyRate: 400.00,
      specialty: "Coordenação de Salão, Roteiro de Serviço e Timing",
      assignedEvents: ["EV-2026-042", "EV-2026-044"],
      status: "Escalado",
      conflict: false
    },
    {
      id: "STF-04",
      name: "Marcos Vinicius (Barman)",
      role: "Mixologista & Chefe de Bar",
      type: "Freelancer",
      phone: "(11) 98122-3300",
      dailyRate: 350.00,
      specialty: "Coquetelaria Autoral, Gins e Agilidade em Pico",
      assignedEvents: ["EV-2026-042"],
      status: "Escalado",
      conflict: false
    },
    {
      id: "STF-05",
      name: "Brigada de Garçons Treinados (12 profissionais)",
      role: "Garçons de Buffet e Bebidas",
      type: "Equipe Terceirizada Cadastrada",
      phone: "(11) 97000-8899",
      dailyRate: 2400.00,
      specialty: "Serviço Volante, Reposição e Postura Elegante",
      assignedEvents: ["EV-2026-042"],
      status: "Escalado",
      conflict: false
    },
    {
      id: "STF-06",
      name: "Equipe de Steward & Limpeza (3 profissionais)",
      role: "Copa, Lavagem de Louças e Higienização Contínua",
      type: "Equipe Terceirizada Cadastrada",
      phone: "(11) 97333-1122",
      dailyRate: 540.00,
      specialty: "Higiene rigorosa e lavagem técnica de cristais",
      assignedEvents: ["EV-2026-042"],
      status: "Escalado",
      conflict: false
    }
  ],

  // Execução do Evento & Checklist Operacional (F12)
  executionChecklists: {
    "EV-2026-042": [
      { id: "chk-1", phase: "Logística e Carregamento (-4h)", task: "Conferir carga no caminhão frigorífico: carnes marinadas, queijos, sobremesas e bebidas", time: "14:00", responsible: "Sous Chef André", status: "Concluído" },
      { id: "chk-2", phase: "Logística e Carregamento (-4h)", task: "Carregar caixas térmicas com gelo cristal e sousplats dourados", time: "14:30", responsible: "Líder de Logística", status: "Concluído" },
      { id: "chk-3", phase: "Montagem no Espaço (-3h)", task: "Chegada na Casa Petra: ligar fornos combinados, refrigeradores e verificar pontos de energia", time: "15:30", responsible: "Chef Ferreira", status: "Concluído" },
      { id: "chk-4", phase: "Montagem no Espaço (-3h)", task: "Montar mesa de antepastos mediterrânea e ilhas de apoio", time: "16:30", responsible: "Cozinheiro Líder", status: "Em Andamento" },
      { id: "chk-5", phase: "Briefing Brigada (-1h)", task: "Reunião de alinhamento com garçons: regras de serviço, noivos e protocolo de espumante", time: "18:30", responsible: "Maitre Renata", status: "Pendente" },
      { id: "chk-6", phase: "Início do Evento (0h)", task: "Abertura do serviço de Welcome Drink & Coquetel Volante de Canapés", time: "19:30", responsible: "Barman Marcos", status: "Pendente" },
      { id: "chk-7", phase: "Jantar Principal (+2h)", task: "Disparar serviço do Filé Mignon ao Poivre e Risoto de Brie empratados", time: "21:30", responsible: "Chef Ferreira", status: "Pendente" },
      { id: "chk-8", phase: "Madrugada & Desmontagem (+5h)", task: "Serviço de Madrugada Gastronômica (mini burgers artesanais e milkshakes)", time: "01:00", responsible: "Sous Chef André", status: "Pendente" },
      { id: "chk-9", phase: "Encerramento e Inventário (+7h)", task: "Conferência de quebras de taças, devolução de sobras e assinatura do termo de encerramento", time: "03:30", responsible: "Maitre Renata", status: "Pendente" }
    ]
  },

  // Notas de Saída de Estoque (F13)
  requisitions: [
    {
      id: "REQ-EV-2026-042-01",
      eventId: "EV-2026-042",
      eventName: "Casamento Marina Albuquerque",
      date: "2026-09-26",
      authorizedBy: "Chef Rodrigo Ferreira",
      dispatchedBy: "Almoxarife Marcelo Lins",
      status: "Separado e Liberado",
      items: [
        { name: "Filé Mignon Bovino Limpo", qty: 32.0, unit: "kg", unitCost: 68.00, subtotal: 2176.00 },
        { name: "Queijo Brie Francês", qty: 9.0, unit: "kg", unitCost: 89.00, subtotal: 801.00 },
        { name: "Arroz Carnaroli Italiano", qty: 14.0, unit: "kg", unitCost: 24.00, subtotal: 336.00 },
        { name: "Gin London Dry Tanqueray", qty: 12.0, unit: "L", unitCost: 110.00, subtotal: 1320.00 },
        { name: "Taças Cristal Bohemia", qty: 180, unit: "un", unitCost: 0.00, subtotal: 0.00 }
      ],
      totalCost: 4633.00,
      returns: [
        { name: "Gin London Dry Tanqueray (Garrafas Lacradas)", qty: 2.0, unit: "L", returnedStatus: "Reintegrado ao Estoque" },
        { name: "Taças Cristal Bohemia (Quebradas durante evento)", qty: 6, unit: "un", returnedStatus: "Cobrado Custo de Reposição R$ 111,00" }
      ]
    }
  ],

  // Custos e DRE Comparativo Previsto x Real (F14)
  costComparisons: {
    "EV-2026-042": {
      eventId: "EV-2026-042",
      title: "Casamento Marina Albuquerque & Rodrigo Neves",
      contractedValue: 52500.00,
      categories: [
        { category: "Alimentos & Insumos Gastronômicos", plannedCost: 14200.00, actualCost: 14850.00, note: "Pequeno reajuste no frete de aspargos frescos." },
        { category: "Bebidas & Bar Premium", plannedCost: 6800.00, actualCost: 6540.00, note: "Sobra de 2 garrafas de gin devolvidas ao estoque." },
        { category: "Mão de Obra & Brigada (Salão e Cozinha)", plannedCost: 6200.00, actualCost: 6590.00, note: "Hora extra de 1h30 para 3 garçons e maitre." },
        { category: "Locação de Louças, Taças & Estrutura", plannedCost: 3900.00, actualCost: 4110.00, note: "Inclusão de 6 taças de cristal repostas por quebra." },
        { category: "Logística, Gelo & Transporte Frigorífico", plannedCost: 1800.00, actualCost: 1850.00, note: "Caminhão frigorífico dentro do planejado." },
        { category: "Margem de Imprevistos & Contingência", plannedCost: 1200.00, actualCost: 1300.00, note: "Combustível gerador complementar." }
      ],
      totalPlannedCost: 34100.00,
      totalActualCost: 35240.00,
      varianceCost: 1140.00,
      plannedProfit: 18400.00,
      plannedMarginPct: 35.0,
      actualProfit: 17260.00,
      actualMarginPct: 32.9,
      evaluation: "Alta Rentabilidade. Custo real variou apenas +3.3% em relação à estimativa da IA."
    }
  },

  // CRM Pós-Venda & Avaliações (F15)
  postSaleReviews: [
    {
      id: "REV-01",
      eventId: "EV-2026-041",
      clientName: "Dra. Beatriz Toledo",
      npsScore: 10,
      date: "2026-08-25",
      foodRating: 5,
      serviceRating: 5,
      timingRating: 5,
      feedbackText: "O jantar foi impecável! O Chef Ferreira e sua equipe superaram todas as expectativas dos médicos presentes. O Filé ao Poivre estava divino e os garçons foram extremamente discretos e elegantes.",
      nextOpportunity: "Jantar de Confraternização de Fim de Ano da Clínica Toledo (Dezembro)",
      status: "Oportunidade Futura Ativa"
    }
  ]
};

// Gerenciador de armazenamento local para garantir persistência durante navegação
const StorageManager = {
  KEY: "CHEF_FERREIRA_ORGANIZA_STATE_V1",

  load() {
    try {
      const stored = localStorage.getItem(this.KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Erro ao ler localStorage, utilizando seed data inicial.", e);
    }
    this.save(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Erro ao salvar no localStorage", e);
    }
  },

  reset() {
    localStorage.removeItem(this.KEY);
    return this.load();
  }
};
