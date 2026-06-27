# Cold War China and Japanese Diplomatic Archives Database

日本外務省外交史料館所蔵の戦後外交記録を中心に、冷戦期中国外交に関係する史料を検索するための試作データベースです。

このデータベースは、冷戦期のアジア・アフリカ諸国を含む第三世界との関係、中国と台湾をめぐる承認競争、国連中国代表権問題、アジア・アフリカ会議、政治工作、対外援助、外交承認などのリサーチを補助することを目的としています。

## 目的

このプロジェクトは、冷戦史研究における地域横断・分野横断のリサーチを効率化し、諸外国の研究者や調査員が、日本外務省外交史料館が所蔵する記録へリーチしやすくすることを目指します。

また、日本の外交官が実際にどのような情報収集・分析・交渉・報告を行ってきたのかを可視化し、日本がどのように世界と向き合ってきたかを追体験できるようにすることも目指します。

本サイトは、史料の原本・画像データそのものを提供するものではありません。史料の原本・画像・公式メタデータは、日本外務省外交史料館、アジア歴史資料センターなどの公式公開ページを参照します。このサイトは、それらの公開情報に研究用の整理語彙と検索タグを加え、日本語の史料を英語でも検索しやすくするためのナビゲーション用データベースです。

## 編集方針

文書名は、日本外務省外交史料館のファイル名を尊重します。その一方で、ファイル名に表れない地域名、国名、会議名、組織名、事件名、主題語がファイルの内容や目次に表れる場合は、それらも検索に活用できるよう積極的にタグ化します。

公開状況は、すべて日本外務省外交史料館の公開状況に依拠します。オリジナル文書の閲覧申請や詳細問い合わせは、本サイトでは受け付けません。本サイトの目的は、あくまでリサーチの補助です。

## 歴史用語と表現について

本サイトは、言論の自由と表現の自由を尊重します。それと同時に、歴史資料が持つ記録としての価値も尊重します。

そのため、現在の文脈では差別的・不適切とされる可能性のある語であっても、史料に現れる歴史的用語として掲載する場合があります。これは、その表現を肯定するためではなく、歴史的文脈を正確に理解するためです。

## 法令・規約・学術的価値

本サイトは、第一に日本国の法律を遵守します。外交文書の取り扱いについても、法律および日本外務省外交史料館の規約に従います。

同時に、グローバルで普遍的な自由、人権、学問的真理を尊重します。そのための参考として、Wilson Center、国連、National Security Archive、CIA Reading Room、各国公文書館、商用・非商用の一次資料データベースなど、国内外の歴史資料データベースの設計を参照しています。

各国政府が緊急事態宣言を発した場合や、普遍的な人権問題により歴史的リサーチに困難が発生した場合、歴史データベースが果たしうる貢献として、日本国内の社会的規範や価値判断よりも、普遍的な学問の自由、人権、歴史的検証可能性を重視する場合があります。

## 誹謗中傷・反社会的言動への対応

本サイトまたは本プロジェクトに対する根拠なき誹謗中傷、脅迫、差別的攻撃、反社会的言動が確認された場合は、必要に応じてしかるべき措置を取ります。

## サイト構成

```text
public_site/
  index.html              Search page
  record.html             Record detail page
  about.html              About / Method page
  data.html               Data download page
  app.js                  Search page behavior
  record.js               Detail page behavior
  styles.css              Site styles
  data/
    search_index.js       Browser search data
    public_records.js     Browser record metadata
  downloads/
    *.csv                 Public downloadable CSV files

outputs/
  public_records_v01.csv
  record_tags_v01.csv
  public_tag_labels_v06.csv
  public_search_index_v01.csv
  controlled_vocabulary_*.csv
  review_flags_v01.csv

scripts/
  build_public_site_data.ps1
  build_downloads.ps1
  verify_public_site.ps1
```

## 主なデータファイル

