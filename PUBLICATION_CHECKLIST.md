# Publication Checklist

このチェックリストは、公開前またはデータ更新後に、このデータベースを安全に公開できる状態か確認するためのものです。

## 1. Data Build

- [ ] `outputs/public_records_v01.csv` が最新の公開対象レコードを含んでいる。
- [ ] `outputs/record_tags_v01.csv` が最新のタグ付けを反映している。
- [ ] `outputs/public_tag_labels_v06.csv` に、公開画面で使うタグIDの表示名が揃っている。
- [ ] `outputs/review_flags_v01.csv` に、曖昧な国名・歴史的政体・要確認事項が残っている場合、その理由が書かれている。
- [ ] `outputs/controlled_vocabulary_*.csv` の最新版が、公開用CSVに反映されている。

## 2. Rebuild Commands

データ更新後は、以下を順番に実行します。

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build_public_site_data.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\build_downloads.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify_public_site.ps1
```

## 3. Verification

- [ ] `verify_public_site.ps1` が `PASS` を返す。
- [ ] `public_site/data/search_index.js` と `public_site/data/public_records.js` が更新されている。
- [ ] `public_site/downloads/manifest.csv` が最新のCSV一覧を反映している。
- [ ] `public_site/downloads/*.csv` が最新の公開用CSVになっている。

## 4. Search Tests

公開前に、少なくとも以下の検索語で動作を確認します。

- [ ] `中国代表権`
- [ ] `承認競争`
- [ ] `PRC`
- [ ] `ROC`
- [ ] `Taiwan`
- [ ] `Bandung`
- [ ] `バンドン`
- [ ] `AAPSO`
- [ ] `国連`
- [ ] `アフリカ`

## 5. Record Detail Tests

以下のような代表的な詳細ページを確認します。

- [ ] `public_site/record.html?id=mofa_100_013436`
- [ ] `public_site/record.html?id=mofa_100_030171`
- [ ] `public_site/record.html?id=mofa_100_030772`

確認ポイント:

- [ ] 日本語タイトルと英語タイトルが表示される。
- [ ] 年代・公開状況・出典リンクが表示される。
- [ ] MOFA/JACARなど公式ページへのリンクが正しい。
- [ ] region/entity/organization/event/keyword/context のタグが読める形で表示される。
- [ ] `review_flags` がある場合、曖昧性や確認事項が隠れない。

## 6. About / Method Page

- [ ] `public_site/about.html` の目的説明が最新方針と一致している。
- [ ] PRC / ROC / Taiwan / China Representation and Recognition Competition の説明が明確である。
- [ ] このサイトが原本画像を提供するものではなく、公式公開ページへのナビゲーションであることが明記されている。
- [ ] 歴史的用語・差別的表現を扱う理由が、研究上の文脈として説明されている。

## 7. Data Download Page

- [ ] `public_site/data.html` から主要CSVをダウンロードできる。
- [ ] `public_records.csv`
- [ ] `record_tags.csv`
- [ ] `public_tag_labels.csv`
- [ ] `public_search_index.csv`
- [ ] `review_flags.csv`
- [ ] `controlled_vocabulary_*.csv`

## 8. Rights And Sources

- [ ] 外務省外交史料館、アジア歴史資料センター、国連デジタルライブラリ等の公式ページへのリンクを優先している。
- [ ] 原本画像・PDF・本文全文を無断で再配布していない。
- [ ] 史料件名・分類番号・公開状況は、可能な限り公式目録に基づいている。
- [ ] 英訳タイトル、タグ、整理語彙、解説は研究用ナビゲーションであり、公式訳ではないことを説明できる。

## 9. Public Release Decision

公開してよい状態の目安:

- [ ] 検索が動く。
- [ ] 詳細ページが動く。
- [ ] ダウンロードが動く。
- [ ] 主要な出典リンクが動く。
- [ ] 法的・倫理的な注意書きがある。
- [ ] 未確定のタグや曖昧な実体は、削除ではなく `review_flags` で可視化されている。

## 10. Notes For Future Updates

新しい史料を追加するときは、最低限以下を確認します。

- record_id
- archive_id / material_id
- title_jp
- title_en
- years
- source_url
- access status
- region_ids
- entity_ids
- organization_ids
- event_ids
- keyword_ids
- analytical_context_ids
- review_flags

