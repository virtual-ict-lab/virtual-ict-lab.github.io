<script setup>
defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
})
</script>

<template>
  <div class="article-wrapper">
    <div v-if="!items.length">記事はまだありません。</div>

    <article
      v-for="{ info, path } in items"
      :key="path"
      class="article"
      @click="$router.push(path)"
    >
      <header class="title">
        {{
          (isTimeline ? `${new Date(info.date).toLocaleDateString('ja-JP')}: ` : '') +
          info.title
        }}
      </header>

      <hr />

      <div class="article-info">
        <span v-if="info.author" class="author">執筆者: {{ info.author }}</span>

        <span v-if="info.date && !isTimeline" class="date"
          >公開日: {{ new Date(info.date).toLocaleDateString('ja-JP') }}</span
        >

        <span v-if="info.category?.length" class="category"
          >カテゴリー: {{ info.category.join(', ') }}</span
        >

        <span v-if="info.tag?.length" class="tag">タグ: {{ info.tag.join(', ') }}</span>
        <span v-if="info.readingTime" class="reading-time">
          読了目安: {{ Math.max(1, Math.ceil(info.readingTime.minutes)) }}分
        </span>
      </div>

      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';

.article-wrapper {
  @include mixins.content-wrapper;
  padding-top: calc(var(--navbar-height) + 1rem) !important;
  text-align: center;
}

.article {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.4rem;

  color: var(--vp-c-text);

  text-align: start;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .title {
    position: relative;
    display: inline-block;
    font-size: 1.28rem;
    line-height: 2rem;

    &::after {
      content: '';

      position: absolute;
      inset-inline-start: 0;
      bottom: 0;

      width: 100%;
      height: 2px;

      background: var(--vp-c-accent-bg);

      visibility: hidden;

      transition: transform var(--vp-t-transform);

      transform: scaleX(0);
    }

    &:hover::after {
      visibility: visible;
    }
  }

  .article-info {
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;

    > span {
      margin-inline-end: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }

    h2 {
      font-size: 1.2em;
    }

    h3 {
      font-size: 1.15em;
    }
  }
}
</style>
