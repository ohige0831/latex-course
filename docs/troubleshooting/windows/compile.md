# コンパイルのトラブル

::: tip OUTPUTタブの開き方
VS Code 下部の「**OUTPUT**」タブ → 右のドロップダウンで「**LaTeX Workshop**」を選択してください。エラーの詳細がここに表示されます。
:::

---

## 保存してもコンパイルが始まらない

### 症状

`.tex` ファイルを `Ctrl + S` で保存しても、PDF が生成されず、OUTPUTタブに何も表示されない。

### 考えられる原因

- settings.json のレシピが設定されていない
- ファイルの拡張子が `.tex` になっていない
- ファイルがフォルダーとして VS Code に開かれていない

### まず試してください

1. VS Code 下部のステータスバーを見る。右端に「LaTeX Workshop」の文字が表示されているか確認する

   <!-- TODO(media): ステータスバーにLaTeX Workshopが表示されている状態 -->

2. ファイル名の末尾が `.tex` であることを確認する（[→ 拡張子が .txt になっているかも](./common-mistakes#ファイル拡張子が-txt-になっている)）

3. `Ctrl + Shift + P` → 「**LaTeX Workshop: Build with Recipe**」を選択して手動でビルドする

4. それでも始まらない場合は、OUTPUTタブを開いてエラーを確認する

### 解決しない場合

settings.json が正しく書かれているか確認してください。特に `latex-workshop.latex.recipes` と `latex-workshop.latex.recipe.default` が抜けていないか確認します（[→ settings.json の設定方法](/02-installation/windows/latex-workshop)）。

---

## Recipe terminated with error

### 症状

コンパイルを実行すると、VS Code の右下に「**Recipe terminated with error**」という通知が出る。

### 考えられる原因

- `.tex` ファイル内に文法エラーがある
- settings.json のレシピ設定が壊れている
- jlreq など必要なパッケージが見つからない

### まず試してください

1. OUTPUTタブ（LaTeX Workshop）を開く
2. **末尾から数行上**に注目する。`!` で始まる行を探す
3. その行にエラーの原因が書かれている

   ::: tip 例
   `! Undefined control sequence.` → コマンドのタイプミス  
   `! Emergency stop.` → ファイル全体が読めないレベルのエラー  
   `! LaTeX Error: File 'jlreq.cls' not found.` → パッケージ不足
   :::

4. エラーの種類に応じて、このページの該当項目を参照する

### 解決しない場合

OUTPUTタブの内容を全選択してコピーし、AI に「このエラーを日本語で説明してください」と貼り付けて質問してください。

---

## Undefined control sequence

### 症状

OUTPUTタブに `! Undefined control sequence.` と表示される。

### 考えられる原因

- LaTeXコマンドの**タイプミス**（バックスラッシュの後ろの綴りが違う）
- 使おうとしているコマンドが別のパッケージに含まれている

### まず試してください

1. OUTPUTタブで `! Undefined control sequence.` の次の行を見る。`\usepackag` などコマンド名が表示されている

2. 次の行に `l.25` のような表記がある場合、数字が `.tex` ファイルの**行番号**。その行を確認する

3. コマンド名の**綴りを確認**する（例：`\begin` を `\bigin` と書き間違えていないか）

<!-- TODO(media): OUTPUTタブでUndefined control sequenceのエラーを確認する様子 -->

### 解決しない場合

コマンド名をそのままウェブ検索すると、正しい綴りや必要なパッケージが見つかることがあります。AI に「LaTeX で ○○ を使うにはどのパッケージが必要ですか？」と質問するのも効果的です。

---

## Emergency stop

### 症状

OUTPUTタブに `! Emergency stop.` と表示される。ファイル全体がコンパイルできていない。

### 考えられる原因

- ファイルの冒頭（プリアンブル）に重大なエラーがある
- `\begin{document}` や `\end{document}` が書かれていない
- ファイルが空、または文字化けしている

### まず試してください

1. OUTPUTタブで `l.` で始まる行を探し、行番号を確認する（例：`l.3` なら3行目）
2. `.tex` ファイルのその行付近を確認する
3. 最小限の動作するファイルに戻して確認する：

   ```latex
   \documentclass{jlreq}
   \begin{document}
   テスト
   \end{document}
   ```
   
4. このファイルがコンパイルできれば、自分が書いた部分に問題がある。少しずつ内容を追加してどこでエラーが出るか確認する

### 解決しない場合

`.tex` ファイルの**文字コード**が UTF-8 になっているか確認してください。VS Code 右下に「UTF-8」と表示されていれば問題ありません。

---

## File not found / ファイルが見つからない

### 症状

OUTPUTタブに `! LaTeX Error: File 'xxx' not found.` と表示される。

### 考えられる原因

- 画像ファイルや別の `.tex` ファイルを参照しているが、そのファイルが存在しない
- ファイルのパスや名前が違う

### まず試してください

1. `'xxx'` の部分（クォートで囲まれたファイル名）を確認する
2. そのファイルが `.tex` ファイルと**同じフォルダー**にあるか確認する
3. ファイル名の**大文字・小文字・拡張子**が一致しているか確認する（`figure.png` と `Figure.PNG` は別物）

### 解決しない場合

ファイル名にスペースや日本語が含まれている場合に発生することがあります（[→ ファイル名・フォルダー名の問題](./common-mistakes)）。

---

## jlreq.cls not found

### 症状

OUTPUTタブに `! LaTeX Error: File 'jlreq.cls' not found.` と表示される。

### 考えられる原因

- TeX Live のインストールが途中で終わっている
- `jlreq` パッケージがインストールされていない

### まず試してください

1. コマンドプロンプトを**管理者として**開く

   ::: details 管理者としてコマンドプロンプトを開く方法
   スタートボタンを右クリック → 「ターミナル（管理者）」または「コマンドプロンプト（管理者）」を選択
   :::

2. 次のコマンドを入力して Enter を押す：
   ```
   tlmgr install jlreq
   ```
3. インストールが完了したら VS Code でもう一度コンパイルする

<!-- TODO(media): 管理者コマンドプロンプトでtlmgr install jlreqを実行する操作 -->

### 解決しない場合

`tlmgr` コマンド自体が見つからない場合は、TeX Live のインストールが完了していない可能性があります（[→ latex コマンドが見つからない](./texlive#latex-コマンドが見つからない-pathが認識されない)）。

---

## このページで解決しない場合

::: details AIへ質問するときのテンプレート

```
【環境】
OS: Windows 11
TeX Live: （コマンドプロンプトで "latex --version" を実行した結果）
VS Code バージョン: （ヘルプ > バージョン情報 で確認）
LaTeX Workshop バージョン: （拡張機能パネルで確認）

【症状】
（何をしたら何が起きたかを書く）

【OUTPUTタブの内容（LaTeX Workshop）】
（OUTPUTタブを全選択してコピーしたものを貼り付け）

【settings.jsonの内容】
（Ctrl+Shift+P → Open User Settings (JSON) で開いた内容を貼り付け）

【コンパイルしようとした.texファイルの内容】
（ファイルの内容をそのまま貼り付け）
```

:::

::: details 先輩へ質問するときに伝えること

- 教材の何ページの手順で詰まっているか
- OUTPUTタブのスクリーンショット（LaTeX Workshop を選択した状態）
- 使用した `.tex` ファイル（メールに添付するか、内容をコピーして送る）
- settings.json の内容

:::

---

← [Windows トラブルシューティング一覧](./index)
