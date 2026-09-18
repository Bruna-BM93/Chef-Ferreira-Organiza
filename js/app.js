/**
 * CHEF FERREIRA ORGANIZA - CORE APPLICATION ENGINE
 * Framework: Semantic UI / Fomantic-UI + Vanilla ES6
 * Controla os módulos F01 a F15, reatividade e persistência
 */

const App = {
  data: null,
  activeModule: "dashboard",
  activeEventId: "EV-2026-042", // Casamento Marina (150 convidados) por padrão
  charts: {},

  init() {
    this.data = StorageManager.load();
    this.setupSemanticUI();
    this.populateGlobalEventSelect();
    this.renderAll();
    this.setupRouteListener();

    // Notificação inicial
    setTimeout(() => {
      this.notifyInfo("Bem-vindo ao Chef Ferreira Organiza! Unidade: Matriz Jardins.");
    }, 600);
  },

  setupSemanticUI() {
    // Inicialização de componentes do Semantic UI / Fomantic-UI
    $('.ui.dropdown').dropdown();
    $('.ui.modal').modal({
      closable: true,
      duration: 200
    });
  },

  setupRouteListener() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== this.activeModule) {
        this.navigate(hash);
      }
    });

    if (window.location.hash) {
      this.navigate(window.location.hash.replace("#", ""));
    }
  },

  // Navegação entre os 15 Módulos (F01 - F15)
  navigate(moduleId) {
    const validModules = [
      "dashboard", "calendar", "crm", "events", "aiBudget",
      "suppliers", "purchasing", "inventory", "recipes", "staff",
      "execution", "requisitions", "costs", "postSale"
    ];

    if (!validModules.includes(moduleId)) {
      moduleId = "dashboard";
    }

    this.activeModule = moduleId;
    window.location.hash = moduleId;

    // Atualiza classes ativas na sidebar
    $('#sidebarNav .nav-module-item').removeClass('active');
    $(`#sidebarNav .nav-module-item[data-module="${moduleId}"]`).addClass('active');

    // Alterna visibilidade das páginas
    $('.module-page').removeClass('active');
    $(`#module-${moduleId}`).addClass('active');

    // Atualiza breadcrumb
    const moduleTitles = {
      dashboard: { title: "Dashboard Executivo", badge: "F02" },
      calendar: { title: "Agenda Operacional & Google Calendar", badge: "F03" },
      crm: { title: "Clientes & CRM (Funil de Vendas)", badge: "F04" },
      events: { title: "Central de Eventos Cadastrados", badge: "F05" },
      aiBudget: { title: "Orçamento Inteligente com IA", badge: "F06" },
      suppliers: { title: "Fornecedores Homologados", badge: "F07" },
      purchasing: { title: "Compras & Solicitações Automáticas", badge: "F08" },
      inventory: { title: "Estoque & Depósitos", badge: "F09" },
      recipes: { title: "Fichas Técnicas & Receitas", badge: "F10" },
      staff: { title: "Equipe & Escala de Mão de Obra", badge: "F11" },
      execution: { title: "Checklist & Execução do Evento", badge: "F12" },
      requisitions: { title: "Notas de Saída de Estoque", badge: "F13" },
      costs: { title: "Custos & DRE Comparativo", badge: "F14" },
      postSale: { title: "Pós-Venda, NPS & Relatórios", badge: "F15" }
    };

    const modInfo = moduleTitles[moduleId] || { title: "Módulo", badge: "F00" };
    $('#currentBreadcrumbTitle').text(modInfo.title);
    $('#currentModuleBadge').text(modInfo.badge);

    // Scroll ao topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Renderização específica quando aberta
    if (moduleId === "dashboard") this.renderDashboardChart();
    if (moduleId === "costs") this.renderCostsChart();
  },

  renderAll() {
    this.renderDashboard();
    this.renderCalendar();
    this.renderCRM();
    this.renderEvents();
    this.renderAIBudget();
    this.renderSuppliers();
    this.renderPurchasing();
    this.renderInventory();
    this.renderRecipes();
    this.renderStaff();
    this.renderExecution();
    this.renderRequisitions();
    this.renderCosts();
    this.renderPostSale();
  },

  // F01: Gestão de Unidade e Usuário
  changeUnit(unitId) {
    this.data.currentUser.activeUnitId = unitId;
    StorageManager.save(this.data);
    const unit = this.data.units.find(u => u.id === unitId);
    this.notifySuccess(`Unidade alterada para: ${unit ? unit.name : unitId}`);
    this.renderAll();
  },

  showLoginModal() {
    $('#modalUnitSelect').val(this.data.currentUser.activeUnitId);
    $('#loginModal').modal('show');
  },

  applyUserSwitch() {
    const unitId = $('#modalUnitSelect').val();
    const role = $('#modalRoleSelect').val();
    this.data.currentUser.activeUnitId = unitId;
    this.data.currentUser.role = role;
    StorageManager.save(this.data);
    $('#loginModal').modal('hide');
    $('#activeUnitSelector').val(unitId);
    this.notifySuccess(`Perfil atualizado: ${role}`);
    this.renderAll();
  },

  // Seletor Global de Evento Ativo
  populateGlobalEventSelect() {
    const select = $('#globalEventSelect');
    select.empty();
    this.data.events.forEach(ev => {
      select.append(`<option value="${ev.id}" ${ev.id === this.activeEventId ? 'selected' : ''}>${ev.title.length > 30 ? ev.title.substring(0,30) + '...' : ev.title} (${ev.guestCount}p)</option>`);
    });
  },

  setGlobalEvent(eventId) {
    this.activeEventId = eventId;
    const ev = this.data.events.find(e => e.id === eventId);
    if (ev) {
      $('#aiActiveEventName').text(`${ev.title} (${ev.guestCount} convidados)`);
      $('#executionEventTitle').text(ev.title);
      $('#aiInputGuests').val(ev.guestCount);
      this.renderAIBudget();
      this.renderExecution();
      this.renderCosts();
      this.notifyInfo(`Evento ativo alterado para: ${ev.title}`);
    }
  },

  // =========================================================================
  // F02: DASHBOARD
  // =========================================================================
  renderDashboard() {
    const tbody = $('#dashboardEventsTableBody');
    tbody.empty();

    // Conta itens críticos no estoque
    const criticals = this.data.inventory.filter(i => i.status.includes("Crítico") || i.status.includes("Abaixo")).length;
    $('#statCriticalInventory').text(`${criticals} itens`);

    this.data.events.forEach(ev => {
      let statusColor = "blue";
      if (ev.status === "Confirmado") statusColor = "green";
      if (ev.status === "Concluído") statusColor = "grey";
      if (ev.status === "Orçamento") statusColor = "orange";

      const tr = `
        <tr>
          <td><span class="ui tiny label">${ev.id}</span></td>
          <td>
            <strong>${ev.title}</strong><br>
            <small style="color: #64748b;"><i class="user icon"></i> ${ev.clientName}</small>
          </td>
          <td>
            <i class="calendar outline icon"></i> ${this.formatDateBR(ev.date)}<br>
            <small style="color: #64748b;"><i class="clock outline icon"></i> ${ev.setupTime} &rarr; ${ev.endTime}</small>
          </td>
          <td><i class="users icon"></i> <strong>${ev.guestCount}</strong> pessoas</td>
          <td><small>${ev.venue}</small></td>
          <td><span class="ui tiny ${statusColor} label">${ev.status}</span></td>
          <td style="font-weight: 700; color: #166534;">R$ ${ev.budget.totalRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td><span class="ui tiny teal label">${ev.budget.projectedMarginPct}%</span></td>
          <td>
            <button class="ui mini basic button" onclick="App.setGlobalEvent('${ev.id}'); App.navigate('aiBudget');" title="Ver Orçamento IA">
              <i class="magic icon"></i> IA
            </button>
            <button class="ui mini basic button" onclick="App.setGlobalEvent('${ev.id}'); App.navigate('costs');" title="Ver DRE Custos">
              <i class="chart bar icon"></i> DRE
            </button>
          </td>
        </tr>
      `;
      tbody.append(tr);
    });

    this.renderDashboardChart();
  },

  renderDashboardChart() {
    const ctx = document.getElementById('dashboardFinanceChart');
    if (!ctx) return;

    if (this.charts.dashboardFinance) {
      this.charts.dashboardFinance.destroy();
    }

    const eventLabels = this.data.events.map(e => e.title.length > 20 ? e.title.substring(0, 18) + '...' : e.title);
    const revenues = this.data.events.map(e => e.budget.totalRevenue);
    const plannedCosts = this.data.events.map(e => e.budget.estimatedCost);
    const profits = this.data.events.map(e => e.budget.totalRevenue - e.budget.estimatedCost);

    this.charts.dashboardFinance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: eventLabels,
        datasets: [
          {
            label: 'Faturamento Previsto (R$)',
            data: revenues,
            backgroundColor: '#ea580c',
            borderRadius: 6
          },
          {
            label: 'Custo Estimado Operacional (R$)',
            data: plannedCosts,
            backgroundColor: '#683819',
            borderRadius: 6
          },
          {
            label: 'Lucro Previsto (R$)',
            data: profits,
            backgroundColor: '#10b981',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Outfit', size: 12 } } }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => 'R$ ' + (val / 1000) + 'k'
            }
          }
        }
      }
    });
  },

  // =========================================================================
  // F03: AGENDA & SIMULAÇÃO GOOGLE CALENDAR
  // =========================================================================
  renderCalendar() {
    const grid = $('#calendarGridDays');
    grid.empty();

    // Dias da semana cabeçalho
    const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    weekDays.forEach(d => {
      grid.append(`<div style="font-weight:700; text-align:center; padding: 6px; color:#64748b; font-size:0.75rem;">${d}</div>`);
    });

    // Simulação do mês de Setembro de 2026 (1 a 30)
    // 01/09/2026 começa numa terça-feira (offset de 1 dia)
    grid.append(`<div class="calendar-day-cell" style="background:#f8fafc; opacity:0.5;"><span class="calendar-day-header">31 Ago</span></div>`);

    for (let day = 1; day <= 30; day++) {
      const dateStr = `2026-09-${String(day).padStart(2, '0')}`;
      const isToday = day === 18; // Hoje
      const eventsOnDay = this.data.events.filter(e => e.date === dateStr);

      let eventsHtml = "";
      eventsOnDay.forEach(ev => {
        const styleClass = ev.status === "Confirmado" ? "confirmed" : "budget";
        eventsHtml += `
          <div class="calendar-event-pill ${styleClass}" onclick="App.setGlobalEvent('${ev.id}'); App.notifyInfo('Evento: ${ev.title}');" title="${ev.title} (${ev.setupTime} - ${ev.endTime})">
            <strong>${ev.startTime}</strong> ${ev.title.substring(0, 16)}...
          </div>
        `;
      });

      const cell = `
        <div class="calendar-day-cell ${isToday ? 'today' : ''}">
          <div class="calendar-day-header">${day} ${isToday ? '(Hoje)' : ''}</div>
          <div style="flex:1; overflow-y:auto;">${eventsHtml}</div>
        </div>
      `;
      grid.append(cell);
    }

    // Detecção simulada de conflito: se houver mais de 1 evento no mesmo horário
    const conflicts = this.checkCalendarConflicts();
    if (conflicts.length > 0) {
      $('#calendarConflictMessage').text(conflicts[0]);
      $('#calendarConflictAlert').show();
    } else {
      $('#calendarConflictAlert').hide();
    }
  },

  checkCalendarConflicts() {
    const dates = {};
    const conflicts = [];
    this.data.events.forEach(ev => {
      if (dates[ev.date]) {
        conflicts.push(`Alerta de Conflito em ${this.formatDateBR(ev.date)}: Os eventos '${ev.title}' e '${dates[ev.date].title}' ocorrem na mesma data com demanda compartilhada de equipe.`);
      } else {
        dates[ev.date] = ev;
      }
    });
    return conflicts;
  },

  showGoogleSyncModal() {
    $('#googleSyncModal').modal('show');
  },

  // =========================================================================
  // F04: CLIENTES & CRM (FUNIL DE VENDAS)
  // =========================================================================
  renderCRM() {
    const stages = [
      { key: "Novo Contato", colId: "crmColNovo", countId: "crmCountNovo" },
      { key: "Orçamento Solicitado", colId: "crmColOrcamento", countId: "crmCountOrcamento" },
      { key: "Proposta Enviada", colId: "crmColProposta", countId: "crmCountProposta" },
      { key: "Negociação", colId: "crmColNegociacao", countId: "crmCountNegociacao" },
      { key: "Aprovado", colId: "crmColAprovado", countId: "crmCountAprovado" },
      { key: "Pós-Venda", colId: "crmColPosVenda", countId: "crmCountPosVenda" }
    ];

    stages.forEach(st => {
      $(`#${st.colId}`).empty();
      const list = this.data.clients.filter(c => c.stage === st.key);
      $(`#${st.countId}`).text(list.length);

      list.forEach(c => {
        const card = `
          <div class="kanban-card" onclick="App.showClientDetails('${c.id}')">
            <div class="kanban-card-title">${c.name}</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 6px;">
              <i class="tag icon"></i> ${c.type} &bull; ${c.leadSource}
            </div>
            <div class="kanban-card-meta">
              <span><i class="whatsapp icon" style="color:#25d366;"></i> ${c.phone}</span>
              <strong style="color: #166534;">R$ ${c.totalSpent.toLocaleString('pt-BR')}</strong>
            </div>
          </div>
        `;
        $(`#${st.colId}`).append(card);
      });
    });

    // Renderiza também a tabela
    const tbody = $('#crmTableBody');
    tbody.empty();
    this.data.clients.forEach(c => {
      tbody.append(`
        <tr>
          <td><strong>${c.name}</strong><br><small style="color:#64748b;">${c.notes}</small></td>
          <td><span class="ui tiny label">${c.type}</span></td>
          <td>${c.phone}<br><small>${c.email}</small></td>
          <td>${c.leadSource}</td>
          <td><span class="ui tiny label ${c.stage === 'Aprovado' ? 'green' : 'orange'}">${c.stage}</span></td>
          <td style="font-weight:700;">R$ ${c.totalSpent.toLocaleString('pt-BR')}</td>
          <td>
            <button class="ui mini basic button" onclick="App.advanceClientStage('${c.id}')" title="Avançar etapa no Funil">
              <i class="arrow right icon"></i> Avançar
            </button>
          </td>
        </tr>
      `);
    });
  },

  switchCRMTab(tab) {
    $('.ui.secondary.pointing.menu .item').removeClass('active');
    $(`.ui.secondary.pointing.menu .item[data-crm-tab="${tab}"]`).addClass('active');

    if (tab === "kanban") {
      $('#crmViewKanban').show();
      $('#crmViewTable').hide();
    } else {
      $('#crmViewKanban').hide();
      $('#crmViewTable').show();
    }
  },

  filterCRM(searchTerm) {
    const term = searchTerm.toLowerCase();
    $('.kanban-card').each(function() {
      const text = $(this).text().toLowerCase();
      $(this).toggle(text.includes(term));
    });
  },

  advanceClientStage(clientId) {
    const client = this.data.clients.find(c => c.id === clientId);
    if (!client) return;

    const stages = ["Novo Contato", "Orçamento Solicitado", "Proposta Enviada", "Negociação", "Aprovado", "Pós-Venda"];
    const currIdx = stages.indexOf(client.stage);
    if (currIdx < stages.length - 1) {
      client.stage = stages[currIdx + 1];
      StorageManager.save(this.data);
      this.renderCRM();
      this.notifySuccess(`Cliente ${client.name} avançou para a etapa: ${client.stage}!`);
    } else {
      this.notifyInfo(`Cliente já está na etapa final: ${client.stage}`);
    }
  },

  openNewClientModal() {
    $('#formNewClient')[0].reset();
    $('#newClientModal').modal('show');
  },

  saveNewClient() {
    const name = $('#newClientName').val();
    const type = $('#newClientType').val();
    const phone = $('#newClientPhone').val();
    const email = $('#newClientEmail').val();
    const leadSource = $('#newClientSource').val();
    const stage = $('#newClientStage').val();
    const notes = $('#newClientNotes').val();

    if (!name || !phone) {
      this.notifyError("Por favor, preencha ao menos o Nome e Telefone do cliente.");
      return;
    }

    const newClient = {
      id: `cli-${Date.now()}`,
      name,
      type,
      email,
      phone,
      leadSource,
      stage,
      company: "-",
      totalSpent: 0,
      notes: notes || "Cadastrado via formulário de CRM.",
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.data.clients.unshift(newClient);
    StorageManager.save(this.data);
    $('#newClientModal').modal('hide');
    this.renderCRM();
    this.notifySuccess(`Cliente ${name} cadastrado com sucesso!`);
  },

  showClientDetails(clientId) {
    const c = this.data.clients.find(item => item.id === clientId);
    if (!c) return;
    this.notifyInfo(`Cliente: ${c.name} | Etapa: ${c.stage} | Contato: ${c.phone}`);
  },

  // =========================================================================
  // F05: CENTRAL DO EVENTO
  // =========================================================================
  renderEvents() {
    const container = $('#eventsCardsContainer');
    container.empty();

    this.data.events.forEach(ev => {
      const card = `
        <div class="ui card">
          <div class="content">
            <div class="right floated meta">
              <span class="ui tiny label ${ev.status === 'Confirmado' ? 'green' : 'orange'}">${ev.status}</span>
            </div>
            <div class="header" style="font-size: 1.05rem;">${ev.title}</div>
            <div class="meta" style="margin-top: 4px;">
              <i class="user outline icon"></i> ${ev.clientName}
            </div>
            <div class="description" style="margin-top: 10px; font-size: 0.88rem;">
              <p><i class="map marker alternate icon" style="color: #ef4444;"></i> ${ev.venue}</p>
              <p><i class="calendar alternate icon"></i> ${this.formatDateBR(ev.date)} &bull; <strong>${ev.guestCount} convidados</strong></p>
              <div class="ui bulleted list" style="margin-top: 6px;">
                ${ev.services.slice(0, 2).map(s => `<div class="item">${s}</div>`).join('')}
              </div>
            </div>
          </div>
          <div class="extra content" style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
            <div>
              <small style="color: #64748b;">Receita Prevista:</small><br>
              <strong style="color: #10b981;">R$ ${ev.budget.totalRevenue.toLocaleString('pt-BR')}</strong>
            </div>
            <button class="ui mini button gold-button" onclick="App.setGlobalEvent('${ev.id}'); App.navigate('aiBudget');">
              <i class="magic icon"></i> Abrir IA
            </button>
          </div>
        </div>
      `;
      container.append(card);
    });
  },

  openNewEventModal() {
    const select = $('#newEventClientSelect');
    select.empty();
    this.data.clients.forEach(c => {
      select.append(`<option value="${c.id}">${c.name} (${c.type})</option>`);
    });
    $('#newEventModal').modal('show');
  },

  saveNewEvent() {
    const clientId = $('#newEventClientSelect').val();
    const title = $('#newEventTitle').val();
    const date = $('#newEventDate').val();
    const setupTime = $('#newEventSetupTime').val();
    const startTime = $('#newEventStartTime').val();
    const guestCount = parseInt($('#newEventGuests').val()) || 100;
    const duration = parseFloat($('#newEventDuration').val()) || 6;
    const type = $('#newEventType').val();
    const venue = $('#newEventVenue').val();

    if (!title || !date || !venue) {
      this.notifyError("Por favor, preencha todos os campos obrigatórios do evento.");
      return;
    }

    const client = this.data.clients.find(c => c.id === clientId);

    const newEvId = `EV-2026-${String(this.data.events.length + 43).padStart(3, '0')}`;
    const newEvent = {
      id: newEvId,
      title,
      clientId,
      clientName: client ? client.name : "Cliente",
      type,
      unitId: this.data.currentUser.activeUnitId,
      date,
      setupTime,
      startTime,
      endTime: "02:00",
      venue,
      guestCount,
      vegetarianCount: Math.round(guestCount * 0.1),
      childrenCount: Math.round(guestCount * 0.05),
      durationHours: duration,
      status: "Orçamento",
      services: ["Buffet Principal", "Open Bar", "Brigada de Atendimento"],
      budget: {
        totalRevenue: guestCount * 350,
        estimatedCost: guestCount * 220,
        actualCost: 0,
        projectedMarginPct: 37.1,
        actualMarginPct: 0,
        aiGenerated: true
      },
      googleCalendarSynced: true,
      googleEventId: `gcal_${Date.now()}`,
      notes: "Criado pelo assistente de eventos."
    };

    this.data.events.unshift(newEvent);
    StorageManager.save(this.data);
    $('#newEventModal').modal('hide');
    this.populateGlobalEventSelect();
    this.setGlobalEvent(newEvId);
    this.navigate('aiBudget');
    this.notifySuccess(`Evento '${title}' criado com sucesso e conectado ao HUB operacional!`);
  },

  // =========================================================================
  // F06: ORÇAMENTO INTELIGENTE COM IA ("ChefBot IA")
  // =========================================================================
  renderAIBudget() {
    const ev = this.data.events.find(e => e.id === this.activeEventId) || this.data.events[0];
    const guests = parseInt($('#aiInputGuests').val()) || ev.guestCount || 150;
    const duration = parseFloat($('#aiInputDuration').val()) || ev.durationHours || 7;
    const targetMargin = parseFloat($('#aiInputTargetMargin').val()) || 35.0;

    // Fórmulas Gastronômicas Inteligentes da IA:
    // 1. Proteínas: 0.22 kg por convidado de Filé Mignon limpo
    const mignonQty = Math.round(guests * 0.22);
    const mignonCost = mignonQty * 68.00;

    // 2. Queijos Nobres / Brie para Risoto e Ilha: 0.08 kg por convidado
    const brieQty = Math.round(guests * 0.08);
    const brieCost = brieQty * 89.00;

    // 3. Arroz Carnaroli / Guarnições: 0.09 kg por convidado
    const riceQty = Math.round(guests * 0.09);
    const riceCost = riceQty * 24.00;

    // 4. Gin London Dry & Bebidas: 1 garrafa (1L) para cada 12 convidados
    const ginBottles = Math.ceil(guests / 12);
    const ginCost = ginBottles * 110.00;

    // 5. Mão de Obra de Salão e Cozinha:
    // - 1 Garçom para cada 12 convidados (diária R$ 200)
    const waitersCount = Math.ceil(guests / 12);
    const waitersCost = waitersCount * 200.00;

    // - 1 Maitre de coordenação (diária R$ 400)
    const maitreCost = 400.00;

    // - 1 Chef Executivo + 1 Sous Chef + 2 Cozinheiros de apoio (R$ 1.200 + 450 + 600)
    const kitchenStaffCost = 2250.00;

    // 6. Locação de Louças & Taças: R$ 26,00 por convidado
    const rentalsCost = guests * 26.00;

    // 7. Logística Frigorífica e Gelo: R$ 1.800 fixo base
    const logisticsCost = 1800.00;

    // CUSTO DIRETO TOTAL
    const totalDirectCost = mignonCost + brieCost + riceCost + ginCost + waitersCost + maitreCost + kitchenStaffCost + rentalsCost + logisticsCost;
    const safetyMarginCost = totalDirectCost * 0.10; // 10% margem de segurança
    const totalEstimatedCost = totalDirectCost + safetyMarginCost;

    // PREÇO SUGERIDO DE VENDA COM BASE NA MARGEM ALVO: Preço = Custo / (1 - Margem)
    const sellingPrice = totalEstimatedCost / (1 - (targetMargin / 100));
    const projectedProfit = sellingPrice - totalEstimatedCost;

    // Atualiza indicadores de tela
    $('#aiStatDirectCost').text(`R$ ${totalDirectCost.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`);
    $('#aiStatSafetyMargin').text(`R$ ${safetyMarginCost.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`);
    $('#aiStatSellingPrice').text(`R$ ${sellingPrice.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`);
    $('#aiStatProjectedProfit').text(`R$ ${projectedProfit.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`);

    // Preenche a tabela com justificativas técnicas
    const tbody = $('#aiItemsTableBody');
    tbody.empty();

    const items = [
      { cat: "Carnes Nobres", name: "Filé Mignon Bovino Limpo (Peça)", qty: mignonQty, unit: "kg", unitCost: 68.00, subtotal: mignonCost, reason: `220g limpos por pessoa. Fator de Correção 1.15 aplicado. Fornecedor Prime Beef.` },
      { cat: "Laticínios Nobres", name: "Queijo Brie Francês / Nacional", qty: brieQty, unit: "kg", unitCost: 89.00, subtotal: brieCost, reason: `80g por pessoa para ilha de antepastos e risoto quente cremoso.` },
      { cat: "Secos & Grãos", name: "Arroz Carnaroli Italiano Importado", qty: riceQty, unit: "kg", unitCost: 24.00, subtotal: riceCost, reason: `90g cru por pessoa, garantindo rendimento de 2.2x após cozimento em caldo artesanal.` },
      { cat: "Bebidas & Bar", name: "Gin London Dry Tanqueray", qty: ginBottles, unit: "L", unitCost: 110.00, subtotal: ginCost, reason: `Média de 6 coquetéis por convidado durante ${duration}h de festa.` },
      { cat: "Mão de Obra Salão", name: `Brigada de Garçons Treinados (${waitersCount} profissionais)`, qty: waitersCount, unit: "diárias", unitCost: 200.00, subtotal: waitersCost, reason: `Relação técnica de 1 garçom para 12 convidados em serviço empratado franco-americano.` },
      { cat: "Mão de Obra Salão", name: "Maitre de Salão e Protocolo (1 prof.)", qty: 1, unit: "diária", unitCost: 400.00, subtotal: maitreCost, reason: `Coordenação de cronograma, corte do bolo e atendimento exclusivo da mesa de honra.` },
      { cat: "Mão de Obra Cozinha", name: "Chef Executivo + Sous Chef + 2 Cozinheiros", qty: 1, unit: "equipe", unitCost: 2250.00, subtotal: kitchenStaffCost, reason: `Produção in loco, empratamento sincronizado e controle rigoroso de temperatura.` },
      { cat: "Locação & Louças", name: "Sousplats, Taças Cristal Bohemia e Prataria", qty: guests, unit: "kits", unitCost: 26.00, subtotal: rentalsCost, reason: `Kit completo com margem técnica de 10% para quebras involuntárias durante o serviço.` },
      { cat: "Logística & Frio", name: "Caminhão Frigorífico Climatizado + Gelo Cristal", qty: 1, unit: "serviço", unitCost: 1800.00, subtotal: logisticsCost, reason: `Transporte regulado a 4°C garantindo segurança alimentar dos pescados e queijos.` }
    ];

    items.forEach(it => {
      tbody.append(`
        <tr>
          <td><span class="ui tiny label">${it.cat}</span></td>
          <td><strong>${it.name}</strong></td>
          <td style="font-weight: 700;">${it.qty}</td>
          <td>${it.unit}</td>
          <td>R$ ${it.unitCost.toFixed(2)}</td>
          <td style="font-weight: 700; color:#1e293b;">R$ ${it.subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td><small style="color: #475569;"><i class="robot icon" style="color:#ea580c;"></i> ${it.reason}</small></td>
        </tr>
      `);
    });
  },

  generateAIBudget() {
    $('#aiThinkingBox').fadeIn(200);
    setTimeout(() => {
      $('#aiThinkingBox').fadeOut(200);
      this.renderAIBudget();
      this.notifySuccess("Orçamento recalculado com sucesso pela IA!");
    }, 500);
  },

  resetAIEstimates() {
    $('#aiInputGuests').val(150);
    $('#aiInputDuration').val(7);
    this.renderAIBudget();
    this.notifyInfo("Parâmetros redefinidos para os valores padrão.");
  },

  approveAIBudget() {
    const ev = this.data.events.find(e => e.id === this.activeEventId);
    if (!ev) return;

    ev.status = "Confirmado";
    ev.budget.totalRevenue = 52500;
    ev.budget.estimatedCost = 34100;
    ev.budget.projectedMarginPct = 35.0;

    StorageManager.save(this.data);
    this.renderAll();

    this.notifySuccess(`Orçamento aprovado para '${ev.title}'! Solicitações de Compras e Agenda sincronizadas.`);
    this.navigate('purchasing');
  },

  exportBudgetPDF() {
    this.notifyInfo("Gerando visualização da proposta comercial para impressão...");
    window.print();
  },

  // =========================================================================
  // F07: FORNECEDORES & COTAÇÕES
  // =========================================================================
  renderSuppliers() {
    const container = $('#suppliersCardsContainer');
    container.empty();

    this.data.suppliers.forEach(sup => {
      const card = `
        <div class="ui card">
          <div class="content">
            <div class="right floated meta">
              <span class="ui tiny yellow label"><i class="star icon"></i> ${sup.rating}</span>
            </div>
            <div class="header" style="font-size: 1.05rem;">${sup.name}</div>
            <div class="meta" style="color: #64748b; margin-top: 4px;">
              <i class="building icon"></i> ${sup.category}
            </div>
            <div class="description" style="margin-top: 10px; font-size: 0.85rem;">
              <p><i class="id card outline icon"></i> CNPJ: ${sup.cnpj}</p>
              <p><i class="user outline icon"></i> Contato: <strong>${sup.contactPerson}</strong></p>
              <p><i class="phone icon"></i> ${sup.phone} | <i class="mail outline icon"></i> ${sup.email}</p>
              <p><i class="clock outline icon"></i> Prazo Entrega: <strong>${sup.leadTimeDays} dias</strong></p>
              <div class="ui labels" style="margin-top: 8px;">
                ${sup.products.map(p => `<span class="ui mini basic label">${p}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="extra content" style="background: #f8fafc;">
            <button class="ui fluid mini basic button" onclick="App.notifyInfo('Solicitando cotação expressa para ${sup.name}...')">
              <i class="envelope outline icon"></i> Solicitar Cotação Rápida
            </button>
          </div>
        </div>
      `;
      container.append(card);
    });
  },

  openNewSupplierModal() {
    this.notifyInfo("Abrindo cadastro de novo fornecedor homologado...");
  },

  // =========================================================================
  // F08: COMPRAS & SOLICITAÇÕES AUTOMÁTICAS
  // =========================================================================
  renderPurchasing() {
    const tbody = $('#purchasingTableBody');
    tbody.empty();

    this.data.purchaseOrders.forEach(ord => {
      let badgeClass = "orange";
      if (ord.status.includes("Aprovado")) badgeClass = "green";

      const itemsDesc = ord.items.map(it => `${it.qty} ${it.unit} de ${it.name}`).join(', ');

      tbody.append(`
        <tr>
          <td><strong>${ord.id}</strong></td>
          <td>${ord.supplierName}</td>
          <td><small>${ord.eventName}</small></td>
          <td><i class="calendar alternate outline icon"></i> ${this.formatDateBR(ord.deliveryDate)}</td>
          <td><small>${itemsDesc}</small></td>
          <td style="font-weight: 700; color: #166534;">R$ ${ord.totalAmount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td><span class="ui tiny ${badgeClass} label">${ord.status}</span></td>
          <td>
            <button class="ui mini basic green button" onclick="App.approvePurchaseOrder('${ord.id}')" ${ord.status.includes('Aprovado') ? 'disabled' : ''}>
              <i class="check icon"></i> Aprovar Envio
            </button>
          </td>
        </tr>
      `);
    });
  },

  approvePurchaseOrder(ordId) {
    const ord = this.data.purchaseOrders.find(o => o.id === ordId);
    if (!ord) return;
    ord.status = "Aprovado / Aguardando Entrega";
    StorageManager.save(this.data);
    this.renderPurchasing();
    this.notifySuccess(`Ordem ${ord.id} aprovada! Pedido despachado ao fornecedor.`);
  },

  generatePurchaseFromEvent() {
    this.notifySuccess("Cruzamento executado: Necessidade do Cardápio - Saldo em Estoque. 3 Ordens de Compra atualizadas!");
    this.renderPurchasing();
  },

  // =========================================================================
  // F09: ESTOQUE & ALMOXARIFADO
  // =========================================================================
  renderInventory(filterCategory = 'all') {
    const tbody = $('#inventoryTableBody');
    tbody.empty();

    let list = this.data.inventory;
    if (filterCategory !== 'all') {
      list = list.filter(i => i.warehouse.toLowerCase().includes(filterCategory.toLowerCase()));
    }

    list.forEach(item => {
      const freeBalance = item.currentQty - item.reservedForEvents;
      let statusBadge = '<span class="ui tiny green label">Normal</span>';
      if (item.status.includes("Abaixo")) {
        statusBadge = '<span class="ui tiny orange label">Abaixo do Mínimo</span>';
      } else if (item.status.includes("Crítico")) {
        statusBadge = '<span class="ui tiny red label"><i class="exclamation triangle icon"></i> Crítico / Insuficiente</span>';
      }

      tbody.append(`
        <tr>
          <td><strong>${item.name}</strong><br><small style="color:#64748b;">${item.category}</small></td>
          <td><i class="warehouse icon"></i> ${item.warehouse}</td>
          <td style="font-weight: 700;">${item.currentQty} ${item.unit}</td>
          <td>${item.minQty} ${item.unit}</td>
          <td style="color: #ea580c; font-weight: 600;">${item.reservedForEvents} ${item.unit}</td>
          <td style="font-weight: 700; color: ${freeBalance < 0 ? '#ef4444' : '#166534'};">
            ${freeBalance} ${item.unit}
          </td>
          <td>R$ ${item.unitCost.toFixed(2)}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="ui mini basic button" onclick="App.adjustInventory('${item.id}')" title="Ajustar saldo">
              <i class="edit outline icon"></i> Ajustar
            </button>
          </td>
        </tr>
      `);
    });
  },

  filterInventory(type, el) {
    $('#inventoryWarehouseFilter .item').removeClass('active');
    $(el).addClass('active');
    this.renderInventory(type);
  },

  adjustInventory(itemId) {
    const item = this.data.inventory.find(i => i.id === itemId);
    if (!item) return;
    const newQty = prompt(`Ajuste de Estoque para '${item.name}' (${item.warehouse}).\nInforme a nova quantidade física em ${item.unit}:`, item.currentQty);
    if (newQty !== null && !isNaN(parseFloat(newQty))) {
      item.currentQty = parseFloat(newQty);
      if (item.currentQty < item.minQty) {
        item.status = item.currentQty < item.reservedForEvents ? "Crítico/Insuficiente" : "Abaixo do Mínimo";
      } else {
        item.status = "Normal";
      }
      StorageManager.save(this.data);
      this.renderInventory();
      this.notifySuccess(`Saldo de ${item.name} atualizado para ${item.currentQty} ${item.unit}.`);
    }
  },

  openInventoryEntryModal() {
    this.notifyInfo("Abrindo registro de entrada por Nota Fiscal de Fornecedor...");
  },

  // =========================================================================
  // F10: FICHAS TÉCNICAS & RECEITAS GASTRONÔMICAS
  // =========================================================================
  renderRecipes() {
    const container = $('#recipesGridContainer');
    container.empty();

    this.data.recipes.forEach(rec => {
      const card = `
        <div class="column">
          <div class="ui segment" style="border-radius: var(--radius-md); height: 100%; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <span class="ui tiny label" style="background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa;">${rec.category}</span>
                <h3 class="ui header" style="margin: 4px 0 0;">${rec.name}</h3>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.75rem; color: #64748b;">Custo por Porção:</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: #166534;" id="recipePortionCost_${rec.id}">
                  R$ ${rec.portionCost.toFixed(2)}
                </div>
              </div>
            </div>

            <p style="font-size: 0.85rem; color: #475569; margin-bottom: 12px;">${rec.description}</p>

            <div style="display: flex; gap: 12px; margin-bottom: 14px; font-size: 0.8rem; background: #f8fafc; padding: 8px 12px; border-radius: 6px;">
              <span><i class="users icon"></i> Rendimento: <strong>${rec.yieldPortions} porções</strong></span>
              <span><i class="clock outline icon"></i> Tempo: <strong>${rec.prepTimeMinutes} min</strong></span>
              <span><i class="calculator icon"></i> FC Médio: <strong>${rec.correctionFactorAvg}</strong></span>
            </div>

            <h5 class="ui header" style="margin: 0 0 6px;"><i class="list alternate outline icon"></i> Composição dos Ingredientes:</h5>
            <div style="flex: 1; overflow-y: auto; max-height: 180px; margin-bottom: 12px;">
              <table class="ui very basic compact table" style="font-size: 0.82rem;">
                <thead>
                  <tr>
                    <th>Ingrediente</th>
                    <th>Qtd Bruta</th>
                    <th>Custo Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${rec.ingredients.map(ing => `
                    <tr>
                      <td>${ing.name}</td>
                      <td>${ing.grossQty} ${ing.unit}</td>
                      <td>R$ ${ing.unitCost.toFixed(2)}</td>
                      <td style="font-weight: 600;">R$ ${ing.totalCost.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Simulador de Reajuste de Insumo Dinâmico (Requisito F10) -->
            <div class="ui segment" style="background: #fafaf9; border-radius: 8px; margin: 0; padding: 10px 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; font-weight: 600;"><i class="bolt icon" style="color: #ea580c;"></i> Simular Inflação / Reajuste (+15% carne):</span>
                <button class="ui mini button basic" onclick="App.simulateIngredientPriceChange('${rec.id}', 1.15)">
                  Simular +15%
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      container.append(card);
    });
  },

  simulateIngredientPriceChange(recipeId, factor) {
    const rec = this.data.recipes.find(r => r.id === recipeId);
    if (!rec) return;

    // Atualiza preço do primeiro ingrediente (principal)
    rec.ingredients[0].unitCost *= factor;
    rec.ingredients[0].totalCost = rec.ingredients[0].grossQty * rec.ingredients[0].unitCost;

    // Recalcula custo total e porção
    rec.totalCost = rec.ingredients.reduce((acc, i) => acc + i.totalCost, 0);
    rec.portionCost = rec.totalCost / rec.yieldPortions;

    StorageManager.save(this.data);
    this.renderRecipes();
    this.notifyWarning(`Preço de '${rec.ingredients[0].name}' reajustado! Novo custo por porção da receita: R$ ${rec.portionCost.toFixed(2)}.`);
  },

  openNewRecipeModal() {
    this.notifyInfo("Abrindo assistente de cadastro de nova Ficha Técnica Gastronômica...");
  },

  // =========================================================================
  // F11: EQUIPE & MÃO DE OBRA
  // =========================================================================
  renderStaff() {
    const tbody = $('#staffTableBody');
    tbody.empty();

    this.data.staff.forEach(st => {
      const assignedEvs = st.assignedEvents.map(eId => {
        const ev = this.data.events.find(e => e.id === eId);
        return ev ? `${ev.id} (${ev.date})` : eId;
      }).join(', ');

      tbody.append(`
        <tr>
          <td><strong>${st.name}</strong><br><small style="color:#64748b;">${st.role}</small></td>
          <td><span class="ui tiny label">${st.type}</span></td>
          <td>${st.specialty}</td>
          <td style="font-weight:700; color:#166534;">R$ ${st.dailyRate.toFixed(2)}</td>
          <td><small>${assignedEvs}</small></td>
          <td>
            ${st.conflict ? '<span class="ui tiny red label"><i class="exclamation triangle icon"></i> Conflito Detectado</span>' : '<span class="ui tiny green label"><i class="check icon"></i> Disponível</span>'}
          </td>
          <td><span class="ui tiny basic label">${st.status}</span></td>
          <td>
            <button class="ui mini basic button" onclick="App.toggleStaffAssignment('${st.id}')">
              <i class="calendar plus outline icon"></i> Escalar
            </button>
          </td>
        </tr>
      `);
    });
  },

  toggleStaffAssignment(staffId) {
    const st = this.data.staff.find(s => s.id === staffId);
    if (!st) return;
    this.notifySuccess(`Profissional ${st.name} confirmado na escala do evento ativo!`);
  },

  openNewStaffModal() {
    this.notifyInfo("Abrindo cadastro de novo membro da brigada de eventos...");
  },

  // =========================================================================
  // F12: EXECUÇÃO DO EVENTO & CHECKLIST OPERACIONAL
  // =========================================================================
  renderExecution() {
    const container = $('#executionChecklistContainer');
    container.empty();

    const ev = this.data.events.find(e => e.id === this.activeEventId) || this.data.events[0];
    const list = this.data.executionChecklists[ev.id] || this.data.executionChecklists["EV-2026-042"];

    if (!list) return;

    let doneCount = 0;
    list.forEach(chk => {
      if (chk.status === "Concluído") doneCount++;

      let statusClass = "status-pending";
      let statusBadge = `<span class="ui tiny label">Pendente</span>`;
      if (chk.status === "Concluído") {
        statusClass = "status-done";
        statusBadge = `<span class="ui tiny green label"><i class="check icon"></i> Concluído</span>`;
      } else if (chk.status === "Em Andamento") {
        statusClass = "status-in-progress";
        statusBadge = `<span class="ui tiny orange label">Em Andamento</span>`;
      }

      const itemHtml = `
        <div class="timeline-checklist-item ${statusClass}">
          <div class="timeline-hour-badge">${chk.time}</div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="font-size: 0.95rem;">${chk.phase}</strong>
              ${statusBadge}
            </div>
            <p style="margin: 0; color: #334155; font-size: 0.88rem;">${chk.task}</p>
            <div style="margin-top: 6px; font-size: 0.78rem; color: #64748b;">
              <i class="user outline icon"></i> Responsável: <strong>${chk.responsible}</strong>
            </div>
          </div>
          <div>
            <button class="ui mini icon button ${chk.status === 'Concluído' ? 'green' : 'basic'}" onclick="App.toggleChecklistStatus('${ev.id}', '${chk.id}')" title="Alternar status">
              <i class="check icon"></i>
            </button>
          </div>
        </div>
      `;
      container.append(itemHtml);
    });

    const percent = Math.round((doneCount / list.length) * 100);
    $('#executionProgressPercentText').text(`${percent}% Concluído (${doneCount}/${list.length} tarefas)`);
    $('#executionProgressBar .bar').css('width', `${percent}%`);
  },

  toggleChecklistStatus(eventId, chkId) {
    const list = this.data.executionChecklists[eventId] || this.data.executionChecklists["EV-2026-042"];
    const item = list.find(c => c.id === chkId);
    if (!item) return;

    if (item.status === "Pendente") {
      item.status = "Em Andamento";
    } else if (item.status === "Em Andamento") {
      item.status = "Concluído";
    } else {
      item.status = "Pendente";
    }

    StorageManager.save(this.data);
    this.renderExecution();
  },

  // =========================================================================
  // F13: NOTAS DE SAÍDA DE ESTOQUE
  // =========================================================================
  renderRequisitions() {
    const container = $('#requisitionsContainer');
    container.empty();

    this.data.requisitions.forEach(req => {
      const card = `
        <div class="ui segment" style="border-radius: var(--radius-md); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <span class="ui tiny green label">${req.status}</span>
              <h3 class="ui header" style="margin: 4px 0 0;">Requisição de Saída ${req.id}</h3>
              <small style="color: #64748b;"><i class="calendar check icon"></i> Evento: <strong>${req.eventName}</strong> | Data: ${this.formatDateBR(req.date)}</small>
            </div>
            <div style="text-align: right;">
              <small style="color: #64748b;">Custo dos Insumos Retirados:</small>
              <div style="font-size: 1.25rem; font-weight: 700; color: #166534;">
                R$ ${req.totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 20px; font-size: 0.82rem; background: #f8fafc; padding: 8px 14px; border-radius: 6px; margin-bottom: 14px;">
            <span><i class="user tie icon"></i> Autorizado por: <strong>${req.authorizedBy}</strong></span>
            <span><i class="dolly icon"></i> Despachado por: <strong>${req.dispatchedBy}</strong></span>
          </div>

          <table class="ui celled compact table" style="font-size: 0.85rem;">
            <thead>
              <tr>
                <th>Item Liberado</th>
                <th>Quantidade Retirada</th>
                <th>Custo Unit.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${req.items.map(it => `
                <tr>
                  <td><strong>${it.name}</strong></td>
                  <td>${it.qty} ${it.unit}</td>
                  <td>R$ ${it.unitCost.toFixed(2)}</td>
                  <td style="font-weight: 600;">R$ ${it.subtotal.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Conferência de Retorno e Quebras (Requisito F13) -->
          <div class="ui segment" style="background: #fafaf9; border-radius: 6px;">
            <h5 class="ui header" style="margin: 0 0 6px;"><i class="undo icon"></i> Devolução de Sobras & Inventário Pós-Evento:</h5>
            <div class="ui relaxed divided list" style="font-size: 0.82rem;">
              ${req.returns.map(r => `
                <div class="item">
                  <i class="box middle aligned icon"></i>
                  <div class="content">
                    <span class="header">${r.name} (${r.qty} ${r.unit})</span>
                    <div class="description" style="color: #0369a1;">${r.returnedStatus}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      container.append(card);
    });
  },

  openNewRequisitionModal() {
    this.notifyInfo("Abrindo emissão de nova nota de saída vinculada ao evento ativo...");
  },

  // =========================================================================
  // F14: CUSTOS & DRE DO EVENTO (PREVISTO VS REALIZADO)
  // =========================================================================
  renderCosts() {
    const ev = this.data.events.find(e => e.id === this.activeEventId) || this.data.events[0];
    const comp = this.data.costComparisons[ev.id] || this.data.costComparisons["EV-2026-042"];

    if (!comp) return;

    $('#dreContractedValue').text(`R$ ${comp.contractedValue.toLocaleString('pt-BR', {minimumFractionDigits: 0})}`);
    $('#drePlannedCost').text(`R$ ${comp.totalPlannedCost.toLocaleString('pt-BR', {minimumFractionDigits: 0})}`);
    $('#dreActualCost').text(`R$ ${comp.totalActualCost.toLocaleString('pt-BR', {minimumFractionDigits: 0})}`);
    $('#dreActualProfit').text(`R$ ${comp.actualProfit.toLocaleString('pt-BR', {minimumFractionDigits: 0})} (${comp.actualMarginPct}%)`);

    const tbody = $('#dreTableBody');
    tbody.empty();

    comp.categories.forEach(cat => {
      const diff = cat.actualCost - cat.plannedCost;
      const diffPct = ((diff / cat.plannedCost) * 100).toFixed(1);
      const isOver = diff > 0;

      tbody.append(`
        <tr>
          <td><strong>${cat.category}</strong></td>
          <td>R$ ${cat.plannedCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td style="font-weight: 700;">R$ ${cat.actualCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>
            <span class="ui tiny ${isOver ? 'orange' : 'green'} label">
              ${isOver ? '+' : ''}${diffPct}% (${isOver ? '+' : ''}R$ ${diff.toFixed(0)})
            </span>
          </td>
          <td><small style="color: #475569;">${cat.note}</small></td>
        </tr>
      `);
    });

    this.renderCostsChart();
  },

  renderCostsChart() {
    const ctx = document.getElementById('dreCostComparisonChart');
    if (!ctx) return;

    if (this.charts.dreComparison) {
      this.charts.dreComparison.destroy();
    }

    const comp = this.data.costComparisons["EV-2026-042"];
    const labels = comp.categories.map(c => c.category.split(' ')[0]);
    const planned = comp.categories.map(c => c.plannedCost);
    const actual = comp.categories.map(c => c.actualCost);

    this.charts.dreComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Custo Previsto IA (R$)',
            data: planned,
            backgroundColor: '#683819',
            borderRadius: 4
          },
          {
            label: 'Custo Realizado (R$)',
            data: actual,
            backgroundColor: '#141517',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Outfit', size: 11 } } }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: v => 'R$ ' + v }
          }
        }
      }
    });
  },

  // =========================================================================
  // F15: CRM PÓS-VENDA & SATISFAÇÃO
  // =========================================================================
  renderPostSale() {
    const container = $('#postSaleReviewsContainer');
    container.empty();

    this.data.postSaleReviews.forEach(rev => {
      const card = `
        <div class="ui segment" style="border-radius: var(--radius-md); margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span class="ui tiny green label"><i class="heart icon"></i> NPS: ${rev.npsScore}/10</span>
              <h4 class="ui header" style="margin: 4px 0 0;">${rev.clientName}</h4>
              <small style="color: #64748b;">Avaliação pós-evento em ${this.formatDateBR(rev.date)}</small>
            </div>
            <div style="color: var(--primary-gold); font-size: 1.1rem;">
              <i class="star icon"></i><i class="star icon"></i><i class="star icon"></i><i class="star icon"></i><i class="star icon"></i>
            </div>
          </div>

          <p style="font-style: italic; color: #334155; margin: 12px 0; font-size: 0.92rem; background: #fafaf9; padding: 12px; border-left: 4px solid var(--primary-gold); border-radius: 4px;">
            "${rev.feedbackText}"
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem;">
            <div>
              <span style="color: #64748b;">Oportunidade Futura Identificada:</span>
              <strong style="color: #0369a1;"><i class="bullseye icon"></i> ${rev.nextOpportunity}</strong>
            </div>
            <span class="ui tiny blue basic label">${rev.status}</span>
          </div>
        </div>
      `;
      container.append(card);
    });
  },

  openNewReviewModal() {
    this.notifyInfo("Abrindo formulário de coleta de NPS e depoimento dos noivos...");
  },

  // =========================================================================
  // FLUXO INTEGRADO DEMONSTRATIVO (150 Convidados)
  // =========================================================================
  runGuidedDemoFlow() {
    $('#guidedDemoModal').modal('show');
  },

  resetData() {
    if (confirm("Deseja restaurar todos os dados para o estado inicial demonstrativo?")) {
      this.data = StorageManager.reset();
      this.renderAll();
      this.notifySuccess("Base de dados restaurada para o padrão inicial.");
    }
  },

  // =========================================================================
  // UTILITÁRIOS & TOAST NOTIFICATIONS (Fomantic-UI)
  // =========================================================================
  notifySuccess(msg) {
    $('body').toast({
      class: 'success',
      message: msg,
      showIcon: 'check circle',
      displayTime: 3500,
      position: 'bottom right'
    });
  },

  notifyInfo(msg) {
    $('body').toast({
      class: 'info',
      message: msg,
      showIcon: 'info circle',
      displayTime: 3000,
      position: 'bottom right'
    });
  },

  notifyWarning(msg) {
    $('body').toast({
      class: 'warning',
      message: msg,
      showIcon: 'exclamation triangle',
      displayTime: 4000,
      position: 'bottom right'
    });
  },

  notifyError(msg) {
    $('body').toast({
      class: 'error',
      message: msg,
      showIcon: 'times circle',
      displayTime: 4500,
      position: 'bottom right'
    });
  },

  formatDateBR(isoDate) {
    if (!isoDate) return "";
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
  }
};

// Inicializa a aplicação ao carregar o DOM
$(document).ready(function() {
  App.init();
});
