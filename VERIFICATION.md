# 実機検証チェックリスト

**対象ページ:** `docs/02-installation/windows/lab-template.md`  
**検証環境:** Windows Sandbox（または新規インストール直後のWindows 11）  
**検証目的:** 実際の TeX Live 環境で pLaTeX / upLaTeX + dvipdfmx レシピが動作するかを確認し、教材の記述精度を検証する  
**前提:** このチェックリストは「LaTeXテンプレートのビルド成功」を確認するものであり、VitePressのビルドとは無関係

---

## 事前準備

- [ ] Windows Sandboxまたはクリーンな Windows 11 環境を用意する
- [ ] インターネット接続を確認する
- [ ] 検証に使う研究室テンプレートを用意する（以下の2種類を最低限用意する）
  - [ ] `\documentclass[uplatex,dvipdfmx]{jsarticle}` を使うテンプレート（upLaTeX向け）
  - [ ] `\documentclass{jsarticle}` または `{jarticle}` を使うテンプレート（pLaTeX向け）
  - [ ] できれば: `\bibliography{}` を含む参考文献付きテンプレート
  - [ ] できれば: `\includegraphics` を含む画像付きテンプレート
- [ ] 検証結果を記録するメモ（スクリーンショット保存先）を準備する

---

## Phase 1：基本環境のインストール

### TeX Live

- [ ] https://www.tug.org/texlive/ からインストーラーを取得できた
- [ ] `install-tl-windows.bat` を管理者として実行できた
- [ ] インストールが完了した（所要時間を記録：___分）
- [ ] PCを再起動した

### コマンド存在確認

コマンドプロンプトで以下を1つずつ実行し、バージョン番号が表示されることを確認する。

| コマンド | 期待する結果 | 実際の結果（2026-07-30） |
|---|---|---|
| `latex --version` | TeX Liveのバージョン表示 | ✅ pdfTeX 3.141592653-2.6-1.40.28 (TeX Live 2025) |
| `platex --version` | pLaTeXのバージョン表示 | ✅ e-upTeX p4.1.2-u2.00-250202-2.6 (utf8.sjis) ※注1 |
| `uplatex --version` | upLaTeXのバージョン表示 | ✅ e-upTeX p4.1.2-u2.00-250202-2.6 (utf8.uptex) |
| `dvipdfmx --version` | dvipdfmxのバージョン表示 | ✅ dvipdfmx Version 20250410 |
| `bibtex --version` | BibTeXのバージョン表示 | ✅ BibTeX 0.99d (TeX Live 2025) |
| `pbibtex --version` | pBibTeXのバージョン表示 | ✅ upBibTeX 0.99d-j0.36-u2.00 (utf8.euc) ※注2 |
| `upbibtex --version` | upBibTeXのバージョン表示 | ✅ upBibTeX 0.99d-j0.36-u2.00 (utf8.uptex) |
| `lualatex --version` | LuaLaTeXのバージョン表示 | ✅ LuaHBTeX Version 1.22.0 (TeX Live 2025) |

> ※注1: modern TeX Live では platex も e-upTeX エンジン上で動作する。`(utf8.sjis)` が pLaTeX 互換モードの識別子。
> ※注2: `pbibtex` の実体は `upBibTeX (utf8.euc)`。`upbibtex` は `upBibTeX (utf8.uptex)`。UTF-8 .bib に対しては両者が同一の BBL を生成する（確認済み）。
> **確認済み:** `upbibtex` は TeX Live 2025 on Windows に含まれている → 教材のレシピに採用可

### VS Code

- [ ] VS Codeをインストールできた
- [ ] LaTeX Workshop（James Yu作）をインストールできた

---

## Phase 2：LuaLaTeX 基本動作（既存ページの verify.md に相当）

settings.json を以下の**最小構成**に設定する：

```json
{
  "latex-workshop.latex.tools": [
    {
      "name": "lualatex",
      "command": "lualatex",
      "args": ["-synctex=1", "-interaction=nonstopmode", "-file-line-error", "%DOC%"]
    }
  ],
  "latex-workshop.latex.recipes": [
    {"name": "lualatex", "tools": ["lualatex"]}
  ],
  "latex-workshop.latex.recipe.default": "lualatex"
}
```

