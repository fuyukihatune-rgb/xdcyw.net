# xdcyw.net

個人サイト「xdcyw.net」の Hugo プロジェクトです。札幌で暮らす 21 歳の多重人格（解離性同一性障害）の人が、司法試験合格を目指しながら日々の記録を残すためのリポジトリです。

## 構成
- `content/` — 記事や固定ページの Markdown
- `layouts/` — カスタムテンプレート
- `static/` — CSS・JavaScript・画像などの静的アセット
- `hugo.toml` — サイト設定

ビルドには Hugo Extended 0.123.7 を使用しています。

## ビルド
```bash
hugo --gc --minify
```
生成物は `public/` に出力され、Cloudflare Pages でホスティングしています。

## ライセンス
このリポジトリは独自の「Soup Curry License v1.1」（`LICENSE.md`）のもと公開しています。著作権表示・ライセンス文を残し、札幌に来たらスープカレーを味わって広めてくれれば OK というゆるいルールです。
