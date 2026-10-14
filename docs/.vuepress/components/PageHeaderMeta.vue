<script setup>
import { IconCalendar, IconClock } from '@tabler/icons-vue'
import { useLastUpdated } from '@vuepress/plugin-git/client'
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'

const props = defineProps({
  showUpdated: {
    type: Boolean,
    default: true,
  },
  showReadingTime: {
    type: Boolean,
    default: true,
  },
})

const page = usePageData()
const lastUpdated = useLastUpdated(() => props.showUpdated && page.value.frontmatter.lastUpdated !== false)
const readingMinutes = computed(() => {
  if (!props.showReadingTime) return null
  const minutes = page.value.readingTime?.minutes
  return typeof minutes === 'number' ? Math.max(1, Math.ceil(minutes)) : null
})
</script>

<template>
  <div v-if="lastUpdated || readingMinutes" class="page-header-meta">
    <span v-if="lastUpdated">
      <IconCalendar :size="18" aria-hidden="true" />
      最終更新:
      <time :datetime="lastUpdated.iso" data-allow-mismatch>{{ lastUpdated.text }}</time>
    </span>
    <span v-if="readingMinutes">
      <IconClock :size="18" aria-hidden="true" />
      読了目安: {{ readingMinutes }}分
    </span>
  </div>
</template>

<style lang="scss">
.page-header-meta {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin: 1rem 0;
  color: var(--vp-c-text-mute);
  font-size: 0.875rem;
  line-height: 1.6;

  > span {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    align-items: center;
  }
}
</style>
