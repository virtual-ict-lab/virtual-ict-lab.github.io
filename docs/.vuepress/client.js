import { defineClientConfig } from 'vuepress/client'
import { getSearchClientConfig, setSearchClientConfig } from '@vuepress/plugin-slimsearch/client'
import AuthorProfile from './components/AuthorProfile.vue'
import FootnotePreview from './components/FootnotePreview.vue'
import PageHeaderMeta from './components/PageHeaderMeta.vue'
import Article from './layouts/Article.vue'
import Document from './layouts/Document.vue'
import Tag from './layouts/Tag.vue'
import Timeline from './layouts/Timeline.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('AuthorProfile', AuthorProfile)
    app.component('PageMeta', PageHeaderMeta)

    if (import.meta.env.DEV) {
      const searchConfig = getSearchClientConfig()
      const devWorker = searchConfig.devWorker

      // rc.137 resolves the dev worker inside dist/client instead of dist
      if (devWorker?.pathname.endsWith('/dist/client/worker/dev.js')) {
        const workerURL = new URL(devWorker)
        workerURL.pathname = workerURL.pathname.replace('/dist/client/worker/', '/dist/worker/')
        setSearchClientConfig({ ...searchConfig, devWorker: workerURL })
      }
    }
  },
  // we provide some blog layouts
  layouts: {
    Layout: Document,
    Article,
    Tag,
    Timeline,
  },
  rootComponents: [FootnotePreview],
})
