# 🚀 Deploy Checklist

Siga este checklist antes de fazer deploy para produção.

---

## ✅ Pré-Deploy (Local)

- [ ] Todas as mudanças commitadas
- [ ] Branch `dev` está atualizada: `git pull origin dev`
- [ ] Dependências instaladas: `npm install`
- [ ] Build local funciona: `npm run build`
- [ ] Preview funciona: `npm run preview`
- [ ] Sem erros no console (DevTools)

---

## 🧪 Testes

- [ ] Testou como **Driver** (email: driver@h2ol.com)
  - [ ] Scorecard carrega
  - [ ] Achievements aparecem
  - [ ] Van inspection funciona
  - [ ] Document upload funciona

- [ ] Testou como **Manager** (email: manager@h2ol.com)
  - [ ] Depot selector funciona
  - [ ] Drivers carregam
  - [ ] PDF/CSV upload funciona
  - [ ] Action plans funcionam

- [ ] Testou como **Admin** (email: admin@h2ol.com)
  - [ ] Todas features acima
  - [ ] Admin dashboard funciona

- [ ] **Bilíngue**
  - [ ] pt-BR: Clique no ícone de idioma e teste
  - [ ] en-UK: Todas labels aparecem em inglês

---

## 🔒 Segurança

- [ ] Nenhuma senha/token hardcoded
- [ ] Nenhum console.log() visível
- [ ] localStorage keys namespaceados (`logiq-*`)
- [ ] Validação de inputs
- [ ] Nenhuma query string suspeita

---

## 📝 Código

- [ ] Commits com mensagens descritivas
- [ ] Sem dead code ou comentários desnecessários
- [ ] Formatação consistente
- [ ] Sem duplicação de lógica

---

## 🔄 Git (Branching)

```bash
# 1. Merge em staging
git checkout staging
git pull origin staging
git merge dev
git push origin staging

# 2. Aguarde testes em: https://amazon-logiq-staging.vercel.app

# 3. Merge em main (deployment automático)
git checkout main
git pull origin main
git merge staging
git push origin main

# ✅ Vercel faz deploy automático em ~5 minutos
```

---

## 📊 Pós-Deploy

- [ ] Acesse: https://amazon-logiq.vercel.app
- [ ] Teste login com credenciais de teste
- [ ] Verifique se features funcionam
- [ ] Verifique performance (Network tab)
- [ ] Teste em mobile

---

## 🚨 Se Houver Erro em Produção

```bash
# 1. Verifique logs
vercel logs https://amazon-logiq.vercel.app

# 2. Se crítico, faça rollback
git revert HEAD
git push origin main

# 3. Abra issue no GitHub com erro
```

---

## 📞 Deployment Status

- **Main (Prod)**: https://amazon-logiq.vercel.app
- **Staging**: https://amazon-logiq-staging.vercel.app
- **Dashboard**: https://vercel.com/amazonlogiq/amazon-logiq

---

**Última atualização**: 14/06/2026
