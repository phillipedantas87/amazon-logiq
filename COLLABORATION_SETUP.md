# 🤝 Estrutura de Colaboração - Amazon LogIQ

**Data**: 14/06/2026  
**Status**: ✅ Pronto para colaboração em equipe

---

## ✅ O Que Foi Configurado

### 1. **GitHub Repository**
```
✅ Repositório criado: https://github.com/phillipedantas87/amazon-logiq
✅ Código inicial enviado
✅ Branches criadas (main, staging, dev)
```

### 2. **Vercel Deployment**
```
✅ Deploy em produção: https://amazon-logiq.vercel.app
✅ Auto-deploy no push para main
✅ Alias configurado
```

### 3. **Git & Workflow**
```
✅ Git local inicializado
✅ Remoto configurado (GitHub)
✅ Branch strategy implementada
```

### 4. **Documentação Completa**
```
✅ CLAUDE.md - Guia de desenvolvimento
✅ README.md - Visão geral do projeto
✅ CONTRIBUTING.md - Como contribuir
✅ DEPLOY_CHECKLIST.md - Pré-requisitos de deploy
✅ .gitignore - Proteção de arquivos sensíveis
```

---

## 🌿 Branch Strategy (IMPORTANTE!)

```
main (Produção)
  ↓ (Deploy automático no Vercel)
  ✅ Stable, production-ready

staging (Testes)
  ↓ (Testa antes de ir para main)
  🧪 Para testar antes de produção

dev (Desenvolvimento)
  ↓ (PRs de features aqui)
  🔧 Integração contínua

feature/minha-feature
  ↓ (Sua branch local)
  👤 Isolamento de features
```

---

## 🚀 Como Trabalhar em Equipe

### **Cenário 1: Você quer adicionar uma feature**

```bash
# 1. Começar do dev (mais recente)
git checkout dev
git pull origin dev

# 2. Criar sua branch
git checkout -b feature/adiciona-login-email
# ou
git checkout -b fix/corrige-scorecard
# ou
git checkout -b docs/atualiza-readme

# 3. Trabalhar
# ... edita arquivos ...
# ... testa localmente: npm run dev ...

# 4. Commitar
git add .
git commit -m "feat: adiciona autenticação por email"

# 5. Push
git push origin feature/adiciona-login-email

# 6. Abrir PR no GitHub
# GitHub vai sugerir "Create Pull Request"
# - Selecione: branch base = dev
# - Selecione: branch comparar = seu branch

# 7. Esperar review + merge
# Depois de aprovado, seu código vai para dev → staging → main
```

---

## 📋 Checklist para PRs

Antes de abrir Pull Request, verifique:

```markdown
## Descrição
Explique o quê você mudou e por quê.

## Tipo de Mudança
- [ ] Nova feature
- [ ] Bug fix
- [ ] Documentação
- [ ] Refatoração

## Checklist
- [ ] Testei localmente (npm run dev)
- [ ] Sem console.log() ou debugger
- [ ] Bilíngue (pt-BR e en-UK)
- [ ] Sem breaking changes
- [ ] localStorage prefixado (logiq-*)
- [ ] Commits com boas mensagens

## Screenshots (se aplicável)
Adicione screenshots de mudanças visuais.
```

---

## 🔒 Proteção de Secrets

**NUNCA commitar:**
```javascript
❌ .env files
❌ Passwords
❌ API keys
❌ Tokens
❌ credenciais reais
```

**Use:**
```bash
# Adicione ao .gitignore (já feito)
.env
.env.local
.env.production.local
```

---

## 📊 Pipeline de Deployment

```
git push origin feature/...
        ↓
GitHub Pull Request (PR)
        ↓
Code Review (você + equipe)
        ↓
✅ Approved → Merge em dev
        ↓
git checkout staging
git merge dev
        ↓
🧪 Testes em https://amazon-logiq-staging.vercel.app
        ↓
✅ Tudo ok → Merge em main
        ↓
git push origin main
        ↓
Vercel auto-deploya em 5 min
        ↓
🚀 https://amazon-logiq.vercel.app
```

---

## 🐛 Troubleshooting

### Erro: "merge conflict"
```bash
# 1. Atualizar seu branch
git fetch origin
git merge origin/dev

# 2. Resolver conflitos
# - Abra os arquivos com <<<<<<<<<
# - Escolha qual versão manter
# - Delete os marcadores

# 3. Commitar
git add .
git commit -m "fix: resolve merge conflict"
git push origin seu-branch
```

### Erro: "Your branch is ahead by X commits"
```bash
# Significa que seu branch local tem mais que o remoto
# Simplesmente faça push:
git push origin seu-branch
```

### Erro: "Port 5175 already in use"
```bash
# Use outra porta:
npm run dev -- --port 5176
```

---

## 📞 Links Importantes

| Recurso | Link |
|---------|------|
| **App Produção** | https://amazon-logiq.vercel.app |
| **Repositório** | https://github.com/phillipedantas87/amazon-logiq |
| **Issues** | https://github.com/phillipedantas87/amazon-logiq/issues |
| **Pull Requests** | https://github.com/phillipedantas87/amazon-logiq/pulls |
| **Vercel Dashboard** | https://vercel.com/amazonlogiq/amazon-logiq |

---

## 🎯 Próximas Etapas

### **Curto Prazo** (1-2 sprints)
- [ ] Criar logins individuais para drivers (100+)
- [ ] Integrar autenticação real (Supabase/Firebase)
- [ ] Migrar de localStorage para banco de dados

### **Médio Prazo** (3-4 sprints)
- [ ] Refatorar arquivo principal em componentes
- [ ] Adicionar testes unitários
- [ ] Implementar CI/CD (GitHub Actions)
- [ ] Adicionar analytics

### **Longo Prazo**
- [ ] Mobile app (React Native)
- [ ] Notificações push
- [ ] WebSocket real-time
- [ ] Machine learning para predições

---

## 👥 Colaboradores

- **Phillipe Dantas** (@phillipedantas87) - Lead dev
- Você? Abra uma PR! 🚀

---

## 📝 Formato de Commits

```
feat: adiciona nova funcionalidade X
fix: corrige bug em Y
docs: atualiza README com Z
refactor: reorganiza código em W
test: adiciona testes para V
chore: atualiza dependências
perf: otimiza performance de U
```

Exemplo ruim:
```
❌ git commit -m "mudanças"
❌ git commit -m "fix tudo"
```

Exemplo bom:
```
✅ git commit -m "feat: adiciona achievement system com 7 badges"
✅ git commit -m "fix: corrige layout de metrics no mobile"
```

---

## 🔐 Segurança Final

Antes de cada commit, pergunte-se:
- [ ] Tenho password aqui? 🔒
- [ ] Tenho token/API key? 🔑
- [ ] Tenho dados sensíveis? 📧
- [ ] Tenho arquivo .env? ⚠️

Se SIM em qualquer um → **NÃO commitar!**

---

## 💡 Dicas

1. **Commits frequentes** são melhor que commits grandes
2. **PRs pequenas** são mais fáceis de revisar
3. **Mensagens claras** ajudam todo mundo
4. **Testes locais** evitam surpresas
5. **Documentação atualizada** economiza tempo

---

## 📞 Dúvidas?

Abra uma **Issue** no GitHub com tag `question` ou `help-wanted`.

---

**Pronto para colaborar! 🚀**

**Última atualização**: 14/06/2026