- [ ] `test.tex`（jlreq + 日本語テスト）をコンパイルできた
- [ ] PDF に日本語と数式が正しく表示された
- [ ] LuaLaTeX が動作することを確認した

---

## Phase 3：upLaTeX + dvipdfmx レシピ検証

### 3-1 settings.json の更新

lab-template.md に記載の settings.json に切り替える。

- [ ] settings.json を更新して保存した
- [ ] VS Code を再起動した

### 3-2 upLaTeX 単体動作確認

次のテスト文書を `up-test.tex` として作成してビルドする：

```latex
\documentclass[uplatex,dvipdfmx]{jsarticle}
\usepackage[dvipdfmx]{graphicx}
\begin{document}
upLaTeXのテスト。日本語が表示されれば成功です。
\end{document}
```

- [x] CLI 検証済み（VS Code UI 未確認）：uplatex × 2 → dvipdfmx で up-test.pdf 9456 bytes 生成成功
- [x] OUTPUTに `This is e-upTeX, Version ... (utf8.uptex) (preloaded format=uplatex)` と表示
- [x] PDF が生成された（9456 bytes）
- [x] SyncTeX: `-synctex=1` で `up-test.synctex.gz` 生成確認
- [ ] PDF に日本語が正しく表示された（目視確認が必要 — VS Code または PDF ビューアーで確認すること）
- [ ] VS Code でのレシピ選択 UI（Build with Recipe）動作（要手動確認）

### 3-3 pLaTeX 単体動作確認

次のテスト文書を `p-test.tex` として作成してビルドする：

```latex
\documentclass{jsarticle}
\begin{document}
pLaTeXのテスト。日本語が表示されれば成功です。
\end{document}
```

- [x] CLI 検証済み：platex × 2 → dvipdfmx で p-test.pdf 9363 bytes 生成成功
- [x] OUTPUTに `This is e-upTeX, Version ... (utf8.sjis) (preloaded format=platex)` と表示
- [x] PDF が生成された（9363 bytes）
- [x] SyncTeX: `-synctex=1` で `p-test.synctex.gz` 生成確認
- [ ] PDF に日本語が正しく表示された（目視確認が必要）
- [ ] VS Code でのレシピ選択 UI 動作（要手動確認）

### 3-4 `jsarticle`（オプションなし）でどちらのレシピが通るか確認

- [x] upLaTeX レシピで成功した：**yes**（jsarticle-test.pdf 11387 bytes）
- [x] pLaTeX レシピで成功した：**yes**（jsarticle-test.pdf 11387 bytes、同一サイズ）
- [x] 両方成功した場合の推奨：**upLaTeX を推奨**（より新しい Unicode 対応エンジンのため）

---

## Phase 4：研究室テンプレートの実ビルド

### 4-1 テンプレートの事前確認（変更しない）

- [ ] テンプレートフォルダーを VS Code で開いた
- [ ] メインの `.tex` ファイルを特定した（ファイル名：___）
- [ ] `\documentclass` の行を確認した（内容：___）
- [ ] マジックコメントの有無を確認した（内容：___）
- [ ] 使用するレシピを判断した（判断：___）
- [ ] テンプレートのファイル一覧を記録した（何のファイルが含まれているか）

### 4-2 初回ビルド（オリジナル、変更なし）

- [ ] 「Build with Recipe」で適切なレシピを選択した
- [ ] ビルドが成功した（Recipe terminated with error が出なかった）
- [ ] PDF が生成された
- [ ] PDF の内容が正しく表示された

失敗した場合：
- [ ] OUTPUTタブのエラーを記録した
- [ ] エラーの原因を特定できた（内容：___）

### 4-3 日本語編集の確認

- [ ] 本文の日本語を1箇所変更した
- [ ] 「Build with Recipe」で同じレシピを選択した
- [ ] PDF に変更が反映された

### 4-4 画像付きテンプレートの確認（該当する場合）

- [ ] `\usepackage[dvipdfmx]{graphicx}` が使われているか確認した
- [ ] 画像ファイルが `.tex` と同じフォルダーにあることを確認した
- [ ] ビルド後、PDF に画像が表示された

