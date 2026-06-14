# Guia de Contribuição

## 🎯 Como Contribuir ao Amazon LogIQ

Obrigado por querer contribuir! Siga este guia para garantir qualidade e consistência.

---

## 📋 Processo de Contribuição

### 1. Faça Fork ou Clone
```bash
git clone https://github.com/phillipedantas87/amazon-logiq.git
cd amazon-logiq
```

### 2. Crie uma Branch Feature
```bash
git checkout -b feature/sua-feature
# ou para bugs:
git checkout -b fix/seu-bug
```

### 3. Desenvolva sua Feature
- Faça commits frequentes com mensagens claras
- Teste localmente (`npm run dev`)
- Mantenha bilíngue (pt-BR / en-UK)

### 4. Push e PR
```bash
git push origin feature/sua-feature
```
Depois abra um **Pull Request** no GitHub.

---

## ✅ Checklist de PR

Antes de enviar, verifique:

- [ ] Feature funciona localmente
- [ ] Sem breaking changes
- [ ] Código testado em pt-BR e en-UK
- [ ] Sem console.log() ou debugger
- [ ] localStorage keys com prefixo `logiq-`
- [ ] Commits com mensagens descritivas

---

## 🏷️ Tipos de Commit

```
feat:      Nova funcionalidade
fix:       Correção de bug
docs:      Documentação
refactor:  Reorganização de código
test:      Testes
chore:     Manutenção, deps
perf:      Performance
```

Exemplo:
```bash
git commit -m "feat: adiciona filtro por época do ano"
```

---

## 🚫 Não Permitido

❌ Hardcoded passwords/tokens  
❌ console.log() em produção  
❌ Mudanças no Vercel sem PR  
❌ Commits diretos em main/staging  
❌ Ignorar bilíngue (sempre pt-BR + en-UK)  

---

## 🔍 Code Style

- Indentação: 2 espaços
- Quotes: Single quotes `'`
- Semicolons: Sim `;`
- Var naming: camelCase

```javascript
// ✅ Bom
const driverScore = 95;
const { user } = session;

// ❌ Ruim
const driver_score = 95;
let driverScore = 95;
```

---

## 📞 Dúvidas?

Abra uma **Issue** no GitHub com a tag `question`.

---

**Obrigado por contribuir!** 🚀
