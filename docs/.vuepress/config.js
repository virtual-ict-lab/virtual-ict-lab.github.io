import { blogPlugin } from '@vuepress/plugin-blog'
import { feedPlugin } from '@vuepress/plugin-feed'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { readingTimePlugin } from '@vuepress/plugin-reading-time'
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'ja-JP',
  shouldPrefetch: false,

  title: 'Virtual ICT Lab',
  description: 'ICTの学びと実践を共有するブログ',

  theme: defaultTheme({
    hostname: 'https://virtual-ict-lab.github.io/',
    lastUpdated: false,
    contributors: false,
    themePlugins: {
      prismjs: false,
      copyCode: { showInMobile: true },
      tab: { tabs: true, codeTabs: true },
      sitemap: true,
      seo: true,
      mediumZoom: false,
      hint: true,
      nprogress: true,
      linksCheck: false,
      git: { createdTime: true, updatedTime: true, contributors: false },
    },
    logo: '/icons/icon.svg',
    lastUpdatedText: '最終更新',
    contributorsText: '執筆者',
    editLinkText: 'このページを編集',
    selectLanguageText: '言語',
    selectLanguageAriaLabel: '言語を選択',
    openInNewWindow: '新しいウィンドウで開く',
    toggleColorMode: 'カラーモードを切り替える',
    toggleSidebar: 'サイドバーを切り替える',
    locales: { '/': { selectLanguageName: '日本語' } },
    backToHome: 'ホームに戻る',
    notFound: ['ページが見つかりません。'],
    tip: 'ヒント',
    warning: '注意',
    danger: '警告',
    important: '重要',
    note: '補足',

    navbar: [
      '/',
      {
        text: '記事',
        link: '/article/',
      },
      {
        text: 'タグ',
        link: '/tag/',
      },
      {
        text: 'タイムライン',
        link: '/timeline/',
      },
    ],
  }),

  plugins: [
    {
      name: 'local-page-meta',
      extendsPage(page) {
        const content = page.contentRendered.replace(/<!--[\s\S]*?-->/g, '')
        page.data.hasPageMeta = /<(?:PageMeta|page-meta)(?=[\s/>])/.test(content)
      },
    },
    markdownExtPlugin({ footnote: true, cjkFriendly: false }),
    markdownMathPlugin({ type: 'katex' }),
    mdEnhancePlugin({ demo: true }),
    readingTimePlugin(),
    photoSwipePlugin(),
    feedPlugin({
      hostname: 'https://virtual-ict-lab.github.io/',
      rss: true,
      atom: true,
      json: true,
      filter: ({ filePathRelative }) => filePathRelative?.startsWith('posts/') ?? false,
    }),
    pwaPlugin({
      themeColor: '#8839ef',
      cacheHTML: true,
      update: 'hint',
      manifest: {
        name: 'Virtual ICT Lab',
        short_name: 'ICT Lab',
        lang: 'ja',
        description: 'ICTの学びと実践を共有するブログ',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        background_color: '#eff1f5',
        theme_color: '#8839ef',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
    redirectPlugin({ config: { '/posts/article1.html': '/posts/welcome.html' } }),
    slimsearchPlugin(),
    shikiPlugin({
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'scss', 'json', 'yaml', 'bash', 'markdown', 'python'],
    }),
    markdownChartPlugin({ chartjs: true, echarts: true, mermaid: true }),
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        readingTime: data.readingTime || null,
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string'
            ? frontmatter.excerpt
            : data?.excerpt || '',
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'tag',
          getter: (page) => page.frontmatter.tag || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({
            title: 'タグ',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `タグ: ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: 'article',
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: 'Article',
          frontmatter: () => ({
            title: '記事一覧',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          },
        },
        {
          key: 'timeline',
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: 'Timeline',
          frontmatter: () => ({
            title: 'タイムライン',
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      // Prebundle Mermaid's CommonJS dependencies for the development server
      optimizeDeps: { include: ['mermaid'] },
      ssr: { noExternal: ['@vuepress/search-helper'] },
    },
  }),
})
