# xdcyw.net

個人サイト「xdcyw.net」の Hugo プロジェクトです。札幌で暮らす 21 歳の多重人格（解離性同一性障害）の人が、司法試験合格を目指しながら日々の記録を残すためのリポジトリです。OG/Twitter メタやレスポンシブな埋め込み、カテゴリナビゲーションなどを独自テーマで実装しています。

## 構成
- `content/` — 記事や固定ページの Markdown
- `layouts/` — カスタムテンプレート
- `static/` — CSS・JavaScript・画像などの静的アセット
- `public/` — `hugo` 実行時に生成される出力（コミットされる場合があります）
- `hugo.toml` — サイト設定

ビルドには Hugo Extended 0.123.7 以降を使用しています。

## ビルド
```bash
hugo --gc --minify
```
生成物は `public/` に出力され、Cloudflare Pages でホスティングしています。

開発中は下記コマンドでライブリロードが利用できます。

```bash
hugo server --disableFastRender
```

## ローカルでのセットアップ
1. リポジトリを取得します。
   ```bash
   git clone https://github.com/fuyukihatune-rgb/xdcyw.net.git
   cd xdcyw.net
   ```
2. Hugo Extended 0.123.7 以降をインストールします。
3. 開発サーバーを起動してプレビューします。
   ```bash
   hugo server --disableFastRender
   ```
4. 本番相当のビルドは次のコマンドで生成できます。
   ```bash
   hugo --gc --minify
   ```
   出力された `public/` をそのまま静的ホスティングに配置できます（Cloudflare Pages を利用中）。

### 主な機能
- Open Graph / Twitter Card メタタグを自動生成
- フロントマター経由でカテゴリ付与し、記事・リスト・トップからカテゴリページへ遷移可能
- 動画埋め込み・画像をレスポンシブ対応
- デフォルト OG 画像を `static/` から参照
- `params.adsenseClient` に ID を設定すると Google AdSense スクリプトを自動読み込み

今後はテーマとして切り出して再配布できるよう整備予定です。

## 独自コンテンツを削除するには
テーマ配布などの目的で個人向けコンテンツを取り除きたい場合は、次の流れでクリーンアップできます。

1. **バックアップを確保** — `git clone` で別ディレクトリにコピーするか、作業用ブランチを切ります。
2. **記事・固定ページを整理** — `content/` から公開したくない Markdown を削除、もしくはサンプル記事に差し替えます。
3. **設定をリセット** — `hugo.toml` の `baseURL`, `title`, `params`（`description`, `ogDefaultImage`, `adsenseClient` など）を空値やプレースホルダに置き換えます。
4. **静的アセットを見直す** — `static/` 配下の画像やアイコンから固有のものを削除し、必要に応じて汎用画像へ差し替えます。
5. **生成物を更新** — `public/` を削除するか再ビルドします。
   ```bash
   hugo --gc --minify
   ```
6. **ドキュメントを調整** — README や LICENSE 等から個人情報の記述を削ります。
7. **最終チェック** — `git status`, `git diff`、`hugo` で動作確認してからコミットします。

## ライセンス
このリポジトリは独自の「Soup Curry License v1.1」（`LICENSE.md`）のもと公開しています。著作権表示・ライセンス文を残し、札幌に来たらスープカレーを味わって広めてくれれば OK というゆるいルールです。
