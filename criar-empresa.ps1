# ═══════════════════════════════════════════════════════════
# criar-empresa.ps1
# SCRIPT PARA CRIAR NOVA EMPRESA COM UM COMANDO
# ═══════════════════════════════════════════════════════════

param(
    [string]$nomeEmpresa = "",
    [string]$corPrimaria = "#0066CC",
    [string]$corSecundaria = "#003366",
    [string]$slugEmpresa = ""
)

# Validação
if ([string]::IsNullOrWhiteSpace($nomeEmpresa)) {
    Write-Host "❌ Uso: .\criar-empresa.ps1 'Nome da Empresa' '#COR1' '#COR2'" -ForegroundColor Red
    Write-Host ""
    Write-Host "Exemplo:" -ForegroundColor Yellow
    Write-Host "  .\criar-empresa.ps1 'ABC Corp' '#0066CC' '#003366'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Cores: use https://coolors.co" -ForegroundColor Gray
    exit 1
}

# Gerar slug a partir do nome (ex: "ABC Corp" → "abc-corp")
if ([string]::IsNullOrWhiteSpace($slugEmpresa)) {
    $slugEmpresa = $nomeEmpresa.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
}

$pastaOrigem = "amazon-logiq-h2ol"
$pastaNova = "amazon-logiq-$slugEmpresa"

Write-Host ""
Write-Host "🚀 CRIANDO NOVA EMPRESA" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "📝 Nome: $nomeEmpresa" -ForegroundColor Cyan
Write-Host "🎨 Cor Primária: $corPrimaria" -ForegroundColor Cyan
Write-Host "🎨 Cor Secundária: $corSecundaria" -ForegroundColor Cyan
Write-Host "📁 Pasta: $pastaNova" -ForegroundColor Cyan
Write-Host ""

# Verificar se pasta já existe
if (Test-Path $pastaNova) {
    Write-Host "❌ Pasta $pastaNova já existe!" -ForegroundColor Red
    exit 1
}

# Verificar se pasta template existe
if (!(Test-Path $pastaOrigem)) {
    Write-Host "❌ Pasta template ($pastaOrigem) não encontrada!" -ForegroundColor Red
    exit 1
}

# Passo 1: Copiar pasta
Write-Host "📂 Copiando projeto template..." -ForegroundColor Yellow
Copy-Item -Path $pastaOrigem -Destination $pastaNova -Recurse
Write-Host "   ✅ Pasta criada: $pastaNova" -ForegroundColor Green

# Passo 2: Editar config.js
Write-Host "🔧 Editando config.js..." -ForegroundColor Yellow

$configPath = "$pastaNova\config.js"
if (Test-Path $configPath) {
    $configContent = Get-Content $configPath -Raw

    # Substituir valores
    $configContent = $configContent -replace "companyName: 'H2OL'", "companyName: '$nomeEmpresa'"
    $configContent = $configContent -replace "primary: '#FF9900'", "primary: '$corPrimaria'"
    $configContent = $configContent -replace "secondary: '#FF6B35'", "secondary: '$corSecundaria'"
    $configContent = $configContent -replace "logo: '/logos/h2ol-logo.png'", "logo: '/logos/$slugEmpresa-logo.png'"
    $configContent = $configContent -replace "favicon: '/logos/h2ol-favicon.ico'", "favicon: '/logos/$slugEmpresa-favicon.ico'"
    $configContent = $configContent -replace "'admin@h2ol.com'", "'admin@$slugEmpresa.com'"
    $configContent = $configContent -replace "'manager@h2ol.com'", "'manager@$slugEmpresa.com'"
    $configContent = $configContent -replace "'driver@h2ol.com'", "'driver@$slugEmpresa.com'"
    $configContent = $configContent -replace "name: 'Admin H2OL'", "name: 'Admin $nomeEmpresa'"
    $configContent = $configContent -replace "name: 'Manager H2OL'", "name: 'Manager $nomeEmpresa'"

    Set-Content -Path $configPath -Value $configContent -Encoding UTF8
    Write-Host "   ✅ config.js atualizado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  config.js não encontrado" -ForegroundColor Yellow
}

# Passo 3: Criar pasta de logos
Write-Host "📁 Criando pasta de logos..." -ForegroundColor Yellow
$logosPath = "$pastaNova\public\logos"
if (!(Test-Path $logosPath)) {
    New-Item -ItemType Directory -Path $logosPath -Force | Out-Null
}
Write-Host "   ✅ Pasta criada: $logosPath" -ForegroundColor Green

Write-Host ""
Write-Host "✨ EMPRESA CRIADA COM SUCESSO!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. Copie a logo da $nomeEmpresa para:" -ForegroundColor White
Write-Host "     $logosPath\" -ForegroundColor Yellow
Write-Host "     (nomes: $slugEmpresa-logo.png e $slugEmpresa-favicon.ico)" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Teste localmente:" -ForegroundColor White
Write-Host "     cd $pastaNova" -ForegroundColor Yellow
Write-Host "     npm install" -ForegroundColor Yellow
Write-Host "     npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "  3. Deploy em domínio próprio:" -ForegroundColor White
Write-Host "     vercel" -ForegroundColor Yellow
Write-Host ""
Write-Host "  4. Acesse: https://$slugEmpresa.logiq.io" -ForegroundColor Yellow
Write-Host ""
