# VS Code のトラブル

---

## LaTeX Workshopが拡張機能に表示されない

### 症状

拡張機能の検索欄に「LaTeX Workshop」と入力しても、目的の拡張機能が出てこない、またはインストールボタンが表示されない。

### 考えられる原因

- インターネット接続の問題
- VS Code のマーケットプレイスへの接続がプロキシ等でブロックされている
- 検索ワードが微妙に異なる

### まず試してください

1. 検索欄に「**latex workshop**」（すべて小文字）と入力し直す
2. 作者名が「**James Yu**」のものを選ぶ
3. インターネットに接続できているか確認する
4. VS Code を一度終了し、再起動してから再試行する

<!-- TODO(media): LaTeX Workshopを検索してJames Yu作のものをインストールする操作 -->

::: tip 見分け方
正しい拡張機能のIDは `james-yu.latex-workshop` です。インストール画面に表示されているIDを確認してください。
:::

### 解決しない場合

- VS Code のメニューから「ヘルプ」→「更新プログラムの確認」で VS Code を最新版にしてから再試行する
- 学内のネットワーク（Wi-Fiや有線）を使っている場合、プロキシ設定が原因のことがあります。スマートフォンのテザリングなど別の回線で試してみてください

---

## settings.json の場所がわからない・開けない

### 症状

「settings.json に設定を書いてください」と言われたが、どこにあるかわからない。ファイルが見当たらない。

### 考えられる原因

- settings.json は初期状態では空（存在しても `{}` だけ）
- VS Code のUI越しにしか開いたことがない

### まず試してください

1. VS Code を開く
2. `Ctrl + Shift + P` を押してコマンドパレットを開く
3. 「**Open User Settings (JSON)**」と入力して Enter を押す
4. settings.json が開く

<!-- TODO(media): コマンドパレットでOpen User Settings (JSON)を開く操作 -->

::: tip ファイルの場所
settings.json の実際の場所は  
`C:\Users\（あなたのユーザー名）\AppData\Roaming\Code\User\settings.json`  
にあります。中身が `{}` だけなら正常です。
:::

### 解決しない場合

- コマンドパレットに「Open User Settings (JSON)」が出てこない場合は、VS Code のバージョンが古い可能性があります。「ヘルプ」→「更新プログラムの確認」で最新版にしてください

---

## settings.json を保存したら「JSONエラー」になる

### 症状

settings.json を編集して保存すると、VS Code が赤い下線を表示したり、「JSON内に問題があります」と警告が出る。

### 考えられる原因

- カンマ（`,`）の付け忘れ・余分なカンマ
- `{` や `}` `[` `]` のペアが合っていない
- 引用符（`"`）が全角になっている

### まず試してください

1. settings.json の全体を以下の例と**見比べる**：
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
2. VS Code が赤い下線をつけている行の近くを重点的に確認する
3. **よくあるミス**：
   - 最後のエントリの後ろにカンマがある（ `"lualatex"` の後ろに `,` があるなど）
   - `"` が `"` や `"` など全角の引用符になっている

::: tip 一番早い修正法
settings.json の内容を全部消して、上のサンプルをそのままコピー&ペーストしてください。元の内容は手元にメモしておくか、別ファイルに保存してから消してください。
:::

### 解決しない場合

settings.json の内容をそのままコピーして AI（ChatGPT や Claude 等）に「このJSONはどこがおかしいですか？」と聞くと、問題箇所を指摘してくれます。

---

## 拡張機能をインストールしたのに有効にならない

### 症状

LaTeX Workshop をインストールしたはずなのに、`.tex` ファイルを開いても LaTeX Workshop のメニューが表示されない。

### 考えられる原因

- VS Code の再起動が必要
- 拡張機能が無効化されている

### まず試してください

1. VS Code を**完全に終了**してから再起動する
2. 再起動後、`.tex` ファイルを開く
3. 画面左のアイコンバーに TeX のアイコンが増えていれば有効になっている

<!-- TODO(media): LaTeX WorkshopのアイコンがVS Code左側に表示されている状態 -->

### 解決しない場合

1. 拡張機能パネルを開き、LaTeX Workshop を探す
2. 「無効にする」ボタンが表示されている場合は、すでに有効です。「有効にする」と表示されている場合は、クリックして有効にする
3. それでも表示されない場合は、拡張機能をいったんアンインストールし、VS Code を再起動してから再インストールする

---

## このページで解決しない場合

::: details AIへ質問するときのテンプレート

```
【環境】
OS: Windows 11
VS Code バージョン: （ヘルプ > バージョン情報 で確認）
LaTeX Workshop バージョン: （拡張機能パネルで確認）

【症状】
（何をしたら何が起きたかを具体的に書く）

【settings.jsonの内容】
（Ctrl+Shift+P → Open User Settings (JSON) で開いた内容を貼り付け）

【スクリーンショット】
（画面全体のスクリーンショットを添付）
```

:::

::: details 先輩へ質問するときに伝えること

- 教材の何ページの手順で詰まっているか
- 拡張機能パネルのスクリーンショット
- settings.json の内容
- VS Code の画面全体のスクリーンショット

:::

---

← [Windows トラブルシューティング一覧](./index)
