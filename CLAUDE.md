# Amazon LogIQ - Guia de Desenvolvimento

## 🎯 Visão Geral

**Amazon LogIQ** é um dashboard de performance para drivers de DSP (Amazon Delivery Service Partners).

- 🌍 **Deploy**: https://amazon-logiq.vercel.app
- 📦 **Repositório**: https://github.com/phillipedantas87/amazon-logiq
- 👥 **Tech Stack**: React 18 + Vite + Supabase (future)
- 🌐 **Bilíngue**: Português (pt-BR) e Inglês (en-UK)

---

## 🚀 Setup Inicial

```bash
# 1. Clone o repositório
git clone https://github.com/phillipedantas87/amazon-logiq.git
cd amazon-logiq

# 2. Instale dependências
npm install

# 3. Inicie o servidor de dev
npm run dev

# 4. Abra no navegador
http://localhost:5175
```

---

## 🔐 Credenciais de Teste

| Papel | Email | Senha |
|-------|-------|-------|
| Driver | `driver@h2ol.com` | `driver123` |
| Manager | `manager@h2ol.com` | `manager123` |
| Admin | `admin@h2ol.com` | `admin123` |

---

## 📋 Estrutura do Projeto

```
amazon-logiq/
├── AmazonLogIQ_v3 (1) (1).jsx  ← Arquivo principal (TODO: refatorar em componentes)
├── config.js                    ← Configuração da empresa
├── package.json
├── index.html
├── main.jsx
├── style.css
├── public/logos/               ← Logos customizadas por empresa
├── dist/                       ← Build production
└── vercel.json                 ← Config de deploy
```

---

## 🌿 Git Workflow (IMPORTANTE!)

### Branch Strategy

```
main (Production - Deploy automático)
  ↑
staging (Testes - Deploy manual)
  ↑
dev (Desenvolvimento - Pull requests aqui)
  ↑
feature/... (Sua feature branch)
```

### Como Contribuir

1. **Crie uma branch feature a partir de `dev`**:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/minha-feature
```

2. **Trabalhe na sua branch**:
```bash
# Faça suas mudanças
git add .
git commit -m "feat: descrição clara da mudança"
git push origin feature/minha-feature
```

3. **Abra um Pull Request (PR) para `dev`**:
- Título: `[FEATURE/BUG/FIX] descrição`
- Descrição: Explique o quê e por quê
- Checklist:
  - [ ] Testei localmente
  - [ ] Não quebrei features existentes
  - [ ] Atualizei config.js se necessário
  - [ ] Testei em pt-BR e en-UK

4. **Após aprovação**:
```bash
# Seu PR será mergeado
git checkout dev
git pull origin dev
git checkout staging
git merge dev
git push origin staging
```

5. **Deploy para produção** (only after testing on staging):
```bash
git checkout main
git merge staging
git push origin main
# Vercel faz deploy automático
```

---

## ✅ Commit Message Format

```
feat: adiciona novo componente X
fix: corrige bug em Y
docs: atualiza README
refactor: reorganiza código em Z
test: adiciona testes para X
chore: atualiza dependências
```

---

## 🧪 Checklist Antes de Push

- [ ] Testes passando (se houver)
- [ ] Sem console.log() em produção
- [ ] Sem hardcoded credentials
- [ ] Code formatado (consistente com projeto)
- [ ] Bilíngue: pt-BR e en-UK funcionam
- [ ] Suporta depot selector
- [ ] localStorage keys namespaceados (`logiq-*`)

---

## 📁 Áreas Principais

### `App Component` (~line 4441)
- Routing principal (admin/manager/driver)
- Session management
- Language context

### `ManagerDashboard` (~line 1813)
- Visualização de drivers
- PDF/CSV upload
- Depot selector
- Action plans

### `DriverView` (~line 3910)
- Scorecard pessoal
- Achievements system
- Van inspection
- Document upload

### `computeBadges` (~line 3891)
- Converte achievements em badges
- Mostra 3 achievements desbloqueados

---

## 🔄 Deployment Pipeline

```
git push origin feature/...
  ↓
Pull Request para dev
  ↓
Code review + testes
  ↓
Merge em dev
  ↓
Merge em staging (testa em staging branch do Vercel)
  ↓
Merge em main
  ↓
Vercel auto-deploy (5 min)
  ↓
https://amazon-logiq.vercel.app 🚀
```

---

## 🐛 Debugging

### Console no Dev
```bash
npm run dev
# Abra DevTools: F12
# Console, Network, React DevTools
```

### Build Localmente
```bash
npm run build
npm run preview
# Testa o build real em http://localhost:5174
```

---

## 📚 Tecnologias

| Tech | Uso | Versão |
|------|-----|--------|
| React | UI | 18.2.0 |
| Vite | Build tool | 5.0.0 |
| Vercel | Hosting | - |
| GitHub | Versionamento | - |
| Supabase | DB (future) | - |

---

## ❌ Erros Comuns

| Erro | Solução |
|------|---------|
| `Cannot find module 'config.js'` | Cheque se config.js está na raiz |
| `isEN not defined` | Use `isEN` somente dentro de componentes, não fora |
| `localStorage undefined` | Verifique se está em componente (não em server) |
| `Port 5175 em uso` | `lsof -i :5175` e kill, ou use `npm run dev -- --port 5176` |
| Mudanças não aparecem | `Ctrl+Shift+R` (clear cache) ou `npm run build && npm run preview` |

---

## 📞 Contato

- 📧 Email: phillipedantas87@gmail.com
- 🐙 GitHub: @phillipedantas87

---

## 📝 License

Proprietário - H2OL Logistics

---

**Última atualização**: 14/06/2026
