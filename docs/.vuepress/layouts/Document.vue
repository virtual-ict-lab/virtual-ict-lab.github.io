<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { usePageData } from 'vuepress/client'
import PageHeaderMeta from '../components/PageHeaderMeta.vue'

const page = usePageData()
</script>

<template>
  <ParentLayout>
    <template #page-content-top>
      <PageHeaderMeta v-if="page.frontmatter.pageMeta !== false && !page.hasPageMeta" />
    </template>
  </ParentLayout>
</template>