- `public_records_v01.csv`: 1史料1行の公開用基本テーブル
- `record_tags_v01.csv`: 史料とタグの対応表
- `public_tag_labels_v06.csv`: タグIDと表示名の対応表
- `public_search_index_v01.csv`: サイト検索用の1件1行インデックス
- `review_flags_v01.csv`: 歴史的名称・曖昧な政治実体などの確認フラグ
- `controlled_vocabulary_regions_*.csv`: 地域語彙
- `controlled_vocabulary_entities_*.csv`: 国家・地域・政治実体語彙
- `controlled_vocabulary_organizations_*.csv`: 組織語彙
- `controlled_vocabulary_events_*.csv`: イベント語彙
- `controlled_vocabulary_blocs_*.csv`: ブロック・交渉集団語彙
- `controlled_vocabulary_keywords_*.csv`: 主題キーワード語彙
- `controlled_vocabulary_analytical_contexts_*.csv`: 分析文脈語彙

## 更新手順

CSVを更新した後は、以下の順でサイト用データとダウンロードファイルを再生成します。

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build_public_site_data.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\build_downloads.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify_public_site.ps1
```

処理内容:

- `build_public_site_data.ps1`: `outputs/public_search_index_v01.csv` と `outputs/public_records_v01.csv` から、ブラウザ用の `public_site/data/*.js` を再生成します。
- `build_downloads.ps1`: 公開用CSVを `public_site/downloads/` に安定したファイル名でコピーし、`manifest.csv` を作成します。
- `verify_public_site.ps1`: JS構文、CSVとブラウザ用データの件数一致、主要タグの存在を確認します。

## ローカル確認

ブラウザで以下を開きます。

```text
public_site/index.html
```

主要ページ:

- `public_site/index.html`: 検索ページ
- `public_site/record.html?id=mofa_100_013436`: 詳細ページ例
- `public_site/about.html`: About / Method
- `public_site/data.html`: データダウンロード

## 公開手順

このサイトは静的HTML/CSS/JavaScriptで構成されているため、GitHub Pages、Netlify、Vercelなどの静的サイトホスティングで公開できます。

公開対象ディレクトリは `public_site/` です。

公開前チェック:

1. `outputs/*.csv` を更新する
2. `build_public_site_data.ps1` を実行する
3. `build_downloads.ps1` を実行する
4. `verify_public_site.ps1` を実行する
5. `public_site/index.html` で検索を確認する
6. `public_site/about.html` の方法論を確認する
7. `public_site/data.html` のダウンロードリンクを確認する
8. `public_site/record.html?id=...` の詳細ページを数件確認する

GitHub Pagesで公開する場合は、`public_site/` を公開ディレクトリとして使うか、リポジトリの公開設定に合わせて `public_site` 内のファイルをPages対象ディレクトリへ配置します。

## 公開設定ファイル

このリポジトリには、静的サイト公開用の設定を置いています。

- `DEPLOYMENT.md`: GitHub Pages、Netlify、Vercelで公開するための手順書です。
- `.github/workflows/deploy-pages.yml`: GitHub Pages用。`main` ブランチにpushされたとき、`public_site/` を公開します。
- `public_site/.nojekyll`: GitHub PagesがJekyll処理を挟まないようにするための空ファイルです。
- `netlify.toml`: Netlify用。公開ディレクトリを `public_site/` に指定します。
- `vercel.json`: Vercel用。出力ディレクトリを `public_site/` に指定します。

GitHub Pagesで公開する場合は、GitHubリポジトリの `Settings > Pages` で Source を `GitHub Actions` にします。そのうえで `main` ブランチへpushするか、Actions画面から `Deploy static site to GitHub Pages` を手動実行します。

NetlifyまたはVercelで公開する場合は、このリポジトリを接続し、公開ディレクトリが `public_site` になっていることを確認します。

## 注意

このデータベースは研究用ナビゲーションデータです。公式な史料説明、原本画像、閲覧条件、公開状況については、必ず日本外務省外交史料館およびアジア歴史資料センターなどの公式ページを確認してください。
