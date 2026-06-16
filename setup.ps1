# ============================================================
# ときめき 婚活SNS - 自動セットアップスクリプト
# 使い方: PowerShell で ./setup.ps1 を実行
# ============================================================

$ErrorActionPreference = "Stop"
$env:PATH = "C:\Program Files\nodejs;C:\Program Files\Git\bin;C:\Program Files\GitHub CLI;$env:PATH"

function Write-Step { param($n, $msg) Write-Host "`n[$n] $msg" -ForegroundColor Cyan }
function Write-OK   { param($msg) Write-Host "  ✓ $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  ⚠ $msg" -ForegroundColor Yellow }
function Write-Fail { param($msg) Write-Host "  ✗ $msg" -ForegroundColor Red }

Write-Host ""
Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║   ときめき 婚活SNS  セットアップ      ║" -ForegroundColor Magenta
Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Magenta

# ─────────────────────────────────────────
# STEP 1: .env.local 確認
# ─────────────────────────────────────────
Write-Step "1/5" ".env.local の環境変数を確認中..."

if (-not (Test-Path ".env.local")) {
    Write-Fail ".env.local が見つかりません"
    Write-Host "  → .env.local.example をコピーして .env.local を作成してください" -ForegroundColor Yellow
    exit 1
}

$envContent = Get-Content ".env.local" -Raw
$missing = @()

$required = @(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_SERVICE_ROLE_KEY"
)

foreach ($key in $required) {
    if ($envContent -match "$key=pk_test_ここに" -or
        $envContent -match "$key=sk_test_ここに" -or
        $envContent -match "$key=https://ここに" -or
        $envContent -match "$key=ここに" -or
        $envContent -notmatch "$key=\S") {
        $missing += $key
    } else {
        Write-OK "$key"
    }
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Fail "以下のキーが未設定です:"
    foreach ($k in $missing) {
        Write-Host "  → $k" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "  .env.local を開いて値を貼り付けてください:" -ForegroundColor Yellow
    Write-Host "  ・Clerk:    https://dashboard.clerk.com/" -ForegroundColor White
    Write-Host "  ・Supabase: https://supabase.com/dashboard" -ForegroundColor White
    exit 1
}

Write-OK "すべての環境変数が設定済みです"

# ─────────────────────────────────────────
# STEP 2: npm install
# ─────────────────────────────────────────
Write-Step "2/5" "依存パッケージをインストール中..."
npm install --silent
Write-OK "node_modules インストール完了"

# ─────────────────────────────────────────
# STEP 3: TypeScript チェック
# ─────────────────────────────────────────
Write-Step "3/5" "TypeScript の型チェック中..."
$tscResult = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-OK "型エラーなし"
} else {
    Write-Warn "型エラーが検出されました（動作には影響しない場合があります）"
    Write-Host $tscResult -ForegroundColor DarkYellow
}

# ─────────────────────────────────────────
# STEP 4: Supabase マイグレーション案内
# ─────────────────────────────────────────
Write-Step "4/5" "Supabase マイグレーションファイルの確認..."

$sqlFile = "supabase\migrations\20260616000000_create_tokimeki_schema.sql"
if (Test-Path $sqlFile) {
    Write-OK "マイグレーションファイル確認: $sqlFile"
    Write-Host ""
    Write-Host "  ─────────────────────────────────────────" -ForegroundColor Gray
    Write-Host "  Supabase SQL Editor で以下を実行してください:" -ForegroundColor Yellow
    Write-Host "  https://supabase.com/dashboard → SQL Editor" -ForegroundColor White
    Write-Host "  ファイル内容をコピペして「Run」をクリック" -ForegroundColor White
    Write-Host "  ─────────────────────────────────────────" -ForegroundColor Gray
    Write-Host ""

    # クリップボードにコピー
    try {
        Get-Content $sqlFile -Raw | Set-Clipboard
        Write-OK "SQLをクリップボードにコピーしました → Supabase SQL Editorに貼り付けてください"
    } catch {
        Write-Warn "クリップボードへのコピーに失敗しました。手動でファイルを開いてください"
    }

    # Supabase SQL Editor をブラウザで開く
    $supabaseUrl = ($envContent | Select-String "NEXT_PUBLIC_SUPABASE_URL=(.+)").Matches[0].Groups[1].Value.Trim()
    $projectRef = $supabaseUrl -replace "https://", "" -replace "\.supabase\.co.*", ""
    if ($projectRef -ne "") {
        Start-Process "https://supabase.com/dashboard/project/$projectRef/sql/new"
        Write-OK "Supabase SQL Editor をブラウザで開きました"
    }
} else {
    Write-Warn "マイグレーションファイルが見つかりません"
}

# ─────────────────────────────────────────
# STEP 5: 開発サーバー起動
# ─────────────────────────────────────────
Write-Step "5/5" "開発サーバーを起動します..."
Write-Host ""
Write-Host "  ✨ セットアップ完了！" -ForegroundColor Green
Write-Host "  → http://localhost:3000 で確認できます" -ForegroundColor White
Write-Host ""
Write-Host "  ※ Supabase SQL Editor での実行が完了してから" -ForegroundColor Gray
Write-Host "    ログインしてください" -ForegroundColor Gray
Write-Host ""

npm run dev
