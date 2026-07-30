# 研究室テンプレートを動かす

## このページでできること

- 先生や先輩から受け取ったテンプレートを自分のWindowsで動かす
- pLaTeX / upLaTeX + dvipdfmx 向けのレシピを LaTeX Workshop に追加する
- 日本語を編集して PDF に反映されることを確認する

::: tip test.tex が動けばこのページへ
[動作確認](./verify) で `test.tex` が正しくコンパイルできていることを前提としています。まだの場合はそちらを先に完了させてください。
:::

---

## 研究室テンプレートには別のエンジンが必要な場合がある

この講座では LuaLaTeX を使って `test.tex` をコンパイルしました。しかし研究室で長年使われてきたテンプレートは、**pLaTeX** や **upLaTeX** と **dvipdfmx** という別の組み合わせで作られていることがあります。

| エンジン | 特徴 | よく使われる文書クラス |
|---|---|---|
| **pLaTeX** | 日本語特化の古典的エンジン。長年の実績がある | `jarticle`、`jbook`、`jsarticle` |
| **upLaTeX** | pLaTeX の後継。Unicode 対応で pLaTeX より扱いやすい | `jsarticle`、`jsbook`、`jlreq` |
| **LuaLaTeX** | 最新世代。この講座の標準 | `jlreq` |

pLaTeX・upLaTeX は **DVI ファイル**（中間ファイル）を経由して PDF を作ります。そのため **dvipdfmx** という変換ツールが追加で必要です。

```
pLaTeX / upLaTeX  →  .dvi ファイル  →  dvipdfmx  →  .pdf
LuaLaTeX          →  直接 .pdf
```

---

## テンプレートが使うエンジンを確認する

テンプレートの **`.tex` ファイルの先頭数行**を見て、どのエンジンが必要か確認します。

### `\documentclass` の行

```latex
\documentclass{jarticle}                        % → pLaTeX
\documentclass{jsarticle}                       % → pLaTeX または upLaTeX
\documentclass[uplatex]{jsarticle}             % → upLaTeX
\documentclass[uplatex,dvipdfmx]{jsarticle}    % → upLaTeX + dvipdfmx（明示）
\documentclass{jlreq}                           % → LuaLaTeX（この講座の標準）
```

### マジックコメント（ファイル先頭にある場合）

```latex
% !TEX program = uplatex    % → upLaTeX
% !TEX program = platex     % → pLaTeX
% !TEX program = lualatex   % → LuaLaTeX
```

### dvipdfmx ドライバーの指定

```latex
\usepackage[dvipdfmx]{graphicx}   % dvipdfmx が必要なことを示す
```

`dvipdfmx` という文字がどこかに見えたら、**pLaTeX または upLaTeX + dvipdfmx のレシピ**が必要です。

::: tip わからない場合
どのエンジンを使えばよいか判断できないときは、テンプレートを渡してくれた先生か先輩に「どのエンジンで動かせばよいですか？」と確認してください。
:::

---

## LaTeX Workshop にレシピを追加する

`Ctrl + Shift + P` → 「Open User Settings (JSON)」で `settings.json` を開き、内容を以下に**すべて置き換えます**。

```json
{
  "latex-workshop.latex.tools": [
    {
      "name": "lualatex",
      "command": "lualatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOC%"
      ]
    },
    {
      "name": "uplatex",
      "command": "uplatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOC%"
      ]
    },
    {
      "name": "platex",
      "command": "platex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOC%"
      ]
    },
    {
      "name": "dvipdfmx",
      "command": "dvipdfmx",
      "args": ["%DOCFILE%"]
    },
    {
      "name": "bibtex",
      "command": "bibtex",
      "args": ["%DOCFILE%"]
    },
    {
      "name": "pbibtex",
      "command": "pbibtex",
      "args": ["%DOCFILE%"]
    },
    {
      "name": "upbibtex",
      "command": "upbibtex",
      "args": ["%DOCFILE%"]
    }
  ],
  "latex-workshop.latex.recipes": [
    {
      "name": "lualatex",
      "tools": ["lualatex"]
    },
    {
      "name": "upLaTeX × 2 → dvipdfmx",
      "tools": ["uplatex", "uplatex", "dvipdfmx"]
    },
    {
      "name": "pLaTeX × 2 → dvipdfmx",
      "tools": ["platex", "platex", "dvipdfmx"]
    },
    {
      "name": "upLaTeX → upbibtex → upLaTeX × 2 → dvipdfmx",
      "tools": ["uplatex", "upbibtex", "uplatex", "uplatex", "dvipdfmx"]
    },
    {
      "name": "pLaTeX → pbibtex → pLaTeX × 2 → dvipdfmx",
      "tools": ["platex", "pbibtex", "platex", "platex", "dvipdfmx"]
    }
  ],
  "latex-workshop.latex.recipe.default": "lualatex"
}
```

