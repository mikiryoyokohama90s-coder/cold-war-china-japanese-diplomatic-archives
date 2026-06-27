# Deployment Guide

このプロジェクトの公開対象ディレクトリは `public_site/` です。

サイトは静的HTML/CSS/JavaScriptだけで動くため、GitHub Pages、Netlify、Vercelなどの静的サイトホスティングで公開できます。

## Before Deploying

公開前に、必ず以下を実行します。

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build_public_site_data.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\build_downloads.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify_public_site.ps1
```

`verify_public_site.ps1` が `PASS` を返した状態で公開します。

## GitHub Pages

このリポジトリには GitHub Pages 用のWorkflowを置いています。

```text
.github/workflows/deploy-pages.yml
```

使い方:

1. GitHubリポジトリの `Settings > Pages` を開く。
2. Source を `GitHub Actions` にする。
3. `main` ブランチへpushする。
4. または Actions 画面から `Deploy static site to GitHub Pages` を手動実行する。

Workflowは以下を行います。

1. `public_site/data/*.js` を再生成する。
2. `public_site/downloads/*.csv` を再生成する。
3. サイトデータを検証する。
4. `public_site/` をGitHub Pagesへアップロードする。

`public_site/.nojekyll` は、GitHub PagesがJekyll処理を挟まないようにするための空ファイルです。

## Netlify

`netlify.toml` で公開ディレクトリを指定しています。

```toml
[build]
  publish = "public_site"
  command = ""
```

Netlifyでこのリポジトリを接続したら、Publish directory が `public_site` になっていることを確認します。

ローカルでデータ生成済みの状態を公開する想定です。Netlify上でビルドも行う場合は、PowerShellスクリプトを実行できる環境設定が必要です。

## Vercel

`vercel.json` で公開対象を `public_site/` にしています。

```json
{
  "outputDirectory": "public_site",
  "cleanUrls": false,
  "trailingSlash": false
}
```

Vercelでこのリポジトリを接続したら、Output Directory が `public_site` になっていることを確認します。

ローカルでデータ生成済みの状態を公開する想定です。Vercel上でビルドも行う場合は、PowerShellスクリプトを実行できる環境設定が必要です。

## Post-Deploy Checks

公開後は、公開URLで以下を確認します。

- Search page: `/`
- About / Method: `/about.html`
- Data downloads: `/data.html`
- Record detail example: `/record.html?id=mofa_100_013436`

検索テスト:

- `中国代表権`
- `承認競争`
- `Bandung`
- `AAPSO`
- `PRC`
- `ROC`

## Important Note

このサイトは、史料原本や画像を再配布するサイトではありません。公式史料の閲覧は、外務省外交史料館、アジア歴史資料センター、国連デジタルライブラリなどの公式ページへ誘導します。