---

## Phase 5：BibTeX レシピ検証

> **要確認事項：** upLaTeX に正しく対応する BibTeX ツールは `bibtex` / `pbibtex` / `upbibtex` のどれか

### 5-1 各ツールの動作確認

以下のレシピを順に試し、文献リストが正しく生成されるか確認する。

テスト用 `.bib` ファイル：

```bibtex
@article{test2024,
  author  = {山田太郎 and Taro Yamada},
  title   = {テスト文献},
  journal = {日本語ジャーナル},
  year    = {2024},
}
```

テスト用 `.tex`（upLaTeX 用）：

```latex
\documentclass[uplatex,dvipdfmx]{jsarticle}
\begin{document}
テスト引用 \cite{test2024}。
\bibliographystyle{jplain}
\bibliography{test-bib}
\end{document}
```

| レシピ | 文献リストが出力された | エラーの内容 |
|---|---|---|
| `upLaTeX → bibtex → upLaTeX × 2 → dvipdfmx` | **NG**（jplain使用時） | `I couldn't open style file jplain.bst`（bibtex は日本語スタイル未対応） |
| `upLaTeX → pbibtex → upLaTeX × 2 → dvipdfmx` | ✅ yes（bib-up-pbibtex.pdf 17169 bytes） | エラーなし。BBL に正しい日本語テキスト |
| `upLaTeX → upbibtex → upLaTeX × 2 → dvipdfmx` | ✅ yes（bib-up-upbibtex.pdf 17168 bytes） | エラーなし。BBL が pbibtex と byte-for-byte 同一 |
| `pLaTeX → pbibtex → pLaTeX × 2 → dvipdfmx` | ✅ yes（bib-p-pbibtex.pdf 17094 bytes） | エラーなし |
| `upLaTeX → bibtex(plain style) → upLaTeX × 2 → dvipdfmx` | ✅ yes（英語のみ） | 日本語著者名・タイトルは未確認 |

- [x] 正しく動作するレシピを特定した：**upbibtex（upLaTeX用）/ pbibtex（pLaTeX用）**
- [x] 教材の settings.json に `upbibtex` ツールが必要か確認した：**必要。追加済み（lab-template.md 更新済み）**

### 5-2 研究室テンプレートの BibTeX ビルド（該当する場合）

- [ ] テンプレートの `.bib` ファイルを確認した
- [ ] `\bibliographystyle` の引数を確認した（スタイル名：___）
- [ ] 適切なレシピでビルドした
- [ ] 文献リストが PDF に正しく表示された

---

## Phase 6：.vscode/settings.json の動作確認

テンプレートフォルダーに `.vscode/settings.json` を作成し、`recipe.default` を upLaTeX レシピに上書きする方法が機能するか確認する。

```json
{
  "latex-workshop.latex.recipe.default": "upLaTeX × 2 → dvipdfmx"
}
```

- [ ] `.vscode/settings.json` を作成してテンプレートフォルダーに置いた
- [ ] VS Code でそのフォルダーを開き直した
- [ ] ファイルを Ctrl+S で保存したとき、自動で「upLaTeX × 2 → dvipdfmx」レシピが実行された
- [ ] 一方で、別のフォルダーの `test.tex` を開いたとき、lualatex に戻っていた
- [ ] 期待通りに機能した： yes / no
- [ ] 問題点：___

---

## Phase 7：誤レシピ選択からの回復確認

lualatex（デフォルト）が upLaTeX テンプレートに自動適用されたとき、どんなエラーが出るかを記録する。

- [x] upLaTeX テンプレートのメインファイルを lualatex でビルドした（CLI 検証）
- [x] 表示されたエラーを記録した：
  ```
  jsarticle.cls:14: LaTeX Error: This file needs format `pLaTeX2e'
                 but this is `LaTeX2e'.
  ```
  さらに続いて `Backend request inconsistent with engine: using 'luatex' backend.` や `The font size command \normalsize is not defined.` も出る。
- [x] エラーは初心者にとって理解可能か：**yes**（`pLaTeX2e` が必要だが `LaTeX2e` しかないと明示される）
- [x] PDF は一応生成される（3326 bytes）が日本語は表示されない
- [ ] VS Code の OUTPUT タブでの実際の表示（要手動確認）