<!-- TODO(media): settings.jsonを上記の内容に更新して保存する操作 -->

`Ctrl + S` で保存します。

::: warning デフォルトは lualatex のまま
`"recipe.default": "lualatex"` は変更しないでください。これにより、ファイルを保存したときの**自動ビルドは引き続き LuaLaTeX** で動きます。研究室テンプレートをビルドするときは、次の手順でレシピを手動選択します。
:::

---

## レシピを選んでビルドする

研究室テンプレートを開いたら、**自動ビルドではなく手動でレシピを選択**します。

1. テンプレートのメインファイル（通常 `main.tex` や `thesis.tex` など）を VS Code で開く
2. `Ctrl + Shift + P` を押してコマンドパレットを開く
3. 「**LaTeX Workshop: Build with Recipe**」と入力して選択する
4. レシピの一覧が表示されるので、テンプレートに合うものを選ぶ

<!-- TODO(media): Build with Recipeを実行してレシピ一覧から選択する操作 -->

| テンプレートの指定 | 選ぶレシピ |
|---|---|
| `[uplatex]` または `[uplatex,dvipdfmx]` | **upLaTeX × 2 → dvipdfmx** |
| `{jarticle}` または `{jsarticle}`（指定なし） | まず **upLaTeX × 2 → dvipdfmx** を試す |
| `{jlreq}` のみ（LuaLaTeX） | **lualatex** |

::: tip 何度かビルドが必要な場合
参考文献や相互参照（図の番号・章番号）が含まれる文書は、**同じレシピを2〜3回実行**すると番号が正しく揃います。1回目のビルドで「?」や「??」が表示されても、もう一度ビルドすれば解決することがほとんどです。
:::

---

## 日本語を編集して確認する

ビルドが成功したら、実際に日本語を編集して PDF に反映されることを確認します。

1. テンプレートの本文部分（`\begin{document}` と `\end{document}` の間）を開く
2. 任意の日本語テキストを1行変更または追加する（例：「テスト編集」）
3. `Ctrl + S` で保存する
4. `Ctrl + Shift + P` → 「**Build with Recipe**」→ 同じレシピを選択する
5. PDF プレビューを更新し、変更した日本語が反映されていることを確認する

<!-- TODO(media): テンプレートの日本語を編集してビルドし、PDFに反映される操作 -->

::: tip 自動ビルドについて
研究室テンプレートは、保存時に自動で LuaLaTeX が走るため、失敗することがあります（Recipe terminated が出ますが、問題ありません）。テンプレートをビルドするときは毎回「Build with Recipe」で手動選択してください。
:::

---

## 画像を含むテンプレートの確認

テンプレートに画像（`\includegraphics`）が含まれる場合、dvipdfmx ドライバーを使っている可能性が高いです。

以下を確認してください。

1. テンプレートに参照されている画像ファイルが、**.tex ファイルと同じフォルダー内**に存在するか確認する

2. `\usepackage[dvipdfmx]{graphicx}` の行があるか確認する  
   あれば、upLaTeX + dvipdfmx のレシピでビルドする

3. ビルドが成功し、PDF に画像が表示されていれば OK

::: warning 画像ファイルがない場合
テンプレートを受け取ったとき、`.tex` ファイルだけでなく**画像ファイルも一緒に受け取る**必要があります。`.tex` ファイルが参照している画像が存在しないと、`File not found` エラーになります。
:::

---

## 参考文献（BibTeX）を含む場合

テンプレートに `\bibliography{...}` や `\cite{...}` が含まれる場合は、BibTeX のビルドステップが必要です。

### 使うレシピ

エンジンによって使うツールが異なります。

| エンジン | レシピ |
|---|---|
| **upLaTeX** | `upLaTeX → upbibtex → upLaTeX × 2 → dvipdfmx` |
| **pLaTeX** | `pLaTeX → pbibtex → pLaTeX × 2 → dvipdfmx` |

::: tip bibtex（標準）は日本語スタイルで使えない
`bibtex`（`upbibtex` や `pbibtex` ではない方）は、`jplain` や `jsplain` などの日本語向けスタイルを認識できません。研究室テンプレートで `\bibliographystyle{jplain}` や `\bibliographystyle{jsplain}` が使われている場合は、必ず `upbibtex` または `pbibtex` を含むレシピを選んでください。
:::

### 必要なファイル

BibTeX ビルドには以下が必要です。

- `.bib` ファイル（文献データベース。テンプレートと一緒に受け取るはず）
- `.tex` 内の `\bibliography{ファイル名}` と `\bibliographystyle{スタイル名}` の記述

### ビルド手順

1. `.bib` ファイルが `.tex` ファイルと**同じフォルダー**にあることを確認する
2. 「Build with Recipe」で BibTeX を含むレシピを選択する
3. 文献リストが PDF に表示されていれば成功

---

## テンプレートを勝手に書き換えない

