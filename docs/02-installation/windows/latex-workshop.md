# LaTeX Workshopの設定

## このページでできること

- VS CodeにLaTeX Workshop拡張機能をインストールする
- LuaLaTeXでコンパイルできるように設定する

---

## LaTeX Workshopとは

**LaTeX Workshop** は、VS Code上でLaTeXファイルの編集・コンパイル・PDF表示を行うための拡張機能です。`.tex` ファイルを保存するたびに自動でコンパイルする機能や、ソースとPDFの間でジャンプする機能（SyncTeX）などが含まれています。

---

## 拡張機能のインストール

1. VS Codeを起動する
2. 左側のアイコンバーから **拡張機能**（四角いアイコン）をクリックする
3. 検索欄に「LaTeX Workshop」と入力する
4. **「LaTeX Workshop」**（James Yu作）をインストールする

<!-- TODO(media): LaTeX Workshopを検索してインストールボタンをクリックする操作 -->

インストールが完了すると、左のアイコンバーにTeX関連のアイコンが追加されます。

---

## LuaLaTeX向けの設定

LaTeX Workshopのデフォルト設定はpdfLaTeXを使います。LuaLaTeXを使うように変更します。

### 設定ファイルを開く

1. VS Codeで `Ctrl + Shift + P` を押してコマンドパレットを開く
2. 「Open User Settings (JSON)」と入力して選択する

<!-- TODO(media): コマンドパレットからOpen User Settings (JSON)を開く操作 -->

`settings.json` が開きます。

### 設定を追加する

`settings.json` に次の内容を追加します。既に `{` と `}` で囲まれた内容がある場合は、最後の `}` の直前に追加してください。

```json
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
  }
],
"latex-workshop.latex.recipes": [
  {
    "name": "lualatex",
    "tools": ["lualatex"]
  }
],
"latex-workshop.latex.recipe.default": "lualatex"
```

<!-- TODO(media): settings.jsonに上記の設定を追加して保存する操作 -->

::: details settings.json 全体の例（何も書かれていなかった場合）

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
    }
  ],
  "latex-workshop.latex.recipes": [
    {
      "name": "lualatex",
      "tools": ["lualatex"]
    }
  ],
  "latex-workshop.latex.recipe.default": "lualatex"
}
```

:::

### 設定を保存する

`Ctrl + S` を押してファイルを保存します。

---

## ここまでできればOK

- [ ] LaTeX Workshopが拡張機能としてインストールされた
- [ ] `settings.json` にLuaLaTeX向けの設定を追加して保存した

---

## よくある問題

**`settings.json` を開いたら何か書いてあった**  
→ 既存の内容の末尾の `}` の前に設定を追加してください。カンマ（`,`）の付け忘れに注意してください。

**設定を保存したのに有効にならない**  
→ VS Codeを再起動してから再度試してください。

---

次のステップ：[動作確認](./verify) →
