import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ja',
  title: '猿でもわかる LaTeX導入講座',
  description: 'Windows初心者でも安心して使えるLaTeX環境の構築から基本的な文書作成まで丁寧に解説する講座です。',
  base: '/latex-course/',

  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: '環境構築', link: '/02-installation/' },
      { text: 'LaTeX入門', link: '/01-introduction/' },
      { text: 'トラブルシューティング', link: '/troubleshooting/' },
    ],

    sidebar: [
      {
        text: '第1章: LaTeXとは',
        items: [
          { text: 'LaTeXの概要', link: '/01-introduction/' },
        ],
      },
      {
        text: '第2章: 環境構築',
        items: [
          { text: '環境構築の概要', link: '/02-installation/' },
          { text: 'Windows', link: '/02-installation/windows/' },
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
        text: '第4章: 基本的な文章作成',
        items: [
          { text: '基本的な文章作成', link: '/04-basic-writing/' },
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
          { text: 'Windows固有の問題', link: '/troubleshooting/windows/' },
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
