import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ja',
  title: 'LaTeX導入講座',
  titleTemplate: ':title | LaTeX導入講座',
  description: '研究室に配属された学生が、環境構築から基本的な文書作成まで自力で進められることを目標とした入門教材です。',
  base: '/latex-course/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/latex-course/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/latex-course/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/latex-course/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/latex-course/apple-touch-icon.png' }],
  ],

  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'はじめに', link: '/preface/' },
      { text: '環境構築', link: '/02-installation/' },
      { text: 'LaTeX入門', link: '/01-introduction/' },
      { text: 'トラブルシューティング', link: '/troubleshooting/' },
    ],

    sidebar: [
      {
        text: 'はじめに',
        items: [
          { text: 'この教材について', link: '/preface/' },
        ],
      },
      {
        text: '第1章: LaTeXとは',
        items: [
          { text: 'LaTeXの概要', link: '/01-introduction/' },
        ],
      },
      {
        text: '第2章: 環境構築',
        items: [
          { text: '概要', link: '/02-installation/' },
          {
            text: 'Windows',
            collapsed: false,
            items: [
              { text: '準備と全体像', link: '/02-installation/windows/' },
              { text: 'TeX Liveのインストール', link: '/02-installation/windows/texlive' },
              { text: 'VS Codeのセットアップ', link: '/02-installation/windows/vscode' },
              { text: 'LaTeX Workshopの設定', link: '/02-installation/windows/latex-workshop' },
              { text: '動作確認', link: '/02-installation/windows/verify' },
              { text: '研究室テンプレートを動かす', link: '/02-installation/windows/lab-template' },
            ],
          },
          { text: 'macOS（準備中）', link: '/02-installation/macos/' },
          { text: 'Linux（準備中）', link: '/02-installation/linux/' },
          { text: 'Overleaf（準備中）', link: '/02-installation/overleaf/' },
        ],
      },
      {
        text: '第3章: はじめての文書',
        items: [
          { text: 'はじめての文書', link: '/03-first-document/' },
        ],
      },
      {
        text: '第4章: 基本的な文書作成',
        items: [
          { text: '基本的な文書作成', link: '/04-basic-writing/' },
        ],
      },
      {
        text: '第5章: 数式',
        items: [
          { text: '数式の書き方', link: '/05-math/' },
        ],
      },
      {
        text: '第6章: 図と表',
        items: [
          { text: '図と表の挿入', link: '/06-figures-tables/' },
        ],
      },
      {
        text: '第7章: レポートテンプレート',
        items: [
          { text: 'レポートテンプレート', link: '/07-template/' },
        ],
      },
      {
        text: 'トラブルシューティング',
        items: [
          { text: '概要', link: '/troubleshooting/' },
          { text: 'よくある問題（共通）', link: '/troubleshooting/common/' },
          {
            text: 'Windows',
            collapsed: false,
            items: [
              { text: '一覧', link: '/troubleshooting/windows/' },
              { text: 'TeX Live', link: '/troubleshooting/windows/texlive' },
              { text: 'VS Code', link: '/troubleshooting/windows/vscode' },
              { text: 'コンパイル', link: '/troubleshooting/windows/compile' },
              { text: 'PDF表示', link: '/troubleshooting/windows/pdf' },
              { text: '日本語', link: '/troubleshooting/windows/japanese' },
              { text: 'よくあるミス', link: '/troubleshooting/windows/common-mistakes' },
            ],
          },
          { text: 'macOS固有の問題（準備中）', link: '/troubleshooting/macos/' },
          { text: 'Linux固有の問題（準備中）', link: '/troubleshooting/linux/' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    darkModeSwitchLabel: 'ダークモード',
    lightModeSwitchTitle: 'ライトモードに切り替え',
    darkModeSwitchTitle: 'ダークモードに切り替え',
    sidebarMenuLabel: 'メニュー',
    returnToTopLabel: 'トップへ戻る',

    outline: {
      label: 'このページの目次',
    },

    docFooter: {
      prev: '前のページ',
      next: '次のページ',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ohige0831/latex-course' },
    ],

    footer: {
      message: 'MIT License',
      copyright: 'Copyright &copy; 2026',
    },
  },
})
