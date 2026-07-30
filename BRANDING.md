# LaTeX導入講座 ブランドガイド

## ブランドカラー

| 用途 | 値 |
|---|---|
| メインカラー（ネイビー） | `#0D47A1` |
| 白（ダークテーマ用） | `#FFFFFF` |
| サブテキスト（OGP用） | `#90B8F8` |

## アイコン（Tx ピクセルアート）

ドット枠 + T + 添字 x + 2本下線で構成するピクセルグリッドデザイン。

- マスターファイル: `docs/public/favicon.svg`（32×32 viewBox）
- ダーク用（白版）: `docs/public/branding/favicon-white.svg`
- カラー変更は `<g fill="..." stroke="...">` の属性1箇所を変えるだけで全要素に反映。

## ファイル一覧

| ファイル | 用途 |
|---|---|
| `docs/public/favicon.svg` | マスター・Webファビコン（SVG） |
| `docs/public/favicon-16x16.png` | ファビコン 16px |
| `docs/public/favicon-32x32.png` | ファビコン 32px |
| `docs/public/apple-touch-icon.png` | Apple タッチアイコン 180px |
| `docs/public/favicon.ico` | Internet Explorer 用 |
| `docs/public/og-image.png` | OGP / SNS シェア画像（1200×630） |
| `docs/public/branding/favicon.svg` | アイコン（ブランドフォルダー内コピー） |
| `docs/public/branding/favicon-white.svg` | アイコン白版（ダークテーマ用） |
| `docs/public/branding/logo-horizontal.svg` | 横型ロゴ（アイコン＋テキスト横並び） |
| `docs/public/branding/logo-stacked.svg` | 縦型ロゴ（アイコン上・テキスト下） |

## サイズ推奨

| 用途 | 推奨サイズ |
|---|---|
| ファビコン | 16px / 32px / 48px |
| Hero（VitePress） | SVG（自動スケール） |
| ヘッダーロゴ | 高さ 28〜36px 相当 |
| OGP画像 | 1200×630px |
| PDF表紙ロゴ | 横型: 幅 60mm 程度 |

## 使用ガイドライン

- アイコン周囲には最低でもアイコン高さの **25%** 以上の余白を確保する。
- ドット枠はデザインの一部であり、切り取ったり隠したりしない。
- カラーは `#0D47A1` を基本とし、ダークテーマでは白版を使用する。
- 装飾を加えず、余白を大切にすること。
