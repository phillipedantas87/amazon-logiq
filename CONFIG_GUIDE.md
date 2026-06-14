# 📋 Guia de Configuração por Empresa

## O que fazer quando uma nova empresa chegar

### 1. **Clonar o Projeto**
```bash
git clone <seu-repositorio> amazon-logiq-nova-empresa
cd amazon-logiq-nova-empresa
npm install
```

### 2. **Editar `config.js`**

Abra o arquivo `config.js` e customize:

```javascript
export const COMPANY_CONFIG = {
  // 🏢 NOME E LOGO
  companyName: 'SUA_EMPRESA',           // ex: 'ABC Logistics'
  companySubtitle: 'Amazon DSP ...',    // Descrição
  logo: '/logos/sua-empresa-logo.png',  // Coloque logo em public/logos/
  favicon: '/logos/sua-empresa-icon.ico',

  // 🎨 CORES
  colors: {
    primary: '#FF9900',      // Cor principal (botões, etc)
    secondary: '#FF6B35',    // Cor secundária (gradientes)
    dark: '#0d1527',         // Fundo escuro
    text: '#fff',            // Texto
    textSecondary: '#94a3b8', // Texto secundário
  },

  // 🏭 DEPÓSITOS (estrutura da empresa)
  depots: [
    { id: 'deposito-1', label: 'Depósito 1', country: 'BR' },
    { id: 'deposito-2', label: 'Depósito 2', country: 'BR' },
    // Adicione mais depósitos conforme necessário
  ],

  // 👤 USUÁRIOS (login da empresa)
  defaultUsers: [
    {
      id: 'admin-1',
      email: 'admin@suaempresa.com',
      password: 'senha123',  // ALTERE!
      role: 'admin',
      name: 'Admin da Empresa',
      depot: null,
    },
    {
      id: 'manager-1',
      email: 'manager@suaempresa.com',
      password: 'senha456',  // ALTERE!
      role: 'manager',
      name: 'Manager da Empresa',
      depot: null,
    },
  ],

  // 🌍 IDIOMA PADRÃO
  defaultLanguage: 'pt-BR', // ou 'en-UK'

  // 🔑 FEATURES
  features: {
    pdfUpload: true,
    csvImport: true,
    actionPlans: true,
    aiChat: true,
  },
};
```

### 3. **Adicionar Logos**

1. Crie pasta: `public/logos/`
2. Copie:
   - `sua-empresa-logo.png` (34x34px recomendado)
   - `sua-empresa-icon.ico` (favicon)

### 4. **Testar Localmente**
```bash
npm run dev
```

Acesse `http://localhost:5173` e teste com os usuários do config.js

### 5. **Deploy**

#### Opção A: Vercel (Recomendado)
```bash
vercel
# Responda as perguntas
# Deploy automático em vercel.app
```

#### Opção B: Seu Servidor
```bash
npm run build
# Copie pasta 'dist/' para seu servidor
```

---

## 📌 Dicas Importantes

### **Cores da Marca**
- **primary**: Use a cor principal da marca (botões, highlights)
- **secondary**: Use cor complementar (gradientes)
- **Ferramenta**: [coolors.co](https://coolors.co) para escolher cores

### **Depósitos**
- Customize conforme estrutura da empresa
- IDs devem ser **únicos e em minúsculas**
- Exemplo: `id: 'sao-paulo'`, não `id: 'São Paulo'`

### **Usuários Iniciais**
- **Admin**: Acesso total, pode fazer upload de PDFs
- **Manager**: Vê dados, seleciona depósitos
- **Driver**: Acesso limitado aos seus dados
- **ALTERE SENHAS!** Não deixe padrão em produção

### **Imagens**
- Coloque logos em `public/logos/`
- Resolução mínima: 34x34px para navbar
- Formato: PNG (melhor transparência) ou SVG

### **Domínios**
Se vai usar subdomínios:
```
empresa-a.logiq.io
empresa-b.logiq.io
empresa-c.logiq.io
```

Cada domínio = localStorage isolado ✅

---

## 🔧 Troubleshooting

| Problema | Solução |
|----------|---------|
| Logo não aparece | Verifique caminho em `public/logos/` |
| Cores não mudaram | Reinicie dev server (`Ctrl+C` depois `npm run dev`) |
| Usuários não funcionam | Verifique `config.defaultUsers` tem `email`, `password`, `role` |
| Idioma errado | Mude `defaultLanguage` em config.js |

---

## 📱 Próximas Empresas

Quando a **Empresa 2** chegar:

```bash
# Clonar novo projeto
git clone <seu-repositorio> amazon-logiq-empresa-2

# Editar APENAS config.js com dados da Empresa 2
# Mudar nome, logo, cores, depósitos, usuários

# Deploy em novo domínio
vercel # ou seu servidor
```

**Pronto!** Cada empresa tem seu próprio app isolado ✅

---

## 🚀 Suporta Múltiplas Empresas?

**SIM!** Você pode ter:
- ✅ Múltiplas instâncias (cópias do projeto)
- ✅ Cada uma com seu `config.js`
- ✅ Cada uma em seu próprio domínio
- ✅ Zero conflito de dados
- ✅ Um código base para manutenção

Escalável para 10+, 50+, 100+ empresas!
