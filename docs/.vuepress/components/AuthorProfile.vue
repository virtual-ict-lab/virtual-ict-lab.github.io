<script setup>
import { IconBrandGithub, IconBrandX, IconExternalLink, IconUser } from '@tabler/icons-vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  links: {
    type: Array,
    default: () => [],
  },
})

const socialIcons = {
  github: IconBrandGithub,
  x: IconBrandX,
}
</script>

<template>
  <section class="author-profile" :aria-label="`${name}のプロフィール`">
    <div class="author-profile-identity">
      <span class="author-profile-avatar">
        <img v-if="avatar" :src="avatar" alt="" width="32" height="32" loading="lazy" />
        <IconUser v-else :size="20" aria-hidden="true" />
      </span>
      <span class="author-profile-name">{{ name }}</span>
    </div>

    <p v-if="bio" class="author-profile-bio">{{ bio }}</p>

    <div v-if="links.length" class="author-profile-links">
      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        :title="link.label"
        :aria-label="`${link.label}（新しいウィンドウで開く）`"
        target="_blank"
        rel="noopener noreferrer"
        class="author-profile-link no-external-link-icon"
      >
        <component :is="socialIcons[link.icon] || IconExternalLink" :size="20" aria-hidden="true" />
        <span v-if="!socialIcons[link.icon]">{{ link.label }}</span>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
.author-profile {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.6rem;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text);

  .author-profile-identity {
    display: flex;
    grid-column: 1;
    gap: 0.625rem;
    align-items: center;
    min-width: 0;
  }

  .author-profile-avatar {
    display: flex;
    flex: 0 0 32px;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    background: var(--vp-c-bg-elv);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .author-profile-name {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  .author-profile-bio {
    grid-column: 1;
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    white-space: pre-line;
    overflow-wrap: anywhere;
  }

  .author-profile-links {
    display: flex;
    grid-column: 2;
    grid-row: 1;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: flex-start;
    align-self: start;
    justify-content: flex-end;
    max-width: 16rem;
  }

  .author-profile-links .author-profile-link {
    display: inline-flex;
    box-sizing: border-box;
    gap: 0.375rem;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    min-height: 36px;
    max-width: 100%;
    padding: 0.375rem;
    border: 1px solid var(--vp-c-border);
    border-radius: 0.35rem;
    color: inherit;
    font-size: 0.875rem;
    line-height: 1.5;
    text-decoration: none;
    overflow-wrap: anywhere;

    svg {
      flex-shrink: 0;
    }

    &:hover,
    &:focus-visible {
      background: var(--vp-c-accent-soft);
      color: var(--vp-c-accent);
      text-decoration: none;
    }
  }

  @media (max-width: 599px) {
    grid-template-columns: minmax(0, 1fr);

    .author-profile-links {
      grid-column: 1;
      grid-row: auto;
      justify-content: flex-start;
      max-width: none;
    }
  }
}
</style>