::: danger 重要
受け取ったテンプレートの `\documentclass` 行や `\usepackage` の設定を、自分で変更しないでください。

「LuaLaTeX に慣れているから」という理由で `\documentclass[uplatex]{jsarticle}` を `\documentclass{jlreq}` に変えると、レイアウトや出力結果が変わり、**先生や先輩が意図した形式ではなくなります**。

テンプレートが動かないときは、エンジンを変えるのではなく、適切なレシピを選ぶことで対処してください。
:::

---

## `test.tex` は動くが研究室テンプレートが動かない場合

基本的な切り分け手順です。

### ステップ 1：エンジンを確認する

テンプレートの `\documentclass` 行と先頭のコメントを見て、どのエンジンが必要か確認する（[→ エンジンの確認方法](#テンプレートが使うエンジンを確認する)）。

### ステップ 2：正しいレシピで「Build with Recipe」を実行する

自動ビルド（Ctrl+S）ではなく、`Ctrl + Shift + P` → 「Build with Recipe」でレシピを選択する。

### ステップ 3：OUTPUTタブのエラーを確認する

VS Code 下部の「OUTPUT」タブ → 「LaTeX Workshop」を選択し、末尾近くにある `!` や `Error:` で始まる行を見る。

| よく出るエラー | 対処 |
|---|---|
| `LaTeX Error: This file needs format 'pLaTeX2e' but this is 'LaTeX2e'.` | **誤レシピ。** LuaLaTeX（lualatex）で pLaTeX/upLaTeX 向けテンプレートをビルドした。「Build with Recipe」で正しいレシピを選び直す |
| `I couldn't open style file jplain.bst` | **誤BibTeXツール。** `bibtex`（標準）で日本語スタイルを使おうとしている。`upbibtex` または `pbibtex` を含むレシピを選ぶ |
| `! LaTeX Error: File 'jsarticle.cls' not found.` | TeX Live のインストールが不完全。`tlmgr install jsarticle` を実行 |
| `! LaTeX Error: File 'xxx.sty' not found.` | 必要なパッケージが未インストール。`tlmgr install xxx` を実行 |
| `! Undefined control sequence.` | コマンドのタイプミスか、必要なパッケージが読み込まれていない |
| `File 'figure.pdf' not found.` | 画像ファイルが .tex と同じフォルダーにない |
| `I found no \bibdata command` | `.bib` ファイルが見つからないか、`\bibliography{}` の引数が違う |

### ステップ 4：それでも解決しない場合

テンプレートを渡してくれた人に確認します。以下を伝えると早く解決します。

- どのレシピを選んで実行したか
- OUTPUTタブのエラーメッセージ（スクリーンショット）
- テンプレートのフォルダー構成（どのファイルがあるか）

---

## ここまでできればOK

- [ ] テンプレートの `\documentclass` 行を確認してエンジンの種類を判断できた
- [ ] `settings.json` に upLaTeX / pLaTeX 向けのレシピを追加した
- [ ] 「Build with Recipe」でテンプレートの適切なレシピを選んでビルドできた
- [ ] 日本語を編集して PDF に反映されることを確認した

---

## よくある問題

**`upLaTeX × 2 → dvipdfmx` を選んだが `dvipdfmx` が見つからないというエラーが出る**  
→ TeX Live のインストール後に PC を再起動していない可能性があります。再起動してから再試行してください。

**ビルドは成功しているが PDF の図番号が「??」になっている**  
→ 同じレシピをもう1〜2回実行してください。相互参照の解決には複数回のコンパイルが必要です。

**BibTeX レシピで `I found no \bibdata command` というエラー**  
→ `.tex` ファイル内の `\bibliography{ファイル名}` のファイル名と、実際の `.bib` ファイル名が一致しているか確認してください（拡張子 `.bib` は不要です）。

**テンプレートのフォルダーに複数の `.tex` ファイルがある**  
→ メインファイル（通常 `main.tex` や論文題目と同名のファイル）を開いてからビルドしてください。章ごとのファイル（`chapter1.tex` など）を直接開いてビルドしても動きません。

**`Ctrl+S` で保存したら「Recipe terminated with error」と出て、OUTPUT に `This file needs format 'pLaTeX2e' but this is 'LaTeX2e'.` と表示される**  
→ 自動ビルド（lualatex）が pLaTeX/upLaTeX 用テンプレートにかかったことが原因です。エラーは無視して「Build with Recipe」で正しいレシピを手動選択してください。自動ビルドのエラーはテンプレートのビルドには影響しません。

**BibTeX レシピで `I couldn't open style file jplain.bst` というエラー**  
→ `bibtex`（標準）を含むレシピが選ばれています。`upbibtex` または `pbibtex` を含むレシピに切り替えてください。

---

← [動作確認](./verify)　　次のステップ：[はじめての文書](/03-first-document/) →
