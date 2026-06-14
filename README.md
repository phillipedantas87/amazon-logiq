# 📊 Amazon LogIQ

**Driver Performance Dashboard para Amazon DSP (Delivery Service Partners)**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square)](https://amazon-logiq.vercel.app)
[![GitHub](https://img.shields.io/badge/Source-GitHub-blue?style=flat-square)](https://github.com/phillipedantas87/amazon-logiq)
[![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square)](https://vitejs.dev)

---

## 🎯 Sobre

Amazon LogIQ é uma plataforma web que permite drivers e gerentes acompanharem performance em tempo real.

**Features:**
- 📈 Dashboard de performance com métricas (DCR, POD, CC, etc)
- 🏆 Sistema de achievements/conquistas desbloqueáveis
- 🚗 Checklist de inspeção de vans
- 📄 Upload de documentos (fotos, PDFs)
- 👥 View multi-depósito
- 📊 Comparação com média do depósito
- 🌐 Bilíngue: Português + Inglês

---

## 🚀 Deploy Atual

```
🌍 Production: https://amazon-logiq.vercel.app
📊 Status: https://vercel.com/amazonlogiq/amazon-logiq
```

---

## 🔐 Credenciais de Teste

| Papel | Email | Senha |
|-------|-------|-------|
| 👨‍💼 Driver | `driver@h2ol.com` | `driver123` |
| 👔 Manager | `manager@h2ol.com` | `manager123` |
| 🛡️ Admin | `admin@h2ol.com` | `admin123` |

---

## ⚡ Quick Start

```bash
# Clone
git clone https://github.com/phillipedantas87/amazon-logiq.git
cd amazon-logiq

# Install
npm install

# Dev server
npm run dev
# → http://localhost:5175

# Build
npm run build

# Preview
npm run preview
```

---

## 📁 Estrutura

```
├── AmazonLogIQ_v3 (1) (1).jsx  ← App principal
├── config.js                    ← Config por empresa
├── main.jsx                     ← Entry point
├── style.css
├── package.json
├── index.html
├── vercel.json                  ← Config Vercel
├── CLAUDE.md                    ← Dev guide
├── CONTRIBUTING.md              ← Como contribuir
└── public/logos/                ← Logos customizadas
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS-in-JS (inline)
- **Hosting**: Vercel
- **Version Control**: Git + GitHub
- **Language**: JavaScript (JSX)

---

## 📖 Documentação

- [CLAUDE.md](./CLAUDE.md) - Guia de desenvolvimento
- [CONTRIBUTING.md](./.github/CONTRIBUTING.md) - Como contribuir
- [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) - Deploy checklist

---

## 🔄 Git Workflow

```
feature/... → dev → staging → main (auto-deploy)
```

Leia [CLAUDE.md](./CLAUDE.md) para detalhes.

---

## 📊 Métricas Monitorizadas

- **DCR** (Delivery Completion Rate)
- **POD** (Proof of Delivery)
- **CC** (Customer Contact)
- **DSC** (Delivery Quality)
- **Score Geral** (0-100)

---

## 🏆 Sistema de Achievements

7 conquistas desbloqueáveis:

1. 🚚 **Delivery Master** - DCR ≥ 99%
2. 📸 **Photo Perfect** - POD = 100%
3. 📞 **Customer Hero** - CC ≥ 99%
4. 🎯 **Quality Champion** - DSC DPMO ≤ 900
5. ⭐ **Fantastic Performer** - Score ≥ 95
6. 📈 **Rising Star** - Melhoria ≥ 5 pontos
7. 🎖️ **Consistency King** - Sem falhas

---

## 🌐 Multi-Idioma

Suporta:
- 🇧🇷 Português (pt-BR)
- 🇬🇧 Inglês (en-UK)

Adicione mais no contexto `useLang`.

---

## 🔐 Segurança

⚠️ **Status Atual**: Proof-of-concept  
❌ Não use credenciais reais  
❌ Dados armazenados em localStorage (não persistem)

**Roadmap:**
- [ ] Autenticação com Supabase
- [ ] Banco de dados PostgreSQL
- [ ] Validação de senhas
- [ ] Tokens JWT

---

## 🐛 Issues & Bugs

Encontrou um bug? [Abra uma issue](https://github.com/phillipedantas87/amazon-logiq/issues)

---

## 📝 License

**Proprietário** - H2OL Logistics

---

## 👤 Autor

**Phillipe Dantas**
- 📧 [phillipedantas87@gmail.com](mailto:phillipedantas87@gmail.com)
- 🐙 [@phillipedantas87](https://github.com/phillipedantas87)

---

## 🙏 Agradecimentos

- Amazon DSP partners
- Equipe H2OL
- Comunidade React/Vite

---

**Última atualização**: 14/06/2026 | [Vercel Deployment](https://amazon-logiq.vercel.app)
