// ══════════════════════════════════════════════════════════
// CONFIG.JS - CUSTOMIZE PARA CADA EMPRESA
// ══════════════════════════════════════════════════════════

export const COMPANY_CONFIG = {
  // IDENTIDADE VISUAL
  companyName: 'H2OL',
  companySubtitle: 'Amazon DSP Logistics Dashboard',
  logo: '/logos/logiq-logo.svg',           // Logo genérica (altere quando clonar para nova empresa)
  favicon: '/logos/logiq-favicon.ico',     // Coloque favicon em public/logos/

  // CORES DA MARCA (usado em toda interface)
  colors: {
    primary: '#FF9900',      // Laranja (botões, highlights)
    secondary: '#FF6B35',    // Laranja escuro (gradientes)
    dark: '#0d1527',         // Fundo escuro
    text: '#fff',            // Texto principal
    textSecondary: '#94a3b8', // Texto secundário
  },

  // DEPÓSITOS DA EMPRESA
  depots: [
    { id: 'banbury', label: 'Banbury', country: 'UK' },
    { id: 'dox2', label: 'DOX2', country: 'UK' },
    { id: 'dwr2', label: 'DWR2', country: 'UK' },
    { id: 'dsn1', label: 'DSN1 Swindon', country: 'UK' },
    { id: 'sbs2', label: 'SBS2 Bristol', country: 'UK' },
  ],

  // USUÁRIOS PADRÃO (altere emails/senhas)
  defaultUsers: [
    {
      id: 'admin-1',
      email: 'admin@h2ol.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin H2OL',
      depot: null,  // Admins acessam todos depósitos
    },
    {
      id: 'manager-1',
      email: 'manager@h2ol.com',
      password: 'manager123',
      role: 'manager',
      name: 'Manager H2OL',
      depot: null,  // Gerentes selecionam depósito via dropdown
    },
    {
      id: 'driver-1',
      email: 'driver@h2ol.com',
      password: 'driver123',
      role: 'driver',
      name: 'Driver Demo',
      depot: 'dox2',
      driverId: 1,  // ID do motorista em BASE_DRIVERS
    },
  ],

  // IDIOMA PADRÃO ('pt-BR' ou 'en-UK')
  defaultLanguage: 'pt-BR',

  // URLs E ENDPOINTS (para quando integrar com API real)
  apiBaseUrl: 'https://api.logiq.io',
  authProvider: 'local', // 'local', 'google', 'microsoft'

  // FEATURES (ativar/desativar funcionalidades)
  features: {
    pdfUpload: true,
    csvImport: true,
    actionPlans: true,
    aiChat: true,
    benchmarking: true,
    messageTemplates: true,
  },

  // BANCO DE DADOS (para futuro)
  database: {
    type: 'localStorage', // 'localStorage', 'firestore', 'supabase', 'custom'
    // Adicionar credenciais aqui quando usar BD real
  },
};

export default COMPANY_CONFIG;
