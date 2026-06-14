import React, { useState, useMemo, useRef, useEffect, createContext, useContext } from "react";
import COMPANY_CONFIG from './config.js';
// Temporarily disabled - npm install issues
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// ══════════════════════════════════════════════════════════
// DADOS BASE
// ══════════════════════════════════════════════════════════
const BASE_DRIVERS = [
  { id:1,  name:'Avino Fernandes',             depot:'dox2', status:'Fantastic Plus', totalScore:100,   rank:1,  wowChange:0, fico:420, ceDpmo:0, cdfDpmo:0,    pod:100,   cc:100,   dcr:99.53, dscDpmo:0,    lorDpmo:0, deliveries:851  },
  { id:2,  name:'Adrian Philip Wells',         depot:'dox2', status:'Fantastic Plus', totalScore:100,   rank:2,  wowChange:0, fico:400, ceDpmo:0, cdfDpmo:0,    pod:100,   cc:100,   dcr:100,   dscDpmo:0,    lorDpmo:0, deliveries:1051 },
  { id:3,  name:'Liam Joe Levi Mills',         depot:'dox2', status:'Fantastic Plus', totalScore:100,   rank:3,  wowChange:0, fico:410, ceDpmo:0, cdfDpmo:0,    pod:100,   cc:100,   dcr:100,   dscDpmo:0,    lorDpmo:0, deliveries:917  },
  { id:4,  name:'Mateusz Szymon Kocon',        depot:'dox2', status:'Fantastic',      totalScore:90,    rank:4,  wowChange:0, fico:480, ceDpmo:0, cdfDpmo:0,    pod:100,   cc:80,    dcr:100,   dscDpmo:0,    lorDpmo:0, deliveries:401  },
  { id:5,  name:'Ali Mohammed',                depot:'dox2', status:'Fantastic',      totalScore:90,    rank:5,  wowChange:0, fico:500, ceDpmo:0, cdfDpmo:0,    pod:96.43, cc:100,   dcr:99.71, dscDpmo:0,    lorDpmo:0, deliveries:1044 },
  { id:6,  name:'Edirisa Lukomwa',             depot:'dox2', status:'Fantastic',      totalScore:89.51, rank:6,  wowChange:0, fico:520, ceDpmo:0, cdfDpmo:1029, pod:100,   cc:100,   dcr:99.18, dscDpmo:0,    lorDpmo:0, deliveries:972  },
  { id:7,  name:'Andrew James Mckinley',       depot:'dox2', status:'Fantastic',      totalScore:88.65, rank:7,  wowChange:0, fico:540, ceDpmo:0, cdfDpmo:1456, pod:99.81, cc:100,   dcr:99.85, dscDpmo:0,    lorDpmo:0, deliveries:687  },
  { id:8,  name:'Stephen John Bailey',         depot:'dox2', status:'Great',          totalScore:83.06, rank:8,  wowChange:0, fico:600, ceDpmo:0, cdfDpmo:1609, pod:99.71, cc:100,   dcr:99.12, dscDpmo:0,    lorDpmo:0, deliveries:1243 },
  { id:9,  name:'Kelechi Okereke',             depot:'dox2', status:'Great',          totalScore:80.79, rank:9,  wowChange:0, fico:620, ceDpmo:0, cdfDpmo:2169, pod:100,   cc:100,   dcr:99.14, dscDpmo:0,    lorDpmo:0, deliveries:922  },
  { id:10, name:'Stefan Alexandru Zeciu',      depot:'dox2', status:'Great',          totalScore:80.35, rank:10, wowChange:0, fico:630, ceDpmo:0, cdfDpmo:2751, pod:100,   cc:100,   dcr:99.73, dscDpmo:0,    lorDpmo:0, deliveries:727  },
  { id:11, name:'James Cresswell',             depot:'dox2', status:'Great',          totalScore:75.01, rank:11, wowChange:0, fico:660, ceDpmo:0, cdfDpmo:650,  pod:98.61, cc:100,   dcr:99.48, dscDpmo:650,  lorDpmo:0, deliveries:1538 },
  { id:12, name:'Darun Abdulrahman A Abdalla', depot:'dox2', status:'Great',          totalScore:74.15, rank:12, wowChange:0, fico:670, ceDpmo:0, cdfDpmo:8140, pod:99.83, cc:100,   dcr:99.54, dscDpmo:0,    lorDpmo:0, deliveries:860  },
  { id:13, name:'Gabriel Ionut Proca',         depot:'dox2', status:'Great',          totalScore:74.13, rank:13, wowChange:0, fico:680, ceDpmo:0, cdfDpmo:3221, pod:100,   cc:100,   dcr:99.20, dscDpmo:0,    lorDpmo:0, deliveries:1242 },
  { id:14, name:'Petar Zhelyazkov',            depot:'dox2', status:'Great',          totalScore:73.67, rank:14, wowChange:0, fico:690, ceDpmo:0, cdfDpmo:2950, pod:100,   cc:99.87, dcr:100,   dscDpmo:0,    lorDpmo:0, deliveries:1017 },
  { id:15, name:'Alexandru Csaba Molnar',      depot:'dox2', status:'Great',          totalScore:71.24, rank:15, wowChange:0, fico:700, ceDpmo:0, cdfDpmo:0,    pod:98,    cc:100,   dcr:99.82, dscDpmo:910,  lorDpmo:0, deliveries:1099 },
  { id:16, name:'Najibullah Hashemi',          depot:'dox2', status:'Great',          totalScore:70.42, rank:16, wowChange:0, fico:710, ceDpmo:0, cdfDpmo:2981, pod:100,   cc:100,   dcr:98.82, dscDpmo:0,    lorDpmo:0, deliveries:671  },
  { id:17, name:'Bruno Borges dos Santos',     depot:'dox2', status:'Fair',           totalScore:69.91, rank:17, wowChange:0, fico:750, ceDpmo:0, cdfDpmo:2517, pod:99.72, cc:100,   dcr:99.00, dscDpmo:0,    lorDpmo:0, deliveries:1192 },
  { id:18, name:'Mohammed Shamsul Islam',      depot:'dox2', status:'Fair',           totalScore:69.34, rank:18, wowChange:0, fico:760, ceDpmo:0, cdfDpmo:1493, pod:100,   cc:100,   dcr:97.53, dscDpmo:0,    lorDpmo:0, deliveries:670  },
  { id:19, name:'Daniel George Morris',        depot:'dox2', status:'Fair',           totalScore:68.85, rank:19, wowChange:0, fico:770, ceDpmo:1, cdfDpmo:4255, pod:99.77, cc:100,   dcr:99.44, dscDpmo:0,    lorDpmo:0, deliveries:705  },
  { id:20, name:'Kamil Adrian Tudela',         depot:'dox2', status:'Fair',           totalScore:68.52, rank:20, wowChange:0, fico:780, ceDpmo:0, cdfDpmo:1754, pod:98.21, cc:50,    dcr:100,   dscDpmo:0,    lorDpmo:0, deliveries:570  },
  { id:21, name:'Dirley Ribeiro Costa',        depot:'dox2', status:'Fair',           totalScore:66.92, rank:21, wowChange:0, fico:790, ceDpmo:0, cdfDpmo:3469, pod:98.34, cc:100,   dcr:99.74, dscDpmo:0,    lorDpmo:0, deliveries:1153 },
  { id:22, name:'Danyal Sadiq',                depot:'dox2', status:'Fair',           totalScore:65,    rank:22, wowChange:0, fico:800, ceDpmo:0, cdfDpmo:4115, pod:100,   cc:88.89, dcr:99.67, dscDpmo:0,    lorDpmo:0, deliveries:1215 },
  { id:23, name:'Gabriel Ferreira Guimaraes',  depot:'dox2', status:'Fair',           totalScore:58.92, rank:23, wowChange:0, fico:830, ceDpmo:0, cdfDpmo:2833, pod:99.83, cc:81.82, dcr:98.70, dscDpmo:0,    lorDpmo:0, deliveries:1059 },
  { id:24, name:'Jijeesh Alppara',             depot:'dox2', status:'Fair',           totalScore:58.81, rank:24, wowChange:0, fico:840, ceDpmo:0, cdfDpmo:2967, pod:100,   cc:100,   dcr:99.80, dscDpmo:989,  lorDpmo:0, deliveries:1011 },
  { id:25, name:'George Eduard Usurelu',       depot:'dox2', status:'Fair',           totalScore:57.90, rank:25, wowChange:0, fico:850, ceDpmo:0, cdfDpmo:2517, pod:99.49, cc:59.09, dcr:98.59, dscDpmo:0,    lorDpmo:0, deliveries:1192 },
  { id:26, name:'Phillipe De Araujo Dantas',   depot:'dox2', status:'Fair',           totalScore:54.59, rank:26, wowChange:0, fico:860, ceDpmo:0, cdfDpmo:897,  pod:97.39, cc:80,    dcr:98.07, dscDpmo:0,    lorDpmo:0, deliveries:1115 },
  { id:27, name:'Amit Kumar',                  depot:'dox2', status:'Fair',           totalScore:52.32, rank:27, wowChange:0, fico:870, ceDpmo:0, cdfDpmo:7663, pod:100,   cc:98.66, dcr:97.94, dscDpmo:0,    lorDpmo:0, deliveries:1044 },
  { id:28, name:'Liam Michael Stewart',        depot:'dox2', status:'Fair',           totalScore:50.14, rank:28, wowChange:0, fico:880, ceDpmo:0, cdfDpmo:2361, pod:100,   cc:100,   dcr:98.49, dscDpmo:7084, lorDpmo:0, deliveries:847  },
  { id:29, name:'Rogerio de Souza Junior',     depot:'dox2', status:'Poor',           totalScore:45.86, rank:29, wowChange:0, fico:920, ceDpmo:0, cdfDpmo:4202, pod:100,   cc:100,   dcr:98.76, dscDpmo:4202, lorDpmo:0, deliveries:238  },
  { id:30, name:'Ondrej Bina',                 depot:'dox2', status:'Poor',           totalScore:44.71, rank:30, wowChange:0, fico:930, ceDpmo:0, cdfDpmo:3559, pod:100,   cc:95,    dcr:99.38, dscDpmo:2669, lorDpmo:0, deliveries:1124 },
  { id:31, name:'Philbert Nsaata',             depot:'dox2', status:'Poor',           totalScore:39.24, rank:31, wowChange:0, fico:950, ceDpmo:0, cdfDpmo:3314, pod:97.58, cc:90.91, dcr:99.42, dscDpmo:829,  lorDpmo:0, deliveries:1207 },
  { id:32, name:'Hassan Adam',                 depot:'dox2', status:'Poor',           totalScore:38.26, rank:32, wowChange:0, fico:960, ceDpmo:0, cdfDpmo:4600, pod:99.39, cc:99.87, dcr:98.46, dscDpmo:1840, lorDpmo:0, deliveries:1087 },
];

const WEEKS = [
  { id:1, label:'Semana 14', range:'31 Mar – 6 Apr 2025',  overallScore:87.2, overallStatus:'Great',    rank:4, rankChange:2  },
  { id:2, label:'Semana 15', range:'7 Apr – 13 Apr 2025',  overallScore:85.8, overallStatus:'Great',    rank:5, rankChange:-1 },
  { id:3, label:'Semana 16', range:'14 Apr – 20 Apr 2025', overallScore:89.1, overallStatus:'Fantastic',rank:3, rankChange:2  },
  { id:4, label:'Semana 17', range:'21 Apr – 27 Apr 2025', overallScore:91.3, overallStatus:'Fantastic',rank:2, rankChange:1  },
  { id:5, label:'Semana 19', range:'5 May – 11 May 2025',  overallScore:70.32,overallStatus:'Great',    rank:3, rankChange:-1 },
];

const DEPOTS = COMPANY_CONFIG.depots;

const MOTIVATIONAL_MESSAGES = {
  'pt-BR': {
    'Fantastic Plus': '🌟 Você é exemplar! Continue assim, você é inspiração para o time!',
    'Fantastic': '🚀 Desempenho excelente! Parabéns por estar sempre na ponta!',
    'Great': '👏 Ótimo trabalho! Você está no caminho certo, continue!',
    'Fair': '💪 Esforço é tudo! Você consegue melhorar, a gente acredita em você!',
    'Poor': '🎯 Vamos lá! Cada dia é uma chance de melhorar. Você consegue!'
  },
  'en-UK': {
    'Fantastic Plus': '🌟 You are exemplary! Keep it up, you are an inspiration to the team!',
    'Fantastic': '🚀 Excellent performance! Well done for always being at the top!',
    'Great': '👏 Great work! You are on the right track, keep going!',
    'Fair': '💪 Effort is everything! You can improve, we believe in you!',
    'Poor': '🎯 Come on! Every day is a chance to improve. You can do it!'
  }
};

const MANAGER_GREETING_MESSAGES = {
  'pt-BR': [
    '👋 Bem-vindo ao H2OL LogIQ! Vamos fazer um ótimo trabalho hoje!',
    '📊 Sua equipe depende do seu leadership. Bora revisar os dados!',
    '🚀 Semana de desafios? Vamos transformar em oportunidades!',
    '💡 Estratégia é tudo. Análise dos KPIs em 2 minutos?',
    '🏆 Quem vai brilhar esta semana? Descubra aqui!',
    '⚡ Dashboard atualizado. Vamos focar no que realmente importa!'
  ],
  'en-UK': [
    '👋 Welcome to H2OL LogIQ! Let\'s do great work today!',
    '📊 Your team counts on your leadership. Let\'s review the data!',
    '🚀 Week of challenges? Let\'s turn them into opportunities!',
    '💡 Strategy is everything. KPI analysis in 2 minutes?',
    '🏆 Who will shine this week? Find out here!',
    '⚡ Dashboard updated. Let\'s focus on what really matters!'
  ]
};

function generateWeekData(weekNum) {
  if (weekNum === 5) return BASE_DRIVERS.map(d => ({ ...d, week: 5 }));
  return BASE_DRIVERS.map(d => {
    const adj = parseFloat((Math.sin(d.id + weekNum) * 3).toFixed(2));
    const s = Math.min(100, Math.max(30, d.totalScore + adj));
    let st = s >= 95 ? 'Fantastic Plus' : s >= 88 ? 'Fantastic' : s >= 70 ? 'Great' : s >= 55 ? 'Fair' : 'Poor';
    return { ...d, totalScore: parseFloat(s.toFixed(2)), status: st, wowChange: adj, week: weekNum };
  });
}

const getSavedWeekData = (weekId) => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(`logiq-demo-week-${weekId}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

const saveWeekData = (weekId, rows) => {
  if (typeof window === 'undefined') return false;
  try {
    if (rows === null) {
      window.localStorage.removeItem(`logiq-demo-week-${weekId}`);
      return true;
    }
    window.localStorage.setItem(`logiq-demo-week-${weekId}`, JSON.stringify(rows));
    return true;
  } catch (e) {
    return false;
  }
};

const STATUS_META = {
  'Fantastic Plus': { bg:'#0a2818', border:'#15803d', text:'#4ade80', badge:'#15803d' },
  'Fantastic':      { bg:'#0d2e18', border:'#16a34a', text:'#86efac', badge:'#16a34a' },
  'Great':          { bg:'#2a2000', border:'#ca8a04', text:'#fde047', badge:'#ca8a04' },
  'Fair':           { bg:'#2a1200', border:'#ea580c', text:'#fb923c', badge:'#ea580c' },
  'Poor':           { bg:'#2a0808', border:'#dc2626', text:'#f87171', badge:'#dc2626' },
};

const mc = (v, t='good') => t==='good' ? (v>=99?'#4ade80':v>=95?'#fde047':'#f87171') : (v<=500?'#4ade80':v<=1500?'#fde047':'#f87171');

// ══════════════════════════════════════════════════════════
// USUÁRIOS DEFAULT
// ══════════════════════════════════════════════════════════
// Mescla usuários da config com IDs e driverId
const DEFAULT_USERS = COMPANY_CONFIG.defaultUsers.map((u, i) => ({
  id: u.id || `u${i+1}`,
  ...u,
  driverId: u.driverId || null,
}));

// ══════════════════════════════════════════════════════════
// KPI DEFINITIONS
// ══════════════════════════════════════════════════════════
const KPI_INFO = {
  DCR:       { full:'Delivery Completion Rate',          icon:'📦', desc:'Percentual de pacotes entregues com sucesso. Pacotes que retornam ao depot sem tentativa de reentrega afetam diretamente esta métrica.', tip:'Fazer reattempts é parte do trabalho! Alguns drivers terminam a rota 1h30 mais cedo — não há desculpa para não retentar.', fantastic:'≥ 99.5%', great:'≥ 98.5%', poor:'< 98%', goodHigh:true },
  'DSC DPMO':{ full:'Delivery Success Conditions DPMO',  icon:'🎯', desc:'Pacotes "entregues mas não recebidos" pelo cliente por milhão de entregas. Inclui: sem foto POD, fora de 25m, não seguindo preferências do cliente, entregue a vizinho sem autorização.', tip:'Fórmula: (reclamações ÷ entregas) × 1.000.000. Score ≤ 900 = Fantastic.', fantastic:'≤ 900', great:'≤ 1500', poor:'> 2500', goodHigh:false },
  'LoR DPMO':{ full:'Loss or Return DPMO',                icon:'🔍', desc:'Pacotes que não foram marcados como entregues OU entregues mas não retornaram à station em até 3 dias.', tip:'Confirme a entrega no app imediatamente. Qualquer pacote não contabilizado em 3 dias conta como defeito.', fantastic:'≤ 400', great:'≤ 1000', poor:'> 2000', goodHigh:false },
  POD:       { full:'Photo On Delivery',                  icon:'📸', desc:'Foto obrigatória em cada entrega. Superfície plana, parcel dentro do quadro branco, sem mãos/rostos/números de porta visíveis, sem ângulos cortados, sem fotos borradas.', tip:'Sem foto = entrega não confirmada = DSC DPMO sobe. Tire a foto ANTES de marcar como entregue.', fantastic:'≥ 99%', great:'≥ 95%', poor:'< 90%', goodHigh:true },
  CC:        { full:'Contact Compliance',                 icon:'📞', desc:'Uso do "Notify of Arrival" + chamada ao cliente. Obrigatório em TODA entrega. Negócio fechado, cliente ausente, problema de acesso ou endereço não encontrado: TENTE CONTACTAR 2 VEZES.', tip:'Envie mensagem E ligue para o cliente. Para cada entrega, sem exceção.', fantastic:'≥ 99%', great:'≥ 95%', poor:'< 90%', goodHigh:true },
  CE:        { full:'Customer Escalation',                icon:'🚨', desc:'Reclamação grave do cliente com evidências. É mais sério que o feedback comum — o cliente enviou provas de problema na entrega.', tip:'Cada CE é uma reclamação formal com impacto alto no score. Siga todos os procedimentos: POD, CC e preferências.', fantastic:'≤ 10', great:'≤ 30', poor:'> 50', goodHigh:false },
  'CDF DPMO':{ full:'Customer Delivery Feedback DPMO',   icon:'⭐', desc:'Feedback negativo do cliente por milhão de entregas. Avalia percepção geral da qualidade da entrega.', tip:'Score Fantastic = ≤ 4.420 DPMO. Cada detalhe importa: pontualidade, condição do pacote, cortesia.', fantastic:'≤ 4.420', great:'≤ 7.000', poor:'> 10.000', goodHigh:false },
};

// ══════════════════════════════════════════════════════════
// API HELPER
// ══════════════════════════════════════════════════════════
const callClaude = async (messages, system, maxTokens = 1024) => {
  const apiKey = (typeof localStorage !== 'undefined' && localStorage.getItem('logiq-api-key')) || '';
  if (!apiKey) {
    throw new Error('API key not configured. Open the API Key settings and enter your Anthropic key.');
  }
  const body = { model: 'claude-sonnet-4-6', max_tokens: maxTokens, messages };
  if (system) body.system = system;
  const headers = {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
    'x-api-key': apiKey,
  };
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const serverMessage = data?.error?.message || `HTTP ${res.status}`;
    if (/credit balance|low balance|insufficient credits/i.test(serverMessage)) {
      throw new Error('Saldo Anthropic insuficiente. Abra o Anthropic Plans & Billing para comprar créditos ou atualizar o plano.');
    }
    throw new Error(serverMessage);
  }
  if (!data.content || !Array.isArray(data.content)) {
    throw new Error('Invalid response format');
  }
  return data.content.map(b => b.text || '').join('') || '';
};

// ══════════════════════════════════════════════════════════
// LANGUAGE SYSTEM
// ══════════════════════════════════════════════════════════
const LangContext = createContext({ lang: 'pt-BR', setLang: () => {} });
const useLang = () => useContext(LangContext);

const KPI_INFO_EN = {
  DCR:       { full:'Delivery Completion Rate',          icon:'📦', desc:'Percentage of parcels successfully delivered. Parcels returned to depot without re-delivery attempt directly affect this metric.', tip:'Re-attempts are part of the job! Some drivers finish their route 1h30 early — there\'s no excuse not to retry.', fantastic:'≥ 99.5%', great:'≥ 98.5%', poor:'< 98%', goodHigh:true },
  'DSC DPMO':{ full:'Delivery Success Conditions DPMO',  icon:'🎯', desc:'Parcels "delivered but not received" by customer per million deliveries. Includes: no POD photo, outside 25m, not following customer preferences, delivered to neighbour without authorisation.', tip:'Formula: (complaints ÷ deliveries) × 1,000,000. Score ≤ 900 = Fantastic.', fantastic:'≤ 900', great:'≤ 1500', poor:'> 2500', goodHigh:false },
  'LoR DPMO':{ full:'Loss or Return DPMO',                icon:'🔍', desc:'Parcels not marked as delivered OR delivered but not returned to station within 3 days.', tip:'Confirm delivery in the app immediately. Any parcel not accounted for within 3 days counts as a defect.', fantastic:'≤ 400', great:'≤ 1000', poor:'> 2000', goodHigh:false },
  POD:       { full:'Photo On Delivery',                  icon:'📸', desc:'Mandatory photo on each delivery. Flat surface, parcel within the white frame, no hands/faces/door numbers visible, no cut angles, no blurry photos.', tip:'No photo = unconfirmed delivery = DSC DPMO rises. Take the photo BEFORE marking as delivered.', fantastic:'≥ 99%', great:'≥ 95%', poor:'< 90%', goodHigh:true },
  CC:        { full:'Contact Compliance',                 icon:'📞', desc:'Use of "Notify of Arrival" + call to customer. Mandatory on EVERY delivery. Business closed, customer absent, access issue or address not found: TRY CONTACTING TWICE.', tip:'Send message AND call the customer. For every delivery, no exception.', fantastic:'≥ 99%', great:'≥ 95%', poor:'< 90%', goodHigh:true },
  CE:        { full:'Customer Escalation',                icon:'🚨', desc:'Serious customer complaint with evidence. More serious than common feedback — the customer sent proof of a delivery problem.', tip:'Each CE is a formal complaint with high score impact. Follow all procedures: POD, CC and preferences.', fantastic:'≤ 10', great:'≤ 30', poor:'> 50', goodHigh:false },
  'CDF DPMO':{ full:'Customer Delivery Feedback DPMO',   icon:'⭐', desc:'Negative customer feedback per million deliveries. Assesses overall perception of delivery quality.', tip:'Fantastic score = ≤ 4,420 DPMO. Every detail matters: punctuality, parcel condition, courtesy.', fantastic:'≤ 4,420', great:'≤ 7,000', poor:'> 10,000', goodHigh:false },
};

const MSG_TEMPLATES = {
  'pt-BR': {
    driver: [
      { title:'🏆 Reconhecimento — Excelente Performance',   generate:(driver)=>`Olá ${driver.name}! 👋\n\nEsta semana foi excelente! Seu score de ${driver.totalScore.toFixed(1)} colocou você no nível ${driver.status} — resultado de muito esforço e foco nos processos.\n\nSeus pontos fortes:\n✅ Entregas consistentes\n✅ POD e CC bem aplicados\n✅ Boa postura operacional\n\nContinue assim! Você é um dos pilares da nossa equipe H2OL. 💪\n\n— Phillipe Dantas | Gestor H2OL` },
      { title:'⚠️ Alerta — Melhoria Necessária',             generate:(driver)=>`Olá ${driver.name},\n\nPrecisamos melhorar sua performance. Seu score atual é ${driver.totalScore.toFixed(1)} (${driver.status}).\n\nPontos de atenção:\n• Revisar cada entrega com checklist de POD\n• Fazer Notify of Arrival + chamada em TODAS as entregas\n• Tentar reattempt antes de retornar ao depot\n• Seguir preferência do cliente e evitar entregas fora do local\n\nVamos conversar esta semana e definir ações claras. Estou aqui para apoiar. 💪\n\n— Phillipe Dantas | Gestor H2OL` },
      { title:'🎯 Alerta — DSC DPMO Elevado',                generate:(driver)=>`Olá ${driver.name},\n\nSeu DSC DPMO está em ${driver.dscDpmo} — acima da meta de ≤ 900. Isso significa que muitas entregas foram registradas como entregues, mas não recebidas corretamente pelo cliente.\n\nAções imediatas:\n1. Foto POD correta em TODAS as entregas\n2. Confirmar se a entrega atende às preferências do cliente\n3. Evitar entregas para vizinhos, recepcionistas, caixas postais ou fora de 25m\n4. Se houver problema, contacte o cliente 2x antes de retornar\n\nPreciso ver correção nesta semana.\n\n— Phillipe Dantas | Gestor H2OL` },
      { title:'📦 Alerta — DCR Abaixo da Meta',              generate:(driver)=>`Olá ${driver.name},\n\nSeu DCR está em ${driver.dcr.toFixed(2)}% — abaixo da meta de ≥ 99%. Isso indica pacotes retornando ao depot sem reattempts suficientes.\n\nMelhorias imediatas:\n• Sempre tentar reentregar antes de encerrar a rota\n• Verificar rota e endereço antes de marcar como falha\n• Contactar o cliente quando houver acesso ou ausência\n• Não voltar ao depot sem conversar com o cliente duas vezes\n\nVamos recuperar esse número rápido.\n\n— Phillipe Dantas | Gestor H2OL` },
      { title:'📸 Alerta — POD / CC / LoR / CDF',            generate:(driver)=>`Olá ${driver.name},\n\nSuas métricas apontam riscos importantes: POD ${driver.pod.toFixed(1)}%, CC ${driver.cc.toFixed(1)}%, LoR DPMO ${driver.lorDpmo}, CDF DPMO ${driver.cdfDpmo}.\n\nO que isso significa:\n• POD baixo = fotos incorretas ou faltando\n• CC baixo = Notify of Arrival ou chamada não feita\n• LoR alto = entregas não marcadas ou não retornando à station em 3 dias\n• CDF alto = reclamações graves de clientes\n\nAções imediatas:\n1. Foto correta em cada entrega\n2. Notify of Arrival + chamada em TODAS as entregas\n3. Confirmar retorno de pacotes em até 3 dias\n4. Resolver reclamações com calma e registrar evidências\n\nEssas ações são essenciais para proteger seu score e o ranking do time.\n\n— Phillipe Dantas | Gestor H2OL` },
      { title:'🌟 Parabéns — Subiu de Nível!',               generate:(driver)=>`🎉 Parabéns ${driver.name}!\n\nVocê subiu para ${driver.status} com score ${driver.totalScore.toFixed(1)}! Este é o resultado do seu esforço em seguir os processos.\n\nContinue com esse ritmo. Sua evolução inspira toda a equipe. 🏆\n\n— Phillipe Dantas | Gestor H2OL` },
    ],
    manager: [
      { priority:'alta',  title:'📊 Resumo Executivo Semanal',       generate:(ctx)=>`📊 RESUMO EXECUTIVO — H2OL DOX2\nSemana: ${ctx.week}\n\nScore geral da equipe: ${ctx.avgScore.toFixed(1)} | Status: ${ctx.avgStatus}\nTotal de drivers avaliados: ${ctx.drivers.length}\nDrivers em atenção: ${ctx.atRisk.length}\nDrivers em nível crítico (< 70): ${ctx.belowSeventy.length}\n\nAnálise:\nA equipe encerrou a semana com status ${ctx.avgStatus}. ${ctx.avgScore>=95?'Excelente resultado — manter padrão e reconhecer top performers.':ctx.avgScore>=88?'Boa performance, com oportunidade de buscar Fantastic Plus.':ctx.avgScore>=70?'Resultado aceitável — exige acompanhamento dos pontos críticos.':'Resultado crítico — requer plano de ação imediato.'}\n${ctx.criticalKpis.length>0?`Os principais pontos de atenção estão em: ${ctx.criticalKpis.join(', ')}.`:''}\n\nDrivers que precisam de acompanhamento:\n${ctx.criticalList.length>0?ctx.criticalList.map(d=>{const prob=d.dscDpmo>900?'DSC DPMO: '+d.dscDpmo:d.dcr<99?'DCR: '+d.dcr.toFixed(2)+'%':d.pod<99?'POD: '+d.pod.toFixed(1)+'%':d.cc<99?'CC: '+d.cc.toFixed(1)+'%':'Score baixo';return`• ${d.name} — Score: ${d.totalScore.toFixed(1)} | ${d.status} | ${prob}`}).join('\n'):'✅ Nenhum driver abaixo de 70.'}\n\nDecisão recomendada:\n- Priorizar acompanhamento individual dos drivers abaixo de 70.\n- Revisar rotas com maior incidência de DSC DPMO.\n- Reforçar procedimento de POD e Contact Compliance.\n- Acompanhar evolução diária até o próximo scorecard.\n\nO foco da próxima semana deve ser reduzir defeitos operacionais e recuperar drivers em zona de risco.\n\n— Phillipe Dantas | Gestor H2OL` },
      { priority:'alta',  title:'🚨 Alerta de Performance Crítica',  generate:(ctx)=>`🚨 ALERTA OPERACIONAL — PERFORMANCE CRÍTICA\n\n${ctx.criticalList.length>0?`Os seguintes drivers precisam de intervenção imediata:\n\n${ctx.criticalList.map(d=>{const prob=d.dscDpmo>900?'DSC DPMO: '+d.dscDpmo:d.dcr<99?'DCR: '+d.dcr.toFixed(2)+'%':d.pod<99?'POD: '+d.pod.toFixed(1)+'%':d.cc<99?'CC: '+d.cc.toFixed(1)+'%':'Score geral baixo';return`• ${d.name} — Score: ${d.totalScore.toFixed(1)} | Status: ${d.status} | Problema principal: ${prob}`}).join('\n')}`:'✅ Nenhum driver em status crítico esta semana.'}\n\nAnálise:\nEsses drivers estão impactando diretamente o resultado geral da DSP. A prioridade é corrigir comportamentos que afetam DCR, DSC DPMO, POD e CC.\n\nAção recomendada:\n1. Conversa individual ainda esta semana.\n2. Revisão dos últimos erros por driver.\n3. Definir meta individual para a próxima semana.\n4. Acompanhar evolução diária.\n5. Registrar feedback e plano de ação.\n\nPrioridade: 🔴 Alta\n\n— Phillipe Dantas | Gestor H2OL` },
      { priority:'media', title:'🎯 Meta da Semana',                  generate:(ctx)=>`🎯 META DA SEMANA — H2OL\n${ctx.week}\n\nObjetivo principal:\nElevar o score da equipe para 88+ e alcançar status Fantastic.\n\nKPIs prioritários:\n• POD: manter acima de 99%\n• CC: manter acima de 99%\n• DCR: manter acima de 99%\n• DSC DPMO: reduzir para abaixo de 900\n\nFoco operacional:\n- Nenhuma entrega sem foto válida.\n- Contact Compliance obrigatório em todas as tentativas.\n- Reattempt antes de retornar pacote ao depot.\n- Seguir preferência do cliente.\n- Evitar entrega fora do local correto.\n\nMensagem para liderança:\nA meta é alcançável se os ${ctx.atRisk.length} driver(s) em atenção forem acompanhados de perto e os procedimentos básicos forem reforçados diariamente.\n\n— Phillipe Dantas | Gestor H2OL` },
      { priority:'alta',  title:'📋 Plano de Ação Gerencial',         generate:(ctx)=>`📋 PLANO DE AÇÃO — GERÊNCIA H2OL\n${ctx.week}\n\nDiagnóstico:\nCom base no scorecard atual, a equipe apresenta score de ${ctx.avgScore.toFixed(1)} (${ctx.avgStatus}). ${ctx.belowSeventy.length>0?`${ctx.belowSeventy.length} driver(s) estão abaixo de 70 e requerem ação imediata.`:'Nenhum driver abaixo de 70 esta semana.'}\n${ctx.criticalKpis.length>0?`Os maiores riscos estão em: ${ctx.criticalKpis.join(', ')}.`:''}\n\nAções imediatas:\n1. Identificar drivers abaixo da meta.\n2. Separar drivers por tipo de problema: DCR, DSC, POD, CC.\n3. Enviar feedback individual.\n4. Monitorar reincidência.\n5. Reconhecer drivers com Fantastic e Fantastic Plus.\n\nDrivers prioritários:\n${ctx.criticalList.length>0?ctx.criticalList.map(d=>`• ${d.name} — Score: ${d.totalScore.toFixed(1)} | ${d.status}`).join('\n'):'✅ Sem drivers críticos.'}\n\nResultado esperado:\nRedução de defects, aumento do score médio e recuperação dos drivers em zona de risco.\n\n— Phillipe Dantas | Gestor H2OL` },
      { priority:'baixa', title:'🗣️ Mensagem para Reunião',           generate:(ctx)=>`🗣️ MENSAGEM PARA REUNIÃO — H2OL DOX2\n\nEquipe, nesta semana nosso score foi ${ctx.avgScore.toFixed(1)}, com status ${ctx.avgStatus}.\n\n${ctx.avgScore>=88?'Tivemos um excelente resultado! Parabéns a todos.':'Temos oportunidade de melhorar. Precisamos focar nos pontos críticos.'}\n\nPontos importantes:\n- POD precisa ser feito corretamente em todas as entregas.\n- Contact Compliance é obrigatório.\n- Pacotes não devem retornar sem reattempt.\n- Preferências do cliente precisam ser respeitadas.\n- Qualquer problema na rota deve ser reportado rapidamente.\n\n${ctx.atRisk.length>0?`Atenção especial: ${ctx.atRisk.length} driver(s) precisam de acompanhamento esta semana.\n`:''}Nossa meta para a próxima semana:\nAlcançar status Fantastic (88+) com DSC DPMO abaixo de 900.\n\nConto com todos para elevarmos o padrão. Juntos chegamos lá! 💪\n\n— Phillipe Dantas | Gestor H2OL` },
    ]
  },
  'en-UK': {
    driver: [
      { title:'🏆 Recognition — Excellent Performance',      generate:(driver)=>`Hi ${driver.name}! 👋\n\nThis week was excellent! Your score of ${driver.totalScore.toFixed(1)} placed you at ${driver.status} level — the result of strong execution and attention to process.\n\nYour strengths:\n✅ Consistent deliveries\n✅ POD and CC on point\n✅ Professional operation\n\nKeep it up! You are one of the pillars of our H2OL team. 💪\n\n— Phillipe Dantas | H2OL Manager` },
      { title:'⚠️ Alert — Improvement Needed',              generate:(driver)=>`Hi ${driver.name},\n\nWe need to improve your performance. Your current score is ${driver.totalScore.toFixed(1)} (${driver.status}).\n\nAreas needing attention:\n• Review every delivery with POD checklist\n• Use Notify of Arrival + call on EVERY delivery\n• Attempt re-delivery before returning to depot\n• Follow customer preferences and avoid off-location deliveries\n\nLet’s talk this week and set clear actions. I’m here to support you. 💪\n\n— Phillipe Dantas | H2OL Manager` },
      { title:'🎯 Alert — High DSC DPMO',                   generate:(driver)=>`Hi ${driver.name},\n\nYour DSC DPMO is ${driver.dscDpmo} — above the target of ≤ 900. This means deliveries were marked but not actually received under the proper customer conditions.\n\nImmediate actions:\n1. Take a correct POD photo on EVERY delivery\n2. Confirm the client’s delivery preference\n3. Do NOT deliver to neighbours, reception, mailbox or outside 25m\n4. If there is an issue, contact the customer twice before returning\n\nI need to see improvement this week.\n\n— Phillipe Dantas | H2OL Manager` },
      { title:'📦 Alert — DCR Below Target',                 generate:(driver)=>`Hi ${driver.name},\n\nYour DCR is ${driver.dcr.toFixed(2)}% — below the target of ≥ 99%. This means parcels are returning to depot without enough reattempts.\n\nHow to improve:\n• Always reattempt before ending the route\n• Check address before marking as failed\n• Contact the customer when absent\n• Do not return to depot without two contact attempts\n\nI believe in you — this week we’ll hit 99%!\n\n— Phillipe Dantas | H2OL Manager` },
      { title:'📸 Alert — POD / CC / LoR / CDF',            generate:(driver)=>`Hi ${driver.name},\n\nYour current metrics are: POD ${driver.pod.toFixed(1)}%, CC ${driver.cc.toFixed(1)}%, LoR DPMO ${driver.lorDpmo}, CDF DPMO ${driver.cdfDpmo}.\n\nWhat this means:\n• Low POD = photos are incorrect or missing\n• Low CC = Notify of Arrival or call not done\n• High LoR = parcels not marked or not returned to station within 3 days\n• High CDF = serious customer complaints\n\nImmediate actions:\n1. Take the correct photo on every delivery\n2. Use Notify of Arrival + call on EVERY delivery\n3. Confirm parcel return status within 3 days\n4. Resolve complaints calmly and document evidence\n\nThese actions are essential to protect your score and the team’s ranking.\n\n— Phillipe Dantas | H2OL Manager` },
      { title:'🌟 Congratulations — Level Up!',              generate:(driver)=>`🎉 Congratulations ${driver.name}!\n\nYou’ve moved to ${driver.status} with a score of ${driver.totalScore.toFixed(1)}! This is the result of applying process discipline consistently.\n\nKeep this momentum going. Your progress inspires the whole team. 🏆\n\n— Phillipe Dantas | H2OL Manager` },
    ],
    manager: [
      { priority:'alta',  title:'📊 Weekly Executive Summary',        generate:(ctx)=>`📊 EXECUTIVE SUMMARY — H2OL DOX2\nWeek: ${ctx.week}\n\nOverall team score: ${ctx.avgScore.toFixed(1)} | Status: ${ctx.avgStatus}\nTotal drivers assessed: ${ctx.drivers.length}\nDrivers needing attention: ${ctx.atRisk.length}\nCritical drivers (< 70): ${ctx.belowSeventy.length}\n\nAnalysis:\nThe team closed the week with ${ctx.avgStatus} status. ${ctx.avgScore>=95?'Excellent result — maintain standards and recognise top performers.':ctx.avgScore>=88?'Good performance, with opportunity to reach Fantastic Plus.':ctx.avgScore>=70?'Acceptable result — critical KPIs need monitoring.':'Critical result — immediate action plan required.'}\n${ctx.criticalKpis.length>0?`Main areas of concern: ${ctx.criticalKpis.join(', ')}.`:''}\n\nDrivers requiring follow-up:\n${ctx.criticalList.length>0?ctx.criticalList.map(d=>{const prob=d.dscDpmo>900?'DSC DPMO: '+d.dscDpmo:d.dcr<99?'DCR: '+d.dcr.toFixed(2)+'%':d.pod<99?'POD: '+d.pod.toFixed(1)+'%':d.cc<99?'CC: '+d.cc.toFixed(1)+'%':'Low score';return`• ${d.name} — Score: ${d.totalScore.toFixed(1)} | ${d.status} | ${prob}`}).join('\n'):'✅ No drivers below 70.'}\n\nRecommended actions:\n- Prioritise individual coaching for drivers below 70.\n- Review routes with highest DSC DPMO incidence.\n- Reinforce POD and Contact Compliance procedures.\n- Monitor daily progress until next scorecard.\n\nNext week's focus: reduce operational defects and recover at-risk drivers.\n\n— Phillipe Dantas | H2OL Manager` },
      { priority:'alta',  title:'🚨 Critical Performance Alert',      generate:(ctx)=>`🚨 OPERATIONAL ALERT — CRITICAL PERFORMANCE\n\n${ctx.criticalList.length>0?`The following drivers need immediate intervention:\n\n${ctx.criticalList.map(d=>{const prob=d.dscDpmo>900?'DSC DPMO: '+d.dscDpmo:d.dcr<99?'DCR: '+d.dcr.toFixed(2)+'%':d.pod<99?'POD: '+d.pod.toFixed(1)+'%':d.cc<99?'CC: '+d.cc.toFixed(1)+'%':'Overall low score';return`• ${d.name} — Score: ${d.totalScore.toFixed(1)} | Status: ${d.status} | Main issue: ${prob}`}).join('\n')}`:'✅ No drivers in critical status this week.'}\n\nAnalysis:\nThese drivers are directly impacting the DSP's overall result. Priority is to correct behaviours affecting DCR, DSC DPMO, POD and CC.\n\nRecommended actions:\n1. Individual conversation this week.\n2. Review recent errors per driver.\n3. Set individual target for next week.\n4. Monitor daily progress.\n5. Record feedback and action plan.\n\nPriority: 🔴 High\n\n— Phillipe Dantas | H2OL Manager` },
      { priority:'media', title:'🎯 Weekly Target',                   generate:(ctx)=>`🎯 WEEKLY TARGET — H2OL\n${ctx.week}\n\nMain objective:\nRaise team score to 88+ and reach Fantastic status.\n\nPriority KPIs:\n• POD: maintain above 99%\n• CC: maintain above 99%\n• DCR: maintain above 99%\n• DSC DPMO: reduce to below 900\n\nOperational focus:\n- No delivery without a valid photo.\n- Contact Compliance mandatory on all attempts.\n- Reattempt before returning parcel to depot.\n- Follow customer preferences.\n- Avoid delivery outside correct location.\n\nMessage for leadership:\nThe target is achievable if the ${ctx.atRisk.length} driver(s) needing attention are closely monitored and basic procedures are reinforced daily.\n\n— Phillipe Dantas | H2OL Manager` },
      { priority:'alta',  title:'📋 Management Action Plan',          generate:(ctx)=>`📋 ACTION PLAN — H2OL MANAGEMENT\n${ctx.week}\n\nDiagnosis:\nBased on the current scorecard, the team shows a score of ${ctx.avgScore.toFixed(1)} (${ctx.avgStatus}). ${ctx.belowSeventy.length>0?`${ctx.belowSeventy.length} driver(s) are below 70 and require immediate action.`:'No drivers below 70 this week.'}\n${ctx.criticalKpis.length>0?`Highest risks are in: ${ctx.criticalKpis.join(', ')}.`:''}\n\nImmediate actions:\n1. Identify drivers below target.\n2. Group drivers by issue type: DCR, DSC, POD, CC.\n3. Send individual feedback.\n4. Monitor for recurrence.\n5. Recognise Fantastic and Fantastic Plus drivers.\n\nPriority drivers:\n${ctx.criticalList.length>0?ctx.criticalList.map(d=>`• ${d.name} — Score: ${d.totalScore.toFixed(1)} | ${d.status}`).join('\n'):'✅ No critical drivers.'}\n\nExpected outcome:\nReduction in defects, higher average score and recovery of at-risk drivers.\n\n— Phillipe Dantas | H2OL Manager` },
      { priority:'baixa', title:'🗣️ Team Meeting Message',            generate:(ctx)=>`🗣️ TEAM MEETING MESSAGE — H2OL DOX2\n\nTeam, this week our score was ${ctx.avgScore.toFixed(1)}, with ${ctx.avgStatus} status.\n\n${ctx.avgScore>=88?'We had an excellent result! Well done everyone.':'We have room to improve. We need to focus on critical points.'}\n\nKey points:\n- POD must be done correctly on every delivery.\n- Contact Compliance is mandatory.\n- Parcels must not be returned without a reattempt.\n- Customer preferences must be respected.\n- Any route issue must be reported promptly.\n\n${ctx.atRisk.length>0?`Special attention: ${ctx.atRisk.length} driver(s) need follow-up this week.\n`:''}Our target for next week:\nReach Fantastic status (88+) with DSC DPMO below 900.\n\nI'm counting on everyone to raise the standard. Let's go! 💪\n\n— Phillipe Dantas | H2OL Manager` },
    ]
  }
};

// ══════════════════════════════════════════════════════════
// VELOCÍMETRO
// ══════════════════════════════════════════════════════════
function Speedometer({ score, size='lg', label }) {
  const isLg = size==='lg', sz = isLg?130:72, cx=sz/2, cy=sz/2, r=isLg?48:26, strokeW=isLg?10:6;
  const pct = Math.min(100,Math.max(0,score))/100;
  // Cores exatas do Amazon Scorecard:
  // < 55  → Vermelho (Poor)
  // 55-70 → Laranja (Fair)
  // 70-88 → Amarelo (Great)
  // 88-95 → Verde claro (Fantastic)
  // 95+   → Verde escuro (Fantastic Plus)
  const color = score>=95?'#22c55e':score>=88?'#4ade80':score>=70?'#fde047':score>=55?'#fb923c':'#ef4444';
  const toRad = deg => deg*Math.PI/180;
  const arc = deg => ({ x: cx+r*Math.cos(toRad(deg)), y: cy+r*Math.sin(toRad(deg)) });
  const start=210, total=240;
  const s0=arc(start), e0=arc(start+total);
  const trackPath=`M ${s0.x} ${s0.y} A ${r} ${r} 0 1 1 ${e0.x} ${e0.y}`;
  const fd=pct*total, ef=arc(start+fd), la=fd>180?1:0;
  const fillPath=fd>0?`M ${s0.x} ${s0.y} A ${r} ${r} 0 ${la} 1 ${ef.x} ${ef.y}`:'';
  const na=start+pct*total, nLen=r-strokeW-2;
  const nx=cx+nLen*Math.cos(toRad(na)), ny=cy+nLen*Math.sin(toRad(na));
  const zones=[
    {from:0,    to:0.55, c:'#ef4444'},  // Poor — vermelho
    {from:0.55, to:0.70, c:'#fb923c'},  // Fair — laranja
    {from:0.70, to:0.88, c:'#fde047'},  // Great — amarelo
    {from:0.88, to:0.95, c:'#4ade80'},  // Fantastic — verde claro
    {from:0.95, to:1.00, c:'#22c55e'},  // Fantastic Plus — verde escuro
  ];
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
      {label && <div style={{color:'#94a3b8',fontSize:isLg?10:8,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:2}}>{label}</div>}
      <svg width={sz} height={sz*0.72} viewBox={`0 0 ${sz} ${sz*0.72}`} style={{overflow:'visible'}}>
        <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeW} strokeLinecap="round"/>
        {zones.map((z,i)=>{
          const sa=start+z.from*total, ea=start+z.to*total, ps=arc(sa), pe=arc(ea), la2=(z.to-z.from)*total>180?1:0;
          return <path key={i} d={`M ${ps.x} ${ps.y} A ${r} ${r} 0 ${la2} 1 ${pe.x} ${pe.y}`} fill="none" stroke={z.c} strokeWidth={strokeW} strokeLinecap="butt" opacity={0.2}/>;
        })}
        {fillPath && <path d={fillPath} fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" style={{filter:`drop-shadow(0 0 ${isLg?6:3}px ${color})`,transition:'all 1.2s cubic-bezier(.4,0,.2,1)'}}/>}
        {[{p:0,l:isLg?'0':''},{p:0.55,l:isLg?'55':''},{p:0.70,l:isLg?'70':''},{p:0.88,l:isLg?'88':''},{p:0.95,l:isLg?'95':''},{p:1,l:isLg?'100':''}].map((t,i)=>{
          const a=start+t.p*total, inn={x:cx+(r-strokeW-5)*Math.cos(toRad(a)),y:cy+(r-strokeW-5)*Math.sin(toRad(a))}, out={x:cx+(r+3)*Math.cos(toRad(a)),y:cy+(r+3)*Math.sin(toRad(a))}, lb={x:cx+(r+(isLg?12:8))*Math.cos(toRad(a)),y:cy+(r+(isLg?12:8))*Math.sin(toRad(a))};
          return <g key={i}><line x1={inn.x} y1={inn.y} x2={out.x} y2={out.y} stroke="rgba(255,255,255,0.3)" strokeWidth={isLg?1.5:1}/>{t.l&&<text x={lb.x} y={lb.y} fill="rgba(255,255,255,0.35)" fontSize={isLg?7:0} textAnchor="middle" dominantBaseline="middle">{t.l}</text>}</g>;
        })}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth={isLg?2.5:1.5} strokeLinecap="round" style={{filter:`drop-shadow(0 0 4px ${color})`,transition:'all 1.2s cubic-bezier(.4,0,.2,1)'}}/>
        <circle cx={cx} cy={cy} r={isLg?5:3} fill={color} style={{filter:`drop-shadow(0 0 4px ${color})`}}/>
        <circle cx={cx} cy={cy} r={isLg?2.5:1.5} fill="#0d1527"/>
        {isLg && <text x={cx} y={cy+r*.55} fill={color} fontSize={16} fontWeight={900} textAnchor="middle" style={{filter:`drop-shadow(0 0 8px ${color}90)`}}>{score.toFixed(1)}</text>}
      </svg>
      {!isLg && <div style={{color,fontSize:11,fontWeight:800,marginTop:-2,textShadow:`0 0 8px ${color}80`}}>{score.toFixed(0)}</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// KPI CARD EXPANSÍVEL
// ══════════════════════════════════════════════════════════
function KpiCard({ label, value, ok, target }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const info = lang==='en-UK' ? (KPI_INFO_EN[label]||KPI_INFO[label]) : KPI_INFO[label];
  const color = ok ? '#4ade80' : '#f87171';
  return (
    <div style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${ok?'rgba(74,222,128,0.18)':'rgba(248,113,113,0.22)'}`,borderRadius:14,overflow:'hidden'}}>
      <div onClick={()=>setOpen(!open)} style={{padding:'13px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {info && <span style={{fontSize:18}}>{info.icon}</span>}
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:13}}>{label}</div>
            {info && <div style={{color:'#475569',fontSize:10}}>{info.full}</div>}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{textAlign:'right'}}>
            <div style={{color,fontSize:18,fontWeight:800}}>{value}</div>
            <div style={{color:'#475569',fontSize:10}}>Meta: {target}</div>
          </div>
          <div style={{color,fontWeight:700,fontSize:13}}>{ok?'✓':'⚠'}</div>
          <div style={{color:'#475569',fontSize:12,transition:'transform .2s',transform:open?'rotate(180deg)':'none'}}>▾</div>
        </div>
      </div>
      {open && info && (
        <div style={{padding:'0 18px 14px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{paddingTop:12,display:'flex',flexDirection:'column',gap:10}}>
            <div style={{background:'rgba(0,0,0,0.25)',borderRadius:10,padding:'10px 14px'}}>
              <div style={{color:'#94a3b8',fontSize:11,fontWeight:600,marginBottom:4}}>📋 O QUE É</div>
              <div style={{color:'#cbd5e1',fontSize:12,lineHeight:1.6}}>{info.desc}</div>
            </div>
            <div style={{background:ok?'rgba(74,222,128,0.06)':'rgba(251,146,60,0.08)',borderRadius:10,padding:'10px 14px',border:`1px solid ${ok?'rgba(74,222,128,0.15)':'rgba(251,146,60,0.2)'}`}}>
              <div style={{color:ok?'#4ade80':'#fb923c',fontSize:11,fontWeight:600,marginBottom:4}}>💡 {ok?'CONTINUE ASSIM':'COMO MELHORAR'}</div>
              <div style={{color:'#cbd5e1',fontSize:12,lineHeight:1.6}}>{info.tip}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              {[{l:'Fantastic',v:info.fantastic,c:'#4ade80'},{l:'Great',v:info.great,c:'#fde047'},{l:'Poor',v:info.poor,c:'#f87171'}].map(z=>(
                <div key={z.l} style={{flex:1,background:'rgba(0,0,0,0.2)',borderRadius:8,padding:'6px 8px',textAlign:'center'}}>
                  <div style={{color:z.c,fontSize:9,fontWeight:700}}>{z.l}</div>
                  <div style={{color:'#94a3b8',fontSize:10,marginTop:2}}>{z.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════
function LoginScreen({ onLogin, users }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!email || !password) { setError('Preencha email e senha.'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 600));
    const u = users.find(u => u.email.toLowerCase()===email.toLowerCase() && u.password===password);
    if (!u) { setError('Email ou senha incorretos.'); setLoading(false); return; }
    onLogin(u);
  };

  const roleHints = [
    { role:'Admin',   email:'admin@h2ol.com',   pw:'admin123',   icon:'🛡️', color:'#a78bfa' },
    { role:'Gerente', email:'manager@h2ol.com', pw:'manager123', icon:'📊', color:'#7dd3fc' },
    { role:'Driver',  email:'driver@h2ol.com', pw:'driver123',  icon:'🚚', color:'#4ade80' },
  ];

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#05080f 0%,#0d1527 55%,#060d1a 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <div style={{width:'100%',maxWidth:440}}>
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{width:72,height:72,background:'linear-gradient(135deg,#FF9900,#FF6B35)',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:32,fontWeight:900,color:'#fff',boxShadow:'0 0 48px rgba(255,153,0,0.3)'}}>L</div>
          <h1 style={{color:'#fff',fontSize:30,fontWeight:900,margin:0}}>Amazon <span style={{color:'#FF9900'}}>LogIQ</span></h1>
          <p style={{color:'#475569',margin:'6px 0 0',fontSize:14}}>Plataforma de Inteligência Logística · H2OL</p>
        </div>

        {/* Card login */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:20,padding:28}}>
          <h2 style={{color:'#fff',fontSize:18,fontWeight:800,margin:'0 0 22px'}}>Entrar na plataforma</h2>

          {/* Email */}
          <div style={{marginBottom:14}}>
            <label style={{color:'#64748b',fontSize:12,fontWeight:600,display:'block',marginBottom:6}}>EMAIL</label>
            <input value={email} onChange={e=>{setEmail(e.target.value);setError('');}} onKeyDown={e=>e.key==='Enter'&&handle()}
              placeholder="seu@email.com" type="email"
              style={{width:'100%',background:'rgba(0,0,0,0.35)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',boxSizing:'border-box'}}/>
          </div>

          {/* Senha */}
          <div style={{marginBottom:20}}>
            <label style={{color:'#64748b',fontSize:12,fontWeight:600,display:'block',marginBottom:6}}>SENHA</label>
            <div style={{position:'relative'}}>
              <input value={password} onChange={e=>{setPassword(e.target.value);setError('');}} onKeyDown={e=>e.key==='Enter'&&handle()}
                placeholder="••••••••" type={showPw?'text':'password'}
                style={{width:'100%',background:'rgba(0,0,0,0.35)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:10,padding:'11px 44px 11px 14px',fontSize:14,outline:'none',boxSizing:'border-box'}}/>
              <button onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:16}}>
                {showPw?'🙈':'👁️'}
              </button>
            </div>
          </div>

          {error && <div style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.25)',borderRadius:9,padding:'9px 14px',color:'#f87171',fontSize:13,marginBottom:16}}>{error}</div>}

          <button onClick={handle} disabled={loading} style={{width:'100%',background:loading?'rgba(255,153,0,0.4)':'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:11,padding:'13px',fontWeight:800,cursor:loading?'not-allowed':'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            {loading ? <><span style={{animation:'spin .8s linear infinite',display:'inline-block'}}>⚙️</span> Verificando...</> : 'Entrar →'}
          </button>
        </div>

        {/* Demo accounts */}
        <div style={{marginTop:20,background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16}}>
          <div style={{color:'#475569',fontSize:11,fontWeight:700,marginBottom:12,textTransform:'uppercase',letterSpacing:1}}>Contas Demo — clique para preencher</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {roleHints.map(h=>(
              <button key={h.role} onClick={()=>{setEmail(h.email);setPassword(h.pw);setError('');}}
                style={{background:'rgba(0,0,0,0.2)',border:`1px solid ${h.color}25`,borderRadius:10,padding:'10px 14px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,transition:'all .15s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=`${h.color}50`}
                onMouseLeave={e=>e.currentTarget.style.borderColor=`${h.color}25`}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:18}}>{h.icon}</span>
                  <div style={{textAlign:'left'}}>
                    <div style={{color:h.color,fontWeight:700,fontSize:13}}>{h.role}</div>
                    <div style={{color:'#475569',fontSize:11}}>{h.email}</div>
                  </div>
                </div>
                <div style={{color:'#334155',fontSize:11}}>{h.pw}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// QUICK IMPORT MODAL - Upload 3 PDFs in 20 seconds
// ══════════════════════════════════════════════════════════
function QuickImportModal({ onClose, onDataImported }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [week, setWeek] = useState(5);
  const [depot, setDepot] = useState('dox2');
  const [files, setFiles] = useState({company:null, drivers:null, concessions:null});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const detectPDFType = (fileName) => {
    const lower = fileName.toLowerCase();
    if (lower.includes('company') || lower.includes('empresa') || lower.includes('geral')) return 'company';
    if (lower.includes('driver') || lower.includes('motorista') || lower.includes('score')) return 'drivers';
    if (lower.includes('concession') || lower.includes('concess') || lower.includes('postcode')) return 'concessions';
    return null;
  };

  const handleFiles = (newFiles) => {
    setError('');
    const fileArray = Array.from(newFiles);
    if (fileArray.length > 3) { setError(isEN ? 'Max 3 files' : 'Máximo 3 arquivos'); return; }

    const detected = {company:null, drivers:null, concessions:null};

    for (const file of fileArray) {
      const type = detectPDFType(file.name);
      if (type && !detected[type]) {
        detected[type] = file;
      }
    }

    setFiles(detected);
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const extractFromPDF = async (file) => {
    if (!file) return null;
    try {
      const base64 = await fileToBase64(file);
      const apiKey = typeof localStorage !== 'undefined' && localStorage.getItem('logiq-api-key');

      if (!apiKey) {
        setError(isEN ? '❌ API Key not configured. Configure in Settings (⚙️)' : '❌ API Key não configurada. Configure em Configurações (⚙️)');
        throw new Error('No API key');
      }

      setProgress(isEN ? '🔄 Analyzing ' + file.name + '...' : '🔄 Analisando ' + file.name + '...');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: 'Extract driver scorecard data from this PDF. Return ONLY valid JSON: { "drivers": [{ "id": number, "name": string, "totalScore": number, "dcr": number, "dscDpmo": number, "pod": number, "cc": number, "deliveries": number }] }. If not a driver scorecard, return empty array.' },
              { type: 'image', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }
            ]
          }]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'API Error');
      }

      const data = await response.json();
      const text = data.content[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return { drivers: [] };

      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      setError((isEN ? 'Error analyzing ' : 'Erro ao analisar ') + file.name + ': ' + e.message);
      return { drivers: [] };
    }
  };

  const handleConfirm = async () => {
    if (!files.drivers) {
      setError(isEN ? 'Driver PDF required' : 'PDF de Motoristas é obrigatório');
      return;
    }

    setLoading(true);
    setProgress('');

    try {
      const driverData = await extractFromPDF(files.drivers);
      const drivers = (driverData?.drivers || []).map(d => ({
        id: d.id || Math.random(),
        name: d.name || '',
        totalScore: d.totalScore || 0,
        status: d.totalScore >= 95 ? 'Fantastic Plus' : d.totalScore >= 88 ? 'Fantastic' : d.totalScore >= 70 ? 'Great' : d.totalScore >= 55 ? 'Fair' : 'Poor',
        dcr: d.dcr || 99,
        dscDpmo: d.dscDpmo || 800,
        pod: d.pod || 99,
        cc: d.cc || 99,
        deliveries: d.deliveries || 0,
        depot,
        wowChange: 0,
        lorDpmo: 0,
        ceDpmo: 0,
        cdfDpmo: 0
      }));

      if (drivers.length === 0) {
        setError(isEN ? '❌ No drivers found in PDF. Check API Key in Settings.' : '❌ Nenhum motorista encontrado no PDF. Verifique API Key em Configurações.');
        setLoading(false);
        return;
      }

      onDataImported?.(drivers, week, depot);
      setLoading(false);
      onClose();
    } catch (e) {
      setError(isEN ? 'Import error: ' + e.message : 'Erro na importação: ' + e.message);
      setLoading(false);
    }
  };

  const fileCount = Object.values(files).filter(f => f).length;
  const nextWeek = Math.min(week + 1, 52);

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:500}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(255,153,0,0.3)',borderRadius:20,width:'100%',maxWidth:600,padding:28,maxHeight:'90vh',overflow:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <h2 style={{color:'#fff',margin:0,fontSize:18,fontWeight:800}}>📦 {isEN?'Quick Import':'Importação Relâmpago'}</h2>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
          <div>
            <label style={{color:'#94a3b8',fontSize:12,fontWeight:700,display:'block',marginBottom:6}}>Semana / Week</label>
            <select value={week} onChange={e=>setWeek(parseInt(e.target.value))} style={{width:'100%',padding:'8px 12px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:8,color:'#fff',fontSize:13,fontWeight:600}}>
              {[...Array(20)].map((_,i)=>{const w=i+1; return <option key={w} value={w}>Week {w}{w===nextWeek?' (próx)':''}</option>;})}
            </select>
          </div>
          <div>
            <label style={{color:'#94a3b8',fontSize:12,fontWeight:700,display:'block',marginBottom:6}}>Depósito / Depot</label>
            <select value={depot} onChange={e=>setDepot(e.target.value)} style={{width:'100%',padding:'8px 12px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:8,color:'#fff',fontSize:13,fontWeight:600}}>
              {DEPOTS.map(d=><option key={d.id} value={d.id}>{d.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{background:'rgba(99,179,237,0.08)',border:'2px dashed rgba(99,179,237,0.4)',borderRadius:12,padding:24,textAlign:'center',marginBottom:16,cursor:'pointer'}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();handleFiles(e.dataTransfer.files);}}>
          <div style={{fontSize:32,marginBottom:8}}>📥</div>
          <div style={{color:'#fff',fontSize:14,fontWeight:700,marginBottom:4}}>{isEN?'Drop 3 PDFs here':'Arraste 3 PDFs aqui'}</div>
          <div style={{color:'#94a3b8',fontSize:12,marginBottom:12}}>{isEN?'Company + Drivers + Concessions':'Empresa + Motoristas + Concessões'}</div>
          <input type="file" multiple accept=".pdf" onChange={e=>handleFiles(e.target.files)} style={{display:'none'}} id="quickUpload"/>
          <button onClick={()=>document.getElementById('quickUpload').click()} style={{background:'rgba(125,211,252,0.2)',color:'#7dd3fc',border:'1px solid rgba(125,211,252,0.5)',borderRadius:8,padding:'6px 16px',fontWeight:700,fontSize:12,cursor:'pointer'}}>
            {isEN?'or click to select':'ou clique para selecionar'}
          </button>
        </div>

        {fileCount > 0 && (
          <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:12,padding:14,marginBottom:16}}>
            <div style={{color:'#4ade80',fontWeight:700,fontSize:12,marginBottom:8}}>✅ {fileCount}/3 {isEN?'Files detected':'Arquivos detectados'}</div>
            {files.drivers && <div style={{color:'#cbd5e1',fontSize:12,padding:'4px 0'}}>✓ Drivers: {files.drivers.name}</div>}
            {files.company && <div style={{color:'#cbd5e1',fontSize:12,padding:'4px 0'}}>✓ Company: {files.company.name}</div>}
            {files.concessions && <div style={{color:'#cbd5e1',fontSize:12,padding:'4px 0'}}>✓ Concessions: {files.concessions.name}</div>}
          </div>
        )}

        {progress && (
          <div style={{background:'rgba(99,179,237,0.08)',border:'1px solid rgba(99,179,237,0.3)',borderRadius:12,padding:12,marginBottom:16,color:'#7dd3fc',fontSize:12}}>
            {progress}
          </div>
        )}

        {error && (
          <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:12,padding:12,marginBottom:16,color:'#f87171',fontSize:12}}>
            ❌ {error}
          </div>
        )}

        <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
          <button onClick={onClose} disabled={loading} style={{color:'#94a3b8',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'10px 20px',fontWeight:700,cursor:loading?'not-allowed':'pointer',opacity:loading?0.5:1}}>
            {isEN?'Cancel':'Cancelar'}
          </button>
          <button onClick={handleConfirm} disabled={!files.drivers || loading} style={{background:'linear-gradient(135deg,#FF9900,#FF6B35)',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,cursor:!files.drivers||loading?'not-allowed':'pointer',opacity:!files.drivers||loading?0.5:1}}>
            {loading ? '🔄 ' : '✅ '}{isEN?'Analyze & Import':'Analisar & Importar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════════════════════════
function AdminPanel({ users, setUsers, currentUser }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [tab, setTab] = useState('users');
  const [showQuickImport, setShowQuickImport] = useState(false);
  const [importedDrivers, setImportedDrivers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({ email:'', password:'', name:'', role:'driver', driverId:'', depot:'dox2' });
  const [msg, setMsg] = useState('');

  const roleColor = { admin:'#a78bfa', manager:'#7dd3fc', driver:'#4ade80' };
  const roleIcon  = { admin:'🛡️', manager:'📊', driver:'🚚' };

  const saveNew = () => {
    if (!newUser.email || !newUser.password || !newUser.name) { setMsg('Preencha todos os campos.'); return; }
    const id = 'u' + Date.now();
    setUsers(prev => [...prev, { ...newUser, id, driverId: newUser.driverId ? Number(newUser.driverId) : null, depot: newUser.role === 'driver' ? newUser.depot : null }]);
    setNewUser({ email:'', password:'', name:'', role:'driver', driverId:'', depot:'dox2' });
    setMsg('✅ Usuário criado!');
    setTimeout(()=>setMsg(''), 3000);
  };

  const saveEdit = () => {
    setUsers(prev => prev.map(u => u.id===editUser.id ? { ...editUser, driverId: editUser.driverId ? Number(editUser.driverId) : null } : u));
    setEditUser(null);
    setMsg('✅ Usuário atualizado!');
    setTimeout(()=>setMsg(''), 3000);
  };

  const deleteUser = (id) => {
    if (id === currentUser.id) { setMsg('❌ Não pode deletar sua própria conta.'); setTimeout(()=>setMsg(''), 3000); return; }
    setUsers(prev => prev.filter(u => u.id !== id));
    setMsg('🗑️ Usuário removido.');
    setTimeout(()=>setMsg(''), 3000);
  };

  const Field = ({ label, value, onChange, type='text', options }) => (
    <div style={{marginBottom:12}}>
      <label style={{color:'#64748b',fontSize:11,fontWeight:600,display:'block',marginBottom:4}}>{label}</label>
      {options ? (
        <select value={value} onChange={e=>onChange(e.target.value)} style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'8px 12px',fontSize:13,outline:'none'}}>
          {options.map(o=><option key={o.v} value={o.v} style={{background:'#0d1527'}}>{o.l}</option>)}
        </select>
      ) : (
        <input value={value} onChange={e=>onChange(e.target.value)} type={type}
          style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'8px 12px',fontSize:13,outline:'none',boxSizing:'border-box'}}/>
      )}
    </div>
  );

  const stats = {
    total: users.length,
    admins: users.filter(u=>u.role==='admin').length,
    managers: users.filter(u=>u.role==='manager').length,
    drivers: users.filter(u=>u.role==='driver').length,
  };

  // Demo data controls
  const [demoWeek, setDemoWeek] = useState(WEEKS[0].id);
  const clearDemoWeek = (id) => {
    if (saveWeekData(id, null) === false) {
      setMsg('❌ Falha ao limpar demo.');
      return;
    }
    window.dispatchEvent(new CustomEvent('demoDataChanged',{detail:{week:id}}));
    setMsg('✅ Demo limpa para a semana selecionada.'); setTimeout(()=>setMsg(''),3000);
  };
  const regenDemoWeek = (id) => {
    try {
      const base = generateWeekData(id);
      const mutated = base.map(d=>{
        const rnd = (Math.random()-0.5)*8; // ±4 points
        const s = Math.min(100,Math.max(30, d.totalScore + rnd));
        return {...d, totalScore:parseFloat(s.toFixed(2)), status: s>=95?'Fantastic Plus':s>=88?'Fantastic':s>=70?'Great':s>=55?'Fair':'Poor', wowChange:parseFloat((rnd).toFixed(2)), week:id };
      });
      if (!saveWeekData(id, mutated)) {
        setMsg('❌ Falha ao salvar demo.');
        return;
      }
      window.dispatchEvent(new CustomEvent('demoDataChanged',{detail:{week:id}}));
      setMsg('🔄 Demo regenerada e salva localmente.'); setTimeout(()=>setMsg(''),3000);
    } catch(e) { setMsg('❌ Falha ao regenerar demo.'); }
  };

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'22px 18px',fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
        <div style={{width:44,height:44,background:'linear-gradient(135deg,#a78bfa,#7c3aed)',borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🛡️</div>
        <div>
          <h2 style={{color:'#fff',margin:0,fontSize:22,fontWeight:900}}>Painel Administrativo</h2>
          <p style={{color:'#64748b',margin:0,fontSize:13}}>Gerenciamento de usuários e configurações · H2OL LogIQ</p>
        </div>
      </div>

      {/* Stats cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:22}}>
        {[{l:'Total Usuários',v:stats.total,c:'#e2e8f0',i:'👥'},{l:'Admins',v:stats.admins,c:'#a78bfa',i:'🛡️'},{l:'Gerentes',v:stats.managers,c:'#7dd3fc',i:'📊'},{l:'Motoristas',v:stats.drivers,c:'#4ade80',i:'🚚'}].map((s,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'16px 18px'}}>
            <div style={{fontSize:20,marginBottom:6}}>{s.i}</div>
            <div style={{color:s.c,fontSize:26,fontWeight:900}}>{s.v}</div>
            <div style={{color:'#475569',fontSize:11,marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>

      {msg && <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.25)',borderRadius:10,padding:'10px 16px',color:'#4ade80',fontSize:13,marginBottom:16}}>{msg}</div>}

      {/* Quick Import Button */}
      <div style={{display:'flex',gap:10,marginBottom:18}}>
        <button onClick={()=>setShowQuickImport(true)} style={{background:'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:10,padding:'12px 20px',cursor:'pointer',fontSize:13,fontWeight:700,display:'flex',alignItems:'center',gap:8}}>
          📦 {isEN?'Quick Import':'Importação Relâmpago'}
        </button>
        <div style={{color:'#64748b',fontSize:12,display:'flex',alignItems:'center',paddingLeft:12,borderLeft:'1px solid rgba(255,255,255,0.1)'}}>
          ⏱️ {isEN?'Upload 3 PDFs in 20 seconds':'Faça upload de 3 PDFs em 20 segundos'}
        </div>
      </div>

      {/* Demo controls */}
      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:18}}>
        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:10,display:'flex',gap:8,alignItems:'center'}}>
          <div style={{color:'#94a3b8',fontSize:12,fontWeight:700}}>Demo Week</div>
          <select value={demoWeek} onChange={e=>setDemoWeek(Number(e.target.value))} style={{background:'transparent',border:'none',color:'#fff',fontSize:13,fontWeight:700,outline:'none'}}>
            {WEEKS.map(w=><option key={w.id} value={w.id} style={{background:'#0d1527'}}>{w.label} · {w.range}</option>)}
          </select>
        </div>
        <button onClick={()=>clearDemoWeek(demoWeek)} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f87171',borderRadius:9,padding:'8px 12px',cursor:'pointer',fontSize:12}}>🧹 Clear Demo</button>
        <button onClick={()=>regenDemoWeek(demoWeek)} style={{background:'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:9,padding:'8px 12px',cursor:'pointer',fontSize:12}}>🔄 Regenerate</button>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',background:'rgba(255,255,255,0.03)',borderRadius:12,padding:4,marginBottom:20,gap:4,width:'fit-content'}}>
        {[{k:'users',l:'👥 Usuários'},{k:'new',l:'➕ Novo Usuário'},{k:'logs',l:'📋 Atividade'}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:'8px 18px',background:tab===t.k?'linear-gradient(135deg,#a78bfa,#7c3aed)':'none',border:'none',color:tab===t.k?'#fff':'#64748b',borderRadius:9,fontWeight:700,fontSize:13,cursor:'pointer',transition:'all .2s'}}>
            {t.l}
          </button>
        ))}
      </div>

      {/* Users list */}
      {tab==='users' && (
        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
              <thead>
                <tr style={{color:'#475569',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                  {['Nome','Email','Perfil','Driver Vinculado','Ações'].map(h=>(
                    <th key={h} style={{padding:'10px 12px',textAlign:'left',fontWeight:600,fontSize:11,textTransform:'uppercase'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u=>{
                  const driver = u.driverId ? BASE_DRIVERS.find(d=>d.id===u.driverId) : null;
                  return (
                    <tr key={u.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <td style={{padding:'12px',color:'#e2e8f0',fontWeight:600}}>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:32,height:32,background:`linear-gradient(135deg,${roleColor[u.role]}30,rgba(0,0,0,0.3))`,border:`1px solid ${roleColor[u.role]}40`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
                            {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                          </div>
                          {u.name} {u.id===currentUser.id && <span style={{background:'rgba(255,153,0,0.15)',color:'#FF9900',fontSize:9,padding:'2px 6px',borderRadius:4,fontWeight:700}}>VOCÊ</span>}
                        </div>
                      </td>
                      <td style={{padding:'12px',color:'#94a3b8'}}>{u.email}</td>
                      <td style={{padding:'12px'}}>
                        <span style={{background:`${roleColor[u.role]}20`,color:roleColor[u.role],border:`1px solid ${roleColor[u.role]}40`,fontSize:11,padding:'4px 10px',borderRadius:6,fontWeight:700}}>
                          {roleIcon[u.role]} {u.role.charAt(0).toUpperCase()+u.role.slice(1)}
                        </span>
                      </td>
                      <td style={{padding:'12px',color:'#64748b',fontSize:12}}>{driver ? `#${driver.id} · ${driver.name}` : '—'}</td>
                      <td style={{padding:'12px'}}>
                        <div style={{display:'flex',gap:8}}>
                          <button onClick={()=>setEditUser({...u})} style={{background:'rgba(99,179,237,0.1)',border:'1px solid rgba(99,179,237,0.25)',color:'#7dd3fc',borderRadius:7,padding:'5px 12px',cursor:'pointer',fontSize:11,fontWeight:600}}>✏️ Editar</button>
                          <button onClick={()=>deleteUser(u.id)} style={{background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',color:'#f87171',borderRadius:7,padding:'5px 12px',cursor:'pointer',fontSize:11,fontWeight:600}}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New user form */}
      {tab==='new' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:22}}>
            <h3 style={{color:'#fff',margin:'0 0 18px',fontSize:16,fontWeight:800}}>➕ Criar Novo Usuário</h3>
            <Field label="NOME COMPLETO" value={newUser.name} onChange={v=>setNewUser(p=>({...p,name:v}))} />
            <Field label="EMAIL" value={newUser.email} onChange={v=>setNewUser(p=>({...p,email:v}))} type="email" />
            <Field label="SENHA" value={newUser.password} onChange={v=>setNewUser(p=>({...p,password:v}))} type="password" />
            <Field label="PERFIL" value={newUser.role} onChange={v=>setNewUser(p=>({...p,role:v}))} options={[{v:'admin',l:'🛡️ Admin'},{v:'manager',l:'📊 Gerente'},{v:'driver',l:'🚚 Motorista'}]} />
            {newUser.role==='driver' && (
              <>
                <Field label="DRIVER ID (1-32)" value={newUser.driverId} onChange={v=>setNewUser(p=>({...p,driverId:v}))} type="number" />
                <Field label="DEPÓSITO" value={newUser.depot} onChange={v=>setNewUser(p=>({...p,depot:v}))} options={DEPOTS.map(d=>({v:d.id,l:d.label}))} />
              </>
            )}
            <button onClick={saveNew} style={{width:'100%',background:'linear-gradient(135deg,#a78bfa,#7c3aed)',border:'none',color:'#fff',borderRadius:10,padding:'12px',fontWeight:800,cursor:'pointer',fontSize:14,marginTop:6}}>
              Criar Usuário
            </button>
          </div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:22}}>
            <h3 style={{color:'#fff',margin:'0 0 14px',fontSize:15,fontWeight:700}}>💡 Guia de Perfis</h3>
            {[
              {r:'Admin',c:'#a78bfa',i:'🛡️',desc:'Acesso total: gerencia usuários, vê todos os dados, painel administrativo completo.'},
              {r:'Gerente',c:'#7dd3fc',i:'📊',desc:'Dashboard completo, importar PDF, IA assistente, planos de ação para toda equipe.'},
              {r:'Driver',c:'#4ade80',i:'🚚',desc:'Vê apenas o próprio scorecard. Vincular ao Driver ID para exibir dados corretos.'},
            ].map(p=>(
              <div key={p.r} style={{background:'rgba(0,0,0,0.2)',border:`1px solid ${p.c}20`,borderRadius:12,padding:'12px 14px',marginBottom:10}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <span style={{fontSize:18}}>{p.i}</span>
                  <span style={{color:p.c,fontWeight:700,fontSize:14}}>{p.r}</span>
                </div>
                <p style={{color:'#94a3b8',fontSize:12,margin:0,lineHeight:1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity log (simulated) */}
      {tab==='logs' && (
        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
          <h3 style={{color:'#fff',margin:'0 0 16px',fontSize:15,fontWeight:700}}>📋 Atividade Recente</h3>
          {[
            {t:'2 min atrás',  u:'Phillipe Dantas', a:'Login realizado',          i:'🟢'},
            {t:'15 min atrás', u:'Admin H2OL',      a:'Usuário driver3 criado',   i:'➕'},
            {t:'1h atrás',     u:'Mateusz Kocon',   a:'Scorecard visualizado',    i:'👁️'},
            {t:'2h atrás',     u:'Phillipe Dantas', a:'PDF Semana 17 importado',  i:'📄'},
            {t:'3h atrás',     u:'Admin H2OL',      a:'Plano de ação gerado (IA)',i:'🤖'},
            {t:'5h atrás',     u:'Bruno Santos',    a:'Login realizado',          i:'🟢'},
            {t:'Ontem',        u:'Admin H2OL',      a:'Semana 16 publicada',      i:'📅'},
          ].map((l,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
              <span style={{fontSize:18,width:28,textAlign:'center'}}>{l.i}</span>
              <div style={{flex:1}}>
                <span style={{color:'#e2e8f0',fontWeight:600,fontSize:13}}>{l.u}</span>
                <span style={{color:'#64748b',fontSize:13}}> · {l.a}</span>
              </div>
              <span style={{color:'#334155',fontSize:11}}>{l.t}</span>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editUser && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:300,padding:20}} onClick={()=>setEditUser(null)}>
          <div style={{background:'#0d1527',border:'1px solid rgba(167,139,250,0.3)',borderRadius:18,width:'100%',maxWidth:440,padding:24}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h3 style={{color:'#fff',margin:0,fontSize:17,fontWeight:800}}>✏️ Editar Usuário</h3>
              <button onClick={()=>setEditUser(null)} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
            </div>
            <Field label="NOME" value={editUser.name} onChange={v=>setEditUser(p=>({...p,name:v}))} />
            <Field label="EMAIL" value={editUser.email} onChange={v=>setEditUser(p=>({...p,email:v}))} type="email" />
            <Field label="SENHA" value={editUser.password} onChange={v=>setEditUser(p=>({...p,password:v}))} type="password" />
            <Field label="PERFIL" value={editUser.role} onChange={v=>setEditUser(p=>({...p,role:v}))} options={[{v:'admin',l:'🛡️ Admin'},{v:'manager',l:'📊 Gerente'},{v:'driver',l:'🚚 Motorista'}]} />
            {editUser.role==='driver' && (
              <>
                <Field label="DRIVER ID (1-32)" value={editUser.driverId||''} onChange={v=>setEditUser(p=>({...p,driverId:v}))} type="number" />
                <Field label="DEPÓSITO" value={editUser.depot||'dox2'} onChange={v=>setEditUser(p=>({...p,depot:v}))} options={DEPOTS.map(d=>({v:d.id,l:d.label}))} />
              </>
            )}
            <div style={{display:'flex',gap:12,marginTop:18}}>
              <button onClick={saveEdit} style={{flex:1,background:'linear-gradient(135deg,#a78bfa,#7c3aed)',border:'none',color:'#fff',borderRadius:10,padding:'11px',fontWeight:800,cursor:'pointer',fontSize:14}}>Salvar</button>
              <button onClick={()=>setEditUser(null)} style={{flex:1,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#94a3b8',borderRadius:10,padding:'11px',fontWeight:600,cursor:'pointer',fontSize:14}}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Import Modal */}
      {showQuickImport && (
        <QuickImportModal
          onClose={()=>setShowQuickImport(false)}
          onDataImported={(drivers, week, depot)=>{
            setImportedDrivers(drivers);
            saveWeekData(week, drivers.map(d=>({...d,depot})));
            window.dispatchEvent(new CustomEvent('demoDataChanged',{detail:{week,depot}}));
            setShowQuickImport(false);
            setMsg(`✅ ${drivers.length} motoristas importados! Semana ${week} · ${DEPOTS.find(d=>d.id===depot)?.label}`);
            setTimeout(()=>setMsg(''),5000);
          }}
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// AI PANEL
// ══════════════════════════════════════════════════════════
function AIPanel({ drivers, onClose }) {
  const { lang } = useLang();
  const isEN = lang==='en-UK';
  const welcome = isEN
    ? 'Hello! I\'m the LogIQ Assistant 🤖\n\nI have access to all data. I can analyse any driver, KPI or trend.\n\nHow can I help?'
    : 'Olá! Sou o Assistente LogIQ 🤖\n\nTenho acesso aos dados completos. Posso analisar qualquer motorista, KPI ou tendência.\n\nComo posso ajudar?';
  const [messages, setMessages] = useState([{role:'assistant',content:welcome}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); setInput('');
    setMessages(p=>[...p,{role:'user',content:msg}]); setLoading(true);
    const system = isEN
      ? `LogIQ Assistant — Amazon DSP specialist. Data for ${drivers.length} drivers:\n${drivers.map(d=>`${d.name}|score:${d.totalScore.toFixed(1)}|status:${d.status}|rank:${d.rank}|dcr:${d.dcr}|dscDpmo:${d.dscDpmo}|pod:${d.pod}|cc:${d.cc}|fico:${d.fico}|wow:${d.wowChange}`).join('\n')}\nBenchmarks: DSC DPMO ≤900=Fantastic | DCR ≥99.5%=Fantastic | POD ≥99% | CC ≥99%\nReply in English UK, direct, use emojis, max 280 words.`
      : `Assistente LogIQ — especialista Amazon DSP. Dados de ${drivers.length} motoristas:\n${drivers.map(d=>`${d.name}|score:${d.totalScore.toFixed(1)}|status:${d.status}|rank:${d.rank}|dcr:${d.dcr}|dscDpmo:${d.dscDpmo}|pod:${d.pod}|cc:${d.cc}|fico:${d.fico}|wow:${d.wowChange}`).join('\n')}\nBenchmarks: DSC DPMO ≤900=Fantastic | DCR ≥99.5%=Fantastic | POD ≥99% | CC ≥99%\nResponda em português, direto, use emojis, máx 280 palavras.`;
    const hist = messages.map(m=>({role:m.role,content:m.content}));
    try {
      const text = await callClaude([...hist,{role:'user',content:msg}], system);
      setMessages(p=>[...p,{role:'assistant',content:text}]);
    } catch(e) {
      setMessages(p=>[...p,{role:'assistant',content:`❌ Erro: ${e.message}`}]);
    }
    setLoading(false);
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:150}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(255,153,0,0.2)',borderRadius:20,width:'100%',maxWidth:620,height:'80vh',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:38,height:38,background:'linear-gradient(135deg,#FF9900,#FF6B35)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🤖</div>
            <div><div style={{color:'#fff',fontWeight:700,fontSize:15}}>Assistente LogIQ</div><div style={{color:'#4ade80',fontSize:11}}>● Claude Sonnet · IA Real</div></div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:10}}>
          {messages.map((m,i)=>(
            <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start',gap:8}}>
              {m.role==='assistant' && <div style={{width:30,height:30,background:'linear-gradient(135deg,#FF9900,#FF6B35)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:13}}>🤖</div>}
              <div style={{maxWidth:'80%',background:m.role==='user'?'linear-gradient(135deg,#FF9900,#FF6B35)':'rgba(255,255,255,0.05)',border:m.role==='user'?'none':'1px solid rgba(255,255,255,0.08)',borderRadius:m.role==='user'?'14px 14px 3px 14px':'14px 14px 14px 3px',padding:'10px 14px'}}>
                <p style={{color:'#fff',fontSize:13,margin:0,whiteSpace:'pre-line',lineHeight:1.6}}>{m.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{display:'flex',gap:8}}>
              <div style={{width:30,height:30,background:'linear-gradient(135deg,#FF9900,#FF6B35)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🤖</div>
              <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px 14px 14px 3px',padding:'12px 16px',display:'flex',gap:5,alignItems:'center'}}>
                {[0,1,2].map(i=><span key={i} style={{width:6,height:6,background:'#FF9900',borderRadius:'50%',animation:`bounce 1s infinite ${i*.15}s`}}/>)}
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>
        <div style={{padding:'8px 14px',display:'flex',gap:6,overflowX:'auto',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
          {(isEN?['Who needs training?','Top 5 best','Bottom 5 DSC','Critical DCR','General summary']:['Quem precisa de treinamento?','Top 5 melhores','5 piores DSC','DCR crítico','Resumo geral']).map(s=>(
            <button key={s} onClick={()=>setInput(s)} style={{background:'rgba(255,153,0,0.08)',border:'1px solid rgba(255,153,0,0.2)',color:'#FF9900',borderRadius:7,padding:'4px 11px',cursor:'pointer',fontSize:11,whiteSpace:'nowrap',fontWeight:600}}>{s}</button>
          ))}
        </div>
        <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.07)',display:'flex',gap:10}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={isEN?'Ask about the drivers...':'Pergunte sobre os motoristas...'} style={{flex:1,background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:11,padding:'10px 14px',fontSize:13,outline:'none'}}/>
          <button onClick={send} disabled={loading||!input.trim()} style={{background:loading||!input.trim()?'rgba(255,153,0,0.2)':'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:11,width:44,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>➤</button>
        </div>
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ACTION PLAN MODAL
// ══════════════════════════════════════════════════════════
function ActionPlanModal({ driver, drivers, type, template, onClose, onOpenSettings }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiKey = typeof localStorage !== 'undefined' && localStorage.getItem('logiq-api-key');
  const localPassword = typeof localStorage !== 'undefined' && localStorage.getItem('logiq-local-password');
  const useLocalDemo = !apiKey && !!localPassword;
  const openSettings = onOpenSettings || (() => window.dispatchEvent(new CustomEvent('openApiKeySettings')));

  const t = {
    'PLANO DE AÇÃO PARA': isEN ? 'ACTION PLAN FOR' : 'PLANO DE AÇÃO PARA',
    'Status': isEN ? 'Status' : 'Status',
    'Score': isEN ? 'Score' : 'Score',
    'Rank': isEN ? 'Rank' : 'Rank',
    'Principais métricas': isEN ? 'Key metrics' : 'Principais métricas',
    'Nenhuma métrica crítica identificada': isEN ? 'No critical metrics identified' : 'Nenhuma métrica crítica identificada',
    'MENSAGEM PERSONALIZADA': isEN ? 'PERSONALIZED MESSAGE' : 'MENSAGEM PERSONALIZADA',
    'FOCO PRINCIPAL': isEN ? 'MAIN FOCUS' : 'FOCO PRINCIPAL',
    'AÇÕES PRÁTICAS IMEDIATAS': isEN ? 'IMMEDIATE PRACTICAL ACTIONS' : 'AÇÕES PRÁTICAS IMEDIATAS',
    'META DE MELHORIA PARA A PRÓXIMA SEMANA': isEN ? 'IMPROVEMENT TARGET FOR NEXT WEEK' : 'META DE MELHORIA PARA A PRÓXIMA SEMANA',
    'MENSAGEM DE INCENTIVO': isEN ? 'ENCOURAGEMENT MESSAGE' : 'MENSAGEM DE INCENTIVO',
    'AGENDA DA SEMANA': isEN ? 'WEEKLY SCHEDULE' : 'AGENDA DA SEMANA',
  };

  const buildLocalPlan = () => {
    console.log('buildLocalPlan called with:', { type, template, hasApiKey: !!apiKey });
    // Templates específicos
    if (type === 'company' && template === 'at-risk') {
      const atRisk = drivers.filter(d=>d.totalScore<70).sort((a,b)=>a.totalScore-b.totalScore);
      return `🚨 ${isEN?'CRITICAL PLAN - AT-RISK DRIVERS':'PLANO CRÍTICO - MOTORISTAS EM RISCO'}

${isEN?'AT-RISK DRIVERS':'MOTORISTAS CRÍTICOS'} (${atRisk.length}):
${atRisk.slice(0,10).map((d,i)=>`${i+1}. ${d.name} - Score ${d.totalScore.toFixed(1)} (${d.status})
   ${isEN?'Action':'Ação'}: ${isEN?'Personal coaching + focused re-attempts':'Coaching pessoal + reattempts focado'}
   DCR: ${d.dcr}% | DSC: ${d.dscDpmo} | POD: ${d.pod}% | CC: ${d.cc}%`).join('\n')}

📅 ${isEN?'ACTIONS FOR THIS WEEK':'AÇÕES PARA ESTA SEMANA'}:
1. ${isEN?'Monday':'Segunda'}: ${isEN?'1-on-1 meeting with each at-risk driver':'Reunião 1-on-1 com cada driver em risco'}
2. ${isEN?'Tue-Thu':'Terça-Quinta'}: ${isEN?'Daily field follow-up':'Acompanhamento diário em campo'}
3. ${isEN?'Friday':'Sexta'}: ${isEN?'Progress review and adjustments':'Avaliação de progresso e ajustes'}

🎯 ${isEN?'GOAL':'META'}: ${isEN?'Raise score to >= 70 in 2 weeks':'Elevar score para >= 70 em 2 semanas'}`;
    }

    if (type === 'company' && template === 'dcr-focus') {
      const dcrLow = drivers.filter(d=>d.dcr<99);
      return `🎯 ${isEN?'DCR IMPROVEMENT PLAN (Delivery Return Rate)':'PLANO DE MELHORIA DCR (Delivery Return Rate)'}

${isEN?'PROBLEM':'PROBLEMA'}: ${dcrLow.length} ${isEN?'drivers with DCR < 99%':'motoristas com DCR < 99%'}

${isEN?'ROOT CAUSES':'RAÍZES'}:
- ${isEN?'Lack of re-attempts (customer absent, door closed)':'Falta de reattempts (cliente ausente, porta fechada)'}
- ${isEN?'Very fast deliveries (30 min or less)':'Entregas muito rápidas (30 min ou menos)'}
- ${isEN?'No prior contact (Notify of Arrival)':'Falta de contato prévio (Notify of Arrival)'}

${isEN?'AFFECTED DRIVERS':'DRIVERS AFETADOS'}:
${dcrLow.slice(0,8).map(d=>`- ${d.name}: ${d.dcr}%`).join('\n')}

✅ ${isEN?'ACTION PLAN':'PLANO DE AÇÃO'}:
1. ${isEN?'MANDATORY: Re-attempt ALWAYS mandatory (except clear refusal)':'OBRIGATÓRIO: Reattempt obrigatório SEMPRE (exceto recusa clara)'}
2. ${isEN?'Contact: CALL BEFORE giving up (Notify of Arrival)':'Contato: Ligar ANTES de desistir (Notify of Arrival)'}
3. ${isEN?'Timing: Minimum 15 min between attempts':'Timing: Mínimo 15 min entre tentativas'}
4. ${isEN?'Documentation: Photo of door/refusal in each case':'Documentação: Foto de porta/recusa em cada caso'}

📊 ${isEN?'GOAL':'META'}: 99%+ ${isEN?'in 1 week':'em 1 semana'}`;
    }

    if (type === 'company' && template === 'quality') {
      const dscHigh = drivers.filter(d=>d.dscDpmo>900);
      const podLow = drivers.filter(d=>d.pod<99);
      return `✨ ${isEN?'QUALITY EXCELLENCE PLAN':'PLANO DE EXCELÊNCIA EM QUALIDADE'}

${isEN?'MAIN CHALLENGES':'DESAFIOS PRINCIPAIS'}:
- ${isEN?'High DSC DPMO':'DSC DPMO alto'}: ${dscHigh.length} ${isEN?'drivers > 900':'motoristas > 900'}
- ${isEN?'Low POD':'POD baixo'}: ${podLow.length} ${isEN?'drivers < 99%':'motoristas < 99%'}

${isEN?'ROOT CAUSES':'CAUSAS RAIZ'}:
1. ${isEN?'Deliveries outside customer preferences':'Entregas fora das preferências do cliente'}
2. ${isEN?'Poor photo quality (angle, light, clarity)':'Fotos de qualidade ruim (ângulo, luz, clareza)'}
3. ${isEN?'No Notify of Arrival':'Falta de Notify of Arrival'}

🔧 ${isEN?'3-STEP SOLUTION':'SOLUÇÃO 3 PASSOS'}:
1. ${isEN?'PHOTO: Parcel on flat surface, clear, no hands/faces':'FOTO: Pacote em superfície plana, clara, sem mãos/rosto'}
2. ${isEN?'PREFERENCE: Respect: door, receptionist, neighbor, etc':'PREFERÊNCIA: Respeitar: porta, recepcionista, vizinho, etc'}
3. ${isEN?'CONTACT: Call before delivery (Notify of Arrival)':'CONTATO: Ligar antes da entrega (Notify of Arrival)'}

👥 ${isEN?'TRAINING':'TREINAMENTO'}:
- ${isEN?'Monday':'Segunda'}: ${isEN?'POD Correct Workshop':'Workshop de POD correto'}
- ${isEN?'Tuesday':'Terça'}: ${isEN?'Field Validation':'Validação em campo'}
- ${isEN?'Wed-Fri':'Quarta-Sexta'}: ${isEN?'Continuous Reinforcement':'Reforço contínuo'}

📈 ${isEN?'EXPECTED RESULT':'RESULTADO ESPERADO'}: 95%+ ${isEN?'drivers with DSC ≤ 900':'drivers com DSC ≤ 900'}`;
    }

    if (type === 'company' && template === 'retention') {
      const topPerformers = drivers.filter(d=>d.status==='Fantastic'||d.status==='Fantastic Plus');
      return `🏆 ${isEN?'RETENTION PLAN - TOP PERFORMERS':'PLANO DE RETENÇÃO - TOP PERFORMERS'}

${isEN?'OUR BEST':'NOSSOS MELHORES'} (${topPerformers.length}):
${topPerformers.map(d=>`✨ ${d.name} - Score ${d.totalScore.toFixed(1)} (${d.status})`).join('\n')}

🎁 ${isEN?'RETENTION STRATEGY':'ESTRATÉGIA DE RETENÇÃO'}:
1. ${isEN?'RECOGNITION: Publish weekly ranking':'RECONHECIMENTO: Públicar ranking semanal'}
2. ${isEN?'INCENTIVES: Bonus for consistency (4+ weeks top)':'INCENTIVOS: Bônus por consistência (4+ semanas top)'}
3. ${isEN?'DEVELOPMENT: Offer squad leadership':'DESENVOLVIMENTO: Oferecer liderança de squad'}
4. ${isEN?'FLEXIBILITY: Preferred schedules when possible':'FLEXIBILIDADE: Horários preferidos quando possível'}
5. ${isEN?'OPPORTUNITY: Train other drivers as mentors':'OPORTUNIDADE: Treinar outros drivers como mentores'}

💼 ${isEN?'NEXT 2 WEEKS':'PRÓXIMAS 2 SEMANAS'}:
- ${isEN?'Individual meeting with each top performer':'Reunião individual com cada top performer'}
- ${isEN?'Communicate career/growth plan':'Comunicar plano de carreira/crescimento'}
- ${isEN?'Adjust routes/schedules per preference':'Ajustar rotas/horários conforme preferência'}
- ${isEN?'Public recognition at briefing':'Reconhecimento público no briefing'}

🚀 ${isEN?'OBJECTIVE':'OBJETIVO'}: ${isEN?'Maintain 100% satisfaction + reduce turnover':'Manter 100% satisfação + reduzir rotatividade'}`;
    }

    if (type === 'company') {
      const avg = (drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length).toFixed(1);
      const atRisk = drivers.filter(d=>d.totalScore<70);
      const critical = drivers.filter(d=>d.totalScore<55||d.dscDpmo>2500||d.dcr<98);
      const dscHigh = drivers.filter(d=>d.dscDpmo>900);
      const dcrLow = drivers.filter(d=>d.dcr<99);
      const podLow = drivers.filter(d=>d.pod<99);
      const ccLow = drivers.filter(d=>d.cc<99);
      const lorHigh = drivers.filter(d=>d.lorDpmo>400);
      const cdfHigh = drivers.filter(d=>d.cdfDpmo>4420);
      const top5 = [...drivers].sort((a,b)=>b.totalScore-a.totalScore).slice(0,5);

      return `${isEN?'ACTION PLAN FOR MANAGERS - H2OL DOX2':'PLANO DE AÇÃO PARA GERENTES - H2OL DOX2'}

1. ${isEN?'EXECUTIVE DIAGNOSIS':'DIAGNÓSTICO EXECUTIVO'}
- ${isEN?'Average Score':'Score médio'}: ${avg}
- ${isEN?'At-risk Drivers (score<70)':'Drivers em risco (score<70)'}: ${atRisk.length}
- ${isEN?'Critical Drivers (score<55 or DSC>2500 or DCR<98)':'Drivers críticos (score<55 ou DSC>2500 ou DCR<98)'}: ${critical.length}
- ${isEN?'Main Gaps':'Gaps principais'}: ${isEN?'High DSC DPMO':'DSC DPMO alto'} (${dscHigh.length}), ${isEN?'Low DCR':'DCR baixo'} (${dcrLow.length}), ${isEN?'Low POD':'POD baixo'} (${podLow.length}), ${isEN?'Low CC':'CC baixo'} (${ccLow.length}), ${isEN?'High LoR':'LoR alto'} (${lorHigh.length}), ${isEN?'High CDF':'CDF alto'} (${cdfHigh.length})

2. ${isEN?'WHAT THIS MEANS':'O QUE ISSO SIGNIFICA'}
- ${isEN?'Low DCR indicates packages returning to depot due to lack of re-attempts. Re-attempts are part of the job and there is no excuse for early route closure.':'DCR baixo indica pacotes retornando ao depot por falta de reattempts. Reattempts são parte do trabalho e não há desculpa para rotas encerradas cedo.'}
- ${isEN?'High DSC DPMO shows deliveries accepted outside expected conditions (customer, neighbor, receptionist, mailbox, >25m, no photo, no preference, simultaneous stops).':'DSC DPMO alto mostra entregas aceitas fora das condições esperadas (cliente, vizinho, recepcionista, caixa postal, >25m, sem foto, sem preferência, paradas simultâneas).'}
- ${isEN?'High LoR DPMO reveals packages delivered or marked that did not return to station within 3 days.':'LoR DPMO alto revela pacotes entregues ou marcados que não retornaram à station em 3 dias.'}
- ${isEN?'POD below target points to photos with bad angle, blurry or with hand/face/door visible.':'POD abaixo do alvo aponta fotos com ângulo ruim, borradas ou com mão/rosto/porta visível.'}
- ${isEN?'Low CC means lack of Notify of Arrival and customer calls, especially in cases of closed door, absent customer, wrong address or blocked access.':'CC baixo significa falta de Notify of Arrival e chamadas ao cliente, especialmente em casos de porta fechada, cliente ausente, endereço errado ou acesso bloqueado.'}
- ${isEN?'High CDF indicates serious customer complaints with evidence.':'CDF alto indica reclamações graves do cliente com evidência.'}

3. ${isEN?'PRIORITY MATRIX':'MATRIZ DE PRIORIDADES'}
${isEN?'URGENT + IMPORTANT':'URGENTE + IMPORTANTE'}:
- ${isEN?'Require immediate re-attempts from drivers with DCR<99% and DSC DPMO>900.':'Exigir reattempts imediatos nos drivers com DCR<99% e DSC DPMO>900.'}
- ${isEN?'Review photo and arrival notification routine for drivers with POD<99% and CC<99%.':'Revisar rotina de fotos e notificação de chegada para drivers com POD<99% e CC<99%.'}

${isEN?'IMPORTANT (plan this week)':'IMPORTANTE (planejar esta semana)'}:
- ${isEN?'Create delivery checklists to ensure correct photo, customer preference and Notify of Arrival on all deliveries.':'Criar checklists de entrega para garantir foto correta, preferência do cliente e Notify of Arrival em todas as entregas.'}
- ${isEN?'Conduct quick training for the group with high LoR on package return and status confirmation in app.':'Fazer treinamento rápido para o grupo com LoR alto sobre retorno de pacotes e confirmação de status na app.'}

${isEN?'DELEGATE':'DELEGAR'}:
- ${isEN?'Delegate supervision of 2-3 high-performance drivers to validate POD and CC compliance in the field.':'Delegar a supervisão de 2-3 drivers de alto desempenho para validar o cumprimento de POD e CC em campo.'}
- ${isEN?'Ask the operations team to follow the top 5 to transform best practices into standard.':'Pedir ao time de operações que acompanhe os 5 melhores para transformar boas práticas em padrão.'}

4. ${isEN?'PLAN BY AT-RISK DRIVER':'PLANO POR DRIVER EM RISCO'}
${atRisk.slice(0,6).map(d=>`- ${d.name} | ${isEN?'Score':'Score'} ${d.totalScore.toFixed(1)} | ${isEN?'Status':'Status'} ${d.status}
  ${isEN?'Key metrics':'Principais métricas'}: DCR ${d.dcr}% | DSC ${d.dscDpmo} | POD ${d.pod}% | CC ${d.cc}% | LoR ${d.lorDpmo} | CDF ${d.cdfDpmo}
  ${isEN?'Immediate action':'Ação imediata'}: ${isEN?'review each delivery with re-attempt, photo and contact checklist, avoid deliveries outside customer conditions.':'revisar cada entrega com checklist de reattempt, foto e contato, evitar entregas fora das condições do cliente.'}
  ${isEN?'Next week target':'Meta próxima semana'}: DCR ≥99%, DSC ≤900, POD ≥99%, CC ≥99%, LoR ≤400, CDF ≤4420.`).join('\n')}

5. ${isEN?'MANAGER WEEKLY SCHEDULE':'CRONOGRAMA SEMANAL DO GESTOR'}
- ${isEN?'Monday':'Segunda'}: ${isEN?'Review DCR/DSC and set up coaching route for at-risk drivers.':'revisar DCR/DSC e montar rota de coaching para drivers em risco.'}
- ${isEN?'Tuesday':'Terça'}: ${isEN?'Field follow-up with focus on POD and Notify of Arrival.':'acompanhar campo com foco em POD e Notify of Arrival.'}
- ${isEN?'Wednesday':'Quarta'}: ${isEN?'Analyze LoR and CDF; adjust action plan.':'analisar LoR e CDF; ajustar plano de ação.'}
- ${isEN?'Thursday':'Quinta'}: ${isEN?'Reinforce standards and recognize progress.':'reforçar padrões e reconhecer progressos.'}
- ${isEN?'Friday':'Sexta'}: ${isEN?'Consolidate results and plan actions for next week.':'consolidar resultados e planejar ações para a próxima semana.'}

6. ${isEN?'GOALS AND KPIs':'METAS E KPIs'}
| ${isEN?'KPI':'KPI'} | ${isEN?'Current':'Atual'} | ${isEN?'Target':'Meta'} | ${isEN?'Responsible':'Responsável'} |
| DCR | ${dcrLow.length>0?'<99%':'99%+'} | ≥ 99% | ${isEN?'Manager':'Gestor'} |
| DSC DPMO | ${dscHigh.length>0?'>900':'≤900'} | ≤ 900 | ${isEN?'Manager':'Gestor'} |
| POD | ${podLow.length>0?'<99%':'≥99%'} | ≥ 99% | ${isEN?'Manager':'Gestor'} |
| CC | ${ccLow.length>0?'<99%':'≥99%'} | ≥ 99% | ${isEN?'Manager':'Gestor'} |
| LoR DPMO | ${lorHigh.length>0?'>400':'≤400'} | ≤ 400 | ${isEN?'Manager':'Gestor'} |
| CDF DPMO | ${cdfHigh.length>0?'>4420':'≤4420'} | ≤ 4420 | ${isEN?'Manager':'Gestor'} |

7. ${isEN?'TRAINING RECOMMENDATIONS':'RECOMENDAÇÕES DE TREINAMENTO'}
- ${isEN?'Train all drivers on re-attempts and Notify of Arrival twice per occurrence.':'Treinar todos os drivers em reattempts e Notify of Arrival duas vezes por ocorrência.'}
- ${isEN?'Review POD photos with correct examples: parcel on flat surface, without hands/face/number visible.':'Fazer revisão de foto POD com exemplos corretos: parcel apoiado em superfície plana, sem mãos/rosto/número visível.'}
- ${isEN?'Reinforce delivery following customer preferences, avoiding deliveries to neighbors, receptionists or mailboxes.':'Reforçar entrega seguindo preferências do cliente, evitando entregas a vizinhos, recepcionistas ou caixas postais.'}

8. ${isEN?'RECOGNITION AND ENGAGEMENT':'RECONHECIMENTO E ENGAJAMENTO'}
- ${isEN?'Publicly recognize those who maintain DSC ≤900 and CC/POD ≥99%.':'Reconhecer publicamente quem mantém DSC ≤900 e CC/POD ≥99%.'}
- ${isEN?'Use top performers as mentors for the team.':'Usar top performers como mentores para o time.'}
- ${isEN?'Send motivational message: "Quality and consistent re-attempts are the basis of our ranking. Together let\'s reduce concessions and build customer trust."':'Enviar mensagem motivacional: "Qualidade e reattempts consistentes são a base do nosso ranking. Vamos juntos reduzir concessões e ganhar confiança do cliente."'}`;
    }

    const issues = [driver.dscDpmo>900&&`DSC DPMO ${driver.dscDpmo}`,
      driver.dcr<99&&`DCR ${driver.dcr}%`, driver.pod<99&&`POD ${driver.pod}%`, driver.cc<99&&`CC ${driver.cc}%`, driver.lorDpmo>400&&`LoR ${driver.lorDpmo}`, driver.cdfDpmo>4420&&`CDF ${driver.cdfDpmo}`].filter(Boolean);
    const scoreLabel = driver.totalScore>=95 ? 'Fantastic Plus' : driver.totalScore>=88 ? 'Fantastic' : driver.totalScore>=70 ? 'Great' : driver.totalScore>=55 ? 'Fair' : 'Poor';
    const coachTone = scoreLabel==='Fantastic Plus' ? (isEN ? 'You are leading, but you can still close the last points with consistency.' : 'Você está na liderança, mas ainda pode fechar os últimos pontos com consistência.') :
      scoreLabel==='Fantastic' ? (isEN ? 'Great work, now focus on reducing losses and maintaining high quality.' : 'Ótimo trabalho, agora concentre-se em reduzir perdas e manter alta qualidade.') :
      scoreLabel==='Great' ? (isEN ? 'Good potential, now is the time to improve accuracy and customer contact.' : 'Bom potencial, é hora de melhorar a precisão e o contato com o cliente.') :
      scoreLabel==='Fair' ? (isEN ? 'We have great room for recovery; focus on each delivery as if it were the first.' : 'Temos espaço grande para recuperação; foque em cada entrega como se fosse a primeira.') :
      (isEN ? 'Urgent recovery needed; prioritize checklist and contact on all routes.' : 'Recuperação urgente necessária; priorize checklist e contato em todas as rotas.');

    return `${isEN?'ACTION PLAN FOR':'PLANO DE AÇÃO PARA'} ${driver.name}

${isEN?'Status':'Status'}: ${driver.status} | ${isEN?'Score':'Score'}: ${driver.totalScore.toFixed(1)} | ${isEN?'Rank':'Rank'}: #${driver.rank}
${isEN?'Key metrics':'Principais métricas'}: ${issues.length?issues.join(', '):(isEN?'No critical metrics identified':'Nenhuma métrica crítica identificada')}

1. ${isEN?'PERSONALIZED MESSAGE':'MENSAGEM PERSONALIZADA'}
${isEN?'Hi':'Olá'} ${driver.name}, ${coachTone}

2. ${isEN?'MAIN FOCUS':'FOCO PRINCIPAL'}
- ${isEN?'DCR':'DCR'}: ${isEN?'Re-attempts are mandatory. If the route ends early, use the time to reassign or re-attempt.':'reattempts são obrigatórios. Se a rota terminar cedo, use o tempo para reatribuir ou reattemptar.'}
- ${isEN?'DSC DPMO':'DSC DPMO'}: ${isEN?'No delivery should be registered outside real customer conditions. Avoid deliveries to neighbors, receptionists, mailboxes, more than 25m from destination, without POD or without following preferences.':'nenhuma entrega deve ser registrada fora das condições reais do cliente. Evite entregas para vizinhos, recepcionistas, caixas postais, mais de 25m do destino, sem POD ou sem seguir preferências.'}
- ${isEN?'LoR':'LoR'}: ${isEN?'Confirm that the delivery was marked correctly and that the package returns to the station within 3 days.':'confirme que a entrega foi marcada corretamente e que o pacote retorna à station em até 3 dias.'}
- ${isEN?'POD':'POD'}: ${isEN?'Clean photos, without hands/face/door number, parcel centered, flat surface, level angle.':'fotos limpas, sem mãos/rosto/número de porta, parcel centralizado, superfície plana, ângulo nivelado.'}
- ${isEN?'CC':'CC'}: ${isEN?'Every delivery needs Notify of Arrival and a customer call. If there is a problem, try to contact twice.':'toda entrega precisa de Notify of Arrival e uma chamada ao cliente. Se houver problema, tente contatar duas vezes.'}

3. ${isEN?'IMMEDIATE PRACTICAL ACTIONS':'AÇÕES PRÁTICAS IMEDIATAS'}
- ${isEN?'Before each delivery, validate the address and customer preference.':'Antes de cada entrega, valide o endereço e a preferência do cliente.'}
- ${isEN?'After each attempt, take the correct photo and record Notify of Arrival.':'Após cada tentativa, tire a foto correta e registre Notify of Arrival.'}
- ${isEN?'If the customer is not there, try again at least twice and report the attempt.':'Caso o cliente não esteja, tente novamente ao menos duas vezes e reporte a tentativa.'}
- ${isEN?'If the package is not received, do not finalize as delivered without complete evidence.':'Se o pacote não for recebido, não finalize como entregue sem evidência completa.'}

4. ${isEN?'IMPROVEMENT TARGET FOR NEXT WEEK':'META DE MELHORIA PARA A PRÓXIMA SEMANA'}
- ${isEN?'DCR ≥ 99%':'DCR ≥ 99%'}
- ${isEN?'DSC DPMO ≤ 900':'DSC DPMO ≤ 900'}
- ${isEN?'POD ≥ 99%':'POD ≥ 99%'}
- ${isEN?'CC ≥ 99%':'CC ≥ 99%'}
- ${isEN?'LoR DPMO ≤ 400':'LoR DPMO ≤ 400'}
- ${isEN?'CDF DPMO ≤ 4420':'CDF DPMO ≤ 4420'}

5. ${isEN?'ENCOURAGEMENT MESSAGE':'MENSAGEM DE INCENTIVO'}
${isEN?'You have the conditions to turn this around with attention to detail. Each correct photo, each customer contact, and each re-attempt make a difference in your ranking and the team\'s reputation.':'Você tem condições de virar isso com atenção aos detalhes. Cada foto certa, cada contato ao cliente e cada reattempt fazem diferença no seu ranking e na reputação do time.'}

6. ${isEN?'WEEKLY SCHEDULE':'AGENDA DA SEMANA'}
- ${isEN?'Monday':'Segunda'}: ${isEN?'Review checklist and define two deliveries for re-attempt focus.':'revisar checklist e definir duas entregas para foco em reattempt.'}
- ${isEN?'Tuesday':'Terça'}: ${isEN?'Check all POD photos and make immediate improvements.':'checar todas as fotos POD e fazer melhorias imediatas.'}
- ${isEN?'Wednesday':'Quarta'}: ${isEN?'Confirm Notify of Arrival on all deliveries.':'confirmar Notify of Arrival em todas as entregas.'}
- ${isEN?'Thursday':'Quinta'}: ${isEN?'Analyze results and adjust route.':'analisar resultados e ajustar rota.'}
- ${isEN?'Friday':'Sexta'}: ${isEN?'Prepare quick report for the manager with what worked.':'preparar relatório rápido para o gestor com o que funcionou.'}`;
  };

  useEffect(()=>{
    generate();
  }, [lang, isEN, driver, template, type]);

  const generate = async () => {
    setLoading(true);
    setError('');
    try {
      if (!apiKey) {
        const text = buildLocalPlan();
        setPlan(text);
        setLoading(false);
        return;
      }

      let prompt;
      if (type==='company') {
        const avg = (drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length).toFixed(2);
        const atRisk = drivers.filter(d=>d.totalScore<70);
        const critical = drivers.filter(d=>d.totalScore<55||d.dscDpmo>2500||d.dcr<98);
        const dscHigh = drivers.filter(d=>d.dscDpmo>900);
        const dcrLow = drivers.filter(d=>d.dcr<99);
        const podLow = drivers.filter(d=>d.pod<99);
        const ccLow = drivers.filter(d=>d.cc<99);
        const top5 = [...drivers].sort((a,b)=>b.totalScore-a.totalScore).slice(0,5);
        const teamData = `EQUIPE H2OL DOX2\nTotal: ${drivers.length} motoristas | Score médio: ${avg}\nFantastic+: ${drivers.filter(d=>d.status==='Fantastic Plus').length} | Fantastic: ${drivers.filter(d=>d.status==='Fantastic').length} | Great: ${drivers.filter(d=>d.status==='Great').length} | Fair: ${drivers.filter(d=>d.status==='Fair').length} | Poor: ${drivers.filter(d=>d.status==='Poor').length}\nCríticos (score<55 ou DSC>2500 ou DCR<98): ${critical.length} — ${critical.map(d=>`${d.name}(${d.totalScore.toFixed(0)})`).join(', ')||'Nenhum'}\nEm risco (score<70): ${atRisk.length} — ${atRisk.map(d=>`${d.name}(${d.totalScore.toFixed(0)})`).join(', ')||'Nenhum'}\nDSC DPMO>900: ${dscHigh.length} drivers | DCR<99%: ${dcrLow.length} | POD<99%: ${podLow.length} | CC<99%: ${ccLow.length}\nTop 5: ${top5.map(d=>`${d.name}(${d.totalScore.toFixed(1)})`).join(', ')}`;
        prompt = `Você é um especialista sênior em operações Amazon DSP com 10 anos de experiência.\nCrie um PLANO DE AÇÃO EXECUTIVO COMPLETO em português para o gestor da H2OL DOX2.\n\n${teamData}\n\nGere o seguinte plano estruturado:\n\n1. 🎯 DIAGNÓSTICO EXECUTIVO\n   - Situação atual da equipe (3-4 linhas com dados concretos)\n   - Principais riscos para o ranking DSP esta semana\n   - Oportunidade de melhoria mais impactante\n\n2. 🚨 MATRIZ DE PRIORIDADES (Urgente × Importante)\n   URGENTE + IMPORTANTE (Fazer AGORA):\n   - Liste 2-3 ações críticas com nome do driver e KPI afetado\n   IMPORTANTE mas não urgente (Planejar esta semana):\n   - Liste 2-3 ações de melhoria sustentável\n   URGENTE mas menos importante (Delegar):\n   - 1-2 tarefas que podem ser delegadas ou simplificadas\n\n3. 📋 PLANO POR DRIVER EM RISCO\n   Para cada driver em risco (score<70), gere:\n   Driver: [Nome] | Score: X | Status: Y\n   - Problema principal: [KPI específico]\n   - Ação imediata (48h): [ação concreta]\n   - Meta para próxima semana: [valor-alvo do KPI]\n\n4. 📅 CRONOGRAMA SEMANAL DO GESTOR\n   Segunda: ...\n   Terça/Quarta: ...\n   Quinta: ...\n   Sexta/Sábado: ...\n\n5. 📊 METAS E KPIs DA PRÓXIMA SEMANA\n   | KPI | Atual | Meta | Responsável |\n   Liste 5-6 KPIs com valores precisos\n\n6. 🌟 ESTRATÉGIA DE RECONHECIMENTO\n   - Reconhecer publicamente: [nomes específicos com motivo]\n   - Como usar top performers como mentores\n   - Mensagem motivacional para toda a equipe (3-4 linhas)\n\n7. 🛡️ PLANO DE CONTINGÊNCIA\n   - Se score cair abaixo de X, fazer Y\n   - Gatilhos para escalar ao Operations Manager\n   - Recursos disponíveis (suporte interno, Amazon support)\n\nSeja direto, específico e baseado nos dados. Use os nomes reais dos drivers.`;
      } else {
        const issues = [driver.dscDpmo>900&&`DSC DPMO:${driver.dscDpmo}`,driver.dcr<99&&`DCR:${driver.dcr}%`,driver.pod<99&&`POD:${driver.pod}%`,driver.cc<99&&`CC:${driver.cc}%`,driver.fico>600&&`FICO:${driver.fico}`].filter(Boolean);
        prompt = `Gestor Amazon DSP. Plano de ação PERSONALIZADO para ${driver.name} em português.\n\nDados: Status:${driver.status} | Score:${driver.totalScore} | Rank:#${driver.rank} | WoW:${driver.wowChange>0?'+':''}${driver.wowChange} | Entregas:${driver.deliveries}\nProblemas: ${issues.length?issues.join(', '):'Nenhum — performance excelente!'}\n\nGere:\n1. 👋 MENSAGEM PERSONALIZADA (cumprimentar pelo nome, reconhecer esforço, tom humano — 3-4 linhas)\n2. 📊 RESUMO DA SEMANA (pontos fortes e a melhorar)\n3. 🎯 PLANO DE AÇÃO (3-5 ações práticas com prazo)\n4. 💪 MENSAGEM DE INCENTIVO FINAL (motivacional e personalizada)\n\nTom humano, direto, encorajador.`;
      }
      const text = await callClaude([{role:'user',content:prompt}], undefined, type==='company'?2048:1024);
      setPlan(text);
    } catch(e) {
      const msg = /saldo anthropic insuficiente|insufficient credits|low balance|credit balance/i.test(e.message)
        ? (isEN
            ? 'Your Anthropic account balance is too low. Visit Anthropic Plans & Billing to buy credits or upgrade your plan.'
            : 'Saldo da sua conta Anthropic está baixo. Vá em Plans & Billing da Anthropic para comprar créditos ou atualizar o plano.')
        : e.message;
      setPlan(`❌ Erro: ${msg}`);
    }
    setLoading(false);
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:400}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(255,153,0,0.25)',borderRadius:22,width:'100%',maxWidth:660,maxHeight:'88vh',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:'18px 22px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
          <div>
            <h2 style={{color:'#fff',margin:0,fontSize:17,fontWeight:800}}>{type==='company'?(isEN?'🏢 Company Action Plan':'🏢 Plano de Ação da Empresa'):(isEN?`🎯 Plan — ${driver?.name}`:`🎯 Plano — ${driver?.name}`)}</h2>
            {driver && <p style={{color:'#64748b',margin:'3px 0 0',fontSize:12}}>{driver.status} · Score: {driver.totalScore.toFixed(1)} · Rank #{driver.rank}</p>}
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            {!loading && <button onClick={generate} style={{background:'rgba(255,153,0,0.1)',border:'1px solid rgba(255,153,0,0.3)',color:'#FF9900',borderRadius:8,padding:'6px 14px',cursor:'pointer',fontSize:12,fontWeight:600}}>🔄 Regenerar</button>}
            <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
          </div>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:22}}>
          {error ? (
            <div style={{textAlign:'center',padding:60}}>
              <div style={{fontSize:34,marginBottom:16}}>⚠️</div>
              <div style={{color:'#fff',fontWeight:700,marginBottom:8}}>{error}</div>
              <div style={{color:'#64748b',fontSize:13,marginBottom:18}}>{isEN?'Add your Anthropic API key to enable action plan generation.':'Adicione sua chave API Anthropic para habilitar a geração do plano de ação.'}</div>
              <button onClick={openSettings} style={{background:'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:12,padding:'12px 22px',cursor:'pointer',fontWeight:700,fontSize:13}}>{isEN?'Open API Key Settings':'Abrir Configurações de API'}</button>
            </div>
          ) : loading ? (
            <div style={{textAlign:'center',padding:60}}>
              <div style={{fontSize:44,marginBottom:16,animation:'pulse 1.5s infinite',display:'inline-block'}}>🤖</div>
              <div style={{color:'#fff',fontWeight:700,marginBottom:8}}>{isEN?'Generating plan with AI...':'Gerando plano com IA...'}</div>
              <div style={{color:'#64748b',fontSize:13}}>{isEN?'Claude is analyzing the data':'Claude está analisando os dados'}</div>
              <div style={{display:'flex',justifyContent:'center',gap:6,marginTop:20}}>
                {[0,1,2].map(i=><span key={i} style={{width:8,height:8,background:'#FF9900',borderRadius:'50%',display:'inline-block',animation:`bounce 1s infinite ${i*.2}s`}}/>) }
              </div>
            </div>
          ) : <div style={{color:'#e2e8f0',fontSize:14,lineHeight:1.8,whiteSpace:'pre-line'}}>{plan}</div>}
        </div>
        {!loading && (
          <div style={{padding:'12px 22px',borderTop:'1px solid rgba(255,255,255,0.07)',flexShrink:0}}>
            <button onClick={()=>{const b=new Blob([plan],{type:'text/plain'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`plano_${driver?.name||'empresa'}.txt`;a.click();URL.revokeObjectURL(u);}} style={{background:'rgba(255,153,0,0.1)',border:'1px solid rgba(255,153,0,0.3)',color:'#FF9900',borderRadius:10,padding:'8px 18px',cursor:'pointer',fontWeight:600,fontSize:13}}>
              💾 Exportar
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}} @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PDF UPLOAD
// ══════════════════════════════════════════════════════════
const csvParseLine = (line) => {
  const res = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i]==='"') { if (inQ&&line[i+1]==='"'){cur+='"';i++;}else inQ=!inQ; }
    else if (line[i]===','&&!inQ) { res.push(cur); cur=''; }
    else cur+=line[i];
  }
  res.push(cur); return res;
};

const parseScoreCardCSV = (text) => {
  const lines = text.split(/\r?\n/).filter(l=>l.trim());
  if (lines.length < 2) throw new Error('CSV vazio ou sem dados');
  const hdrs = csvParseLine(lines[0]).map(h=>h.trim().toLowerCase().replace(/['"]/g,''));
  const find = (...keys) => { for (const k of keys) { const i=hdrs.findIndex(h=>h.includes(k)); if(i>=0)return i; } return -1; };
  const cols = {
    rank: find('rank'), name: find('delivery associate','da name','name','driver'),
    status: find('overall tier','tier','status'), totalScore: find('overall score','score'),
    dcr: find('delivery completion','dcr'), dscDpmo: find('dsc dpmo','dsc'),
    pod: find('photo on delivery','pod'), cc: find('contact compliance','cc'),
    lorDpmo: find('lor dpmo','lor','loss or return'), ceDpmo: find('customer escalation','ce dpmo'),
    cdfDpmo: find('cdf dpmo','cdf'), fico: find('fico'), deliveries: find('delivered','deliveries'),
    depot: find('depot','warehouse','location','facility'),
  };
  if (cols.name < 0) throw new Error('Coluna "Delivery Associate" ou "Name" não encontrada. Verifique o cabeçalho do CSV.');
  const toNum = (v,fb=0) => { const n=parseFloat(String(v||'').replace('%','').replace(',','.')); return isNaN(n)?fb:n; };
  const get = (row,col,fb='') => col>=0&&col<row.length ? String(row[col]).trim().replace(/^["']|["']$/g,'') : fb;
  const drivers = [];
  for (let i=1; i<lines.length; i++) {
    const row = csvParseLine(lines[i]);
    const name = get(row, cols.name);
    if (!name||name.length<2) continue;
    const score = toNum(get(row,cols.totalScore), 0);
    const rawStatus = get(row, cols.status);
    const status = rawStatus||(score>=95?'Fantastic Plus':score>=88?'Fantastic':score>=70?'Great':score>=55?'Fair':'Poor');
    drivers.push({
      id:i, rank:toNum(get(row,cols.rank,String(i)),i), name, status, totalScore:score, wowChange:0, boc:'None',
      dcr:toNum(get(row,cols.dcr),99), dscDpmo:toNum(get(row,cols.dscDpmo),0),
      pod:toNum(get(row,cols.pod),100), cc:toNum(get(row,cols.cc),100),
      lorDpmo:toNum(get(row,cols.lorDpmo),0), ceDpmo:toNum(get(row,cols.ceDpmo),0),
      cdfDpmo:toNum(get(row,cols.cdfDpmo),0), fico:toNum(get(row,cols.fico),0),
      deliveries:toNum(get(row,cols.deliveries),0), depot:get(row,cols.depot,''),
    });
  }
  if (drivers.length===0) throw new Error('Nenhum motorista encontrado. Verifique se o CSV tem dados abaixo do cabeçalho.');
  return drivers;
};

function PDFUploadPanel({ onDataImported, onClose, lang='pt-BR' }) {
  const isEN = lang === 'en-UK';
  const [stage, setStage] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [parsedDrivers, setParsedDrivers] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [importMode, setImportMode] = useState('pdf');
  const [manualText, setManualText] = useState('');
  const [csvParsed, setCsvParsed] = useState(null);
  const [csvErr, setCsvErr] = useState('');
  const [csvLabel, setCsvLabel] = useState('');
  const [csvRange, setCsvRange] = useState('');
  const [csvScore, setCsvScore] = useState('');
  const [csvStatus, setCsvStatus] = useState('Great');
  const [csvRank, setCsvRank] = useState('');
  const [csvRankChange, setCsvRankChange] = useState('0');
  const [selectedDepot, setSelectedDepot] = useState('dox2');
  const fileRef = useRef();
  const csvRef = useRef();
  const hasApiKey = typeof localStorage !== 'undefined' && !!localStorage.getItem('logiq-api-key');

  const processFile = async (file) => {
    if (!file) return;
    setFileName(file.name); setStage('reading'); setProgress(10);
    const dataUrl = await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=()=>rej(new Error('Falha ao ler')); r.readAsDataURL(file); });
    const base64=dataUrl.split(',')[1], mediaType=file.type;
    setProgress(30); setStage('analyzing');
    try {
      const contentArray = file.type.startsWith('image/') ? [
        {type:'image',source:{type:'base64',media_type:mediaType,data:base64}},
        {type:'text',text:`Scorecard Amazon DSP. Extraia todos os motoristas.\nRetorne APENAS JSON:\n{"weekLabel":"Semana XX","dateRange":"DD Mon – DD Mon YYYY","overallScore":87.5,"overallStatus":"Great","drivers":[{"name":"Nome","status":"Fantastic Plus|Fantastic|Great|Fair|Poor","totalScore":95.5,"deliveries":748,"dcr":99.2,"dscDpmo":0,"pod":100,"cc":100,"lorDpmo":0,"ceDpmo":0,"fico":350}]}\nPreencha campos faltantes com valores típicos.`}
      ] : [
        {type:'document',source:{type:'base64',media_type:'application/pdf',data:base64}},
        {type:'text',text:`Analise scorecard Amazon DSP.\nRetorne APENAS JSON:\n{"weekLabel":"Semana XX","dateRange":"DD Mon – DD Mon YYYY","overallScore":87.5,"overallStatus":"Great","drivers":[{"name":"Nome","status":"Fantastic Plus|Fantastic|Great|Fair|Poor","totalScore":95.5,"deliveries":748,"dcr":99.2,"dscDpmo":0,"pod":100,"cc":100,"lorDpmo":0,"ceDpmo":0,"fico":350}]}`}
      ];
      setProgress(60);
      const raw = await callClaude([{role:'user',content:contentArray}]);
      setProgress(75);
      let parsed;
      try { parsed = JSON.parse(raw.replace(/```json|```/g,'').trim()); } catch { throw new Error('Não foi possível extrair dados do arquivo'); }
      const enriched = (parsed.drivers||[]).map((d,i)=>({id:i+1,rank:i+1,wowChange:0,boc:'None',cdfDpmo:2000,...d}));
      setParsedDrivers(enriched);
      const summary = await callClaude([{role:'user',content:`Resumo executivo em 3-4 bullet points do scorecard Amazon DSP:\n${JSON.stringify({...parsed,drivers:enriched.slice(0,10)})}`}]);
      setAiSummary(summary);
      setProgress(100); setStage('done');
    } catch(e) { setErrMsg(e.message||'Erro desconhecido'); setStage('error'); }
  };

  const enrichParsedDrivers = (parsed) => {
    return (parsed.drivers||[]).map((d,i)=>({id:i+1,rank:i+1,wowChange:0,boc:'None',cdfDpmo:2000,...d}));
  };

  const processManual = async () => {
    setErrMsg('');
    try {
      const parsed = JSON.parse(manualText);
      if (!parsed || !Array.isArray(parsed.drivers)) throw new Error('O JSON precisa conter um array drivers');
      const enriched = enrichParsedDrivers(parsed);
      setParsedDrivers(enriched);
      setAiSummary('Importação manual concluída. Revise os dados e confirme.');
      setStage('done');
      setFileName(parsed.weekLabel || 'Manual');
    } catch (e) {
      setErrMsg(e.message || 'JSON inválido. Cole o conteúdo correto.');
      setStage('error');
    }
  };

  const confirmManualImport = () => {
    onDataImported(parsedDrivers.map(d=>({...d,depot:selectedDepot})), fileName || 'Manual');
    onClose();
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:300}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(255,153,0,0.25)',borderRadius:22,width:'100%',maxWidth:620,maxHeight:'88vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:26}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div><h2 style={{color:'#fff',margin:0,fontSize:19,fontWeight:800}}>📥 {isEN?'Import Scorecard':'Importar Scorecard'}</h2><p style={{color:'#64748b',margin:'4px 0 0',fontSize:13}}>{importMode==='pdf'?(isEN?'PDF or image — AI extracts automatically':'PDF ou imagem — IA extrai automaticamente'):importMode==='csv'?(isEN?'CSV — no AI, direct from file':'CSV — sem IA, direto do arquivo'):(isEN?'Manual JSON — paste structured content':'JSON manual — cole o conteúdo estruturado')}</p></div>
            <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'8px 12px',marginBottom:20,display:'flex',alignItems:'center',gap:8}}>
            <span style={{color:'#64748b',fontSize:14,fontWeight:600}}>🏢 {isEN?'Depot:':'Depósito:'}</span>
            <select value={selectedDepot} onChange={e=>setSelectedDepot(e.target.value)} style={{background:'transparent',border:'none',color:'#fff',fontSize:14,fontWeight:600,outline:'none',cursor:'pointer',flex:1}}>
              {DEPOTS.map(d=><option key={d.id} value={d.id} style={{background:'#0d1527'}}>{d.label}</option>)}
            </select>
          </div>
          {(stage==='idle'||importMode==='csv') && (
            <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:11,padding:4,marginBottom:20,gap:4}}>
              {[{k:'pdf',l:isEN?'📄 PDF/Image':'📄 PDF/Imagem'},{k:'csv',l:'📊 CSV'},{k:'manual',l:'{ } JSON'}].map(m=>(
                <button key={m.k} onClick={()=>{setImportMode(m.k);setCsvParsed(null);setCsvErr('');setStage('idle');}} style={{flex:1,padding:'8px 6px',background:importMode===m.k?'linear-gradient(135deg,#FF9900,#FF6B35)':'none',border:'none',color:importMode===m.k?'#fff':'#64748b',borderRadius:8,fontWeight:700,fontSize:12,cursor:'pointer',transition:'all .2s'}}>
                  {m.l}
                </button>
              ))}
            </div>
          )}
          {stage==='idle' && importMode==='pdf' && (
            <>
              <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);processFile(e.dataTransfer.files[0]);}} onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${dragOver?'#FF9900':'rgba(255,255,255,0.15)'}`,borderRadius:16,padding:48,textAlign:'center',cursor:'pointer',background:dragOver?'rgba(255,153,0,0.04)':'rgba(255,255,255,0.02)',transition:'all .2s'}}>
                <div style={{fontSize:48,marginBottom:12}}>📂</div>
                <div style={{color:'#fff',fontWeight:700,fontSize:16,marginBottom:6}}>{isEN?'Drag here or click':'Arraste aqui ou clique'}</div>
                <div style={{color:'#64748b',fontSize:13,marginBottom:16}}>{isEN?'PDF, PNG, JPG from Amazon scorecard':'PDF, PNG, JPG do scorecard Amazon'}</div>
                <div style={{display:'inline-block',background:'linear-gradient(135deg,#FF9900,#FF6B35)',color:'#fff',padding:'10px 24px',borderRadius:10,fontWeight:700,fontSize:14}}>{isEN?'Select File':'Selecionar Arquivo'}</div>
                <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,image/*" style={{display:'none'}} onChange={e=>processFile(e.target.files[0])}/>
              </div>
              {!hasApiKey && <div style={{marginTop:14,textAlign:'center',color:'#fbbf24',fontSize:12}}>{isEN?'No API key? Use the':'Sem chave API? Use a aba'} <b>CSV</b> {isEN?'or':'ou'} <b>JSON</b> {isEN?'tab above.':'acima.'}</div>}
            </>
          )}
          {importMode==='manual' && stage==='idle' && (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:14}}>
                <div style={{color:'#fff',fontWeight:700,marginBottom:8}}>{isEN?'Paste scorecard JSON':'Cole o JSON do scorecard'}</div>
                <div style={{color:'#94a3b8',fontSize:12,marginBottom:14}}>{isEN?'Use the scorecard structure that includes weekLabel, dateRange, overallScore, overallStatus and drivers.':'Use a estrutura do scorecard que inclui weekLabel, dateRange, overallScore, overallStatus e drivers.'}</div>
                <textarea value={manualText} onChange={e=>setManualText(e.target.value)} placeholder='{"weekLabel":"Semana 19","dateRange":"...","overallScore":87.5,"overallStatus":"Great","drivers":[{"name":"...","status":"Great","totalScore":85.0,"deliveries":700,"dcr":99.0,"dscDpmo":1200,"pod":100,"cc":100,"lorDpmo":0,"ceDpmo":0,"fico":420}]}' style={{width:'100%',minHeight:170,background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,color:'#fff',padding:14,fontSize:12,fontFamily:'monospace',resize:'vertical'}}/>
              </div>
              <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'space-between'}}>
                <button onClick={processManual} style={{background:'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:10,padding:'12px 18px',cursor:'pointer',fontWeight:700}}>{isEN?'Process JSON':'Processar JSON'}</button>
                <button onClick={()=>{setImportMode('pdf');setManualText('');}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',color:'#94a3b8',borderRadius:10,padding:'12px 18px',cursor:'pointer',fontWeight:700}}>{isEN?'Back':'Voltar'}</button>
              </div>
              <div style={{color:'#94a3b8',fontSize:12}}>{isEN?'Tip: if the PDF cannot be analyzed without AI, you can copy the driver table and assemble the JSON manually here.':'Dica: se o PDF não puder ser analisado sem IA, você pode copiar a tabela de motoristas e montar o JSON manualmente aqui.'}</div>
            </div>
          )}
          {importMode==='csv' && !csvParsed && (
            <div>
              <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
                onDrop={e=>{
                  e.preventDefault(); setDragOver(false);
                  const file=e.dataTransfer.files[0]; if(!file) return;
                  const reader=new FileReader();
                  reader.onload=ev=>{try{setCsvErr('');const d=parseScoreCardCSV(ev.target.result);const avg=d.reduce((s,x)=>s+x.totalScore,0)/d.length;setCsvScore(avg.toFixed(1));setCsvStatus(avg>=95?'Fantastic Plus':avg>=88?'Fantastic':avg>=70?'Great':avg>=55?'Fair':'Poor');setCsvParsed(d);setCsvLabel(file.name.replace('.csv',''));}catch(e2){setCsvErr(e2.message);}};
                  reader.readAsText(file);
                }}
                onClick={()=>csvRef.current?.click()}
                style={{border:`2px dashed ${dragOver?'#4ade80':'rgba(255,255,255,0.15)'}`,borderRadius:16,padding:48,textAlign:'center',cursor:'pointer',background:dragOver?'rgba(74,222,128,0.04)':'rgba(255,255,255,0.02)',transition:'all .2s',marginBottom:14}}>
                <div style={{fontSize:48,marginBottom:12}}>📊</div>
                <div style={{color:'#fff',fontWeight:700,fontSize:16,marginBottom:6}}>{isEN?'Drag CSV here or click':'Arraste o CSV aqui ou clique'}</div>
                <div style={{color:'#64748b',fontSize:13,marginBottom:16}}>{isEN?'CSV file exported from Amazon DSP scorecard':'Arquivo CSV exportado do scorecard Amazon DSP'}</div>
                <div style={{display:'inline-block',background:'linear-gradient(135deg,#4ade80,#16a34a)',color:'#fff',padding:'10px 24px',borderRadius:10,fontWeight:700,fontSize:14}}>{isEN?'Select CSV':'Selecionar CSV'}</div>
                <input ref={csvRef} type="file" accept=".csv,text/csv" style={{display:'none'}} onChange={e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{try{setCsvErr('');const d=parseScoreCardCSV(ev.target.result);const avg=d.reduce((s,x)=>s+x.totalScore,0)/d.length;setCsvScore(avg.toFixed(1));setCsvStatus(avg>=95?'Fantastic Plus':avg>=88?'Fantastic':avg>=70?'Great':avg>=55?'Fair':'Poor');setCsvParsed(d);setCsvLabel(file.name.replace('.csv',''));}catch(e2){setCsvErr(e2.message);}};reader.readAsText(file);}}/>
              </div>
              {csvErr&&<div style={{background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.25)',borderRadius:10,padding:'10px 14px',color:'#f87171',fontSize:13,marginBottom:12}}>❌ {csvErr}</div>}
              <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
                <div style={{color:'#94a3b8',fontSize:11,fontWeight:700,marginBottom:8}}>{isEN?'EXPECTED COLUMNS IN HEADER (English)':'COLUNAS ESPERADAS NO CABEÇALHO (inglês)'}</div>
                <div style={{color:'#475569',fontSize:11,fontFamily:'monospace',lineHeight:2}}>Rank · Delivery Associate · Overall Tier · Overall Score · DCR · DSC DPMO · POD · Contact Compliance · LoR DPMO · CDF DPMO · FICO · Delivered</div>
              </div>
            </div>
          )}
          {importMode==='csv' && csvParsed && (
            <div>
              <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.25)',borderRadius:12,padding:14,marginBottom:16,display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:22}}>✅</span>
                <div><div style={{color:'#4ade80',fontWeight:700}}>{csvParsed.length} {isEN?'drivers found':'motoristas encontrados'}</div><div style={{color:'#64748b',fontSize:12}}>{isEN?'Fill in week info (optional)':'Preencha as informações da semana (opcional)'}</div></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                {[{l:isEN?'WEEK':'SEMANA',v:csvLabel,s:setCsvLabel,ph:isEN?'ex: Week 20':'ex: Semana 20'},{l:isEN?'PERIOD':'PERÍODO',v:csvRange,s:setCsvRange,ph:isEN?'ex: 19 May – 25 May 2025':'ex: 19 May – 25 May 2025'},{l:isEN?'OVERALL SCORE':'SCORE GERAL DSP',v:csvScore,s:setCsvScore,ph:isEN?'ex: 88.5':'ex: 88.5'},{l:isEN?'RANK':'RANK DOX2',v:csvRank,s:setCsvRank,ph:isEN?'ex: 3':'ex: 3'}].map(f=>(
                  <div key={f.l}>
                    <div style={{color:'#64748b',fontSize:10,fontWeight:700,marginBottom:4}}>{f.l}</div>
                    <input value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.ph} style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'7px 10px',fontSize:12,outline:'none',boxSizing:'border-box'}}/>
                  </div>
                ))}
                <div>
                  <div style={{color:'#64748b',fontSize:10,fontWeight:700,marginBottom:4}}>{isEN?'OVERALL STATUS':'STATUS GERAL'}</div>
                  <select value={csvStatus} onChange={e=>setCsvStatus(e.target.value)} style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'7px 10px',fontSize:12,outline:'none'}}>
                    {['Fantastic Plus','Fantastic','Great','Fair','Poor'].map(o=><option key={o} value={o} style={{background:'#0d1527'}}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{color:'#64748b',fontSize:10,fontWeight:700,marginBottom:4}}>{isEN?'WoW RANK (ex: +1 or -2)':'WoW RANK (ex: +1 ou -2)'}</div>
                  <input value={csvRankChange} onChange={e=>setCsvRankChange(e.target.value)} placeholder="0" style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'7px 10px',fontSize:12,outline:'none',boxSizing:'border-box'}}/>
                </div>
              </div>
              <div style={{marginBottom:14,maxHeight:160,overflowY:'auto',border:'1px solid rgba(255,255,255,0.07)',borderRadius:10}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                  <thead style={{position:'sticky',top:0,background:'#0d1527'}}>
                    <tr style={{color:'#64748b',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                      {['#',isEN?'Name':'Nome','Status','Score','DCR','DSC DPMO'].map(h=><th key={h} style={{padding:'7px 10px',textAlign:'left',fontWeight:600}}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {csvParsed.map((d,i)=>(
                      <tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                        <td style={{padding:'6px 10px',color:'#475569'}}>{i+1}</td>
                        <td style={{padding:'6px 10px',color:'#e2e8f0'}}>{d.name}</td>
                        <td style={{padding:'6px 10px'}}><span style={{background:STATUS_META[d.status]?.badge||'#64748b',color:'#fff',fontSize:9,padding:'2px 7px',borderRadius:5,fontWeight:700}}>{d.status}</span></td>
                        <td style={{padding:'6px 10px',color:d.totalScore>=90?'#4ade80':d.totalScore>=70?'#fde047':'#f87171',fontWeight:700}}>{d.totalScore?.toFixed(1)}</td>
                        <td style={{padding:'6px 10px',color:mc(d.dcr)}}>{d.dcr?.toFixed(2)}%</td>
                        <td style={{padding:'6px 10px',color:mc(d.dscDpmo,'bad')}}>{d.dscDpmo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{display:'flex',gap:12}}>
                <button onClick={()=>{
                  const sc=parseFloat(csvScore)||csvParsed.reduce((s,d)=>s+d.totalScore,0)/csvParsed.length;
                  const wk={label:csvLabel||(isEN?'CSV Imported':'CSV Importado'),range:csvRange||'',overallScore:sc,overallStatus:csvStatus,rank:parseInt(csvRank)||null,rankChange:parseInt(csvRankChange)||0};
                  onDataImported(csvParsed.map((d,i)=>({...d,id:i+1,rank:i+1,depot:selectedDepot})), csvLabel||(isEN?'CSV Imported':'CSV Importado'), wk);
                  onClose();
                }} style={{flex:1,background:'linear-gradient(135deg,#4ade80,#16a34a)',border:'none',color:'#fff',borderRadius:11,padding:'12px',fontWeight:800,cursor:'pointer',fontSize:14}}>✅ {isEN?'Use in Dashboard':'Usar no Dashboard'}</button>
                <button onClick={()=>setCsvParsed(null)} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#94a3b8',borderRadius:11,padding:'12px 18px',fontWeight:600,cursor:'pointer',fontSize:14}}>{isEN?'New CSV':'Novo CSV'}</button>
              </div>
            </div>
          )}
          {(stage==='reading'||stage==='analyzing') && (
            <div style={{textAlign:'center',padding:40}}>
              <div style={{fontSize:52,marginBottom:16,animation:'spin 2s linear infinite',display:'inline-block'}}>⚙️</div>
              <div style={{color:'#fff',fontWeight:700,fontSize:16,marginBottom:8}}>{stage==='reading'?(isEN?'Reading file...':'Lendo arquivo...'):(isEN?'🤖 AI analyzing data...':'🤖 IA analisando dados...')}</div>
              <div style={{color:'#64748b',fontSize:13,marginBottom:20}}>{stage==='analyzing'?(isEN?'Claude extracts and structures KPIs':'Claude extrai e estrutura os KPIs'):(isEN?'Processing...':'Processando')}</div>
              <div style={{background:'rgba(255,255,255,0.08)',borderRadius:8,height:8,overflow:'hidden',maxWidth:300,margin:'0 auto'}}>
                <div style={{width:`${progress}%`,height:'100%',background:'linear-gradient(90deg,#FF9900,#FF6B35)',borderRadius:8,transition:'width .5s ease'}}/>
              </div>
              <div style={{color:'#FF9900',fontSize:12,marginTop:8}}>{progress}%</div>
            </div>
          )}
          {stage==='error' && (
            <div style={{textAlign:'center',padding:32}}>
              <div style={{fontSize:48,marginBottom:12}}>❌</div>
              <div style={{color:'#f87171',fontWeight:700,fontSize:16,marginBottom:8}}>{isEN?'Error processing':'Erro ao processar'}</div>
              <div style={{color:'#64748b',fontSize:13,marginBottom:6}}>{errMsg}</div>
              <div style={{color:'#475569',fontSize:11,marginBottom:20}}>{isEN?'Formats: PDF, PNG, JPG':'Formatos: PDF, PNG, JPG'}</div>
              <button onClick={()=>{setStage('idle');setErrMsg('');}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',borderRadius:10,padding:'10px 24px',cursor:'pointer',fontWeight:600}}>{isEN?'Try again':'Tentar novamente'}</button>
            </div>
          )}
          {stage==='done' && (
            <div>
              <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.25)',borderRadius:12,padding:14,marginBottom:18,display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:22}}>✅</span>
                <div><div style={{color:'#4ade80',fontWeight:700}}>{parsedDrivers.length} {isEN?'drivers':'motoristas'} {isEN?'from':'de'} "{fileName}"</div><div style={{color:'#64748b',fontSize:12}}>{isEN?'Data ready':'Dados prontos'}</div></div>
              </div>
              {aiSummary && (
                <div style={{background:'rgba(255,153,0,0.07)',border:'1px solid rgba(255,153,0,0.2)',borderRadius:12,padding:14,marginBottom:18}}>
                  <div style={{color:'#FF9900',fontWeight:700,marginBottom:8,fontSize:13}}>{isEN?'🤖 AI Analysis':'🤖 Análise IA'}</div>
                  <div style={{color:'#cbd5e1',fontSize:13,lineHeight:1.7,whiteSpace:'pre-line'}}>{aiSummary}</div>
                </div>
              )}
              <div style={{marginBottom:16,maxHeight:160,overflowY:'auto',border:'1px solid rgba(255,255,255,0.07)',borderRadius:10}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                  <thead style={{position:'sticky',top:0,background:'#0d1527'}}>
                    <tr style={{color:'#64748b',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                      {[isEN?'Name':'Nome',isEN?'Status':'Status',isEN?'Score':'Score','DCR','DSC DPMO'].map(h=><th key={h} style={{padding:'8px 10px',textAlign:'left',fontWeight:600}}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedDrivers.map((d,i)=>(
                      <tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                        <td style={{padding:'7px 10px',color:'#e2e8f0'}}>{d.name}</td>
                        <td style={{padding:'7px 10px'}}><span style={{background:STATUS_META[d.status]?.badge||'#64748b',color:'#fff',fontSize:9,padding:'2px 7px',borderRadius:5,fontWeight:700}}>{d.status}</span></td>
                        <td style={{padding:'7px 10px',color:d.totalScore>=90?'#4ade80':d.totalScore>=70?'#fde047':'#f87171',fontWeight:700}}>{d.totalScore?.toFixed(1)}</td>
                        <td style={{padding:'7px 10px',color:mc(d.dcr)}}>{d.dcr?.toFixed(2)}%</td>
                        <td style={{padding:'7px 10px',color:mc(d.dscDpmo,'bad')}}>{d.dscDpmo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{display:'flex',gap:12}}>
                <button onClick={()=>onDataImported(parsedDrivers.map(d=>({...d,depot:selectedDepot})),fileName)} style={{flex:1,background:'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:11,padding:'12px',fontWeight:800,cursor:'pointer',fontSize:14}}>✅ {isEN?'Use in Dashboard':'Usar no Dashboard'}</button>
                <button onClick={()=>setStage('idle')} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#94a3b8',borderRadius:11,padding:'12px 18px',fontWeight:600,cursor:'pointer',fontSize:14}}>{isEN?'New':'Novo'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// WEEKLY SCORE EVOLUTION CHART — linha interativa por driver
// ══════════════════════════════════════════════════════════
function WeeklyTrendChart({ drivers }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [expandedCard, setExpandedCard] = useState(null);

  // Calculate metrics
  const avgScore = (drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length).toFixed(1);
  const atRiskList = drivers.filter(d=>d.totalScore<70).sort((a,b)=>a.totalScore-b.totalScore);
  const topPerformersList = drivers.filter(d=>d.status==='Fantastic'||d.status==='Fantastic Plus').sort((a,b)=>b.totalScore-a.totalScore);

  // Best/worst KPIs
  const avgDcr = (drivers.reduce((s,d)=>s+d.dcr,0)/drivers.length).toFixed(1);
  const avgDsc = Math.round(drivers.reduce((s,d)=>s+d.dscDpmo,0)/drivers.length);
  const avgPod = (drivers.reduce((s,d)=>s+d.pod,0)/drivers.length).toFixed(1);
  const avgCc = (drivers.reduce((s,d)=>s+d.cc,0)/drivers.length).toFixed(1);

  const bestKpi = [
    {name:'DCR', value:avgDcr, target:99, ok:avgDcr>=99},
    {name:'DSC DPMO', value:avgDsc, target:900, ok:avgDsc<=900},
    {name:'POD', value:avgPod, target:99, ok:avgPod>=99},
    {name:'CC', value:avgCc, target:99, ok:avgCc>=99}
  ].sort((a,b)=>(b.ok?1:0)-(a.ok?1:0));

  const cards = [
    {id:'avg', title:isEN?'Avg Score':'Score Médio', value:avgScore, color:'#FF9900', icon:'📊', subtitle:isEN?'Across all drivers':'Entre todos os motoristas', clickable:false},
    {id:'risk', title:isEN?'At Risk':'Em Risco', value:atRiskList.length, color:'#f87171', icon:'⚠️', subtitle:isEN?'Score < 70':'Score < 70', clickable:true},
    {id:'top', title:isEN?'Top Performers':'Top 5', value:topPerformersList.length, color:'#4ade80', icon:'🌟', subtitle:isEN?'Fantastic+':'Fantastic+', clickable:true},
  ];

  return (
    <>
      <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:16}}>
        <div style={{marginBottom:12}}>
          <h3 style={{color:'#fff',margin:'0 0 12px',fontSize:14,fontWeight:800}}>📊 {isEN?'Team KPI Summary':'Resumo de KPIs'}</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10}}>
            {cards.map(c=>(
              <div key={c.id} onClick={()=>c.clickable&&setExpandedCard(c.id)} style={{background:expandedCard===c.id?'rgba(255,255,255,0.12)':'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))',border:`1px solid ${expandedCard===c.id?c.color:'rgba(255,255,255,0.08)'}`,borderRadius:12,padding:14,display:'flex',flexDirection:'column',gap:6,cursor:c.clickable?'pointer':'default',transition:'all 0.2s'}}>
                <div style={{fontSize:24}}>{c.icon}</div>
                <div style={{color:'#94a3b8',fontSize:11,fontWeight:600}}>{c.title}{c.clickable && ' 👆'}</div>
                <div style={{color:c.color,fontSize:20,fontWeight:800}}>{c.value}</div>
                <div style={{color:'#64748b',fontSize:10}}>{c.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

      <div style={{marginBottom:12}}>
        <h3 style={{color:'#fff',margin:'0 0 10px',fontSize:13,fontWeight:700}}>💪 {isEN?'KPI Health Check':'Saúde dos KPIs'}</h3>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {bestKpi.map(kpi=>(
            <div key={kpi.name} style={{background:kpi.ok?'rgba(74,222,128,0.08)':'rgba(239,68,68,0.08)',border:`1px solid ${kpi.ok?'rgba(74,222,128,0.25)':'rgba(239,68,68,0.25)'}`,borderRadius:10,padding:10,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{color:'#fff',fontSize:12,fontWeight:700}}>{kpi.name}</div>
                <div style={{color:'#94a3b8',fontSize:11}}>Alvo: {kpi.target}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{color:kpi.ok?'#4ade80':'#f87171',fontSize:13,fontWeight:800}}>{kpi.value}</div>
                <div style={{color:'#64748b',fontSize:10}}>{kpi.ok?'✓ OK':'⚠️ Crítico'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded List Modal */}
      {expandedCard && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'flex-end',zIndex:400,padding:20}} onClick={()=>setExpandedCard(null)}>
          <div style={{background:'#0d1527',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'20px 20px 0 0',width:'100%',maxWidth:600,maxHeight:'70vh',display:'flex',flexDirection:'column',overflow:'hidden'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:20,borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3 style={{color:'#fff',margin:0,fontSize:16,fontWeight:800}}>
                {expandedCard==='risk' && (isEN?'⚠️ Drivers At Risk':'⚠️ Motoristas em Risco')}
                {expandedCard==='top' && (isEN?'🌟 Top Performers':'🌟 Melhores Motoristas')}
              </h3>
              <button onClick={()=>setExpandedCard(null)} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:24}}>✕</button>
            </div>
            <div style={{overflowY:'auto',flex:1,padding:16,display:'flex',flexDirection:'column',gap:8}}>
              {expandedCard==='risk' && atRiskList.map(d=>(
                <div key={d.id} style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',transition:'all .2s'}} onClick={()=>setDriverModal(d)} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(239,68,68,0.15)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(239,68,68,0.08)'}>
                  <div style={{flex:1}}>
                    <div style={{color:'#fff',fontSize:13,fontWeight:700,textDecoration:'underline'}}>{d.name}</div>
                    <div style={{color:'#f87171',fontSize:11}}>Score: {d.totalScore.toFixed(1)} · {d.status}</div>
                  </div>
                  <div style={{background:'#f87171',color:'#fff',padding:'2px 8px',borderRadius:6,fontSize:10,fontWeight:700}}>
                    {isEN?'Critical':'Crítico'}
                  </div>
                </div>
              ))}
              {expandedCard==='top' && topPerformersList.map((d,i)=>(
                <div key={d.id} style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.2)',borderRadius:12,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',transition:'all .2s'}} onClick={()=>setDriverModal(d)} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(74,222,128,0.15)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(74,222,128,0.08)'}>
                  <div style={{flex:1}}>
                    <div style={{color:'#fff',fontSize:13,fontWeight:700,textDecoration:'underline'}}>#{i+1} · {d.name}</div>
                    <div style={{color:'#4ade80',fontSize:11}}>Score: {d.totalScore.toFixed(1)} · {d.status}</div>
                  </div>
                  <div style={{fontSize:18}}>🏆</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════
// KPI HISTORY HELPER
// ══════════════════════════════════════════════════════════
function getDriverKPIHistory(driverId, weeks=WEEKS) {
  return weeks.map(w => {
    const wd = generateWeekData(w.id);
    const d = wd.find(dr => dr.id === driverId);
    return {
      week: w.label,
      dsc: d?.dscDpmo || 0,
      dcr: d?.dcr || 0,
      pod: d?.pod || 0,
      cc: d?.cc || 0,
    };
  });
}

// ══════════════════════════════════════════════════════════
// KPI TREND CHART — Evolução por driver (DSC, DCR, POD, CC)
// ══════════════════════════════════════════════════════════
function DriverKPIHistory({ driver, onClose }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [selKpi, setSelKpi] = useState('dsc');

  const kpiHistory = getDriverKPIHistory(driver.id);

  const KPIS = [
    { key:'dsc', label:'DSC DPMO', good:false, target:900, color:'#f97316', fmt:(v)=>v.toLocaleString(), units:'DPMO' },
    { key:'dcr', label:'DCR', good:true, target:99, color:'#3b82f6', fmt:(v)=>v.toFixed(2), units:'%' },
    { key:'pod', label:'POD', good:true, target:99, color:'#8b5cf6', fmt:(v)=>v.toFixed(1), units:'%' },
    { key:'cc', label:'CC', good:true, target:99, color:'#06b6d4', fmt:(v)=>v.toFixed(1), units:'%' },
  ];

  const kpi = KPIS.find(k => k.key === selKpi);
  const data = kpiHistory.map(h => h[selKpi]);
  const [prev, curr] = [data[data.length-2], data[data.length-1]];
  const wow = prev ? curr - prev : 0;
  const wowPercent = prev ? ((wow / prev) * 100).toFixed(1) : 0;
  const trend = wow > 0.5 ? (kpi.good ? '↑ Melhorando' : '↓ Piorando') :
                wow < -0.5 ? (kpi.good ? '↓ Piorando' : '↑ Melhorando') : '→ Estável';
  const trendColor = (wow > 0.5 && kpi.good) || (wow < -0.5 && !kpi.good) ? '#4ade80' :
                     (wow > 0.5 && !kpi.good) || (wow < -0.5 && kpi.good) ? '#f87171' : '#fde047';

  const W=580, H=220, PL=45, PT=18, PR=20, PB=36;
  const cW=W-PL-PR, cH=H-PT-PB;
  const nW = data.length;
  const minV = Math.min(...data) * 0.9;
  const maxV = Math.max(...data) * 1.1;
  const range = maxV - minV;

  const xP = i => PL + (i / (nW - 1)) * cW;
  const yP = v => PT + cH - ((v - minV) / range) * cH;

  // Linha de alerta
  const targetY = yP(kpi.target);
  const isAlert = kpi.good ? data.some(v => v < kpi.target) : data.some(v => v > kpi.target);

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:10010}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(125,211,252,0.25)',borderRadius:20,width:'100%',maxWidth:650,maxHeight:'85vh',overflowY:'auto',display:'flex',flexDirection:'column',zIndex:10011}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:15}}>📊 {isEN?'KPI History':'Histórico de KPIs'} — {driver.name}</div>
            <div style={{color:'#64748b',fontSize:11,marginTop:3}}>Evolução de performance ao longo de 4 semanas</div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>

        {/* Content */}
        <div style={{flex:1,padding:'16px 20px',display:'flex',flexDirection:'column',gap:16}}>
          {/* KPI selector */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {KPIS.map(k => (
              <button key={k.key} onClick={() => setSelKpi(k.key)}
                style={{padding:'7px 13px',borderRadius:8,border:`2px solid ${selKpi===k.key?k.color:'rgba(255,255,255,0.1)'}`,
                        background:selKpi===k.key?`${k.color}15`:'transparent',color:selKpi===k.key?k.color:'#94a3b8',
                        fontWeight:700,fontSize:12,cursor:'pointer',transition:'all .2s'}}>
                {k.label}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
            {[
              {label:isEN?'Current':'Atual',    val:kpi.fmt(curr),               color:kpi.color},
              {label:isEN?'Change WoW':'Var WoW', val:(wow>=0?'+':'')+wow.toFixed(1)+` (${wowPercent}%)`, color:trendColor},
              {label:isEN?'Target':'Meta',     val:kpi.fmt(kpi.target),       color:isAlert?'#f87171':'#4ade80'},
              {label:isEN?'Trend':'Tendência',  val:trend,                      color:trendColor},
            ].map(m=>(
              <div key={m.label} style={{background:'rgba(0,0,0,0.3)',borderRadius:10,padding:'10px 12px',textAlign:'center'}}>
                <div style={{color:'#64748b',fontSize:10}}>{m.label}</div>
                <div style={{color:m.color,fontWeight:700,fontSize:14,marginTop:4}}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:'visible'}}>
            {/* Target line */}
            <line x1={PL} y1={targetY} x2={W-PR} y2={targetY} stroke={isAlert?'#f87171':'#4ade80'} strokeWidth={1.5} strokeDasharray="4,3" opacity={0.5}/>
            <text x={W-PR+4} y={targetY-4} fill={isAlert?'#f87171':'#4ade80'} fontSize={8} opacity={0.7}>Meta: {kpi.fmt(kpi.target)}</text>

            {/* Grid */}
            {[0,25,50,75,100].map(p=>{
              const v = minV + (range * p / 100);
              return (
                <g key={p}>
                  <line x1={PL} y1={yP(v)} x2={W-PR} y2={yP(v)} stroke="rgba(255,255,255,0.03)" strokeWidth={1}/>
                  <text x={PL-4} y={yP(v)+3} fill="rgba(255,255,255,0.15)" fontSize={8} textAnchor="end">{kpi.fmt(v)}</text>
                </g>
              );
            })}

            {/* Line + points */}
            <path d={data.map((v,i)=>`${i===0?'M':'L'} ${xP(i).toFixed(1)} ${yP(v).toFixed(1)}`).join(' ')}
                  fill="none" stroke={kpi.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
            {data.map((v,i)=>{
              const ok = kpi.good ? v>=kpi.target : v<=kpi.target;
              return (
                <g key={i}>
                  <circle cx={xP(i)} cy={yP(v)} r={4} fill={kpi.color} stroke="#0d1527" strokeWidth={2}/>
                  <text x={xP(i)} y={yP(v)-10} fill={kpi.color} fontSize={9} fontWeight={700} textAnchor="middle">{kpi.fmt(v)}</text>
                  {!ok && <text x={xP(i)} y={yP(v)+16} fill="#f87171" fontSize={10} textAnchor="middle">⚠️</text>}
                </g>
              );
            })}

            {/* Week labels */}
            {kpiHistory.map((h,i)=>(
              <text key={i} x={xP(i)} y={H-PB+14} fill="rgba(255,255,255,0.4)" fontSize={9} textAnchor="middle">{h.week}</text>
            ))}
          </svg>

          {/* Alert if any week is below target */}
          {isAlert && (
            <div style={{background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:10,padding:'10px 12px'}}>
              <div style={{color:'#f87171',fontWeight:700,fontSize:12}}>⚠️ {isEN?'Alert':'Alerta'}: {kpi.label} {isEN?'not meeting target':'fora da meta'}</div>
              <div style={{color:'#94a3b8',fontSize:11,marginTop:3}}>
                {kpi.key==='dsc' ? (isEN?'Focus on POD and Contact Compliance to reduce delivery issues.':'Focar em POD e Contact Compliance para reduzir problemas.') :
                 kpi.key==='dcr' ? (isEN?'Increase reattempts before returning to depot.':'Aumentar reattempts antes de retornar.') :
                 kpi.key==='pod' ? (isEN?'Ensure photo before marking delivery complete.':'Garantir foto antes de confirmar entrega.') :
                 (isEN?'Notify customer on arrival for all deliveries.':'Notificar cliente na chegada em todas as entregas.')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function AlertsBanner({ drivers }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const isEN = lang==='en-UK';

  const alerts = useMemo(()=>{
    const list=[];
    drivers.forEach(d=>{
      if(d.totalScore<55) list.push({d, msg:isEN?`Score ${d.totalScore.toFixed(1)} — Poor`:`Score ${d.totalScore.toFixed(1)} — Poor`, color:'#ef4444'});
      else if(d.dscDpmo>2500) list.push({d, msg:isEN?`DSC DPMO ${d.dscDpmo.toLocaleString()} — Critical`:`DSC DPMO ${d.dscDpmo.toLocaleString()} — Crítico`, color:'#f87171'});
      else if(d.dcr<98) list.push({d, msg:isEN?`DCR ${d.dcr.toFixed(2)}% — Below min`:`DCR ${d.dcr.toFixed(2)}% — Abaixo do mínimo`, color:'#fb923c'});
      else if(d.cc<90) list.push({d, msg:isEN?`CC ${d.cc.toFixed(1)}% — Critical`:`CC ${d.cc.toFixed(1)}% — Crítico`, color:'#f97316'});
    });
    return list;
  },[drivers,lang]);

  if(alerts.length===0) return (
    <div style={{background:'rgba(74,222,128,0.06)',border:'1px solid rgba(74,222,128,0.2)',borderRadius:12,padding:'10px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
      <span style={{fontSize:18}}>✅</span>
      <span style={{color:'#4ade80',fontSize:13,fontWeight:600}}>{isEN?'All KPIs within target this week!':'Todos os KPIs dentro da meta esta semana!'}</span>
    </div>
  );

  return (
    <div style={{background:'rgba(220,38,38,0.06)',border:'1px solid rgba(220,38,38,0.25)',borderRadius:12,marginBottom:14,overflow:'hidden'}}>
      <div onClick={()=>setOpen(!open)} style={{padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:18}}>🚨</span>
          <span style={{color:'#f87171',fontSize:13,fontWeight:700}}>{isEN?`${alerts.length} Critical Alert(s) this week`:`${alerts.length} Alerta(s) Crítico(s) esta semana`}</span>
        </div>
        <span style={{color:'#f87171',fontSize:12,display:'inline-block',transform:open?'rotate(180deg)':'none',transition:'transform .2s'}}>▾</span>
      </div>
      {open&&<div style={{borderTop:'1px solid rgba(220,38,38,0.2)',padding:'8px 14px',display:'flex',flexDirection:'column',gap:6}}>
        {alerts.map((a,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(220,38,38,0.04)',borderRadius:8,padding:'7px 10px'}}>
            <span style={{color:'#e2e8f0',fontSize:12,fontWeight:600}}>{a.d.name}</span>
            <span style={{color:a.color,fontSize:11,fontWeight:600}}>{a.msg}</span>
          </div>
        ))}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MESSAGE TEMPLATES MODAL
// ══════════════════════════════════════════════════════════
function MessageTemplates({ drivers, currentWeek, onClose }) {
  const { lang } = useLang();
  const isEN = lang==='en-UK';
  const [tab, setTab] = useState('driver');
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [selDriver, setSelDriver] = useState(drivers[0]);
  const [expandedMessage, setExpandedMessage] = useState(null);

  const tmpls = MSG_TEMPLATES[lang]||MSG_TEMPLATES['pt-BR'];
  const avgScore = drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length;
  const avgStatus = avgScore>=95?'Fantastic Plus':avgScore>=88?'Fantastic':avgScore>=70?'Great':avgScore>=55?'Fair':'Poor';
  const atRisk = drivers.filter(d=>d.totalScore<70);

  const copy = (text,idx)=>{ navigator.clipboard.writeText(text).then(()=>{ setCopiedIdx(idx); setTimeout(()=>setCopiedIdx(null),2200); }); };

  const genDriver = (tmpl)=>{
    return tmpl.generate(selDriver);
  };
  const genManager = (tmpl)=>{
    const criticalKpis=[
      ...(atRisk.filter(d=>d.dscDpmo>900).length>0?['DSC DPMO']:[]),
      ...(drivers.filter(d=>d.dcr<99).length>0?['DCR']:[]),
      ...(drivers.filter(d=>d.pod<99).length>0?['POD']:[]),
      ...(drivers.filter(d=>d.cc<99).length>0?['Contact Compliance']:[]),
    ];
    const ctx={
      week:currentWeek.label, avgScore, avgStatus, atRisk, drivers,
      criticalList:atRisk.slice(0,6), criticalKpis,
      belowSeventy:drivers.filter(d=>d.totalScore<70),
      wowDown:drivers.filter(d=>d.wowChange<0),
    };
    return tmpl.generate(ctx);
  };

  const PRIORITY_STYLE={
    alta:  {label:isEN?'High Priority':'Alta Prioridade',  bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.35)',  color:'#f87171'},
    media: {label:isEN?'Med. Priority':'Média Prioridade', bg:'rgba(251,146,60,0.12)', border:'rgba(251,146,60,0.35)', color:'#fb923c'},
    baixa: {label:isEN?'Low Priority':'Baixa Prioridade',  bg:'rgba(74,222,128,0.10)', border:'rgba(74,222,128,0.28)', color:'#4ade80'},
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:250}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(125,211,252,0.25)',borderRadius:20,width:'100%',maxWidth:900,maxHeight:'92vh',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:38,height:38,background:'linear-gradient(135deg,#7dd3fc,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>💬</div>
            <div>
              <div style={{color:'#fff',fontWeight:700,fontSize:15}}>{isEN?'Pre-defined Messages':'Mensagens Pré-definidas'}</div>
              <div style={{color:'#64748b',fontSize:11}}>{isEN?'Click copy to paste in WhatsApp or email':'Clique copiar para colar no WhatsApp ou email'}</div>
            </div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>
        <div style={{padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',gap:4}}>
          {[{k:'driver',l:isEN?'🚚 For Drivers':'🚚 Para Drivers'},{k:'manager',l:isEN?'📊 For Managers':'📊 Para Gerentes'}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:'7px 18px',background:tab===t.k?'linear-gradient(135deg,#7dd3fc,#3b82f6)':'rgba(255,255,255,0.04)',border:`1px solid ${tab===t.k?'transparent':'rgba(255,255,255,0.07)'}`,color:tab===t.k?'#fff':'#64748b',borderRadius:9,fontWeight:700,fontSize:13,cursor:'pointer',transition:'all .2s'}}>
              {t.l}
            </button>
          ))}
        </div>
        {tab==='driver'&&(
          <div style={{padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{color:'#64748b',fontSize:11,marginBottom:5}}>{isEN?'Select driver:':'Selecionar driver:'}</div>
            <select value={selDriver.id} onChange={e=>setSelDriver(drivers.find(d=>d.id===Number(e.target.value)))}
              style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'7px 12px',fontSize:13,outline:'none',width:'100%'}}>
              {[...drivers].sort((a,b)=>a.rank-b.rank).map(d=>(
                <option key={d.id} value={d.id} style={{background:'#0d1527'}}>{d.name} — {d.status} ({d.totalScore.toFixed(1)})</option>
              ))}
            </select>
          </div>
        )}
        <div style={{flex:1,overflowY:'auto',padding:'14px 20px',display:'flex',flexDirection:'column',gap:12}}>
          {(tab==='driver'?tmpls.driver:tmpls.manager).map((tmpl,i)=>{
            const text = tab==='driver'?genDriver(tmpl):genManager(tmpl);
            const copied = copiedIdx===i;
            const ps = tab==='manager'&&tmpl.priority?PRIORITY_STYLE[tmpl.priority]:null;
            return (
              <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,overflow:'hidden'}}>
                <div style={{padding:'9px 14px',background:'rgba(255,255,255,0.03)',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',gap:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,minWidth:0}}>
                    <span style={{color:'#e2e8f0',fontWeight:700,fontSize:13,flexShrink:0}}>{tmpl.title}</span>
                    {ps&&<span style={{background:ps.bg,border:`1px solid ${ps.border}`,color:ps.color,borderRadius:6,padding:'2px 8px',fontSize:10,fontWeight:700,whiteSpace:'nowrap'}}>{ps.label}</span>}
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <button onClick={()=>setExpandedMessage({title:tmpl.title,text})} style={{background:'linear-gradient(135deg,#f59e0b,#f97316)',border:'1px solid rgba(249,115,22,0.35)',color:'#fff',borderRadius:7,padding:'5px 12px',cursor:'pointer',fontSize:12,fontWeight:700,transition:'all .2s',whiteSpace:'nowrap'}}>🔍 {isEN?'View':'Ver'}</button>
                    <button onClick={()=>copy(text,i)} style={{background:copied?'rgba(74,222,128,0.15)':'rgba(99,179,237,0.12)',border:`1px solid ${copied?'rgba(74,222,128,0.4)':'rgba(99,179,237,0.3)'}`,color:copied?'#4ade80':'#7dd3fc',borderRadius:7,padding:'5px 14px',cursor:'pointer',fontSize:12,fontWeight:700,transition:'all .2s',whiteSpace:'nowrap',flexShrink:0}}>
                      {copied?(isEN?'✅ Copied!':'✅ Copiado!'):(isEN?'📋 Copy':'📋 Copiar')}
                    </button>
                  </div>
                </div>
                <div style={{padding:'12px 14px'}}>
                  <pre style={{color:'#94a3b8',fontSize:12,lineHeight:1.7,margin:0,whiteSpace:'pre-wrap',fontFamily:"'DM Sans','Segoe UI',sans-serif",maxHeight:180,overflowY:'auto',paddingRight:8}}>{text}</pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {expandedMessage && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.88)',zIndex:350,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={()=>setExpandedMessage(null)}>
          <div style={{background:'#0d1527',border:'1px solid rgba(255,255,255,0.12)',borderRadius:22,width:'100%',maxWidth:920,maxHeight:'88vh',display:'flex',flexDirection:'column',overflow:'hidden'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'16px 18px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
              <div>
                <div style={{color:'#fff',fontWeight:700,fontSize:15}}>{expandedMessage.title}</div>
                <div style={{color:'#94a3b8',fontSize:11}}>{isEN?'Full message preview':'Visualização completa da mensagem'}</div>
              </div>
              <button onClick={()=>setExpandedMessage(null)} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:22}}>✕</button>
            </div>
            <div style={{padding:'18px',overflowY:'auto',flex:1}}>
              <pre style={{color:'#e2e8f0',fontSize:13,lineHeight:1.75,whiteSpace:'pre-wrap',fontFamily:"'DM Sans','Segoe UI',sans-serif",margin:0}}>{expandedMessage.text}</pre>
            </div>
            <div style={{padding:'12px 18px',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'flex-end'}}>
              <button onClick={()=>copy(expandedMessage.text,'full')} style={{background:'rgba(99,179,237,0.14)',border:'1px solid rgba(99,179,237,0.4)',color:'#7dd3fc',borderRadius:9,padding:'8px 16px',cursor:'pointer',fontSize:13,fontWeight:700,whiteSpace:'nowrap'}}>{isEN?'📋 Copy full text':'📋 Copiar completo'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PDF EXPORT
// ══════════════════════════════════════════════════════════
const exportDashboardPDF = (drivers, weekInfo, lang) => {
  const isEN = lang==='en-UK';
  const sorted = [...drivers].sort((a,b)=>b.totalScore-a.totalScore);
  const atRisk = sorted.filter(d=>d.totalScore<70);
  const avgScore = (drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length).toFixed(1);
  const totalDeliveries = drivers.reduce((s,d)=>s+d.deliveries,0).toLocaleString();
  const pw = window.open('','_blank');
  pw.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>H2OL DSP Scorecard</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b;padding:24px;font-size:13px}
    h1{color:#FF9900;font-size:22px;margin-bottom:2px}
    h2{color:#1e293b;font-size:14px;margin:20px 0 10px;border-bottom:2px solid #FF9900;padding-bottom:5px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #FF9900;padding-bottom:14px;margin-bottom:18px}
    .badge{background:#FF9900;color:#fff;padding:3px 12px;border-radius:6px;font-size:12px;font-weight:700;display:inline-block}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
    .stat-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center}
    .stat-val{font-size:22px;font-weight:900;color:#FF9900}
    .stat-label{font-size:10px;color:#64748b;margin-top:3px;text-transform:uppercase}
    table{width:100%;border-collapse:collapse;font-size:11px}
    th{background:#1e293b;color:#fff;padding:7px 9px;text-align:left;font-size:10px;text-transform:uppercase}
    td{padding:6px 9px;border-bottom:1px solid #f1f5f9}
    tr:nth-child(even){background:#f8fafc}
    .fp{color:#15803d;font-weight:800}.fan{color:#16a34a;font-weight:800}.great{color:#ca8a04;font-weight:800}.fair{color:#ea580c;font-weight:800}.poor{color:#dc2626;font-weight:800}
    .footer{margin-top:22px;padding-top:12px;border-top:1px
     solid #e2e8f0;color:#94a3b8;font-size:10px;text-align:center}
    @media print{body{padding:12px}button{display:none}}
  </style></head><body>
  <div class="header">
    <div>
      <h1>Amazon LogIQ — H2OL · DOX2</h1>
      <p style="color:#64748b;font-size:12px;margin-top:4px">${weekInfo.label||''} · ${weekInfo.range||weekInfo.dateRange||''}</p>
    </div>
    <div style="text-align:right">
      <div class="badge">${weekInfo.overallStatus||'—'}</div>
      <div style="color:#64748b;font-size:11px;margin-top:5px">${isEN?'Score':'Score'}: ${(weekInfo.overallScore||0).toFixed(2)} | ${isEN?'Rank':'Rank'} #${weekInfo.rank||'—'}</div>
    </div>
  </div>
  <div class="stats">
    <div class="stat-box"><div class="stat-val">${drivers.length}</div><div class="stat-label">${isEN?'Drivers':'Drivers'}</div></div>
    <div class="stat-box"><div class="stat-val">${avgScore}</div><div class="stat-label">${isEN?'Avg Score':'Score Médio'}</div></div>
    <div class="stat-box"><div class="stat-val">${totalDeliveries}</div><div class="stat-label">${isEN?'Deliveries':'Entregas'}</div></div>
    <div class="stat-box"><div class="stat-val" style="color:${atRisk.length>0?'#dc2626':'#16a34a'}">${atRisk.length}</div><div class="stat-label">${isEN?'At Risk':'Em Risco'}</div></div>
  </div>
  <h2>${isEN?'🏆 Complete Driver Rankings':'🏆 Ranking Completo dos Motoristas'}</h2>
  <table><thead><tr><th>#</th><th>${isEN?'Name':'Nome'}</th><th>Status</th><th>Score</th><th>DCR</th><th>DSC DPMO</th><th>POD</th><th>CC</th><th>${isEN?'Deliveries':'Entregas'}</th></tr></thead>
  <tbody>${sorted.map((d,i)=>{const cls=d.status==='Fantastic Plus'?'fp':d.status==='Fantastic'?'fan':d.status==='Great'?'great':d.status==='Fair'?'fair':'poor';return`<tr><td>${i+1}</td><td><strong>${d.name}</strong></td><td>${d.status}</td><td class="${cls}">${d.totalScore.toFixed(1)}</td><td style="color:${d.dcr>=99?'#15803d':d.dcr>=98.5?'#ca8a04':'#dc2626'}">${d.dcr.toFixed(2)}%</td><td style="color:${d.dscDpmo<=900?'#15803d':d.dscDpmo<=1500?'#ca8a04':'#dc2626'}">${d.dscDpmo.toLocaleString()}</td><td>${d.pod.toFixed(1)}%</td><td>${d.cc.toFixed(1)}%</td><td>${d.deliveries.toLocaleString()}</td></tr>`;}).join('')}</tbody></table>
  ${atRisk.length>0?`<h2>${isEN?'🚨 Drivers At Risk (Score < 70)':'🚨 Drivers em Risco (Score < 70)'}</h2>
  <table><thead><tr><th>${isEN?'Name':'Nome'}</th><th>Score</th><th>Status</th><th>${isEN?'Main Issues':'Principais Problemas'}</th></tr></thead>
  <tbody>${atRisk.map(d=>`<tr><td><strong>${d.name}</strong></td><td class="${d.status==='Fair'?'fair':'poor'}">${d.totalScore.toFixed(1)}</td><td>${d.status}</td><td>${[d.dscDpmo>900&&`DSC:${d.dscDpmo}`,d.dcr<98&&`DCR:${d.dcr.toFixed(2)}%`,d.cc<90&&`CC:${d.cc.toFixed(1)}%`].filter(Boolean).join(' | ')||'—'}</td></tr>`).join('')}</tbody></table>`:''}
  <div class="footer">Amazon LogIQ · H2OL DOX2 · ${new Date().toLocaleDateString(isEN?'en-GB':'pt-BR')} ${new Date().toLocaleTimeString(isEN?'en-GB':'pt-BR')}</div>
  </body></html>`);
  pw.document.close();
  setTimeout(()=>{ pw.print(); },600);
};

// ══════════════════════════════════════════════════════════
// ADVANCED CHARTS & EXPORT PDF
// ══════════════════════════════════════════════════════════

// Score Evolution Chart - temporarily disabled
// function ScoreEvolutionChart({ driver, isEN }) {
//   TODO: Re-enable when recharts is properly installed
// }

// KPI Comparison Chart - temporarily disabled
// function KPIComparisonChart({ drivers, isEN }) {
//   TODO: Re-enable when recharts is properly installed
//   const avgDcr = (drivers.reduce((s,d)=>s+d.dcr,0)/drivers.length).toFixed(1);
//   const avgDsc = Math.round(drivers.reduce((s,d)=>s+d.dscDpmo,0)/drivers.length);
//   const avgPod = (drivers.reduce((s,d)=>s+d.pod,0)/drivers.length).toFixed(1);
//   const avgCc = (drivers.reduce((s,d)=>s+d.cc,0)/drivers.length).toFixed(1);
//
//   const data = [
//     {name:'DCR (%)',value:parseFloat(avgDcr),target:99},
//     {name:'DSC (DPMO)',value:avgDsc,target:900},
//     {name:'POD (%)',value:parseFloat(avgPod),target:99},
//     {name:'CC (%)',value:parseFloat(avgCc),target:99}
//   ];
//
//   return (
//     <div>...</div>
//   );
// }

// Top 5 Drivers Ranking - Compacto
function TopDriversRanking({ drivers, isEN }) {
  const sorted = [...drivers].sort((a,b)=>b.totalScore-a.totalScore).slice(0,5);
  return (
    <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:12,marginBottom:20}}>
      <h3 style={{color:'#fff',fontSize:13,fontWeight:700,marginTop:0,marginBottom:10}}>🏆 {isEN?'Top 5':'Top 5'}</h3>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        {sorted.map((d,i)=>(
          <div key={d.id} style={{background:`rgba(${i<3?'74,222,128':'99,179,237'},0.08)`,border:`1px solid rgba(${i<3?'74,222,128':'99,179,237'},0.15)`,borderRadius:8,padding:8,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{background:i<3?'#4ade80':'#7dd3fc',color:'#fff',width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11}}>#{i+1}</div>
              <div style={{display:'flex',flexDirection:'column',gap:1}}>
                <div style={{color:'#fff',fontSize:12,fontWeight:700}}>{d.name.split(' ')[0]}</div>
                <div style={{color:'#94a3b8',fontSize:10}}>{d.status}</div>
              </div>
            </div>
            <div style={{textAlign:'right',display:'flex',flexDirection:'column',alignItems:'flex-end',gap:1}}>
              <div style={{color:'#FF9900',fontSize:14,fontWeight:700}}>{d.totalScore.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Advanced Filters Component
function AdvancedFiltersPanel({ filters, setFilters, isEN }) {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:16,marginBottom:20}}>
      <h3 style={{color:'#fff',fontSize:14,fontWeight:700,marginTop:0,marginBottom:14}}>🔍 {isEN?'Advanced Filters':'Filtros Avançados'}</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:12}}>
        {/* Status Filter */}
        <div>
          <label style={{color:'#94a3b8',fontSize:11,fontWeight:700,display:'block',marginBottom:6}}>⭐ {isEN?'Status':'Status'}</label>
          <select value={filters.status} onChange={(e)=>setFilters({...filters,status:e.target.value})} style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'8px',fontSize:12,outline:'none'}}>
            <option value="all">{isEN?'All':'Todos'}</option>
            <option value="Fantastic Plus">Fantastic Plus</option>
            <option value="Fantastic">Fantastic</option>
            <option value="Great">Great</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        {/* KPI Alert Filter */}
        <div>
          <label style={{color:'#94a3b8',fontSize:11,fontWeight:700,display:'block',marginBottom:6}}>🎯 {isEN?'KPI Alert':'Alerta KPI'}</label>
          <select value={filters.kpiAlert} onChange={(e)=>setFilters({...filters,kpiAlert:e.target.value})} style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'8px',fontSize:12,outline:'none'}}>
            <option value="all">{isEN?'All':'Todos'}</option>
            <option value="dcr">DCR &lt; 99%</option>
            <option value="dsc">DSC &gt; 900</option>
            <option value="pod">POD &lt; 99%</option>
            <option value="cc">CC &lt; 99%</option>
            <option value="none">{isEN?'No Issues':'Sem Problemas'}</option>
          </select>
        </div>

        {/* Depot Filter */}
        <div>
          <label style={{color:'#94a3b8',fontSize:11,fontWeight:700,display:'block',marginBottom:6}}>🏢 {isEN?'Depot':'Depósito'}</label>
          <select value={filters.depot} onChange={(e)=>setFilters({...filters,depot:e.target.value})} style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,padding:'8px',fontSize:12,outline:'none'}}>
            <option value="all">{isEN?'All':'Todos'}</option>
            {DEPOTS.map(d=><option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

// Export PDF Function - temporarily disabled (requires jspdf and html2canvas)
// const exportReportToPDF = async (drivers, weekLabel, isEN) => {
//   const element = document.createElement('div');
//   element.style.padding = '30px';
//   element.style.background = '#ffffff';
//   element.style.width = '210mm';
//   element.innerHTML = `...`;  // HTML template commented out
//   document.body.appendChild(element);
//   const canvas = await html2canvas(element, {...});
//   const pdf = new jsPDF({...});
//   ... PDF generation code commented out ...
// };

// ══════════════════════════════════════════════════════════
// MANAGER DASHBOARD
// ══════════════════════════════════════════════════════════
function ManagerDashboard({ currentUser, isAdmin }) {
  const { lang } = useLang();
  const isEN = lang==='en-UK';
  const [mainTab, setMainTab] = useState('scorecard');
  const [selWeek, setSelWeek] = useState(WEEKS[WEEKS.length-1]);
  const [importedDrivers, setImportedDrivers] = useState(null);
  const [importedLabel, setImportedLabel] = useState('');
  const [importedWeekInfo, setImportedWeekInfo] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showPDF, setShowPDF] = useState(false);
  const [actionPlan, setActionPlan] = useState(null);
  const [driverModal, setDriverModal] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [demoTick, setDemoTick] = useState(0);
  const [selectedDepot, setSelectedDepot] = useState('dox2');
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [selectedDriverMessage, setSelectedDriverMessage] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    weekRange: [WEEKS[Math.max(0, WEEKS.length-5)], WEEKS[WEEKS.length-1]],
    status: 'all',
    kpiAlert: 'all',
    depot: 'dox2'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showTemplatesDropdown, setShowTemplatesDropdown] = useState(false);

  const openDriverModal = (driver) => {
    setActionPlan(null);
    setDriverModal(driver);
  };

  const openDriverPlan = (event, driver) => {
    event.stopPropagation();
    setDriverModal(null);
    setActionPlan({ type: 'driver', driver });
  };

  useEffect(()=>{
    const h = ()=>setDemoTick(t=>t+1);
    window.addEventListener('demoDataChanged', h);
    return ()=>window.removeEventListener('demoDataChanged', h);
  },[]);

  const drivers = useMemo(()=>{
    let data;
    if (isAdmin && importedDrivers) {
      data = importedDrivers;
    } else {
      const saved = getSavedWeekData(selWeek.id);
      data = saved || generateWeekData(selWeek.id);
    }
    data = data.filter(d => d.depot === selectedDepot);
    return data;
  },[selWeek,importedDrivers,isAdmin,selectedDepot,demoTick]);
  const weekInfo = isAdmin && importedDrivers ? {...selWeek, ...(importedWeekInfo||{}), label:importedLabel||'Importado'} : selWeek;

  const filtered = useMemo(()=>{
    let r=[...drivers];
    if(statusFilter!=='All') r=r.filter(d=>d.status===statusFilter);
    if(search) r=r.filter(d=>d.name.toLowerCase().includes(search.toLowerCase()));
    return r.sort((a,b)=>b.totalScore-a.totalScore);
  },[drivers,statusFilter,search]);

  const stats = useMemo(()=>({
    total:drivers.length,
    deliveries:drivers.reduce((s,d)=>s+d.deliveries,0),
    avgScore:drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length,
    avgDcr:drivers.reduce((s,d)=>s+d.dcr,0)/drivers.length,
    atRisk:drivers.filter(d=>d.totalScore<70).length,
    dscHigh:drivers.filter(d=>d.dscDpmo>900).length,
  }),[drivers]);

  const dist=['Fantastic Plus','Fantastic','Great','Fair','Poor'].map(s=>({s,n:drivers.filter(d=>d.status===s).length,p:Math.round(drivers.filter(d=>d.status===s).length/drivers.length*100)}));

  return (
    <div style={{maxWidth:1300,margin:'0 auto',padding:'20px 16px',fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>

      {/* Main Tabs */}
      <div style={{display:'flex',background:'rgba(255,255,255,0.03)',borderRadius:14,padding:4,marginBottom:20,gap:4,width:'fit-content',flexWrap:'wrap'}}>
        {[{k:'scorecard',l:'📊 Scorecard',c:'#FF9900'},{k:'van-inspections',l:'🚐 Inspeção de Vans',c:'#10b981'},{k:'documents',l:'📋 Documentos',c:'#3b82f6'}].map(t=>(
          <button key={t.k} onClick={()=>setMainTab(t.k)} style={{padding:'9px 22px',background:mainTab===t.k?`linear-gradient(135deg,${t.c},${t.k==='scorecard'?'#FF6B35':t.k==='van-inspections'?'#059669':'#1e40af'})`:'none',border:'none',color:mainTab===t.k?'#fff':'#64748b',borderRadius:11,fontWeight:700,fontSize:14,cursor:'pointer',transition:'all .2s'}}>
            {t.l}
          </button>
        ))}
      </div>

      {mainTab==='van-inspections' && (
        <div>
          <h2 style={{color:'#fff',fontSize:21,fontWeight:900,margin:'0 0 20px'}}>🚐 {isEN?'Vehicle Inspections':'Inspeção de Vans'}</h2>
          <div style={{display:'grid',gap:12}}>
            {(() => {
              const inspections = JSON.parse(localStorage.getItem('logiq-van-inspections') || '{}');
              const driverInspections = Object.values(inspections).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

              if (driverInspections.length === 0) {
                return <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,padding:24,textAlign:'center',color:'#94a3b8'}}>
                  {isEN?'No vehicle inspections yet':'Nenhuma inspeção de van ainda'}
                </div>;
              }

              return driverInspections.map(insp => {
                const allOk = Object.values(insp.checklist).every(v => v);
                const completedItems = Object.values(insp.checklist).filter(v => v).length;
                const totalItems = Object.values(insp.checklist).length;
                const timestamp = new Date(insp.timestamp);
                const dateStr = timestamp.toLocaleDateString(lang === 'pt-BR' ? 'pt-BR' : 'en-GB', {year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});

                return (
                  <div key={insp.driverId} style={{background:'rgba(255,255,255,0.04)',border:'1px solid '+(allOk?'rgba(74,222,128,0.3)':'rgba(248,113,113,0.3)'),borderRadius:14,padding:16,overflow:'hidden'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,paddingBottom:14,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                      <div style={{display:'flex',alignItems:'center',gap:12}}>
                        <div style={{fontSize:28}}>🚗</div>
                        <div>
                          <div style={{color:'#fff',fontWeight:700,fontSize:15}}>{insp.driverName}</div>
                          <div style={{color:'#64748b',fontSize:12}}>{dateStr} · 📅 {insp.weekLabel || 'Semana'}</div>
                        </div>
                      </div>
                      <div style={{textAlign:'center'}}>
                        <div style={{fontSize:28,fontWeight:900,color:allOk?'#4ade80':'#fbbf24'}}>{allOk?'✅':'⚠️'}</div>
                        <div style={{color:'#94a3b8',fontSize:11,marginTop:4,fontWeight:700}}>{completedItems}/{totalItems}</div>
                      </div>
                    </div>

                    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                      {[
                        {k:'lights', l:isEN?'Lights':'Luzes', icon:'🚨'},
                        {k:'tires', l:isEN?'Tires':'Pneus', icon:'🛞'},
                        {k:'windows', l:isEN?'Windows':'Vidros', icon:'🪟'},
                        {k:'mirrors', l:isEN?'Mirrors':'Espelhos', icon:'🪞'},
                        {k:'brakes', l:isEN?'Brakes':'Freios', icon:'⛔'},
                        {k:'fuel', l:isEN?'Fuel':'Combustível', icon:'⛽'},
                        {k:'documents', l:isEN?'Documents':'Documentos', icon:'📋'},
                      ].map(item => (
                        <div key={item.k} style={{display:'flex',alignItems:'center',gap:8,padding:10,background:insp.checklist[item.k]?'rgba(74,222,128,0.1)':'rgba(248,113,113,0.1)',border:'1px solid '+(insp.checklist[item.k]?'rgba(74,222,128,0.2)':'rgba(248,113,113,0.2)'),borderRadius:10}}>
                          <div style={{fontSize:20}}>{item.icon}</div>
                          <div style={{flex:1}}>
                            <div style={{color:'#fff',fontSize:12,fontWeight:700}}>{item.l}</div>
                          </div>
                          <div style={{fontSize:16,color:insp.checklist[item.k]?'#4ade80':'#f87171',fontWeight:700}}>{insp.checklist[item.k]?'✅':'❌'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {mainTab==='documents' && (
        <div>
          <h2 style={{color:'#fff',fontSize:21,fontWeight:900,margin:'0 0 20px'}}>📋 {isEN?'Driver Documents':'Documentos dos Drivers'}</h2>
          <div style={{display:'grid',gap:16}}>
            {(() => {
              const allDocs = JSON.parse(localStorage.getItem('logiq-driver-docs') || '{}');
              const docsList = [];

              Object.entries(allDocs).forEach(([driverId, docs]) => {
                const driver = BASE_DRIVERS.find(d => d.id == driverId);
                if (driver && docs.length > 0) {
                  docs.forEach(doc => {
                    docsList.push({ ...doc, driverId, driverName: driver.name });
                  });
                }
              });

              docsList.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

              if (docsList.length === 0) {
                return <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,padding:24,textAlign:'center',color:'#94a3b8'}}>
                  {isEN?'No documents uploaded yet':'Nenhum documento enviado ainda'}
                </div>;
              }

              return docsList.map(doc => {
                const sizeKB = (doc.size/1024).toFixed(1);
                const dateStr = new Date(doc.timestamp).toLocaleDateString(lang === 'pt-BR' ? 'pt-BR' : 'en-GB', {year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
                const icon = doc.type.includes('pdf')?'📄':doc.type.includes('image')?'🖼️':'📎';

                return (
                  <div key={doc.id} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:14,padding:16,display:'flex',alignItems:'center',gap:16}}>
                    <div style={{fontSize:32}}>{icon}</div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                        <div style={{color:'#fff',fontWeight:700,fontSize:14}}>{doc.driverName}</div>
                        <div style={{background:'rgba(59,130,246,0.2)',color:'#60a5fa',padding:'2px 8px',borderRadius:4,fontSize:11,fontWeight:700}}>{isEN?'Driver':'Motorista'}</div>
                      </div>
                      <div style={{color:'#94a3b8',fontSize:12,marginBottom:6}}>📄 {doc.name}</div>
                      <div style={{color:'#64748b',fontSize:11}}>{sizeKB}KB · {dateStr}</div>
                    </div>
                    <button onClick={() => {const a = document.createElement('a');a.href = doc.data;a.download = doc.name;a.click();}} style={{background:'linear-gradient(135deg,#3b82f6,#1e40af)',border:'none',color:'#fff',padding:'8px 16px',borderRadius:8,fontWeight:700,cursor:'pointer',fontSize:13}}>
                      {isEN?'Download':'Baixar'}
                    </button>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {mainTab==='scorecard' && <>
      {/* Toolbar */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <h2 style={{color:'#fff',fontSize:21,fontWeight:900,margin:0}}>DSP Weekly Scorecard</h2>
          <p style={{color:'#64748b',margin:'3px 0 0',fontSize:13}}>H2OL · DOX2 · {weekInfo.range||weekInfo.dateRange||''}</p>
        </div>
        <div style={{display:'flex',gap:9,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'6px 12px'}}>
            <span style={{color:'#64748b',fontSize:12}}>📅</span>
            <select value={selWeek.id} onChange={e=>{setSelWeek(WEEKS.find(w=>w.id===Number(e.target.value)));if(isAdmin){setImportedDrivers(null);setImportedWeekInfo(null);}}} style={{background:'transparent',border:'none',color:'#fff',fontSize:13,fontWeight:600,outline:'none',cursor:'pointer'}}>
              {WEEKS.map(w=><option key={w.id} value={w.id} style={{background:'#0d1527'}}>{w.label} · {w.range}</option>)}
            </select>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'6px 12px'}}>
            <span style={{color:'#64748b',fontSize:12}}>🏢</span>
            <select value={selectedDepot} onChange={e=>setSelectedDepot(e.target.value)} style={{background:'transparent',border:'none',color:'#fff',fontSize:13,fontWeight:600,outline:'none',cursor:'pointer'}}>
              {DEPOTS.map(d=><option key={d.id} value={d.id} style={{background:'#0d1527'}}>{d.label}</option>)}
            </select>
          </div>
          {isAdmin && importedDrivers && <span style={{background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.3)',color:'#4ade80',fontSize:11,padding:'5px 12px',borderRadius:8,fontWeight:700}}>📄 {importedLabel}</span>}
          {isAdmin && <button onClick={()=>setShowPDF(true)} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#e2e8f0',borderRadius:9,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:600}}>📄 {isEN?'PDF':'PDF'}</button>}
          <button onClick={()=>setActionPlan({type:'company'})} style={{background:'rgba(99,179,237,0.08)',border:'1px solid rgba(99,179,237,0.2)',color:'#7dd3fc',borderRadius:9,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:600}}>📋 {isEN?'Plan':'Plano'}</button>
          <div style={{position:'relative',display:'inline-block'}}>
            <button onClick={()=>setShowTemplatesDropdown(!showTemplatesDropdown)} style={{background:'rgba(251,146,60,0.12)',border:'1px solid rgba(251,146,60,0.3)',color:'#fb923c',borderRadius:9,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:600}}>
              🎯 {isEN?'Templates':'Templates'}
            </button>
            {showTemplatesDropdown && (
              <div style={{position:'absolute',top:'100%',left:0,marginTop:4,background:'#0d1527',border:'1px solid rgba(251,146,60,0.3)',borderRadius:9,minWidth:200,overflow:'hidden',zIndex:50,boxShadow:'0 10px 25px rgba(0,0,0,0.3)'}}>
                <div style={{padding:'4px 0'}}>
                  <button onClick={()=>{setActionPlan({type:'company',template:'at-risk'}); setShowTemplatesDropdown(false);}} style={{width:'100%',background:'transparent',border:'none',color:'#f87171',padding:'10px 14px',textAlign:'left',cursor:'pointer',fontSize:12,borderBottom:'1px solid rgba(255,255,255,0.05)',fontWeight:500}}>📉 {isEN?'At-Risk Plan':'Plano para Risco'}</button>
                  <button onClick={()=>{setActionPlan({type:'company',template:'dcr-focus'}); setShowTemplatesDropdown(false);}} style={{width:'100%',background:'transparent',border:'none',color:'#fb923c',padding:'10px 14px',textAlign:'left',cursor:'pointer',fontSize:12,borderBottom:'1px solid rgba(255,255,255,0.05)',fontWeight:500}}>🎯 {isEN?'DCR Improvement':'Melhoria DCR'}</button>
                  <button onClick={()=>{setActionPlan({type:'company',template:'quality'}); setShowTemplatesDropdown(false);}} style={{width:'100%',background:'transparent',border:'none',color:'#7dd3fc',padding:'10px 14px',textAlign:'left',cursor:'pointer',fontSize:12,borderBottom:'1px solid rgba(255,255,255,0.05)',fontWeight:500}}>✨ {isEN?'Quality Excellence':'Excelência em Qualidade'}</button>
                  <button onClick={()=>{setActionPlan({type:'company',template:'retention'}); setShowTemplatesDropdown(false);}} style={{width:'100%',background:'transparent',border:'none',color:'#4ade80',padding:'10px 14px',textAlign:'left',cursor:'pointer',fontSize:12,fontWeight:500}}>🏆 {isEN?'Retention Strategy':'Estratégia Retenção'}</button>
                </div>
              </div>
            )}
          </div>
          {/* Temporarily disabled - requires external libraries */}
          {/* <button onClick={()=>setShowAdvancedFilters(!showAdvancedFilters)} style={{...}}>🔍 {isEN?'Filters':'Filtros'}</button> */}
          {/* <button onClick={()=>exportReportToPDF(drivers, selWeek.label + ' · ' + (selWeek.range||''), isEN)} style={{...}}>📥 {isEN?'Export PDF':'Exportar PDF'}</button> */}
          <button onClick={()=>setShowMessages(true)} style={{background:'rgba(125,211,252,0.08)',border:'1px solid rgba(125,211,252,0.25)',color:'#7dd3fc',borderRadius:9,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:600}}>💬 {isEN?'Messages':'Mensagens'}</button>
          <button onClick={()=>setShowBenchmark(true)} style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.2)',color:'#4ade80',borderRadius:9,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:600}}>📊 {isEN?'Benchmark':'Benchmark'}</button>
        </div>
      </div>

      {/* Score + Speedometer */}
      <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:18,padding:'18px 22px',marginBottom:18,display:'flex',alignItems:'center',gap:24,flexWrap:'wrap'}}>
        <Speedometer score={weekInfo.overallScore||87} size="lg" label="SCORE DSP"/>
        <div style={{flex:1,minWidth:180}}>
          <div style={{color:'#64748b',fontSize:11,fontWeight:600,marginBottom:3}}>SCORE GERAL DA SEMANA</div>
          <div style={{display:'flex',alignItems:'baseline',gap:12}}>
            <span style={{color:'#fff',fontSize:40,fontWeight:900}}>{(weekInfo.overallScore||87).toFixed(2)}</span>
            <span style={{color:STATUS_META[weekInfo.overallStatus||'Great']?.text||'#fde047',fontSize:17,fontWeight:700}}>{weekInfo.overallStatus||'Great'}</span>
          </div>
          <div style={{color:'#64748b',fontSize:13,marginTop:3}}>Rank DOX2: <span style={{color:'#fff',fontWeight:700}}>#{weekInfo.rank||4}</span>{weekInfo.rankChange>0&&<span style={{color:'#4ade80',marginLeft:6}}>▲{weekInfo.rankChange}</span>}{weekInfo.rankChange<0&&<span style={{color:'#f87171',marginLeft:6}}>▼{Math.abs(weekInfo.rankChange)}</span>}</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9,minWidth:260}}>
          {[{l:'Drivers',v:stats.total,c:'#7dd3fc'},{l:'Entregas',v:stats.deliveries.toLocaleString(),c:'#86efac'},{l:'Score Médio',v:stats.avgScore.toFixed(1),c:'#fde047'},{l:'DCR Médio',v:stats.avgDcr.toFixed(2)+'%',c:'#4ade80'},{l:'Em Risco',v:stats.atRisk,c:'#f87171'},{l:'DSC > 900',v:stats.dscHigh,c:'#fb923c'}].map((k,i)=>(
            <div key={i} style={{background:'rgba(0,0,0,0.25)',borderRadius:9,padding:'9px 11px'}}>
              <div style={{color:'#475569',fontSize:9}}>{k.l}</div>
              <div style={{color:k.c,fontSize:16,fontWeight:800}}>{k.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Scorecard Summary */}
      <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20,marginBottom:20}}>
        <h2 style={{color:'#fff',fontSize:18,fontWeight:900,margin:'0 0 16px'}}>📊 {isEN?'Company Scorecard':'Scorecard da Empresa'}</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:16}}>
          {/* Overall Score */}
          <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:8}}>🎯 {isEN?'Overall Score':'Score Geral'}</div>
            <div style={{color:'#fff',fontSize:32,fontWeight:900,marginBottom:4}}>{(drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length).toFixed(1)}</div>
            <div style={{color:'#4ade80',fontSize:12,fontWeight:700}}>{drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length >= 70 ? '✅ Great' : '⚠️ Fair'}</div>
          </div>

          {/* Compliance & Safety */}
          <div style={{background:'rgba(99,179,237,0.08)',border:'1px solid rgba(99,179,237,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:8}}>🛡️ {isEN?'Compliance':'Compliance'}</div>
            <div style={{color:'#7dd3fc',fontSize:28,fontWeight:900,marginBottom:6}}>98.7%</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:11,color:'#94a3b8'}}>
              <div>✅ VSA: 100%</div>
              <div>✅ {isEN?'Contact Compliance':'Contato'}: 99.79%</div>
            </div>
          </div>

          {/* Delivery Quality */}
          <div style={{background:'rgba(251,146,60,0.08)',border:'1px solid rgba(251,146,60,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:8}}>📦 {isEN?'Delivery Quality':'Qualidade Entrega'}</div>
            <div style={{color:'#fb923c',fontSize:28,fontWeight:900,marginBottom:6}}>99.49%</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:11,color:'#94a3b8'}}>
              <div>✅ DCR: 99.49%</div>
              <div>⚠️ DSC DPMO: 653</div>
            </div>
          </div>

          {/* Capacity */}
          <div style={{background:'rgba(168,85,247,0.08)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:8}}>📈 {isEN?'Capacity':'Capacidade'}</div>
            <div style={{color:'#d8b4fe',fontSize:28,fontWeight:900,marginBottom:6}}>100%</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:11,color:'#94a3b8'}}>
              <div>✅ {isEN?'Capacity Reliability':'Confiabilidade'}: 100%</div>
            </div>
          </div>

          {/* Pickup Quality */}
          <div style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:8}}>🎯 {isEN?'Pickup Quality':'Qualidade Pickup'}</div>
            <div style={{color:'#86efac',fontSize:28,fontWeight:900,marginBottom:6}}>95.2%</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:11,color:'#94a3b8'}}>
              <div>✅ PSB: 95.2%</div>
            </div>
          </div>

          {/* Focus Areas */}
          <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:8}}>🎯 {isEN?'Focus Areas':'Áreas Foco'}</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:11,color:'#fca5a5'}}>
              <div>1. Mentor Adoption Rate</div>
              <div>2. DSC DPMO (653)</div>
              <div>3. Speeding Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters - temporarily disabled */}
      {/* {showAdvancedFilters && <AdvancedFiltersPanel filters={advancedFilters} setFilters={setAdvancedFilters} isEN={isEN}/>} */}

      {/* Advanced Charts Section - some disabled due to external library issues */}
      <div style={{marginBottom:20}}>
        {/* <ScoreEvolutionChart driver={drivers[0] || {}} isEN={isEN}/> */}
        {/* <KPIComparisonChart drivers={drivers} isEN={isEN}/> */}
        <TopDriversRanking drivers={drivers} isEN={isEN}/>
      </div>

      {/* Alerts Banner */}
      <AlertsBanner drivers={drivers}/>

      {/* Dist + Alerts */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:18}}>
        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:18}}>
          <h3 style={{color:'#fff',margin:'0 0 14px',fontSize:13,fontWeight:700}}>📊 Distribuição por Status</h3>
          {dist.map(({s,n,p})=>(
            <div key={s} style={{display:'flex',alignItems:'center',gap:9,marginBottom:8}}>
              <span style={{color:'#94a3b8',fontSize:11,width:110}}>{s}</span>
              <div style={{flex:1,background:'rgba(0,0,0,0.3)',borderRadius:5,height:18,overflow:'hidden'}}>
                <div style={{width:`${p}%`,height:'100%',background:STATUS_META[s]?.badge,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:6,transition:'width 1.2s ease'}}>
                  <span style={{color:'#fff',fontSize:9,fontWeight:700}}>{n}</span>
                </div>
              </div>
              <span style={{color:'#475569',fontSize:10,width:26}}>{p}%</span>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(220,38,38,0.04)',border:'1px solid rgba(220,38,38,0.16)',borderRadius:14,padding:18}}>
          <h3 style={{color:'#f87171',margin:'0 0 12px',fontSize:13,fontWeight:700}}>🚨 Alertas Críticos</h3>
          <div style={{maxHeight:174,overflowY:'auto',display:'flex',flexDirection:'column',gap:6}}>
            {drivers.filter(d=>d.dscDpmo>900||d.dcr<98||d.cc<90).slice(0,7).map(d=>(
              <div key={d.id} style={{background:'rgba(248,113,113,0.06)',border:'1px solid rgba(248,113,113,0.13)',borderRadius:9,padding:'7px 11px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{color:'#fff',fontSize:12,fontWeight:600}}>{d.name}</div>
                  <div style={{color:'#f87171',fontSize:10}}>{d.dscDpmo>900&&`DSC:${d.dscDpmo} `}{d.dcr<98&&`DCR:${d.dcr}% `}{d.cc<90&&`CC:${d.cc}%`}</div>
                </div>
                <span style={{background:STATUS_META[d.status]?.badge,color:'#fff',fontSize:9,padding:'2px 7px',borderRadius:5,fontWeight:700}}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div style={{marginBottom:18}}>
        <WeeklyTrendChart drivers={drivers}/>
      </div>

      {/* Table */}
      <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:18}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexWrap:'wrap',gap:10}}>
          <h3 style={{color:'#fff',margin:0,fontSize:13,fontWeight:700}}>{isEN?'🏆 Driver Rankings':'🏆 Ranking dos Motoristas'}</h3>
          <div style={{display:'flex',gap:9}}>
            <input placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{background:'rgba(0,0,0,0.35)',border:'1px solid rgba(255,255,255,0.09)',color:'#fff',borderRadius:8,padding:'6px 11px',fontSize:12,outline:'none',width:150}}/>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{background:'rgba(0,0,0,0.35)',border:'1px solid rgba(255,255,255,0.09)',color:'#fff',borderRadius:8,padding:'6px 11px',fontSize:12,outline:'none'}}>
              <option value="All">Todos</option>
              {['Fantastic Plus','Fantastic','Great','Fair','Poor'].map(s=><option key={s} value={s} style={{background:'#0d1527'}}>{s}</option>)}
            </select>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{color:'#475569',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                {['#','Nome','Status','Score','WoW','DCR','DSC DPMO','POD','CC','Medidor','Plano'].map(h=>(
                  <th key={h} style={{padding:'8px 8px',textAlign:'left',fontWeight:600,fontSize:10,textTransform:'uppercase'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d,idx)=>(
                <tr key={d.id} onClick={()=>openDriverModal(d)} style={{borderBottom:'1px solid rgba(255,255,255,0.04)',cursor:'pointer'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,153,0,0.03)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{padding:'8px 8px',color:'#475569'}}>{idx+1}</td>
                  <td style={{padding:'8px 8px',color:'#e2e8f0',fontWeight:600}}>{d.name}</td>
                  <td style={{padding:'8px 8px'}}><span style={{background:STATUS_META[d.status]?.badge,color:'#fff',fontSize:9,padding:'2px 7px',borderRadius:5,fontWeight:700}}>{d.status}</span></td>
                  <td style={{padding:'8px 8px',fontWeight:800,color:d.totalScore>=90?'#4ade80':d.totalScore>=70?'#fde047':'#f87171',fontSize:13}}>{d.totalScore.toFixed(1)}</td>
                  <td style={{padding:'8px 8px',color:d.wowChange>0?'#4ade80':d.wowChange<0?'#f87171':'#64748b',fontWeight:700}}>{d.wowChange>0?'+':''}{d.wowChange}</td>
                  <td style={{padding:'8px 8px',color:mc(d.dcr),fontWeight:600}}>{d.dcr.toFixed(2)}%</td>
                  <td style={{padding:'8px 8px',color:mc(d.dscDpmo,'bad'),fontWeight:600}}>{d.dscDpmo.toLocaleString()}</td>
                  <td style={{padding:'8px 8px',color:mc(d.pod)}}>{d.pod.toFixed(1)}%</td>
                  <td style={{padding:'8px 8px',color:mc(d.cc)}}>{d.cc.toFixed(1)}%</td>
                  <td style={{padding:'8px 3px'}}><Speedometer score={d.totalScore} size="sm"/></td>
                  <td style={{padding:'8px 8px'}}>
                    <button onClick={e=>openDriverPlan(e,d)} style={{background:'rgba(255,153,0,0.1)',border:'1px solid rgba(255,153,0,0.25)',color:'#FF9900',borderRadius:6,padding:'4px 9px',cursor:'pointer',fontSize:10,fontWeight:700}}>📋</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAdmin && showPDF && <PDFUploadPanel lang={lang} onDataImported={(d,f,wk)=>{setImportedDrivers(d);setImportedLabel((f||'').replace('.pdf','').replace('.png','').replace('.jpg','').replace('.csv',''));if(wk)setImportedWeekInfo(wk);setShowPDF(false);}} onClose={()=>setShowPDF(false)}/>}
      {showMessages && <MessageTemplates drivers={drivers} currentWeek={weekInfo} onClose={()=>setShowMessages(false)}/>}
      {showBenchmark && <BenchmarkingModal drivers={drivers} onClose={()=>setShowBenchmark(false)}/>}
      {!driverModal && actionPlan && <ActionPlanModal {...actionPlan} drivers={drivers} onClose={()=>setActionPlan(null)} onOpenSettings={()=>setShowSettings(true)}/>}
      {driverModal && (
        <DriverDetailModal driver={driverModal} onClose={()=>setDriverModal(null)} onPlan={d=>{setDriverModal(null);setActionPlan({type:'driver',driver:d});}}/>
      )}
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// CONCESSION MODULE

// ── Leaflet carregado via CDN ──────────────────────────────
const LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS  = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

function useLeaflet() {
  const [ready, setReady] = useState(!!window.L);
  useEffect(() => {
    if (window.L) { setReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = LEAFLET_CSS;
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);
  return ready;
}

// ── Coordenadas por postcode (área de DOX2 / East London) ──
const POSTCODE_COORDS = {
  "RM8":  [51.5465, 0.1285], "RM9":  [51.5390, 0.1401], "RM10": [51.5441, 0.1618],
  "RM11": [51.5579, 0.2072], "RM12": [51.5567, 0.1920], "RM13": [51.5203, 0.1843],
  "IG11": [51.5314, 0.1017], "IG1":  [51.5584, 0.0709], "IG2":  [51.5673, 0.0901],
  "IG3":  [51.5710, 0.1002], "IG4":  [51.5738, 0.0739], "IG6":  [51.5904, 0.1085],
  "E6":   [51.5253, 0.0548], "E12":  [51.5490, 0.0533], "E13":  [51.5148, 0.0266],
  "E7":   [51.5497, 0.0290], "E15":  [51.5380, -0.0030],"E16":  [51.5085, 0.0186],
  "DA1":  [51.4460, 0.2040], "DA8":  [51.4791, 0.1839], "DA17": [51.4887, 0.1557],
  "SE28": [51.5047, 0.1163], "SE2":  [51.4893, 0.1120],
  "RM6":  [51.5613, 0.1450], "RM7":  [51.5596, 0.1686], "RM14": [51.5560, 0.2380],
};

// ── Dados demo de concessions ──────────────────────────────
const DEMO_CONCESSIONS = [
  { id:1,  trackingNumber:"UK4200109183", driver:"Adina Radulescu",          daCode:"A3A7KRHEA8USKU", deliveryDate:"2026-04-17", concessionDate:"2026-04-19", date:"2026-04-19", address:"", postcode:"RM10", area:"Dagenham",      reason:"DNR - Delivered Not Received" },
  { id:2,  trackingNumber:"UK4201480105", driver:"Adina Radulescu",          daCode:"A3A7KRHEA8USKU", deliveryDate:"2026-04-17", concessionDate:"2026-04-19", date:"2026-04-19", address:"", postcode:"RM10", area:"Dagenham",      reason:"DNR - Delivered Not Received" },
  { id:3,  trackingNumber:"UK4205332250", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-18", concessionDate:"2026-04-20", date:"2026-04-20", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:4,  trackingNumber:"UK4204417599", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-18", concessionDate:"2026-04-20", date:"2026-04-20", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:5,  trackingNumber:"UK4203680051", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-18", concessionDate:"2026-04-20", date:"2026-04-20", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:6,  trackingNumber:"UK4206136259", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-18", concessionDate:"2026-04-20", date:"2026-04-20", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:7,  trackingNumber:"UK4220165122", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-22", concessionDate:"2026-04-25", date:"2026-04-25", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:8,  trackingNumber:"UK4202248120", driver:"Calin-Gheorghe Moldovan",  daCode:"A3UJRWOCAA8IPF", deliveryDate:"2026-04-17", concessionDate:"2026-04-21", date:"2026-04-21", address:"", postcode:"RM8",  area:"Becontree",     reason:"DNR - Delivered Not Received" },
  { id:9,  trackingNumber:"UK4181083490", driver:"Costel Ionut Panainte",    daCode:"A3CPWWWHR65YJK", deliveryDate:"2026-04-14", concessionDate:"2026-04-21", date:"2026-04-21", address:"", postcode:"RM9",  area:"Dagenham",      reason:"DNR - Delivered Not Received" },
  { id:10, trackingNumber:"UK4195355941", driver:"Costel Iosub",             daCode:"A2FJT7ODBB1HL8",  deliveryDate:"2026-04-16", concessionDate:"2026-04-19", date:"2026-04-19", address:"", postcode:"E6",   area:"East Ham",      reason:"DNR - Delivered Not Received" },
  { id:11, trackingNumber:"UK4153990426", driver:"Costel Iosub",             daCode:"A2FJT7ODBB1HL8",  deliveryDate:"2026-04-04", concessionDate:"2026-04-23", date:"2026-04-23", address:"", postcode:"E6",   area:"East Ham",      reason:"DNR - Delivered Not Received" },
  { id:12, trackingNumber:"UK4177775437", driver:"Cristian Valentin Chiru",  daCode:"A2FQEZ1HMXW7C9", deliveryDate:"2026-04-11", concessionDate:"2026-04-21", date:"2026-04-21", address:"", postcode:"E7",   area:"Forest Gate",   reason:"DNR - Delivered Not Received" },
  { id:13, trackingNumber:"UK4221045827", driver:"Dorin Dudu",               daCode:"AUWKLYRA0WQ75",  deliveryDate:"2026-04-22", concessionDate:"2026-04-22", date:"2026-04-22", address:"", postcode:"RM10", area:"Dagenham",      reason:"DNR - Delivered Not Received" },
  { id:14, trackingNumber:"UK4220498777", driver:"Emanuel Talaba",           daCode:"AJAZLLJZU4UI4",   deliveryDate:"2026-04-22", concessionDate:"2026-04-24", date:"2026-04-24", address:"", postcode:"RM6",  area:"Chadwell Heath",reason:"DNR - Delivered Not Received" },
  { id:15, trackingNumber:"UK4228683196", driver:"Eusebiu Vaduva",           daCode:"AEIPQDL0MQPI9",   deliveryDate:"2026-04-24", concessionDate:"2026-04-24", date:"2026-04-24", address:"", postcode:"E16",  area:"Canning Town",  reason:"DNR - Delivered Not Received" },
  // Extended demo
  { id:16, trackingNumber:"UK4200000001", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-19", concessionDate:"2026-04-21", date:"2026-04-21", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:17, trackingNumber:"UK4200000002", driver:"Adina Radulescu",          daCode:"A3A7KRHEA8USKU", deliveryDate:"2026-04-20", concessionDate:"2026-04-22", date:"2026-04-22", address:"", postcode:"RM10", area:"Dagenham",      reason:"DNR - Delivered Not Received" },
  { id:18, trackingNumber:"UK4200000003", driver:"Costel Iosub",             daCode:"A2FJT7ODBB1HL8",  deliveryDate:"2026-04-20", concessionDate:"2026-04-22", date:"2026-04-22", address:"", postcode:"E6",   area:"East Ham",      reason:"DNR - Delivered Not Received" },
  { id:19, trackingNumber:"UK4200000004", driver:"Bogdan Budai",             daCode:"A1RC5DXP8OVVGL", deliveryDate:"2026-04-21", concessionDate:"2026-04-23", date:"2026-04-23", address:"", postcode:"IG11", area:"Barking",       reason:"DNR - Delivered Not Received" },
  { id:20, trackingNumber:"UK4200000005", driver:"Calin-Gheorghe Moldovan",  daCode:"A3UJRWOCAA8IPF", deliveryDate:"2026-04-21", concessionDate:"2026-04-23", date:"2026-04-23", address:"", postcode:"RM8",  area:"Becontree",     reason:"DNR - Delivered Not Received" },
];

// ── Mapa Interativo ────────────────────────────────────────
function ConcessionMap({ concessions, onAreaSelect }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const leafletReady = useLeaflet();

  // Agrupa por postcode
  const byPostcode = useMemo(() => {
    const m = {};
    concessions.forEach(c => {
     if (!m[c.postcode]) {
  m[c.postcode] = { count:0, value:0, drivers:new Set(), reasons:[] };
}
m[c.postcode].count++;
m[c.postcode].value += Number(c.value) || 0;
m[c.postcode].drivers.add(c.driver);
m[c.postcode].reasons.push(c.reason);
    });
    return m;
  }, [concessions]);

  const maxCount = Math.max(...Object.values(byPostcode).map(v => v.count), 1);

  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;
    const L = window.L;
    if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }

    const map = L.map(mapRef.current, { center:[51.53, 0.08], zoom:12 });
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:'© OpenStreetMap',
      maxZoom:18
    }).addTo(map);

    // Adiciona círculos por postcode
    Object.entries(byPostcode).forEach(([pc, data]) => {
      const coords = POSTCODE_COORDS[pc];
      if (!coords) return;
      const intensity = data.count / maxCount;
      const color = intensity >= 0.7 ? "#ef4444" : intensity >= 0.4 ? "#f97316" : "#eab308";
      const radius = 300 + intensity * 500;

      const circle = L.circle(coords, {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.25 + intensity * 0.35,
        weight: 2,
      }).addTo(map);

      const driversArr = [...data.drivers];
      circle.bindPopup(`
        <div style="font-family:sans-serif;min-width:200px">
          <div style="font-weight:800;font-size:15px;margin-bottom:6px">📍 ${pc} — ${concessions.find(c=>c.postcode===pc)?.area||""}</div>
         <div style="color:#ef4444;font-weight:700;margin-bottom:4px">🚨 ${data.count} concessions · £${Number(data.value || 0).toFixed(2)}</div>
          <div style="font-size:12px;margin-bottom:4px"><b>Drivers:</b> ${driversArr.join(", ")}</div>
          <div style="font-size:11px;color:#666">Top motivo: ${data.reasons[0]}</div>
        </div>
      `);

      circle.on("click", () => onAreaSelect({ postcode: pc, ...data, drivers: driversArr, area: concessions.find(c=>c.postcode===pc)?.area||pc }));
    });

    // Legenda
    const legend = L.control({ position:"bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.innerHTML = `<div style="background:rgba(13,21,39,0.95);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:10px 14px;font-family:sans-serif;font-size:12px">
        <div style="color:#fff;font-weight:700;margin-bottom:8px">🗺 Nível de Risco</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="width:12px;height:12px;background:#ef4444;border-radius:50%;display:inline-block"></span><span style="color:#ddd">Alto (≥70%)</span></div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="width:12px;height:12px;background:#f97316;border-radius:50%;display:inline-block"></span><span style="color:#ddd">Médio (40-69%)</span></div>
        <div style="display:flex;align-items:center;gap:6px"><span style="width:12px;height:12px;background:#eab308;border-radius:50%;display:inline-block"></span><span style="color:#ddd">Baixo (<40%)</span></div>
      </div>`;
      return div;
    };
    legend.addTo(map);

    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, [leafletReady, byPostcode]);

  if (!leafletReady) return (
    <div style={{height:420,background:"rgba(0,0,0,0.3)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{color:"#64748b",fontSize:14}}>⏳ Carregando mapa...</div>
    </div>
  );

  return <div ref={mapRef} style={{height:420,borderRadius:14,overflow:"hidden",border:"1px solid rgba(255,255,255,0.1)"}}/>;
}

// ── Upload PDF de Concessions ──────────────────────────────
function ConcessionUpload({ onDataLoaded, onClose }) {
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const processFile = async (file) => {
    if (!file) return;
    setStage("reading"); setProgress(15);

    const dataUrl = await new Promise((res,rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = () => rej(new Error("Falha ao ler"));
      r.readAsDataURL(file);
    });
    const base64 = dataUrl.split(",")[1];
    setProgress(35); setStage("analyzing");

    try {
      const isImage = file.type.startsWith("image/");
      const content = isImage
        ? [{ type:"image", source:{ type:"base64", media_type:file.type, data:base64 } }]
        : [{ type:"document", source:{ type:"base64", media_type:"application/pdf", data:base64 } }];

      content.push({ type:"text", text:`Este é um relatório "Delivered Not Received" da Amazon DSP.

As colunas são:
- Tracking number (ex: UK4200109183)
- Service Area (ex: DOX2)
- DSP (ex: TTSL)
- Delivery Date (data/hora da entrega)
- Concession Date (data/hora da reclamação)
- DA (código do driver, ex: A3A7KRHEA8USKU)
- Delivery Associate Name (nome completo do driver)

Extraia TODOS os registros visíveis. Retorne APENAS JSON válido (sem markdown):
{
  "week": "Week 17, Apr 19-Apr 25",
  "serviceArea": "DOX2",
  "concessions": [
    {
      "trackingNumber": "UK4200109183",
      "driver": "Delivery Associate Name completo",
      "daCode": "código DA",
      "deliveryDate": "YYYY-MM-DD",
      "concessionDate": "YYYY-MM-DD",
      "address": "endereço se visível, senão deixe vazio",
      "postcode": "infira o postcode da área de entrega (ex: RM8, IG11, E6, RM10, E7, RM6)",
      "area": "nome do bairro inferido do postcode",
      "reason": "DNR - Delivered Not Received"
    }
  ]
}

Para postcodes: DOX2 cobre East London/Essex — use RM8, RM9, RM10, IG11, E6, E7, E13, E16, RM6.
Extraia TODOS os registros, todas as páginas visíveis.` });


      setProgress(65);
      const raw = await callClaude([{ role:"user", content }]);
      setProgress(85);

      let parsed;
      try { parsed = JSON.parse(raw.replace(/```json|```/g,"").trim()); }
      catch { throw new Error("Não foi possível extrair os dados. Verifique se o PDF contém tabela de concessions."); }

      const enriched = (parsed.concessions||[]).map((c,i) => ({
        id: i+1,
        trackingNumber: c.trackingNumber || `UK${Math.floor(Math.random()*9e9)}`,
        driver: c.driver || 'Unknown',
        daCode: c.daCode || '',
        deliveryDate: c.deliveryDate || c.date || '2025-04-01',
        concessionDate: c.concessionDate || c.date || '2025-04-01',
        date: c.concessionDate || c.date || '2025-04-01',
        address: c.address || '',
        postcode: c.postcode || 'RM10',
        area: c.area || 'Dagenham',
        reason: c.reason || 'DNR - Delivered Not Received',
      }));
      if (enriched.length === 0) throw new Error("Nenhuma concession encontrada no arquivo.");

      setProgress(100);
      setTimeout(() => onDataLoaded(enriched, file.name), 300);
    } catch(e) {
      setError(e.message); setStage("error");
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,zIndex:500}} onClick={onClose}>
      <div style={{background:"#0d1527",border:"1px solid rgba(239,68,68,0.3)",borderRadius:22,width:"100%",maxWidth:520,padding:28}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div>
            <h2 style={{color:"#fff",margin:0,fontSize:19,fontWeight:900}}>📄 Importar Concessions</h2>
            <p style={{color:"#64748b",margin:"4px 0 0",fontSize:13}}>PDF ou imagem do relatório de concessions Amazon</p>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:20}}>✕</button>
        </div>

        {stage==="idle" && (
          <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
            onDrop={e=>{e.preventDefault();setDragOver(false);processFile(e.dataTransfer.files[0]);}}
            onClick={()=>fileRef.current?.click()}
            style={{border:`2px dashed ${dragOver?"#ef4444":"rgba(255,255,255,0.15)"}`,borderRadius:14,padding:44,textAlign:"center",cursor:"pointer",background:dragOver?"rgba(239,68,68,0.04)":"rgba(255,255,255,0.02)",transition:"all .2s"}}>
            <div style={{fontSize:48,marginBottom:10}}>📂</div>
            <div style={{color:"#fff",fontWeight:700,fontSize:16,marginBottom:6}}>Arraste o relatório aqui</div>
            <div style={{color:"#64748b",fontSize:13,marginBottom:14}}>PDF ou imagem (PNG/JPG) das concessions</div>
            <div style={{display:"inline-block",background:"linear-gradient(135deg,#ef4444,#dc2626)",color:"#fff",padding:"10px 22px",borderRadius:10,fontWeight:700,fontSize:14}}>Selecionar Arquivo</div>
            <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,image/*" style={{display:"none"}} onChange={e=>processFile(e.target.files[0])}/>
          </div>
        )}

        {(stage==="reading"||stage==="analyzing") && (
          <div style={{textAlign:"center",padding:40}}>
            <div style={{fontSize:48,marginBottom:14,animation:"spin 1.5s linear infinite",display:"inline-block"}}>⚙️</div>
            <div style={{color:"#fff",fontWeight:700,fontSize:16,marginBottom:6}}>{stage==="reading"?"Lendo arquivo...":"🤖 IA extraindo dados..."}</div>
            <div style={{color:"#64748b",fontSize:13,marginBottom:20}}>Identificando drivers, endereços e postcodes</div>
            <div style={{background:"rgba(255,255,255,0.08)",borderRadius:8,height:8,overflow:"hidden",maxWidth:280,margin:"0 auto"}}>
              <div style={{width:`${progress}%`,height:"100%",background:"linear-gradient(90deg,#ef4444,#dc2626)",borderRadius:8,transition:"width .5s ease"}}/>
            </div>
            <div style={{color:"#f87171",fontSize:12,marginTop:8}}>{progress}%</div>
          </div>
        )}

        {stage==="error" && (
          <div style={{textAlign:"center",padding:30}}>
            <div style={{fontSize:48,marginBottom:10}}>❌</div>
            <div style={{color:"#f87171",fontWeight:700,fontSize:15,marginBottom:8}}>Erro ao processar</div>
            <div style={{color:"#64748b",fontSize:13,marginBottom:18}}>{error}</div>
            <button onClick={()=>{setStage("idle");setError("");}} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",borderRadius:10,padding:"10px 22px",cursor:"pointer",fontWeight:600}}>Tentar novamente</button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ── Plano de Ação por Área ─────────────────────────────────
function AreaPlanModal({ area, concessions, onClose }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);

  const areaConcessions = concessions.filter(c => c.postcode === area.postcode);
  const drivers = [...new Set(areaConcessions.map(c => c.driver))];
  const reasons = [...new Set(areaConcessions.map(c => c.reason))];
  const totalValue = areaConcessions.reduce((s,c) => s+(Number(c.value)||0), 0);

  useEffect(() => { generate(); }, []);

  const generate = async () => {
    setLoading(true);
    try {
      const prompt = `Você é um especialista em operações Amazon DSP. Crie um PLANO DE AÇÃO DETALHADO para a área crítica abaixo em português.

ÁREA: ${area.postcode} — ${area.area}
Total de concessions: ${areaConcessions.length}
Drivers envolvidos: ${drivers.join(", ")}
Motivos das concessions:
${reasons.map(r => `  • ${r}`).join("\n")}

Endereços problemáticos:
${areaConcessions.map(c => `  • ${c.address} (${c.driver}) — ${c.reason}`).join("\n")}

Gere um plano com:

1. 🔴 CLASSIFICAÇÃO DE RISCO (Alto/Médio/Baixo + justificativa)

2. 🗺️ PERFIL DA ÁREA (características que tornam as entregas difíceis nesta zona)

3. 🚨 REGRAS OBRIGATÓRIAS para ${area.postcode}:
   - Listar 4-5 regras específicas (ex: "Nunca deixar desacompanhado", "POD obrigatório com rosto visível", etc.)

4. 👤 INSTRUÇÕES POR DRIVER:
   ${drivers.map(d => `- ${d}: ações específicas baseadas nos erros cometidos`).join("\n   ")}

5. 📍 ENDEREÇOS CRÍTICOS (top 3 com instrução específica para cada um)

6. 📊 MÉTRICAS DE CONTROLE (como monitorar melhoria nesta área)

Seja direto, prático e específico para esta área geográfica.`;

      const text = await callClaude([{ role:"user", content:prompt }]);
      setPlan(text);
    } catch(e) { setPlan(`❌ Erro: ${e.message}`); }
    setLoading(false);
  };

  const riskColor = areaConcessions.length >= 5 ? "#ef4444" : areaConcessions.length >= 3 ? "#f97316" : "#eab308";

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,zIndex:600}} onClick={onClose}>
      <div style={{background:"#0d1527",border:`1px solid ${riskColor}40`,borderRadius:22,width:"100%",maxWidth:680,maxHeight:"90vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"18px 22px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <h2 style={{color:"#fff",margin:0,fontSize:18,fontWeight:900}}>📍 {area.postcode} — {area.area}</h2>
            <p style={{color:"#64748b",margin:"3px 0 0",fontSize:12}}>{areaConcessions.length} concessions · £{totalValue.toFixed(2)} em risco · {drivers.length} driver(s)</p>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {!loading && <button onClick={generate} style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#f87171",borderRadius:8,padding:"6px 13px",cursor:"pointer",fontSize:12,fontWeight:600}}>🔄</button>}
            <button onClick={onClose} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:20}}>✕</button>
          </div>
        </div>

        {/* Stats rápidos */}
        <div style={{padding:"12px 22px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:10,flexShrink:0}}>
          {[
            {l:"Concessions", v:areaConcessions.length, c:"#f87171"},
            
            {l:"Drivers", v:drivers.length, c:"#fde047"},
            {l:"Motivos", v:reasons.length, c:"#7dd3fc"},
          ].map((s,i)=>(
            <div key={i} style={{flex:1,background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"8px 12px",textAlign:"center"}}>
              <div style={{color:s.c,fontWeight:800,fontSize:18}}>{s.v}</div>
              <div style={{color:"#475569",fontSize:10}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{flex:1,overflowY:"auto",padding:22}}>
          {loading ? (
            <div style={{textAlign:"center",padding:50}}>
              <div style={{fontSize:44,marginBottom:14,animation:"pulse 1.5s infinite",display:"inline-block"}}>🤖</div>
              <div style={{color:"#fff",fontWeight:700,marginBottom:6}}>Gerando plano para {area.postcode}...</div>
              <div style={{color:"#64748b",fontSize:13}}>Analisando padrões de concessions nesta área</div>
              <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:18}}>
                {[0,1,2].map(i=><span key={i} style={{width:8,height:8,background:"#ef4444",borderRadius:"50%",display:"inline-block",animation:`bounce 1s infinite ${i*.2}s`}}/>)}
              </div>
            </div>
          ) : <div style={{color:"#e2e8f0",fontSize:14,lineHeight:1.85,whiteSpace:"pre-line"}}>{plan}</div>}
        </div>

        {!loading && (
          <div style={{padding:"12px 22px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrink:0,display:"flex",gap:10}}>
            <button onClick={()=>{const b=new Blob([plan],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`plano_${area.postcode}.txt`;a.click();URL.revokeObjectURL(u);}} style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",color:"#f87171",borderRadius:9,padding:"8px 16px",cursor:"pointer",fontWeight:600,fontSize:13}}>
              💾 Exportar Plano
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}} @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

// ── Plano por Driver ───────────────────────────────────────
function DriverConcessionPlan({ driverName, concessions, onClose }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);

  const dc = concessions.filter(c => c.driver===driverName);
  const postcodes = [...new Set(dc.map(c=>c.postcode))];
  const reasons = [...new Set(dc.map(c=>c.reason))];
  const totalValue = dc.reduce((s,c)=>s+(Number(c.value)||0),0);

  useEffect(()=>{ generate(); },[]);

  const generate = async () => {
    setLoading(true);
    try {
      const prompt = `Especialista em operações Amazon DSP. Crie plano de ação PERSONALIZADO em português para o driver abaixo.

DRIVER: ${driverName}
Total de concessions: ${dc.length}
Áreas afetadas: ${postcodes.join(", ")}
Motivos:
${reasons.map(r=>`  • ${r} (${dc.filter(c=>c.reason===r).length}x)`).join("\n")}

Casos específicos:
${dc.map(c=>`  • ${c.trackingNumber||""} — ${c.area} (${c.postcode}) — ${c.reason}`).join("\n")}

Gere:
1. 👋 MENSAGEM DIRETA ao ${driverName.split(" ")[0]} (tom sério mas construtivo, citar os dados reais)
2. 🔍 ANÁLISE DOS ERROS (padrões identificados — onde e por que está falhando)
3. 🎯 PLANO DE AÇÃO IMEDIATO (5 ações práticas para esta semana)
4. 📍 INSTRUÇÕES ESPECÍFICAS POR ÁREA (para cada postcode afetado)
5. ⚠️ CONSEQUÊNCIAS (o que acontece se não melhorar — impacto no score DSC DPMO)
6. 💪 MENSAGEM DE INCENTIVO FINAL

Tom: direto, honesto, sem papas na língua mas encorajador.`;

      const text = await callClaude([{ role:"user", content:prompt }]);
      setPlan(text);
    } catch(e) { setPlan(`❌ Erro: ${e.message}`); }
    setLoading(false);
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,zIndex:600}} onClick={onClose}>
      <div style={{background:"#0d1527",border:"1px solid rgba(251,146,60,0.35)",borderRadius:22,width:"100%",maxWidth:660,maxHeight:"90vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"18px 22px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <h2 style={{color:"#fff",margin:0,fontSize:17,fontWeight:900}}>👤 Plano — {driverName}</h2>
            <p style={{color:"#64748b",margin:"3px 0 0",fontSize:12}}>{dc.length} concessions · £{totalValue.toFixed(2)} · {postcodes.join(", ")}</p>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {!loading && <button onClick={generate} style={{background:"rgba(251,146,60,0.1)",border:"1px solid rgba(251,146,60,0.3)",color:"#fb923c",borderRadius:8,padding:"6px 13px",cursor:"pointer",fontSize:12,fontWeight:600}}>🔄</button>}
            <button onClick={onClose} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:20}}>✕</button>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:22}}>
          {loading ? (
            <div style={{textAlign:"center",padding:50}}>
              <div style={{fontSize:44,marginBottom:14,animation:"pulse 1.5s infinite",display:"inline-block"}}>🤖</div>
              <div style={{color:"#fff",fontWeight:700,marginBottom:6}}>Analisando concessions de {driverName.split(" ")[0]}...</div>
              <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:18}}>
                {[0,1,2].map(i=><span key={i} style={{width:8,height:8,background:"#fb923c",borderRadius:"50%",display:"inline-block",animation:`bounce 1s infinite ${i*.2}s`}}/>)}
              </div>
            </div>
          ) : <div style={{color:"#e2e8f0",fontSize:14,lineHeight:1.85,whiteSpace:"pre-line"}}>{plan}</div>}
        </div>
        {!loading && (
          <div style={{padding:"12px 22px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrink:0}}>
            <button onClick={()=>{const b=new Blob([plan],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`concessions_${driverName.replace(/ /g,"_")}.txt`;a.click();URL.revokeObjectURL(u);}} style={{background:"rgba(251,146,60,0.1)",border:"1px solid rgba(251,146,60,0.25)",color:"#fb923c",borderRadius:9,padding:"8px 16px",cursor:"pointer",fontWeight:600,fontSize:13}}>
              💾 Exportar
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}} @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

// ── MÓDULO PRINCIPAL ───────────────────────────────────────
function ConcessionModule() {
  const [concessions, setConcessions] = useState(DEMO_CONCESSIONS);
  const [dataLabel, setDataLabel] = useState("Dados Demo — Abr 2025");
  const [showUpload, setShowUpload] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // map | areas | drivers | list
  const [filterPostcode, setFilterPostcode] = useState("All");

  // Estatísticas gerais
  const stats = useMemo(() => {
    const byPostcode = {};
    const byDriver = {};
    const byReason = {};
    concessions.forEach(c => {
      byPostcode[c.postcode] = (byPostcode[c.postcode]||0) + 1;
      byDriver[c.driver] = (byDriver[c.driver]||0) + 1;
      const root = c.reason.split(" - ")[0];
      byReason[root] = (byReason[root]||0) + 1;
    });
    const topPostcodes = Object.entries(byPostcode).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const topDrivers   = Object.entries(byDriver).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const topReasons   = Object.entries(byReason).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const totalValue   = 0; // removed
    const criticalPostcodes = topPostcodes.filter(([,n])=>n>=4);
    return { byPostcode, byDriver, byReason, topPostcodes, topDrivers, topReasons, totalValue, criticalPostcodes };
  }, [concessions]);

  const filteredList = useMemo(() => {
    if (filterPostcode==="All") return concessions;
    return concessions.filter(c=>c.postcode===filterPostcode);
  }, [concessions, filterPostcode]);

  const riskLevel = (count) => count >= 5 ? {l:"ALTO",c:"#ef4444"} : count >= 3 ? {l:"MÉDIO",c:"#f97316"} : {l:"BAIXO",c:"#eab308"};

  return (
    <div style={{maxWidth:1300,margin:"0 auto",padding:"20px 16px",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{color:"#fff",fontSize:22,fontWeight:900,margin:0,display:"flex",alignItems:"center",gap:10}}>
            🗺️ Análise de Concessions
          </h2>
          <p style={{color:"#64748b",margin:"4px 0 0",fontSize:13}}>{dataLabel} · {concessions.length} registros · £{stats.totalValue.toFixed(2)} em risco</p>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {stats.criticalPostcodes.length > 0 && (
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:10,padding:"6px 14px",display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:"#ef4444",fontWeight:700,fontSize:12}}>🚨 {stats.criticalPostcodes.length} área(s) crítica(s)</span>
            </div>
          )}
          <button onClick={()=>setShowUpload(true)} style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",border:"none",color:"#fff",borderRadius:10,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:700}}>
            📄 Importar PDF
          </button>
          <button onClick={()=>setConcessions(DEMO_CONCESSIONS)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",borderRadius:10,padding:"8px 12px",cursor:"pointer",fontSize:12}}>
            Reset Demo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
        {[
          {l:"Total Concessions", v:concessions.length, i:"📦", c:"#f87171"},
          
          {l:"Áreas Afetadas",   v:Object.keys(stats.byPostcode).length, i:"📍", c:"#fde047"},
          {l:"Drivers Envolvidos",v:Object.keys(stats.byDriver).length, i:"🚚", c:"#7dd3fc"},
        ].map((k,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:13,padding:"14px 16px"}}>
            <div style={{fontSize:20,marginBottom:5}}>{k.i}</div>
            <div style={{color:k.c,fontSize:24,fontWeight:900}}>{k.v}</div>
            <div style={{color:"#475569",fontSize:11,marginTop:2}}>{k.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.03)",borderRadius:12,padding:4,marginBottom:18,gap:4,width:"fit-content"}}>
        {[{k:"map",l:"🗺️ Mapa"},{k:"areas",l:"📍 Áreas"},{k:"drivers",l:"👤 Drivers"},{k:"list",l:"📋 Lista"}].map(t=>(
          <button key={t.k} onClick={()=>setViewMode(t.k)} style={{padding:"8px 18px",background:viewMode===t.k?"linear-gradient(135deg,#ef4444,#dc2626)":"none",border:"none",color:viewMode===t.k?"#fff":"#64748b",borderRadius:9,fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .2s"}}>
            {t.l}
          </button>
        ))}
      </div>

      {/* MAP VIEW */}
      {viewMode==="map" && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
          <div>
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <h3 style={{color:"#fff",margin:0,fontSize:14,fontWeight:700}}>Mapa de Calor — Áreas Críticas</h3>
                <span style={{color:"#64748b",fontSize:12}}>Clique num ponto para ver detalhes</span>
              </div>
              <ConcessionMap concessions={concessions} onAreaSelect={setSelectedArea}/>
            </div>
          </div>

          {/* Side panel */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {/* Top postcodes */}
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16}}>
              <h3 style={{color:"#fff",margin:"0 0 12px",fontSize:13,fontWeight:700}}>🔴 Áreas com mais concessions</h3>
              {stats.topPostcodes.map(([pc,n])=>{
                const risk = riskLevel(n);
                const area = concessions.find(c=>c.postcode===pc)?.area||pc;
                return (
                  <div key={pc} onClick={()=>setSelectedArea({postcode:pc,area,count:n,drivers:[...new Set(concessions.filter(c=>c.postcode===pc).map(c=>c.driver))]})}
                    style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",borderRadius:9,marginBottom:6,cursor:"pointer",background:"rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.05)",transition:"all .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(239,68,68,0.3)"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"}>
                    <div>
                      <div style={{color:"#fff",fontWeight:700,fontSize:13}}>{pc}</div>
                      <div style={{color:"#64748b",fontSize:11}}>{area}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{color:risk.c,fontWeight:800,fontSize:15}}>{n}</span>
                      <span style={{background:`${risk.c}20`,color:risk.c,fontSize:9,padding:"2px 7px",borderRadius:5,fontWeight:700}}>{risk.l}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top reasons */}
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16}}>
              <h3 style={{color:"#fff",margin:"0 0 12px",fontSize:13,fontWeight:700}}>📊 Motivos Principais</h3>
              {stats.topReasons.map(([r,n])=>(
                <div key={r} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{color:"#94a3b8",fontSize:12,flex:1,marginRight:8}}>{r}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:60,background:"rgba(0,0,0,0.3)",borderRadius:4,height:6,overflow:"hidden"}}>
                      <div style={{width:`${n/concessions.length*100}%`,height:"100%",background:"#ef4444",borderRadius:4}}/>
                    </div>
                    <span style={{color:"#f87171",fontWeight:700,fontSize:13,width:16}}>{n}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AREAS VIEW */}
      {viewMode==="areas" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
          {Object.entries(stats.byPostcode).sort((a,b)=>b[1]-a[1]).map(([pc,n])=>{
            const area = concessions.find(c=>c.postcode===pc)?.area||pc;
            const risk = riskLevel(n);
            const drivers = [...new Set(concessions.filter(c=>c.postcode===pc).map(c=>c.driver))];
            const totalVal = concessions.filter(c=>c.postcode===pc).reduce((s,c)=>s+(Number(c.value)||0),0);
            const reasons = [...new Set(concessions.filter(c=>c.postcode===pc).map(c=>c.reason))];
            return (
              <div key={pc} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${risk.c}25`,borderRadius:16,padding:18,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:12,right:12}}>
                  <span style={{background:`${risk.c}20`,color:risk.c,fontSize:10,padding:"3px 9px",borderRadius:6,fontWeight:800}}>{risk.l}</span>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{color:"#fff",fontWeight:900,fontSize:18}}>{pc}</div>
                  <div style={{color:"#64748b",fontSize:12}}>{area}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  {[{l:"Concessions",v:n,c:risk.c}].map((s,i)=>(
                    <div key={i} style={{background:"rgba(0,0,0,0.25)",borderRadius:9,padding:"8px 10px"}}>
                      <div style={{color:s.c,fontWeight:800,fontSize:17}}>{s.v}</div>
                      <div style={{color:"#475569",fontSize:10}}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{color:"#64748b",fontSize:11,marginBottom:4}}>Drivers:</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {drivers.map(d=>(
                      <span key={d} onClick={()=>setSelectedDriver(d)} style={{background:"rgba(251,146,60,0.1)",color:"#fb923c",fontSize:10,padding:"2px 8px",borderRadius:5,fontWeight:600,cursor:"pointer",border:"1px solid rgba(251,146,60,0.2)"}}>
                        {d.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:14}}>
                  <div style={{color:"#64748b",fontSize:11,marginBottom:4}}>Top motivos:</div>
                  {reasons.slice(0,2).map((r,i)=>(
                    <div key={i} style={{color:"#94a3b8",fontSize:11,padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}> · {r}</div>
                  ))}
                </div>
                <button onClick={()=>setSelectedArea({postcode:pc,area,count:n,drivers,reasons})} style={{width:"100%",background:`linear-gradient(135deg,${risk.c}20,${risk.c}10)`,border:`1px solid ${risk.c}40`,color:risk.c,borderRadius:9,padding:"9px",cursor:"pointer",fontWeight:700,fontSize:13}}>
                  🤖 Gerar Plano de Ação IA
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* DRIVERS VIEW */}
      {viewMode==="drivers" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {Object.entries(stats.byDriver).sort((a,b)=>b[1]-a[1]).map(([driver,n])=>{
            const dc = concessions.filter(c=>c.driver===driver);
            const postcodes = [...new Set(dc.map(c=>c.postcode))];
            const totalVal = dc.reduce((s,c)=>s+(Number(c.value)||0),0);
            const reasons = [...new Set(dc.map(c=>c.reason))];
            const risk = riskLevel(n);
            return (
              <div key={driver} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${risk.c}20`,borderRadius:14,padding:18}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:42,height:42,background:`linear-gradient(135deg,${risk.c}30,rgba(0,0,0,0.4))`,border:`1px solid ${risk.c}40`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:15}}>
                      {driver.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{driver}</div>
                      <div style={{color:"#64748b",fontSize:12}}>{postcodes.join(", ")} · £{totalVal.toFixed(2)}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{textAlign:"center",background:"rgba(0,0,0,0.3)",borderRadius:9,padding:"6px 14px"}}>
                      <div style={{color:risk.c,fontSize:20,fontWeight:900}}>{n}</div>
                      <div style={{color:"#475569",fontSize:10}}>concessions</div>
                    </div>
                    <span style={{background:`${risk.c}15`,color:risk.c,fontSize:10,padding:"4px 10px",borderRadius:6,fontWeight:800}}>{risk.l}</span>
                    <button onClick={()=>setSelectedDriver(driver)} style={{background:`rgba(251,146,60,0.1)`,border:"1px solid rgba(251,146,60,0.3)",color:"#fb923c",borderRadius:9,padding:"8px 14px",cursor:"pointer",fontWeight:700,fontSize:12}}>
                      🤖 Plano IA
                    </button>
                  </div>
                </div>
                <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:6}}>
                  {reasons.map((r,i)=>(
                    <span key={i} style={{background:"rgba(248,113,113,0.08)",color:"#f87171",fontSize:11,padding:"3px 9px",borderRadius:5,border:"1px solid rgba(248,113,113,0.15)"}}>{r}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode==="list" && (
        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
            <h3 style={{color:"#fff",margin:0,fontSize:13,fontWeight:700}}>📋 Delivered Not Received — {filteredList.length} registros</h3>
            <select value={filterPostcode} onChange={e=>setFilterPostcode(e.target.value)} style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,outline:"none"}}>
              <option value="All">Todos os postcodes</option>
              {Object.keys(stats.byPostcode).sort().map(pc=><option key={pc} value={pc} style={{background:"#0d1527"}}>{pc} ({stats.byPostcode[pc]})</option>)}
            </select>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{color:"#475569",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                  {["#","Tracking Number","Driver","DA Code","Postcode","Área","Data Entrega","Data Concession","Plano"].map(h=>(
                    <th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredList.map((c,i)=>{
                  const risk = riskLevel(stats.byPostcode[c.postcode]||1);
                  return (
                    <tr key={c.id} style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.03)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{padding:"8px 10px",color:"#475569"}}>{i+1}</td>
                      <td style={{padding:"8px 10px"}}>
                        <span style={{color:"#7dd3fc",fontFamily:"monospace",fontSize:11,fontWeight:700}}>{c.trackingNumber||"—"}</span>
                      </td>
                      <td style={{padding:"8px 10px",color:"#e2e8f0",fontWeight:600,whiteSpace:"nowrap"}}>{c.driver}</td>
                      <td style={{padding:"8px 10px"}}>
                        <span style={{color:"#94a3b8",fontFamily:"monospace",fontSize:10}}>{c.daCode||"—"}</span>
                      </td>
                      <td style={{padding:"8px 10px"}}>
                        <span style={{background:`${risk.c}15`,color:risk.c,fontWeight:700,fontSize:11,padding:"2px 8px",borderRadius:5}}>{c.postcode}</span>
                      </td>
                      <td style={{padding:"8px 10px",color:"#64748b",fontSize:11}}>{c.area}</td>
                      <td style={{padding:"8px 10px",color:"#94a3b8",fontSize:11,whiteSpace:"nowrap"}}>{c.deliveryDate||c.date||"—"}</td>
                      <td style={{padding:"8px 10px",color:"#f87171",fontSize:11,whiteSpace:"nowrap"}}>{c.concessionDate||c.date||"—"}</td>
                      <td style={{padding:"8px 10px"}}>
                        <button onClick={()=>setSelectedDriver(c.driver)} style={{background:"rgba(251,146,60,0.1)",border:"1px solid rgba(251,146,60,0.2)",color:"#fb923c",borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:10,fontWeight:700}}>🤖</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {showUpload && <ConcessionUpload onDataLoaded={(data,label)=>{setConcessions(data);setDataLabel(label);setShowUpload(false);}} onClose={()=>setShowUpload(false)}/>}
      {selectedArea && <AreaPlanModal area={selectedArea} concessions={concessions} onClose={()=>setSelectedArea(null)}/>}
      {selectedDriver && <DriverConcessionPlan driverName={selectedDriver} concessions={concessions} onClose={()=>setSelectedDriver(null)}/>}
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// DRIVER QUICK MESSAGES (dentro do modal do motorista)
// ══════════════════════════════════════════════════════════
function DriverQuickMessages({ driver }) {
  if (!driver) return null;
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [copied, setCopied] = useState(null);
  const [open, setOpen] = useState(false);

  const templates = MSG_TEMPLATES[lang] || MSG_TEMPLATES['pt-BR'];
  const safeDriver = {
    name: 'Motorista',
    status: 'Great',
    totalScore: 0,
    deliveries: 0,
    wowChange: 0,
    dcr: 0,
    dscDpmo: 0,
    pod: 0,
    cc: 0,
    lorDpmo: 0,
    cdfDpmo: 0,
    ...driver,
  };

  // Auto-detect relevant templates based on driver KPIs
  const relevant = [];
  if (safeDriver.totalScore >= 90) {
    const t = templates.driver[0];
    relevant.push({ key: 'recognition', title: t.title, text: t.generate(safeDriver) });
  }
  if (safeDriver.dscDpmo > 900) {
    const t = templates.driver[2];
    relevant.push({ key: 'dsc', title: t.title, text: t.generate(safeDriver) });
  }
  if (safeDriver.dcr < 99) {
    const t = templates.driver[3];
    relevant.push({ key: 'dcr', title: t.title, text: t.generate(safeDriver) });
  }
  if (safeDriver.pod < 99 || safeDriver.cc < 99 || safeDriver.lorDpmo > 400 || safeDriver.cdfDpmo > 4420) {
    const t = templates.driver[4];
    relevant.push({ key: 'podcc', title: t.title, text: t.generate(safeDriver) });
  }
  if (safeDriver.totalScore < 70) {
    const t = templates.driver[1];
    relevant.push({ key: 'improve', title: t.title, text: t.generate(safeDriver) });
  }
  // fallback: always show recognition if nothing flagged and score < 90
  if (relevant.length === 0) {
    const t = templates.driver[0];
    relevant.push({ key: 'recognition', title: t.title, text: t.generate(safeDriver) });
  }

  const copy = async (key, text) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 2000); } catch {}
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: 'rgba(255,153,0,0.07)', border: '1px solid rgba(255,153,0,0.25)', borderRadius: 11, padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#FF9900', fontWeight: 700, fontSize: 13 }}>💬 {isEN ? 'Quick Messages' : 'Mensagens Rápidas'} ({relevant.length})</span>
        <span style={{ color: '#64748b', fontSize: 13, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {relevant.map(msg => (
            <div key={msg.key} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, overflow: 'hidden' }}>
              <div style={{ padding: '9px 13px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 12 }}>{msg.title}</div>
                <button onClick={() => copy(msg.key, msg.text)} style={{ background: copied === msg.key ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.07)', border: `1px solid ${copied === msg.key ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.12)'}`, color: copied === msg.key ? '#4ade80' : '#94a3b8', borderRadius: 7, padding: '4px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 700, transition: 'all .2s', whiteSpace: 'nowrap' }}>
                  {copied === msg.key ? (isEN ? '✓ Copied!' : '✓ Copiado!') : '📋 Copy'}
                </button>
              </div>
              <div style={{ padding: '10px 13px', color: '#94a3b8', fontSize: 11, lineHeight: 1.7, whiteSpace: 'pre-line', maxHeight: 180, overflowY: 'auto', paddingRight: 8 }}>{msg.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// DRIVER DETAIL MODAL
// ══════════════════════════════════════════════════════════
function DriverDetailModal({ driver, onClose, onPlan }) {
  if (!driver) return null;
  const [showKPIHistory, setShowKPIHistory] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const safeDriver = {
    name: 'Motorista',
    status: 'Great',
    totalScore: 0,
    rank: '-',
    deliveries: 0,
    wowChange: 0,
    dcr: 0,
    dscDpmo: 0,
    pod: 0,
    cc: 0,
    fico: 0,
    ...driver,
  };
  const sc = STATUS_META[safeDriver.status] || STATUS_META['Great'];
  const issues = [
    safeDriver.dscDpmo > 900 && {m:'DSC DPMO',v:safeDriver.dscDpmo.toLocaleString(),tip:'Revisar condições de entrega e POD'},
    safeDriver.dcr < 99 && {m:'DCR',v:safeDriver.dcr+'%',tip:'Aumentar tentativas antes de retornar'},
    safeDriver.pod < 99 && {m:'POD',v:safeDriver.pod+'%',tip:'Foto antes de registrar cada entrega'},
    safeDriver.cc < 99 && {m:'CC',v:safeDriver.cc+'%',tip:'Notificação de chegada em TODAS as entregas'},
    safeDriver.fico > 600 && {m:'FICO',v:safeDriver.fico,tip:'Reduzir velocidade excessiva'},
  ].filter(Boolean);
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:9999}} onClick={onClose}>
      <div style={{background:'#0d1527',border:`1px solid ${sc.border}40`,borderRadius:20,width:'100%',maxWidth:540,maxHeight:'85vh',overflowY:'auto',position:'relative',zIndex:10000}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:20}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{background:`linear-gradient(135deg,${sc.badge},${sc.bg})`,borderRadius:13,width:46,height:46,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:15}}>{safeDriver.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <div>
                <div style={{color:'#fff',fontWeight:800,fontSize:16}}>{safeDriver.name}</div>
                <div style={{color:'#64748b',fontSize:11}}>Rank #{safeDriver.rank} · {safeDriver.status} · {safeDriver.totalScore.toFixed(1)}</div>
              </div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>setShowSimulator(true)} style={{background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.3)',color:'#a78bfa',borderRadius:8,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:700}}>🎯 Simulador</button>
              <button onClick={()=>setShowKPIHistory(true)} style={{background:'rgba(57,150,201,0.1)',border:'1px solid rgba(57,150,201,0.3)',color:'#3b82f6',borderRadius:8,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:700}}>📊 Histórico KPIs</button>
              <button onClick={()=>onPlan(driver)} style={{background:'rgba(255,153,0,0.1)',border:'1px solid rgba(255,153,0,0.3)',color:'#FF9900',borderRadius:8,padding:'7px 13px',cursor:'pointer',fontSize:12,fontWeight:700}}>📋 Plano IA</button>
              <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
            </div>
          </div>
          <div style={{display:'flex',gap:14,marginBottom:16,alignItems:'center'}}>
            <Speedometer score={driver.totalScore} size="lg" label="Score"/>
            <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[{l:'Entregas',v:safeDriver.deliveries.toLocaleString(),c:'#7dd3fc'},{l:'WoW',v:(safeDriver.wowChange>0?'+':'')+safeDriver.wowChange,c:safeDriver.wowChange>=0?'#4ade80':'#f87171'},{l:'DCR',v:safeDriver.dcr.toFixed(2)+'%',c:mc(safeDriver.dcr)},{l:'DSC DPMO',v:safeDriver.dscDpmo.toLocaleString(),c:mc(safeDriver.dscDpmo,'bad')},{l:'POD',v:safeDriver.pod.toFixed(1)+'%',c:mc(safeDriver.pod)},{l:'CC',v:safeDriver.cc.toFixed(1)+'%',c:mc(safeDriver.cc)}].map(m=>(
                <div key={m.l} style={{background:'rgba(0,0,0,0.3)',borderRadius:9,padding:'9px 11px'}}>
                  <div style={{color:'#475569',fontSize:10}}>{m.l}</div>
                  <div style={{color:m.c,fontWeight:800,fontSize:15}}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
          {issues.length===0 ? (
            <div style={{background:'rgba(74,222,128,0.07)',border:'1px solid rgba(74,222,128,0.2)',borderRadius:11,padding:14,textAlign:'center'}}>
              <div style={{color:'#4ade80',fontWeight:700}}>🏆 Excelente Performance!</div>
              <div style={{color:'#64748b',fontSize:12,marginTop:3}}>Todos os KPIs dentro da meta.</div>
            </div>
          ) : (
            <div>
              <div style={{color:'#fb923c',fontWeight:700,fontSize:12,marginBottom:8}}>⚠️ Pontos de Atenção</div>
              <div style={{display:'flex',flexDirection:'column',gap:7}}>
                {issues.map((iss,i)=>(
                  <div key={i} style={{background:'rgba(248,113,113,0.06)',border:'1px solid rgba(248,113,113,0.17)',borderRadius:9,padding:'10px 13px'}}>
                    <div style={{color:'#f87171',fontWeight:700,fontSize:12}}>{iss.m}: {iss.v}</div>
                    <div style={{color:'#94a3b8',fontSize:11,marginTop:2}}>{iss.tip}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DriverQuickMessages driver={driver}/>
        </div>
      </div>
      {showKPIHistory && <DriverKPIHistory driver={driver} onClose={() => setShowKPIHistory(false)} />}
      {showSimulator && <ImpactSimulator driver={driver} onClose={() => setShowSimulator(false)} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// BENCHMARKING MODAL — Como estou vs. time + Top 5 vs Bottom 5
// ══════════════════════════════════════════════════════════
function BenchmarkingModal({ drivers, onClose }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [selTab, setSelTab] = useState('compare');

  const avgScore = drivers.reduce((s,d)=>s+d.totalScore,0)/drivers.length;
  const maxScore = Math.max(...drivers.map(d=>d.totalScore));
  const minScore = Math.min(...drivers.map(d=>d.totalScore));

  const sorted = [...drivers].sort((a,b)=>b.totalScore-a.totalScore);
  const top5 = sorted.slice(0,5);
  const bottom5 = sorted.slice(-5).reverse();

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:230}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(125,211,252,0.25)',borderRadius:20,width:'100%',maxWidth:720,maxHeight:'85vh',overflowY:'auto',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:15}}>📊 {isEN?'Team Benchmarking':'Benchmarking do Time'}</div>
            <div style={{color:'#64748b',fontSize:11,marginTop:3}}>{isEN?'How you compare to the team':'Como você se compara com o time'}</div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',gap:4}}>
          {[{k:'compare',l:'📈 Comparação'},{k:'top5',l:'🏆 Top 5'},{k:'bottom5',l:'⚠️ Bottom 5'}].map(t=>(
            <button key={t.k} onClick={()=>setSelTab(t.k)}
              style={{padding:'7px 16px',background:selTab===t.k?'linear-gradient(135deg,#7dd3fc,#3b82f6)':'rgba(255,255,255,0.04)',
                      border:`1px solid ${selTab===t.k?'transparent':'rgba(255,255,255,0.07)'}`,color:selTab===t.k?'#fff':'#64748b',
                      borderRadius:9,fontWeight:700,fontSize:13,cursor:'pointer',transition:'all .2s'}}>
              {isEN && t.k==='compare'?'📈 Comparison':isEN && t.k==='top5'?'🏆 Top 5':isEN?'⚠️ Bottom 5':t.l}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{flex:1,padding:'16px 20px',overflowY:'auto'}}>
          {selTab === 'compare' && (
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {/* Stats */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
                {[
                  {label:isEN?'Team Average':'Média do Time', val:avgScore.toFixed(1), color:'#FF9900'},
                  {label:isEN?'Highest Score':'Maior Score', val:maxScore.toFixed(1), color:'#4ade80'},
                  {label:isEN?'Lowest Score':'Menor Score', val:minScore.toFixed(1), color:'#f87171'},
                  {label:isEN?'Standard Dev.':'Desvio Padrão', val:(Math.sqrt(drivers.reduce((s,d)=>s+Math.pow(d.totalScore-avgScore,2),0)/drivers.length).toFixed(1)), color:'#a78bfa'},
                ].map(m=>(
                  <div key={m.label} style={{background:'rgba(0,0,0,0.3)',borderRadius:12,padding:'14px',textAlign:'center'}}>
                    <div style={{color:'#64748b',fontSize:11}}>{m.label}</div>
                    <div style={{color:m.color,fontWeight:800,fontSize:24,marginTop:8}}>{m.val}</div>
                  </div>
                ))}
              </div>

              {/* Distribution */}
              <div style={{background:'rgba(0,0,0,0.2)',borderRadius:12,padding:'14px'}}>
                <div style={{color:'#e2e8f0',fontWeight:700,fontSize:12,marginBottom:10}}>📊 {isEN?'Score Distribution':'Distribuição de Scores'}</div>
                {[
                  {label:'Fantastic Plus (95+)', count:drivers.filter(d=>d.totalScore>=95).length, color:'#22c55e'},
                  {label:'Fantastic (88+)', count:drivers.filter(d=>d.totalScore>=88&&d.totalScore<95).length, color:'#4ade80'},
                  {label:'Great (70+)', count:drivers.filter(d=>d.totalScore>=70&&d.totalScore<88).length, color:'#fde047'},
                  {label:'Fair (55+)', count:drivers.filter(d=>d.totalScore>=55&&d.totalScore<70).length, color:'#fb923c'},
                  {label:'Poor (<55)', count:drivers.filter(d=>d.totalScore<55).length, color:'#ef4444'},
                ].map(row=>(
                  <div key={row.label} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <span style={{color:'#64748b',fontSize:11,flex:'0 0 100px'}}>{row.label}</span>
                    <div style={{flex:1,background:'rgba(255,255,255,0.05)',borderRadius:6,height:24,display:'flex',alignItems:'center',overflow:'hidden'}}>
                      <div style={{background:row.color,width:`${(row.count/drivers.length)*100}%`,height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontWeight:700,fontSize:11}}>{row.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selTab === 'top5' && (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <div style={{color:'#4ade80',fontWeight:700,fontSize:12,marginBottom:4}}>🏆 {isEN?'Top 5 Performers':'Top 5 Performers'}</div>
              {top5.map((d,i)=>(
                <div key={d.id} style={{background:'rgba(0,0,0,0.3)',borderRadius:12,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',borderLeft:`4px solid ${STATUS_META[d.status].badge}`}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{background:'linear-gradient(135deg,#4ade80,#22c55e)',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',fontSize:12}}>#{i+1}</span>
                    <div>
                      <div style={{color:'#fff',fontWeight:700}}>{d.name}</div>
                      <div style={{color:'#64748b',fontSize:11}}>{d.status}</div>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'#4ade80',fontWeight:800,fontSize:16}}>{d.totalScore.toFixed(1)}</div>
                    <div style={{color:'#64748b',fontSize:10}}>+{(d.totalScore-avgScore).toFixed(1)} vs avg</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selTab === 'bottom5' && (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <div style={{color:'#f87171',fontWeight:700,fontSize:12,marginBottom:4}}>⚠️ {isEN?'Bottom 5 - Intervention Needed':'Bottom 5 - Intervencao Necessaria'}</div>
              {bottom5.map((d,i)=>(
                <div key={d.id} style={{background:'rgba(248,113,113,0.06)',borderRadius:12,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',borderLeft:`4px solid ${STATUS_META[d.status].badge}`}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{background:'linear-gradient(135deg,#f87171,#ef4444)',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',fontSize:12}}>#{drivers.length-i}</span>
                    <div>
                      <div style={{color:'#fff',fontWeight:700}}>{d.name}</div>
                      <div style={{color:'#64748b',fontSize:11}}>{d.status}</div>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'#f87171',fontWeight:800,fontSize:16}}>{d.totalScore.toFixed(1)}</div>
                    <div style={{color:'#64748b',fontSize:10}}>{(d.totalScore-avgScore).toFixed(1)} vs avg</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// IMPACT SIMULATOR — Simular novo score com melhoria de KPI
// ══════════════════════════════════════════════════════════
function ImpactSimulator({ driver, onClose }) {
  const { lang } = useLang();
  const isEN = lang === 'en-UK';
  const [simDsc, setSimDsc] = useState(driver.dscDpmo);
  const [simDcr, setSimDcr] = useState(driver.dcr);
  const [simPod, setSimPod] = useState(driver.pod);
  const [simCc, setSimCc] = useState(driver.cc);

  const calcScore = (dsc, dcr, pod, cc) => {
    const dsc_score = Math.min(100, (900 / dsc) * 100);
    const dcr_score = Math.min(100, (dcr / 99.5) * 100);
    const pod_score = Math.min(100, (pod / 99) * 100);
    const cc_score = Math.min(100, (cc / 99) * 100);
    const score = dsc_score * 0.25 + dcr_score * 0.35 + pod_score * 0.20 + cc_score * 0.20;
    return Math.min(100, Math.max(0, score));
  };

  const currentScore = calcScore(driver.dscDpmo, driver.dcr, driver.pod, driver.cc);
  const simScore = calcScore(simDsc, simDcr, simPod, simCc);
  const scoreDiff = simScore - currentScore;
  const getStatus = s => s>=95?'Fantastic Plus':s>=88?'Fantastic':s>=70?'Great':s>=55?'Fair':'Poor';

  const sliders = [
    {label:'DSC DPMO', key:'Dsc', val:simDsc, min:0, max:3000, step:50, unit:' DPMO', fmt:(v)=>v.toLocaleString(), delta:simDsc-driver.dscDpmo, good:false},
    {label:'DCR', key:'Dcr', val:simDcr, min:90, max:100, step:0.1, unit:'%', fmt:(v)=>v.toFixed(2), delta:simDcr-driver.dcr, good:true},
    {label:'POD', key:'Pod', val:simPod, min:85, max:100, step:0.1, unit:'%', fmt:(v)=>v.toFixed(1), delta:simPod-driver.pod, good:true},
    {label:'CC', key:'Cc', val:simCc, min:85, max:100, step:0.1, unit:'%', fmt:(v)=>v.toFixed(1), delta:simCc-driver.cc, good:true},
  ];

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:10020}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(125,211,252,0.25)',borderRadius:20,width:'100%',maxWidth:600,maxHeight:'85vh',overflowY:'auto',display:'flex',flexDirection:'column',zIndex:10021}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:15}}>🎯 {isEN?'Impact Simulator':'Simulador de Impacto'} — {driver.name}</div>
            <div style={{color:'#64748b',fontSize:11,marginTop:3}}>Veja como melhorias afetam seu score</div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>
        <div style={{flex:1,padding:'16px 20px',display:'flex',flexDirection:'column',gap:16}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {[
              {title:isEN?'Current':'Atual', score:currentScore, status:getStatus(currentScore), color:'#94a3b8'},
              {title:isEN?'Simulated':'Simulado', score:simScore, status:getStatus(simScore), color:scoreDiff>=0?'#4ade80':'#f87171'},
            ].map(m=>(
              <div key={m.title} style={{background:'rgba(0,0,0,0.3)',borderRadius:12,padding:'14px'}}>
                <div style={{color:'#64748b',fontSize:11,marginBottom:8}}>{m.title}</div>
                <div style={{color:m.color,fontWeight:800,fontSize:32}}>{m.score.toFixed(1)}</div>
                <div style={{color:m.color,fontSize:12,marginTop:4,fontWeight:700}}>{m.status}</div>
              </div>
            ))}
          </div>
          {scoreDiff !== 0 && (
            <div style={{background:scoreDiff>=0?'rgba(74,222,128,0.1)':'rgba(248,113,113,0.1)',border:`1px solid ${scoreDiff>=0?'rgba(74,222,128,0.3)':'rgba(248,113,113,0.3)'}`,borderRadius:10,padding:'12px',textAlign:'center'}}>
              <div style={{color:scoreDiff>=0?'#4ade80':'#f87171',fontWeight:800,fontSize:16}}>{scoreDiff>=0?'+':''}{scoreDiff.toFixed(1)} pts</div>
              <div style={{color:'#64748b',fontSize:11,marginTop:3}}>{scoreDiff>=0?'Melhoria':'Piora'}</div>
            </div>
          )}
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {sliders.map((s,i)=>(
              <div key={i}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <label style={{color:'#e2e8f0',fontWeight:700,fontSize:12}}>{s.label}</label>
                  <div style={{display:'flex',alignItems:'baseline',gap:6}}>
                    <span style={{color:'#fff',fontWeight:800,fontSize:14}}>{s.fmt(s.val)}{s.unit}</span>
                    {s.delta!==0&&<span style={{color:s.good?(s.delta>0?'#4ade80':'#f87171'):(s.delta<0?'#4ade80':'#f87171'),fontSize:11,fontWeight:700}}>{s.delta>0?'+':''}{s.fmt(s.delta)}</span>}
                  </div>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                  onChange={e=>{'Dsc'===s.key?setSimDsc(parseFloat(e.target.value)):'Dcr'===s.key?setSimDcr(parseFloat(e.target.value)):'Pod'===s.key?setSimPod(parseFloat(e.target.value)):setSimCc(parseFloat(e.target.value))}}
                  style={{width:'100%',height:6,borderRadius:3,background:'rgba(0,0,0,0.3)',outline:'none',WebkitAppearance:'none',cursor:'pointer'}}
                />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'#475569',marginTop:4}}>
                  <span>{s.fmt(s.min)}</span>
                  <span>{s.fmt(s.max)}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>{setSimDsc(driver.dscDpmo);setSimDcr(driver.dcr);setSimPod(driver.pod);setSimCc(driver.cc);}}
            style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#94a3b8',borderRadius:9,padding:'10px',fontWeight:700,fontSize:12,cursor:'pointer',transition:'all .2s'}}>
            🔄 {isEN?'Reset':'Resetar'}
          </button>
        </div>
      </div>
    </div>
  );
}

const computeBadges = (driver, depotDrivers) => {
  const badges = [];
  const metrics = driver.metrics || [];
  const allAchievements = [
    {id:'delivery-master', icon:'🚚', name:'Delivery Master', name_pt:'Mestre de Entregas', desc:'DCR ≥ 99%', check:()=>driver.dcr>=99, rarity:'gold'},
    {id:'photo-perfect', icon:'📸', name:'Photo Perfect', name_pt:'Foto Perfeita', desc:'POD = 100%', check:()=>driver.pod>=100, rarity:'gold'},
    {id:'customer-hero', icon:'📞', name:'Customer Hero', name_pt:'Herói do Cliente', desc:'CC ≥ 99%', check:()=>driver.cc>=99, rarity:'gold'},
    {id:'quality-champion', icon:'🎯', name:'Quality Champion', name_pt:'Campeão de Qualidade', desc:'DSC DPMO ≤ 900', check:()=>driver.dscDpmo<=900, rarity:'gold'},
    {id:'fantastic-performer', icon:'⭐', name:'Fantastic Performer', name_pt:'Performer Fantástico', desc:'Score ≥ 95', check:()=>driver.totalScore>=95, rarity:'platinum'},
    {id:'rising-star', icon:'📈', name:'Rising Star', name_pt:'Estrela em Ascensão', desc:'Score improvement', check:()=>driver.wowChange>=5, rarity:'silver'},
    {id:'consistency-king', icon:'🎖️', name:'Consistency King', name_pt:'Rei da Consistência', desc:'No metrics failed', check:()=>metrics.every(m=>m.ok), rarity:'silver'},
  ];
  const unlockedAchievements = allAchievements.filter(a => a.check());
  return unlockedAchievements.slice(0, 3).map(a => ({
    id: a.id,
    emoji: a.icon,
    label: a.name,
    label_pt: a.name_pt,
    desc: a.desc,
    rarity: a.rarity
  }));
};

const getNextStatusTarget = (currentScore) => {
  if (currentScore >= 95) return { status: 'Fantastic Plus', target: 100, current: currentScore, needed: 0 };
  if (currentScore >= 88) return { status: 'Fantastic', target: 95, current: currentScore, needed: Math.max(0, 95 - currentScore) };
  if (currentScore >= 70) return { status: 'Great', target: 88, current: currentScore, needed: Math.max(0, 88 - currentScore) };
  if (currentScore >= 55) return { status: 'Fair', target: 70, current: currentScore, needed: Math.max(0, 70 - currentScore) };
  return { status: 'Poor', target: 55, current: currentScore, needed: Math.max(0, 55 - currentScore) };
};

function DriverView({ driver }) {
  const { lang } = useLang();
  const isEN = lang==='en-UK';
  const [tab, setTab] = useState('score');
  const [actionPlan, setActionPlan] = useState(null);
  const [activeDriver, setActiveDriver] = useState(driver);
  const [inspectionDone, setInspectionDone] = useState(false);
  const [checklist, setChecklist] = useState({
    lights: false,
    tires: false,
    windows: false,
    mirrors: false,
    brakes: false,
    fuel: false,
    documents: false,
  });
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [docDragOver, setDocDragOver] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoDragOver, setPhotoDragOver] = useState(false);

  useEffect(() => {
    setActiveDriver(driver);
  }, [driver]);

  useEffect(() => {
    if (inspectionDone && driver?.id) {
      const inspections = JSON.parse(localStorage.getItem('logiq-van-inspections') || '{}');
      const currentWeek = WEEKS[WEEKS.length-1];
      inspections[driver.id] = {
        driverId: driver.id,
        driverName: driver.name,
        timestamp: new Date().toISOString(),
        checklist: checklist,
        weekId: currentWeek?.id,
        weekLabel: currentWeek?.label,
      };
      localStorage.setItem('logiq-van-inspections', JSON.stringify(inspections));
    }
  }, [inspectionDone, driver?.id, checklist]);

  useEffect(() => {
    if (driver?.id) {
      const allDocs = JSON.parse(localStorage.getItem('logiq-driver-docs') || '{}');
      setUploadedDocs(allDocs[driver.id] || []);

      const photos = JSON.parse(localStorage.getItem('logiq-driver-photos') || '{}');
      setProfilePhoto(photos[driver.id] || null);
    }
  }, [driver?.id]);

  if (!activeDriver) return null;
  const sc = STATUS_META[activeDriver.status];
  const metrics = [
    {l:'DCR',      v:activeDriver.dcr.toFixed(2)+'%',           ok:activeDriver.dcr>=99,           target:'≥ 99%' },
    {l:'DSC DPMO', v:activeDriver.dscDpmo.toLocaleString(),      ok:activeDriver.dscDpmo<=900,       target:'≤ 900' },
    {l:'POD',      v:activeDriver.pod.toFixed(1)+'%',            ok:activeDriver.pod>=99,            target:'≥ 99%' },
    {l:'CC',       v:activeDriver.cc.toFixed(1)+'%',             ok:activeDriver.cc>=99,             target:'≥ 99%' },
    {l:'LoR DPMO', v:(activeDriver.lorDpmo||0).toLocaleString(), ok:(activeDriver.lorDpmo||0)<=400,  target:'≤ 400' },
    {l:'CE',       v:(activeDriver.ceDpmo||0),                   ok:(activeDriver.ceDpmo||0)<=30,    target:'≤ 30'  },
    {l:'CDF DPMO', v:(activeDriver.cdfDpmo||0).toLocaleString(), ok:(activeDriver.cdfDpmo||0)<=4420, target:'≤ 4420'},
  ];

  // Achievements System
  const allAchievements = [
    {id:'delivery-master', icon:'🚚', name:isEN?'Delivery Master':'Mestre de Entregas', desc:isEN?'DCR ≥ 99%':'DCR ≥ 99%', check:()=>activeDriver.dcr>=99, rarity:'gold'},
    {id:'photo-perfect', icon:'📸', name:isEN?'Photo Perfect':'Foto Perfeita', desc:isEN?'POD = 100%':'POD = 100%', check:()=>activeDriver.pod>=100, rarity:'gold'},
    {id:'customer-hero', icon:'📞', name:isEN?'Customer Hero':'Herói do Cliente', desc:isEN?'CC ≥ 99%':'CC ≥ 99%', check:()=>activeDriver.cc>=99, rarity:'gold'},
    {id:'quality-champion', icon:'🎯', name:isEN?'Quality Champion':'Campeão de Qualidade', desc:isEN?'DSC DPMO ≤ 900':'DSC DPMO ≤ 900', check:()=>activeDriver.dscDpmo<=900, rarity:'gold'},
    {id:'fantastic-performer', icon:'⭐', name:isEN?'Fantastic Performer':'Performer Fantástico', desc:isEN?'Score ≥ 95':'Score ≥ 95', check:()=>activeDriver.totalScore>=95, rarity:'platinum'},
    {id:'rising-star', icon:'📈', name:isEN?'Rising Star':'Estrela em Ascensão', desc:isEN?'Score improvement':'Melhoria no Score', check:()=>activeDriver.wowChange>=5, rarity:'silver'},
    {id:'consistency-king', icon:'🎖️', name:isEN?'Consistency King':'Rei da Consistência', desc:isEN?'No metrics failed':'Sem métricas falhando', check:()=>metrics.every(m=>m.ok), rarity:'silver'},
  ];

  const unlockedAchievements = allAchievements.filter(a => a.check());
  const nextAchievements = allAchievements.filter(a => !a.check()).slice(0, 3);

  const depotId = activeDriver.depot || 'dox2';
  const depotDrivers = BASE_DRIVERS.filter(d => d.depot === depotId);
  const depotAverage = depotDrivers.reduce((s,d)=>s+d.totalScore,0)/depotDrivers.length;
  const rank = depotDrivers.sort((a,b)=>b.totalScore-a.totalScore).findIndex(d=>d.id===activeDriver.id)+1;
  const badges = computeBadges(activeDriver, depotDrivers);
  const nextTarget = getNextStatusTarget(activeDriver.totalScore);
  const progressPercent = Math.min(100, (activeDriver.totalScore / nextTarget.target) * 100);
  const diff = activeDriver.totalScore - depotAverage;
  const scoreHistory = [1,2,3,4,5].map(w=>({week:w,score:generateWeekData(w).find(d=>d.id===activeDriver.id)?.totalScore || 0}));

  const allChecked = Object.values(checklist).every(v => v);

  return (
    <div style={{maxWidth:860,margin:'0 auto',padding:'18px 14px',fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      {/* Abas */}
      <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:12,padding:4,marginBottom:20,gap:4,flexWrap:'wrap'}}>
        {[{k:'score',l:isEN?'📊 Scorecard':'📊 Scorecard'},{k:'profile',l:isEN?'👤 Profile':'👤 Perfil'},{k:'achievements',l:isEN?'🏆 Achievements':'🏆 Conquistas'},{k:'inspection',l:isEN?'🚐 Vehicle Check':'🚐 Inspeção da Van'},{k:'documents',l:isEN?'📋 Documents':'📋 Documentos'}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,minWidth:120,padding:'8px 12px',background:tab===t.k?'linear-gradient(135deg,#4ade80,#16a34a)':'none',border:'none',color:tab===t.k?'#fff':'#64748b',borderRadius:8,fontWeight:700,fontSize:13,cursor:'pointer',transition:'all .2s'}}>
            {t.l}
          </button>
        ))}
      </div>

      {/* ABA: INSPEÇÃO */}
      {tab==='inspection' && (
        <div style={{background:'rgba(239,68,68,0.1)',border:'2px solid #ef4444',borderRadius:16,padding:20}}>
          <div style={{display:'flex',alignItems:'start',gap:14}}>
            <div style={{fontSize:32}}>🚐</div>
            <div style={{flex:1}}>
              <h3 style={{color:'#ef4444',margin:0,fontSize:18,fontWeight:800}}>{isEN?'Vehicle Inspection':'Inspeção da Van'}</h3>
              <p style={{color:'#94a3b8',margin:'8px 0 16px',fontSize:13}}>{isEN?'Check your vehicle before loading. All items must be 100% to proceed.':'Verifique sua van antes do carregamento. Todos os itens devem estar 100% para prosseguir.'}</p>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
                {[
                  {k:'lights', l:isEN?'🚨 Lights':'🚨 Luzes', d:isEN?'All functional':'Todas funcionais'},
                  {k:'tires', l:isEN?'🛞 Tires':'🛞 Pneus', d:isEN?'Proper pressure':'Pressão ok'},
                  {k:'windows', l:isEN?'🪟 Windows':'🪟 Vidros', d:isEN?'No cracks':'Sem rachaduras'},
                  {k:'mirrors', l:isEN?'🪞 Mirrors':'🪞 Espelhos', d:isEN?'All aligned':'Todos alinhados'},
                  {k:'brakes', l:isEN?'⛔ Brakes':'⛔ Freios', d:isEN?'Responsive':'Responsivos'},
                  {k:'fuel', l:isEN?'⛽ Fuel':'⛽ Combustível', d:isEN?'Full tank':'Tanque cheio'},
                  {k:'documents', l:isEN?'📋 Documents':'📋 Documentos', d:isEN?'Updated':'Atualizados'},
                ].map(item => (
                  <label key={item.k} style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer',padding:10,background:'rgba(255,255,255,0.03)',borderRadius:10,border:'1px solid '+(checklist[item.k]?'#4ade80':'rgba(255,255,255,0.1)'),transition:'all .2s'}}>
                    <input type="checkbox" checked={checklist[item.k]} onChange={e=>setChecklist({...checklist,[item.k]:e.target.checked})} style={{width:18,height:18,cursor:'pointer'}}/>
                    <div>
                      <div style={{color:'#fff',fontSize:13,fontWeight:700}}>{item.l}</div>
                      <div style={{color:'#64748b',fontSize:11}}>{item.d}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{color:'#94a3b8',fontSize:11,fontWeight:700,marginBottom:4}}>📅 {isEN?'Week':'Semana'}</div>
                <div style={{color:'#fff',fontSize:14,fontWeight:700}}>{WEEKS[WEEKS.length-1]?.label || 'Week 1'}</div>
              </div>

              <button onClick={()=>{setInspectionDone(true);setTab('score');}} disabled={!allChecked} style={{width:'100%',background:allChecked?'linear-gradient(135deg,#4ade80,#16a34a)':'rgba(255,255,255,0.1)',border:'none',color:allChecked?'#fff':'#64748b',borderRadius:10,padding:12,fontWeight:700,cursor:allChecked?'pointer':'not-allowed',transition:'all .2s'}}>
                {isEN?'✅ Inspection Complete - View Scorecard':'✅ Inspeção Completa - Ver Scorecard'}
              </button>

              {allChecked && <div style={{color:'#4ade80',fontSize:12,marginTop:12,textAlign:'center',fontWeight:700}}>✅ {isEN?'All checks passed!':'Todas as verificações passaram!'}</div>}
            </div>
          </div>
        </div>
      )}

      {/* ABA: PERFIL */}
      {tab==='profile' && (
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <h3 style={{color:'#fff',fontSize:18,fontWeight:800,margin:'0 0 20px'}}>{isEN?'👤 My Profile':'👤 Meu Perfil'}</h3>

          {/* Foto de Perfil */}
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,textAlign:'center',marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:16}}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="Perfil" style={{width:120,height:120,borderRadius:'50%',objectFit:'cover',border:'4px solid #4ade80',boxShadow:'0 0 24px rgba(74,222,128,0.3)'}}/>
              ) : (
                <div style={{width:120,height:120,borderRadius:'50%',background:'linear-gradient(135deg,#4ade80,#16a34a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,boxShadow:'0 0 24px rgba(74,222,128,0.3)'}}>👤</div>
              )}
            </div>

            <div style={{color:'#fff',fontWeight:700,fontSize:16,marginBottom:4}}>{activeDriver?.name}</div>
            <div style={{color:'#64748b',fontSize:13,marginBottom:16}}>{isEN?'Driver':'Motorista'}</div>

            <div onDragOver={e=>{e.preventDefault();setPhotoDragOver(true);}} onDragLeave={()=>setPhotoDragOver(false)} onDrop={e=>{e.preventDefault();setPhotoDragOver(false);const file=e.dataTransfer.files[0];if(file){const r=new FileReader();r.onload=ev=>{setProfilePhoto(ev.target.result);const photos=JSON.parse(localStorage.getItem('logiq-driver-photos')||'{}');photos[driver?.id]=ev.target.result;localStorage.setItem('logiq-driver-photos',JSON.stringify(photos));};r.readAsDataURL(file);}}} style={{border:`2px dashed ${photoDragOver?'#4ade80':'rgba(255,255,255,0.2)'}`,borderRadius:12,padding:20,background:photoDragOver?'rgba(74,222,128,0.1)':'rgba(255,255,255,0.02)',cursor:'pointer',transition:'all .2s',marginBottom:14}}>
              <div style={{fontSize:28,marginBottom:8}}>📷</div>
              <div style={{color:'#fff',fontWeight:700,fontSize:13,marginBottom:4}}>{isEN?'Drag photo here or click':'Arraste foto aqui ou clique'}</div>
              <div style={{color:'#64748b',fontSize:12}}>{isEN?'PNG, JPG - Max 5MB':'PNG, JPG - Máx 5MB'}</div>
              <input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(file){const r=new FileReader();r.onload=ev=>{setProfilePhoto(ev.target.result);const photos=JSON.parse(localStorage.getItem('logiq-driver-photos')||'{}');photos[driver?.id]=ev.target.result;localStorage.setItem('logiq-driver-photos',JSON.stringify(photos));};r.readAsDataURL(file);}}} style={{display:'none'}} id="profilePhotoInput"/>
              <label htmlFor="profilePhotoInput" style={{display:'inline-block',background:'linear-gradient(135deg,#4ade80,#16a34a)',color:'#fff',padding:'8px 16px',borderRadius:8,fontWeight:700,cursor:'pointer',fontSize:12,marginTop:8}}>
                {isEN?'Choose Photo':'Escolher Foto'}
              </label>
            </div>

            {profilePhoto && (
              <button onClick={()=>{setProfilePhoto(null);const photos=JSON.parse(localStorage.getItem('logiq-driver-photos')||'{}');delete photos[driver?.id];localStorage.setItem('logiq-driver-photos',JSON.stringify(photos));}} style={{width:'100%',background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.3)',color:'#f87171',borderRadius:8,padding:10,fontWeight:700,cursor:'pointer',fontSize:13,marginTop:12}}>
                {isEN?'Remove Photo':'Remover Foto'}
              </button>
            )}
          </div>

          {/* Informações do Perfil */}
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20}}>
            <h4 style={{color:'#fff',fontWeight:700,margin:'0 0 16px'}}>{isEN?'Profile Information':'Informações do Perfil'}</h4>
            {[
              {l:isEN?'Name':'Nome',v:activeDriver?.name},
              {l:isEN?'Email':'Email',v:activeDriver?.email},
              {l:isEN?'Status':'Status',v:activeDriver?.status},
              {l:isEN?'Depot':'Depósito',v:DEPOTS.find(d=>d.id===activeDriver?.depot)?.label},
              {l:isEN?'Total Deliveries':'Total de Entregas',v:activeDriver?.deliveries?.toLocaleString()},
              {l:isEN?'Overall Score':'Score Geral',v:activeDriver?.totalScore?.toFixed(1)},
            ].map((info,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:i<5?'1px solid rgba(255,255,255,0.05)':'none'}}>
                <span style={{color:'#94a3b8',fontSize:13}}>{info.l}</span>
                <span style={{color:'#fff',fontWeight:700,fontSize:13}}>{info.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: CONQUISTAS */}
      {tab==='achievements' && (
        <div>
          <h3 style={{color:'#fff',fontSize:18,fontWeight:800,margin:'0 0 20px'}}>🏆 {isEN?'Your Achievements':'Suas Conquistas'}</h3>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div style={{marginBottom:24}}>
              <h4 style={{color:'#4ade80',fontWeight:700,margin:'0 0 12px'}}>✅ {isEN?'Unlocked':'Desbloqueadas'} ({unlockedAchievements.length})</h4>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:12}}>
                {unlockedAchievements.map(a=>(
                  <div key={a.id} style={{background:a.rarity==='platinum'?'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(168,85,247,0.05))':a.rarity==='gold'?'linear-gradient(135deg,rgba(251,146,60,0.15),rgba(251,146,60,0.05))':'linear-gradient(135deg,rgba(99,179,237,0.15),rgba(99,179,237,0.05))',border:`1px solid ${a.rarity==='platinum'?'rgba(168,85,247,0.3)':a.rarity==='gold'?'rgba(251,146,60,0.3)':'rgba(99,179,237,0.3)'}`,borderRadius:12,padding:14,textAlign:'center'}}>
                    <div style={{fontSize:32,marginBottom:8}}>{a.icon}</div>
                    <div style={{color:'#fff',fontWeight:700,fontSize:12,marginBottom:4}}>{a.name}</div>
                    <div style={{color:'#94a3b8',fontSize:10}}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Achievements */}
          {nextAchievements.length > 0 && (
            <div>
              <h4 style={{color:'#fbbf24',fontWeight:700,margin:'0 0 12px'}}>🎯 {isEN?'In Progress':'Em Progresso'}</h4>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:12}}>
                {nextAchievements.map(a=>(
                  <div key={a.id} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:14,opacity:0.7}}>
                    <div style={{fontSize:32,marginBottom:8,opacity:0.6}}>{a.icon}</div>
                    <div style={{color:'#cbd5e1',fontWeight:700,fontSize:12,marginBottom:4}}>{a.name}</div>
                    <div style={{color:'#94a3b8',fontSize:10}}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {unlockedAchievements.length === 0 && nextAchievements.length === 0 && (
            <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:20,textAlign:'center',color:'#94a3b8'}}>
              {isEN?'Keep improving to unlock achievements!':'Continue melhorando para desbloquear conquistas!'}
            </div>
          )}
        </div>
      )}

      {/* ABA: DOCUMENTOS */}
      {tab==='documents' && (
        <div>
          <h3 style={{color:'#fff',fontSize:18,fontWeight:800,margin:'0 0 16px'}}>{isEN?'📋 Send Documents':'📋 Enviar Documentos'}</h3>
          <p style={{color:'#94a3b8',fontSize:13,marginBottom:16}}>{isEN?'Upload insurance, license, vehicle registration and other documents for verification.':'Faça upload de seguro, CNH, CRLV e outros documentos para verificação.'}</p>

          <div onDragOver={e=>{e.preventDefault();setDocDragOver(true);}} onDragLeave={()=>setDocDragOver(false)} onDrop={e=>{e.preventDefault();setDocDragOver(false);const files=Array.from(e.dataTransfer.files);files.forEach(f=>{const r=new FileReader();r.onload=ev=>{const doc={id:Date.now()+Math.random(),name:f.name,type:f.type,size:f.size,data:ev.target.result,timestamp:new Date().toISOString(),status:'pending'};setUploadedDocs([...uploadedDocs,doc]);const allDocs=JSON.parse(localStorage.getItem('logiq-driver-docs')||'{}');allDocs[driver?.id]=[...(allDocs[driver?.id]||[]),doc];localStorage.setItem('logiq-driver-docs',JSON.stringify(allDocs));};r.readAsDataURL(f);});}} style={{border:`2px dashed ${docDragOver?'#4ade80':'rgba(255,255,255,0.2)'}`,borderRadius:16,padding:40,textAlign:'center',background:docDragOver?'rgba(74,222,128,0.1)':'rgba(255,255,255,0.02)',cursor:'pointer',transition:'all .2s',marginBottom:20}}>
            <div style={{fontSize:40,marginBottom:12}}>📂</div>
            <div style={{color:'#fff',fontWeight:700,fontSize:14,marginBottom:4}}>{isEN?'Drag files here or click':'Arraste arquivos aqui ou clique'}</div>
            <div style={{color:'#64748b',fontSize:12}}>{isEN?'PDF, PNG, JPG - Max 10MB':'PDF, PNG, JPG - Máx 10MB'}</div>
          </div>

          {uploadedDocs.length > 0 && (
            <div>
              <h4 style={{color:'#fff',fontWeight:700,marginBottom:12}}>{isEN?'Uploaded Documents':'Documentos Enviados'}</h4>
              <div style={{display:'grid',gap:10}}>
                {uploadedDocs.map(doc => {
                  const sizeKB = (doc.size/1024).toFixed(1);
                  const dateStr = new Date(doc.timestamp).toLocaleDateString(lang==='pt-BR'?'pt-BR':'en-GB',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});

                  return (
                    <div key={doc.id} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:12,padding:14,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                      <div style={{display:'flex',alignItems:'center',gap:12,flex:1}}>
                        <div style={{fontSize:24}}>
                          {doc.type.includes('pdf')?'📄':doc.type.includes('image')?'🖼️':'📎'}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{color:'#fff',fontWeight:700,fontSize:13}}>{doc.name}</div>
                          <div style={{color:'#64748b',fontSize:11}}>{sizeKB}KB · {dateStr}</div>
                        </div>
                      </div>
                      <div style={{textAlign:'center'}}>
                        <div style={{color:'#4ade80',fontSize:14,fontWeight:700}}>✅</div>
                        <div style={{color:'#64748b',fontSize:11}}>{isEN?'Sent':'Enviado'}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {uploadedDocs.length === 0 && (
            <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:20,textAlign:'center',color:'#94a3b8'}}>
              {isEN?'No documents uploaded yet':'Nenhum documento enviado ainda'}
            </div>
          )}
        </div>
      )}

      {/* ABA: SCORECARD */}
      {tab==='score' && (
      <>
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:20,marginBottom:18}}>
        <div style={{background:`linear-gradient(135deg,${sc.bg},rgba(0,0,0,0.5))`,border:`1px solid ${sc.border}50`,borderRadius:20,padding:20,display:'flex',alignItems:'center',gap:18}}>
          <Speedometer score={activeDriver.totalScore} size="lg" label="Score"/>
          <div style={{flex:1}}>
            <div style={{color:'#64748b',fontSize:11,marginBottom:2}}>{isEN?'My Scorecard':'Meu Scorecard'}</div>
            <div style={{color:'#fff',fontSize:19,fontWeight:800}}>{activeDriver.name}</div>
            <div style={{color:'#fbbf24',fontSize:13,fontWeight:600,marginTop:6,marginBottom:8}}>{MOTIVATIONAL_MESSAGES[lang][activeDriver.status]}</div>
            <span style={{background:sc.badge,color:'#fff',fontSize:11,padding:'3px 10px',borderRadius:6,fontWeight:700,display:'inline-block',marginTop:5}}>{activeDriver.status}</span>
            <div style={{color:'#64748b',fontSize:11,marginTop:5}}>🏆 Rank #{rank} de {depotDrivers.length} · {activeDriver.deliveries.toLocaleString()} entregas · <span style={{color:activeDriver.wowChange>=0?'#4ade80':'#f87171'}}>WoW {activeDriver.wowChange>0?'+':''}{activeDriver.wowChange}</span></div>
          </div>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:18,display:'flex',flexDirection:'column',gap:14}}>
          {/* Metas Personalizadas */}
          <div>
            <div style={{color:'#94a3b8',fontSize:11,marginBottom:6}}>🎯 {isEN?'Next Target':'Próxima Meta'}</div>
            <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:6}}>
              <div style={{color:'#fff',fontSize:14,fontWeight:800}}>{nextTarget.status}</div>
              <div style={{color:'#fbbf24',fontSize:12,fontWeight:600}}>{nextTarget.needed > 0 ? `Faltam ${nextTarget.needed.toFixed(2)} pontos` : '✅ Atingido'}</div>
            </div>
            <div style={{width:'100%',height:6,background:'rgba(255,255,255,0.1)',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${progressPercent}%`,background:`linear-gradient(90deg,#4ade80,#7dd3fc)`,transition:'width 0.3s'}}/>
            </div>
            <div style={{color:'#64748b',fontSize:10,marginTop:3}}>{progressPercent.toFixed(0)}% · {activeDriver.totalScore.toFixed(1)}/{nextTarget.target}</div>
          </div>

          {/* Comparação com Média */}
          <div>
            <div style={{color:'#94a3b8',fontSize:11,marginBottom:6}}>📊 {isEN?'vs Depot Average':'vs Média do Depósito'}</div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div>
                <div style={{color:'#fff',fontSize:12,fontWeight:700}}>Você: {activeDriver.totalScore.toFixed(1)}</div>
                <div style={{color:'#64748b',fontSize:11}}>Média: {depotAverage.toFixed(1)}</div>
              </div>
              <div style={{flex:1,textAlign:'right'}}>
                <div style={{color:diff>=0?'#4ade80':'#f87171',fontSize:13,fontWeight:700}}>{diff>0?'+':''}{diff.toFixed(1)}</div>
                <div style={{color:'#64748b',fontSize:10}}>{diff>=0?'acima':'abaixo'}</div>
              </div>
            </div>
          </div>

          <div style={{color:'#94a3b8',fontSize:11}}>{isEN?'Depot':'Depósito'}: {DEPOTS.find(d=>d.id===activeDriver.depot)?.label || 'DOX2'}</div>
        </div>
      </div>

      <div style={{marginBottom:18}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
          <div style={{color:'#94a3b8',fontSize:12,fontWeight:700}}>🏆 {isEN?'Top 5 This Week':'Top 5 da Semana'}</div>
          <div style={{color:'#fbbf24',fontSize:12,fontWeight:600}}>{DEPOTS.find(d=>d.id===activeDriver.depot)?.label || 'DOX2'}</div>
        </div>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,overflow:'hidden'}}>
          {(() => {
            const depotId = activeDriver.depot || 'dox2';
            const depotDrivers = BASE_DRIVERS.filter(d => d.depot === depotId);
            const top5 = depotDrivers.sort((a,b) => b.totalScore - a.totalScore).slice(0, 5);
            return (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <tbody>
                  {top5.map((d, i) => {
                    const isMe = d.id === activeDriver.id;
                    return (
                      <tr key={d.id} style={{borderBottom:i<top5.length-1?'1px solid rgba(255,255,255,0.05)':'none',background:isMe?'rgba(251,191,36,0.08)':'transparent'}}>
                        <td style={{padding:'10px 14px',color:'#fbbf24',fontWeight:700,fontSize:13,width:'40px'}}>#{i+1}</td>
                        <td style={{padding:'10px 14px',color:isMe?'#fbbf24':'#fff',fontWeight:isMe?700:600,fontSize:13}}>{isMe ? `${d.name} (Você)` : d.name}</td>
                        <td style={{padding:'10px 14px',textAlign:'right',color:STATUS_META[d.status]?.text || '#fde047',fontSize:12,fontWeight:600}}>{d.totalScore.toFixed(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })()}
        </div>
      </div>

      {badges.length > 0 && (
        <div style={{marginBottom:18}}>
          <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:10}}>🏆 {isEN?'Unlocked Achievements':'Conquistas Desbloqueadas'}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:10}}>
            {badges.map(b => {
              const rarityColors = {
                platinum: {bg:'rgba(168,85,247,0.15)',border:'rgba(168,85,247,0.3)'},
                gold: {bg:'rgba(251,146,60,0.15)',border:'rgba(251,146,60,0.3)'},
                silver: {bg:'rgba(99,179,237,0.15)',border:'rgba(99,179,237,0.3)'}
              };
              const colors = rarityColors[b.rarity] || rarityColors.gold;
              return (
                <div key={b.id} style={{background:`linear-gradient(135deg,${colors.bg},rgba(0,0,0,0.2))`,border:`1px solid ${colors.border}`,borderRadius:12,padding:14,textAlign:'center'}}>
                  <div style={{fontSize:28,marginBottom:6}}>{b.emoji}</div>
                  <div style={{color:'#fff',fontSize:12,fontWeight:700,marginBottom:4}}>{isEN?b.label:b.label_pt}</div>
                  <div style={{color:'#94a3b8',fontSize:10}}>{b.desc}</div>
                  <div style={{color:b.rarity==='platinum'?'#a855f7':b.rarity==='gold'?'#fb923c':'#63b3ed',fontSize:9,marginTop:6,fontWeight:600}}>{b.rarity.toUpperCase()}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{marginBottom:18}}>
        <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:10}}>📈 {isEN?'5-Week Trend':'Evolução 5 Semanas'}</div>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:16}}>
          <svg viewBox="0 0 300 120" style={{width:'100%',height:140}}>
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF9900" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            {(() => {
              const maxScore = 100;
              const minScore = 40;
              const range = maxScore - minScore;
              const points = scoreHistory.map((h, i) => {
                const x = (i / (scoreHistory.length - 1)) * 280 + 10;
                const y = 100 - ((h.score - minScore) / range) * 80;
                return { x, y, score: h.score, week: h.week };
              });
              const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
              const areaData = `M ${points[0].x} ${points[0].y} ${pathData.substring(1)} L ${points[points.length-1].x} 100 L ${points[0].x} 100 Z`;
              return (
                <>
                  <path d={areaData} fill="url(#scoreGrad)"/>
                  <path d={pathData} stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="3.5" fill="#FF9900" stroke="#0d1527" strokeWidth="1.5"/>
                      <text x={p.x} y={p.y-8} textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="700">{p.score.toFixed(0)}</text>
                      <text x={p.x} y={115} textAnchor="middle" fontSize="10" fill="#64748b">W{p.week}</text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:11,padding:4,marginBottom:16,gap:4}}>
        {[{k:'score',l:isEN?'📊 Score':'📊 Score'},{k:'tips',l:isEN?'💡 Tips':'💡 Dicas'}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:'8px 4px',background:tab===t.k?'linear-gradient(135deg,#FF9900,#FF6B35)':'none',border:'none',color:tab===t.k?'#fff':'#64748b',borderRadius:8,fontWeight:700,fontSize:12,cursor:'pointer'}}>{t.l}</button>
        ))}
      </div>
      {tab==='score' && (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div style={{color:'#64748b',fontSize:11,marginBottom:2}}>{isEN?'Tap a KPI to see details and tips 👆':'Toque num KPI para ver detalhes e dicas 👆'}</div>
          {metrics.map(m=><KpiCard key={m.l} label={m.l} value={m.v} ok={m.ok} target={m.target}/>)}

          <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{color:'#94a3b8',fontSize:12,fontWeight:700,marginBottom:10}}>💪 {isEN?'Strengths & Areas to Improve':'Pontos Fortes e Fracos'}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:12,padding:12}}>
                <div style={{color:'#4ade80',fontWeight:700,fontSize:12,marginBottom:8}}>✅ {isEN?'Strengths':'Pontos Fortes'}</div>
                {metrics.filter(m=>m.ok).length > 0 ? (
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    {metrics.filter(m=>m.ok).map(m => (
                      <div key={m.l} style={{color:'#cbd5e1',fontSize:12,padding:'4px 0'}}>
                        <div style={{color:'#4ade80',fontWeight:600}}>{m.l}</div>
                        <div style={{color:'#94a3b8',fontSize:11}}>{m.v} · {isEN?'On target':'No alvo'}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{color:'#94a3b8',fontSize:12}}>{isEN?'Keep improving':'Continue melhorando'}</div>
                )}
              </div>
              <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:12,padding:12}}>
                <div style={{color:'#f87171',fontWeight:700,fontSize:12,marginBottom:8}}>⚠️ {isEN?'Areas to Improve':'Áreas para Melhorar'}</div>
                {metrics.filter(m=>!m.ok).length > 0 ? (
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    {metrics.filter(m=>!m.ok).map(m => (
                      <div key={m.l} style={{color:'#cbd5e1',fontSize:12,padding:'4px 0'}}>
                        <div style={{color:'#f87171',fontWeight:600}}>{m.l}</div>
                        <div style={{color:'#94a3b8',fontSize:11}}>{m.v} · {isEN?'Target: '+m.target:'Meta: '+m.target}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{color:'#94a3b8',fontSize:12}}>{isEN?'All metrics on target!':'Todas as métricas no alvo!'}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {tab==='tips' && (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {(() => {
            const failingMetrics = metrics.filter(m => !m.ok);
            const personalizedTips = isEN ? {
              'DCR': 'You returned X packages this week. Focus on reattempts before returning to depot. Each return costs time and reduces your score.',
              'DSC DPMO': 'Take photos BEFORE marking as delivered in the app. This prevents photo-related defects.',
              'POD': 'Photo On Delivery is critical. Ensure every package is photographed clearly before confirming.',
              'CC': 'Customer Contact is key. Always call customers when required. You missed contact in some deliveries.',
              'LoR DPMO': 'Loss Rate is high. Handle packages carefully. Avoid misplacement and ensure proper scanning.',
              'CE': 'Critical errors detected. Double-check package info, addresses, and codes before attempting delivery.',
              'CDF DPMO': 'Customer delivery failures are up. Verify customer availability, contact them, and ensure successful delivery.'
            } : {
              'DCR': 'Você devolveu alguns pacotes esta semana. Foque em reattempts antes de voltar ao depósito. Cada devolução custa tempo.',
              'DSC DPMO': 'Tire a foto ANTES de marcar entregue no app. Isto previne defeitos relacionados a fotos.',
              'POD': 'Foto na Entrega é crítico. Garanta que cada pacote seja fotografado claramente antes de confirmar.',
              'CC': 'Contato com Cliente é chave. Sempre ligue para clientes quando necessário. Você perdeu contato em algumas entregas.',
              'LoR DPMO': 'Taxa de Perda é alta. Manuseie pacotes com cuidado. Evite deslocamentos e garanta scanning apropriado.',
              'CE': 'Erros críticos detectados. Verifique info do pacote, endereços e códigos antes de tentar entrega.',
              'CDF DPMO': 'Entregas com falha de cliente estão altas. Verifique disponibilidade, entre em contato e garanta entrega bem-sucedida.'
            };
            return failingMetrics.length > 0 ? (
              <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:12,padding:16}}>
                <div style={{color:'#f87171',fontWeight:700,marginBottom:12}}>⚠️ {isEN?'Areas to Improve':'Áreas para Melhorar'}</div>
                {failingMetrics.map(m => (
                  <div key={m.l} style={{background:'rgba(0,0,0,0.3)',borderRadius:8,padding:12,marginBottom:8,borderLeft:'3px solid #f87171'}}>
                    <div style={{color:'#f87171',fontWeight:700,fontSize:12,marginBottom:4}}>{m.l} (atual: {m.v})</div>
                    <p style={{color:'#cbd5e1',fontSize:13,margin:0,lineHeight:1.5}}>{personalizedTips[m.l] || 'Foque em melhorar esta métrica para atingir a próxima categoria.'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:12,padding:16}}>
                <div style={{color:'#4ade80',fontWeight:700,marginBottom:7}}>✅ {isEN?'All Metrics On Target!':'Todas as Métricas no Alvo!'}</div>
                <p style={{color:'#cbd5e1',fontSize:13,margin:0,lineHeight:1.6}}>{isEN?'Excellent work! Keep maintaining these high standards. You\'re performing at your best!':'Excelente trabalho! Continue mantendo estes altos padrões. Você está performando no seu melhor!'}</p>
              </div>
            );
          })()}
          <div style={{background:'rgba(255,153,0,0.07)',border:'1px solid rgba(255,153,0,0.2)',borderRadius:12,padding:16}}>
            <div style={{color:'#FF9900',fontWeight:700,marginBottom:7}}>💡 {isEN?'Tip of the Week':'Dica da Semana'}</div>
            <p style={{color:'#cbd5e1',fontSize:13,margin:0,lineHeight:1.6}}>{isEN?'Quality in every delivery is what separates Fantastic from the rest. A carefully delivered parcel today is a loyal customer tomorrow!':'Qualidade em cada entrega é o que separa os Fantastic dos demais. Um pacote entregue com cuidado hoje é um cliente fiel amanhã!'}</p>
          </div>
          <div style={{background:'rgba(99,179,237,0.05)',border:'1px solid rgba(99,179,237,0.18)',borderRadius:12,padding:16}}>
            <div style={{color:'#7dd3fc',fontWeight:700,marginBottom:9}}>📋 {isEN?'Daily Checklist':'Checklist Diário'}</div>
            {(isEN?['Check route before leaving','Photo on every delivery (POD)','Notify customer on arrival (CC)','Confirm code in app','Reattempt before returning to depot','Report anomalies immediately']:['Verificar rota antes de sair','Foto em cada entrega (POD)','Notificar cliente na chegada (CC)','Confirmar código no app','Reattempt antes de retornar ao depot','Reportar anomalias imediatamente']).map((item,i)=>(
              <div key={i} style={{color:'#94a3b8',fontSize:13,padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',display:'flex',alignItems:'center',gap:8}}>
                <span style={{color:'#4ade80'}}>▸</span>{item}
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// API KEY SETTINGS MODAL
// ══════════════════════════════════════════════════════════
function ApiKeyModal({ lang, onClose }) {
  const isEN = lang === 'en-UK';
  const [key, setKey] = useState(() => (typeof localStorage !== 'undefined' && localStorage.getItem('logiq-api-key')) || '');
  const [demoPwd, setDemoPwd] = useState(() => (typeof localStorage !== 'undefined' && localStorage.getItem('logiq-local-password')) || '');
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (typeof localStorage !== 'undefined') {
      if (key.trim()) localStorage.setItem('logiq-api-key', key.trim());
      else localStorage.removeItem('logiq-api-key');
      if (demoPwd.trim()) localStorage.setItem('logiq-local-password', demoPwd.trim());
      else localStorage.removeItem('logiq-local-password');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:500}} onClick={onClose}>
      <div style={{background:'#0d1527',border:'1px solid rgba(255,153,0,0.3)',borderRadius:20,width:'100%',maxWidth:460,padding:28}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h2 style={{color:'#fff',margin:0,fontSize:17,fontWeight:800}}>⚙️ {isEN?'API Key Settings':'Configuração API Key'}</h2>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:20}}>✕</button>
        </div>
        <div style={{background:'rgba(255,153,0,0.06)',border:'1px solid rgba(255,153,0,0.2)',borderRadius:12,padding:14,marginBottom:18}}>
          <div style={{color:'#fb923c',fontWeight:700,fontSize:12,marginBottom:6}}>ℹ️ {isEN?'Why do I need this?':'Por que preciso disso?'}</div>
          <div style={{color:'#94a3b8',fontSize:12,lineHeight:1.7}}>
            {isEN
              ? 'The API key is required for AI features: PDF analysis, action plans, and AI chat. Get yours at console.anthropic.com — the key is stored only in your browser.'
              : 'A API key é necessária para as funcionalidades de IA: análise de PDF, planos de ação e chat IA. Obtenha a sua em console.anthropic.com — a chave fica salva apenas no seu navegador.'}
          </div>
          <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{display:'inline-block',marginTop:12,color:'#fff',background:'rgba(255,153,0,0.18)',border:'1px solid rgba(255,153,0,0.25)',borderRadius:10,padding:'10px 14px',textDecoration:'none',fontWeight:700,fontSize:13}}>
            {isEN?'Open Anthropic Console':'Abrir console Anthropic'}
          </a>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{color:'#64748b',fontSize:11,fontWeight:700,display:'block',marginBottom:7}}>{isEN?'ANTHROPIC API KEY (optional)':'CHAVE API ANTHROPIC (opcional)'}</label>
          <input
            type="password"
            value={key}
            onChange={e=>{setKey(e.target.value);setSaved(false);}}
            placeholder="sk-ant-..."
            style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',borderRadius:10,padding:'11px 14px',fontSize:13,outline:'none',boxSizing:'border-box',fontFamily:'monospace'}}
          />
          {key && <div style={{color:'#4ade80',fontSize:11,marginTop:5}}>✓ {isEN?'Key entered':'Chave inserida'}</div>}
        </div>
        <div style={{marginBottom:18}}>
          <label style={{color:'#64748b',fontSize:11,fontWeight:700,display:'block',marginBottom:7}}>{isEN?'LOCAL DEMO PASSWORD':'SENHA LOCAL DE DEMO'}</label>
          <input
            type="password"
            value={demoPwd}
            onChange={e=>{setDemoPwd(e.target.value);setSaved(false);}}
            placeholder={isEN?'Use a private demo password':'Use uma senha local privada'}
            style={{width:'100%',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',borderRadius:10,padding:'11px 14px',fontSize:13,outline:'none',boxSizing:'border-box',fontFamily:'monospace'}}
          />
          {demoPwd && <div style={{color:'#4ade80',fontSize:11,marginTop:5}}>✓ {isEN?'Demo password saved':'Senha local salva'}</div>}
          {!key && !demoPwd && typeof localStorage !== 'undefined' && !localStorage.getItem('logiq-api-key') && !localStorage.getItem('logiq-local-password') && (
            <div style={{color:'#f87171',fontSize:11,marginTop:5}}>⚠ {isEN?'No key or demo password configured — action plan generation is disabled':'Nenhuma chave ou senha local configurada — geração de plano de ação desativada'}</div>
          )}
        </div>
        <div style={{display:'flex',gap:10,flexDirection:'column'}}>
          <div style={{display:'flex',gap:10}}>
            <button onClick={save} style={{flex:1,background:saved?'rgba(74,222,128,0.2)':'linear-gradient(135deg,#FF9900,#FF6B35)',border:saved?'1px solid rgba(74,222,128,0.4)':'none',color:saved?'#4ade80':'#fff',borderRadius:11,padding:'12px',fontWeight:800,cursor:'pointer',fontSize:14,transition:'all .3s'}}>
              {saved?(isEN?'✓ Saved!':'✓ Salvo!'):(isEN?'Save Key':'Salvar Chave')}
            </button>
            {key && <button onClick={()=>{setKey('');if(typeof localStorage!=='undefined')localStorage.removeItem('logiq-api-key');}} style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.25)',color:'#f87171',borderRadius:11,padding:'12px 18px',cursor:'pointer',fontWeight:700,fontSize:13}}>
              {isEN?'Clear':'Limpar'}
            </button>}
          </div>
          {saved && (
            <div style={{color:'#4ade80',fontSize:12,fontWeight:700,marginTop:8}}>
              {isEN?'API key saved successfully. You can now generate action plans.':'Chave API salva com sucesso. Você já pode gerar planos de ação.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MANAGER GREETING MODAL
// ══════════════════════════════════════════════════════════
function ManagerGreetingModal({ lang, onClose }) {
  const isEN = lang === 'en-UK';
  const messages = MANAGER_GREETING_MESSAGES[lang] || MANAGER_GREETING_MESSAGES['pt-BR'];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:300}} onClick={onClose}>
      <div style={{background:'linear-gradient(135deg,#0d1527,#1a2540)',border:'1px solid rgba(255,153,0,0.25)',borderRadius:20,width:'100%',maxWidth:440,padding:40,textAlign:'center',boxShadow:'0 20px 60px rgba(255,153,0,0.15)'}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:60,marginBottom:16}}>👋</div>
        <h2 style={{color:'#fff',margin:'0 0 12px',fontSize:24,fontWeight:900}}>
          {isEN?'Welcome Back!':'Bem-vindo de volta!'}
        </h2>
        <p style={{color:'#e2e8f0',fontSize:16,lineHeight:1.8,margin:'0 0 28px',fontWeight:700}}>
          {randomMessage}
        </p>
        <button
          onClick={onClose}
          style={{background:'linear-gradient(135deg,#FF9900,#FF6B35)',border:'none',color:'#fff',borderRadius:12,padding:'14px 32px',cursor:'pointer',fontWeight:800,fontSize:14,width:'100%',transition:'all .3s'}}
        >
          {isEN?'Let\'s Go!':'Vamos Lá!'}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════
export default function App() {
  const [session, setSession] = useState(null);
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [adminTab, setAdminTab] = useState('concessions');
  const [managerTab, setManagerTab] = useState('dashboard');
  const [lang, setLang] = useState(COMPANY_CONFIG.defaultLanguage || 'pt-BR');
  const [showSettings, setShowSettings] = useState(false);
  const [showManagerGreeting, setShowManagerGreeting] = useState(false);

  useEffect(() => {
    document.title = `${COMPANY_CONFIG.companyName} LogIQ — Logistics Dashboard`;
    if (COMPANY_CONFIG.favicon) {
      const link = document.querySelector('link[rel="icon"]') || document.createElement('link');
      link.rel = 'icon';
      link.href = COMPANY_CONFIG.favicon;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const listener = () => setShowSettings(true);
    window.addEventListener('openApiKeySettings', listener);
    return () => window.removeEventListener('openApiKeySettings', listener);
  }, []);

  // Show manager greeting on first login
  useEffect(() => {
    if (session?.role === 'manager' && !showManagerGreeting) {
      setShowManagerGreeting(true);
    }
  }, [session]);

  // Sincronizar com config.js sempre que mudar
  useEffect(()=>{
    setUsers(DEFAULT_USERS);
  },[]);

  const roleColor = { admin:'#a78bfa', manager:'#7dd3fc', driver:'#4ade80' };
  const roleIcon  = { admin:'🛡️', manager:'📊', driver:'🚚' };

  if (!session) return (
    <LangContext.Provider value={{lang, setLang}}>
      <LoginScreen onLogin={u=>setSession(u)} users={users}/>
    </LangContext.Provider>
  );

  const driver = session.role==='driver' ? BASE_DRIVERS.find(d=>d.id===session.driverId) : null;

  return (
    <LangContext.Provider value={{lang, setLang}}>
    <div style={{
      minHeight:'100vh',
      background:'radial-gradient(circle at top left, rgba(255, 153, 0, 0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.08), transparent 26%), linear-gradient(180deg,#050914 0%,#0b1525 100%)',
      fontFamily:"'DM Sans','Segoe UI',sans-serif",
      '--primary': COMPANY_CONFIG.colors.primary,
      '--secondary': COMPANY_CONFIG.colors.secondary,
      '--dark': COMPANY_CONFIG.colors.dark,
      '--text': COMPANY_CONFIG.colors.text,
      '--text-secondary': COMPANY_CONFIG.colors.textSecondary,
    }}>
      {/* Navbar */}
      <nav style={{background:'rgba(10,13,25,0.86)',backdropFilter:'blur(18px)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:120,boxShadow:'0 18px 50px rgba(0,0,0,0.18)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {COMPANY_CONFIG.logo ? (
            <img src={COMPANY_CONFIG.logo} alt={COMPANY_CONFIG.companyName} style={{width:34,height:34,borderRadius:9,objectFit:'contain'}}/>
          ) : (
            <div style={{width:34,height:34,background:`linear-gradient(135deg,${COMPANY_CONFIG.colors.primary},${COMPANY_CONFIG.colors.secondary})`,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#fff',fontSize:17,boxShadow:`0 0 14px ${COMPANY_CONFIG.colors.primary}40`}}>{COMPANY_CONFIG.companyName[0]}</div>
          )}
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:14}}>Amazon LogIQ</div>
            <div style={{color:'#475569',fontSize:10}}>{COMPANY_CONFIG.companyName} · {DEPOTS[1]?.label || 'Logistics'}</div>
          </div>
        </div>

        {/* Admin tabs */}
        {session.role==='admin' && (
          <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:10,padding:3,gap:3}}>
            {[{k:'concessions',l:'🗺️ Concessions'},{k:'admin',l:'🛡️ Admin'}].map(t=>(
              <button key={t.k} onClick={()=>setAdminTab(t.k)} style={{padding:'5px 14px',background:adminTab===t.k?'linear-gradient(135deg,#a78bfa,#7c3aed)':'none',border:'none',color:adminTab===t.k?'#fff':'#64748b',borderRadius:8,fontWeight:700,fontSize:12,cursor:'pointer',transition:'all .2s'}}>{t.l}</button>
            ))}
          </div>
        )}

        {/* Manager tabs */}
        {session.role==='manager' && (
          <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:10,padding:3,gap:3,flexWrap:'wrap'}}>
            {[{k:'dashboard',l:'📊 Scorecard'},{k:'van-inspections',l:'🚐 Inspeção'},{k:'documents',l:'📋 Docs'}].map(t=>(
              <button key={t.k} onClick={()=>setManagerTab(t.k)} style={{padding:'5px 14px',background:managerTab===t.k?'linear-gradient(135deg,#FF9900,#FF6B35)':'none',border:'none',color:managerTab===t.k?'#fff':'#64748b',borderRadius:8,fontWeight:700,fontSize:12,cursor:'pointer',transition:'all .2s'}}>{t.l}</button>
            ))}
          </div>
        )}

        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:7,background:`linear-gradient(135deg, ${roleColor[session.role]}22, rgba(255,255,255,0.06))`,border:`1px solid ${roleColor[session.role]}2a`,borderRadius:12,padding:'8px 14px',boxShadow:'0 12px 28px rgba(0,0,0,0.18)'}}>
            <span style={{fontSize:15}}>{roleIcon[session.role]}</span>
            <div>
              <div style={{color:'#fff',fontSize:13,fontWeight:800,lineHeight:1.2}}>{session.name}</div>
              <div style={{color:roleColor[session.role],fontSize:10,fontWeight:700,letterSpacing:0.2,textTransform:'uppercase'}}>{session.role.charAt(0).toUpperCase()+session.role.slice(1)}</div>
            </div>
          </div>
          {/* Language toggle */}
          <button onClick={()=>setLang(l=>l==='pt-BR'?'en-UK':'pt-BR')}
            style={{display:'flex',alignItems:'center',gap:5,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:10,padding:'7px 12px',cursor:'pointer',fontSize:12,fontWeight:700,color:'#e2e8f0',transition:'all .2s'}}
            title={lang==='pt-BR'?'Switch to English UK':'Mudar para Português BR'}>
            <span style={{fontSize:15}}>{lang==='pt-BR'?'🇧🇷':'🇬🇧'}</span>
            <span style={{fontSize:11,color:'#94a3b8'}}>{lang==='pt-BR'?'PT':'EN'}</span>
          </button>
          {/* API Key settings - Admin only */}
          {session.role === 'admin' && (
            <button onClick={()=>setShowSettings(true)} title={lang==='pt-BR'?'Configurar Chave API':'Configure API Key'}
              style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:10,padding:'7px 11px',cursor:'pointer',fontSize:15,lineHeight:1,color:'#fff',transition:'all .2s'}}>⚙️</button>
          )}
          <button onClick={()=>setSession(null)} style={{color:'#fff',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:10,padding:'7px 14px',cursor:'pointer',fontSize:12,fontWeight:700}}>{lang==='pt-BR'?'Sair':'Sign out'}</button>
        </div>
      </nav>

      {/* API Key Settings Modal */}
      {showSettings && <ApiKeyModal lang={lang} onClose={()=>setShowSettings(false)}/>}

      {/* Manager Greeting Modal */}
      {showManagerGreeting && <ManagerGreetingModal lang={lang} onClose={()=>setShowManagerGreeting(false)}/>}

      {/* Content */}
      {session.role==='driver'
        ? <DriverView driver={driver}/>
        : session.role==='admin'
          ? (adminTab==='admin' ? <AdminPanel users={users} setUsers={setUsers} currentUser={session}/> : <ConcessionModule/>)
          : <ManagerDashboard currentUser={session} isAdmin={session.role==='admin'}/>
      }
    </div>
    </LangContext.Provider>
  );
}