**追加発見（jlreq + platex）：**  
`jlreq` は pLaTeX でビルドしても**エラーなしで成功する**（jlreq がエンジンを自動検出するため）。  
つまり「LuaLaTeX 向けテンプレートを誤って pLaTeX で動かす」ケースは、エラーで気づけない可能性がある。

---

## 検証後に教材へ反映すべき修正点（2026-07-30 更新）

- [x] pLaTeX / upLaTeX レシピが実際に動作することを確認した（CLI 検証済み）
- [x] `upbibtex` の要否を確認した → **必要**。`settings.json` に追加済み。旧レシピ名 `upLaTeX → pbibtex` を `upLaTeX → upbibtex` に変更済み
- [x] 誤レシピのエラーメッセージを確認して troubleshooting に追加した（lab-template.md 更新済み）
- [x] `bibtex`（標準）が `jplain.bst` を使えない件を教材に記述した
- [ ] `.vscode/settings.json` の有効性を確認する（VS Code GUI で要確認）
- [ ] 「ここまでできればOK」のチェックリストが実態と合っているか確認する（VS Code での手動確認後）
- [ ] PDF の日本語表示・画像表示を目視確認する（PDF ビューアーでの確認が必要）
- [ ] VS Code での実際のレシピ選択操作を確認する
- [ ] TODO(media) の撮影対象を最終確定する（VS Code 確認後）

---

## 記録欄（2026-07-30 実施分）

```
検証日時：2026-07-30
検証者：Claude Code (claude-sonnet-4-6) / 作業ディレクトリ: C:\temp\latex-verify\
Windows バージョン：Windows 11 Home 10.0.26200
TeX Live バージョン：TeX Live 2025 / pdfTeX 3.141592653-2.6-1.40.28 / e-upTeX p4.1.2-u2.00-250202
VS Code バージョン：未検証（CLI 検証のみ）
LaTeX Workshop バージョン：未検証（CLI 検証のみ）
upbibtex の存在：あり（upBibTeX 0.99d-j0.36-u2.00, utf8.uptex モード）
pLaTeX × 2 → dvipdfmx の動作：成功（p-test.pdf 9363 bytes 生成）
upLaTeX × 2 → dvipdfmx の動作：成功（up-test.pdf 9456 bytes 生成）
jsarticle（オプションなし）でpLaTeX成功：yes（11387 bytes）
jsarticle（オプションなし）でupLaTeX成功：yes（11387 bytes、pLaTeX と同一サイズ）
BibTeX で正しく動いたツール：
  - upLaTeX + upbibtex + jplain：成功（UTF-8 日本語 BBL 正常生成）
  - upLaTeX + pbibtex + jplain：成功（BBL が upbibtex と byte-for-byte 同一）
  - pLaTeX + pbibtex + jplain：成功
  - upLaTeX + bibtex + jplain：失敗（I couldn't open style file jplain.bst）
  - upLaTeX + bibtex + plain：成功（英語スタイル限定）
.vscode/settings.json の動作：未検証（VS Code GUI 操作が必要、CLI では確認不可）
その他気づいたこと：
  - platex --version の出力に「e-upTeX」と表示される（modern TeX Live では platex も e-upTeX エンジン上で動作）
    encoding mode の違い: platex=(utf8.sjis) / uplatex=(utf8.uptex)
  - pbibtex の実体は upBibTeX (utf8.euc)、upbibtex は upBibTeX (utf8.uptex)
  - pbibtex と upbibtex は UTF-8 .bib ファイルに対して同一の BBL を生成する
  - bibtex（標準）は jplain.bst を見つけられないため日本語スタイル不可
  - LuaLaTeX で jsarticle を使うと明確なエラー:
    「LaTeX Error: This file needs format 'pLaTeX2e' but this is 'LaTeX2e'.」
  - jlreq は pLaTeX でコンパイルが成功する（エンジン自動検出、エラーなし）
  - SyncTeX: uplatex/platex どちらも -synctex=1 で .synctex.gz 生成確認
  - graphicx + dvipdfmx + includegraphics: 成功（image-test.pdf 27594 bytes）
```
