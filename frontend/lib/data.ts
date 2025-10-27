export const stats = {
  revenue: 45780,
  unpaid: 8900,
  clients: 42,
  quotes: 15,
  projects: 8,
  deposits: 3,
  expenses: 12340,
  profitMargin: 73
};

export const recentInvoices = [
  { 
    id: 'F2024-001', 
    client: 'TechCorp', 
    amount: 3500, 
    status: 'payée', 
    date: '2024-01-20', 
    dueDate: '2024-02-20', 
    project: 'Site Web E-commerce' 
  },
  { 
    id: 'F2024-002', 
    client: 'StartupX', 
    amount: 2800, 
    status: 'en retard', 
    date: '2024-01-15', 
    dueDate: '2024-02-15', 
    project: 'Application Mobile' 
  },
  { 
    id: 'F2024-003', 
    client: 'AgencyPro', 
    amount: 5200, 
    status: 'payée', 
    date: '2024-01-10', 
    dueDate: '2024-02-10', 
    project: 'Refonte Site' 
  },
  { 
    id: 'F2024-004', 
    client: 'ClientBeta', 
    amount: 1800, 
    status: 'en attente', 
    date: '2024-01-25', 
    dueDate: '2024-02-25', 
    project: 'Maintenance' 
  },
];

export const recentQuotes = [
  { 
    id: 'D2024-015', 
    client: 'NouveauClient', 
    amount: 6500, 
    status: 'en attente', 
    date: '2024-01-26', 
    validUntil: '2024-02-10', 
    project: 'Développement API' 
  },
  { 
    id: 'D2024-014', 
    client: 'EntrepriseY', 
    amount: 4200, 
    status: 'accepté', 
    date: '2024-01-22', 
    validUntil: '2024-02-05', 
    project: 'Dashboard Analytics' 
  },
  { 
    id: 'D2024-013', 
    client: 'SociétéZ', 
    amount: 3800, 
    status: 'refusé', 
    date: '2024-01-18', 
    validUntil: '2024-02-01', 
    project: 'Integration CRM' 
  },
];

export const projects = [
  { 
    id: 'P001', 
    name: 'Site E-commerce TechCorp', 
    client: 'TechCorp', 
    status: 'en cours', 
    progress: 75, 
    budget: 12000, 
    spent: 8500, 
    deadline: '2024-03-15' 
  },
  { 
    id: 'P002', 
    name: 'App Mobile StartupX', 
    client: 'StartupX', 
    status: 'en cours', 
    progress: 45, 
    budget: 8000, 
    spent: 3200, 
    deadline: '2024-04-20' 
  },
  { 
    id: 'P003', 
    name: 'Dashboard AgencyPro', 
    client: 'AgencyPro', 
    status: 'terminé', 
    progress: 100, 
    budget: 6000, 
    spent: 5800, 
    deadline: '2024-01-30' 
  },
];

export const upcomingTasks = [
  { 
    id: 1, 
    title: 'Relance facture F2024-002', 
    type: 'relance', 
    priority: 'high', 
    dueDate: '2024-01-28' 
  },
  { 
    id: 2, 
    title: 'Finaliser devis D2024-015', 
    type: 'devis', 
    priority: 'medium', 
    dueDate: '2024-01-29' 
  },
  { 
    id: 3, 
    title: 'Déclaration TVA', 
    type: 'fiscal', 
    priority: 'high', 
    dueDate: '2024-02-05' 
  },
  { 
    id: 4, 
    title: 'Réunion client TechCorp', 
    type: 'réunion', 
    priority: 'medium', 
    dueDate: '2024-01-30' 
  },
];

export const menuItems = [
  { id: 'overview', label: 'Tableau de bord' },
  { id: 'quotes', label: 'Devis' },
  { id: 'invoices', label: 'Factures' },
  { id: 'deposits', label: 'Acomptes' },
  { id: 'clients', label: 'Clients' },
  { id: 'projects', label: 'Projets' },
  { id: 'payments', label: 'Paiements' },
  { id: 'expenses', label: 'Dépenses' },
  { id: 'reports', label: 'Rapports' },
  { id: 'settings', label: 'Paramètres' },
];