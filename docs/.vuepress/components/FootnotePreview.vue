<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoutePath } from 'vuepress/client'

const preview = ref(null)
const panel = ref(null)
const position = ref({})
const routePath = useRoutePath()
let activeAnchor = null
let closeTimer

const cancelClose = () => clearTimeout(closeTimer)

const hide = () => {
  cancelClose()
  activeAnchor?.removeAttribute('aria-controls')
  activeAnchor?.removeAttribute('aria-expanded')
  activeAnchor?.removeAttribute('aria-haspopup')
  activeAnchor = null
  preview.value = null
}

const scheduleClose = () => {
  cancelClose()
  closeTimer = setTimeout(hide, 180)
}

const updatePosition = () => {
  if (!activeAnchor || !panel.value) return
  const width = Math.min(360, window.innerWidth - 24)
  const bounds = activeAnchor.getBoundingClientRect()
  const height = panel.value.offsetHeight
  const top = bounds.top >= height + 20 ? bounds.top - height - 10 : bounds.bottom + 10
  position.value = {
    width: `${width}px`,
    left: `${Math.max(12, Math.min(bounds.left - width / 2, window.innerWidth - width - 12))}px`,
    top: `${Math.max(12, Math.min(top, window.innerHeight - height - 12))}px`,
  }
}

const show = async (anchor) => {
  cancelClose()
  if (anchor === activeAnchor) return

  const target = document.getElementById(decodeURIComponent(anchor.hash.slice(1)))
  const source = target?.closest('p, li, blockquote, h1, h2, h3, h4, h5, h6')
  if (!source) return

  const content = source.cloneNode(true)
  content.querySelectorAll('.footnote-ref').forEach((node) => node.remove())
  const text = content.textContent.replace(/\s+/g, ' ').trim()
  if (!text) return

  hide()
  activeAnchor = anchor
  anchor.setAttribute('aria-controls', 'footnote-source-preview')
  anchor.setAttribute('aria-expanded', 'true')
  anchor.setAttribute('aria-haspopup', 'dialog')
  preview.value = {
    text: text.length > 280 ? `${text.slice(0, 280)}…` : text,
    href: anchor.getAttribute('href'),
  }

  const width = Math.min(360, window.innerWidth - 24)
  position.value = { width: `${width}px`, visibility: 'hidden' }
  await nextTick()
  if (anchor !== activeAnchor || !panel.value) return

  updatePosition()
}

const onEnter = (event) => {
  if (event.pointerType === 'touch') return
  if (panel.value?.contains(event.target)) {
    cancelClose()
    return
  }
  const anchor = event.target instanceof Element ? event.target.closest('a.footnote-backref') : null
  if (anchor) show(anchor)
}

const onLeave = (event) => {
  if (!activeAnchor) return
  if (
    event.type === 'pointerout' &&
    (document.activeElement === activeAnchor || panel.value?.contains(document.activeElement))
  ) return
  if (activeAnchor.contains(event.relatedTarget) || panel.value?.contains(event.relatedTarget)) return
  if (activeAnchor.contains(event.target) || panel.value?.contains(event.target)) scheduleClose()
}

const onScroll = () => {
  if (activeAnchor && document.activeElement === activeAnchor) {
    const bounds = activeAnchor.getBoundingClientRect()
    if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
      updatePosition()
      return
    }
  }
  hide()
}

const onKeydown = (event) => {
  if (!activeAnchor) return
  if (event.key === 'Escape') {
    const anchor = activeAnchor
    if (panel.value?.contains(document.activeElement)) anchor.focus()
    hide()
  } else if (event.key === 'Tab' && !event.shiftKey && event.target === activeAnchor) {
    event.preventDefault()
    panel.value?.querySelector('a').focus()
  } else if (event.key === 'Tab' && panel.value?.contains(event.target)) {
    if (event.shiftKey) {
      event.preventDefault()
      activeAnchor.focus()
    } else {
      const controls = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
        .filter((element) =>
          element.tabIndex >= 0 &&
          !element.disabled &&
          element.getClientRects().length &&
          !panel.value.contains(element),
        )
      const nextControl = controls[controls.indexOf(activeAnchor) + 1]
      if (nextControl) event.preventDefault()
      hide()
      nextControl?.focus()
    }
  }
}

watch(routePath, hide)

onMounted(() => {
  document.addEventListener('pointerover', onEnter)
  document.addEventListener('pointerout', onLeave)
  document.addEventListener('focusin', onEnter)
  document.addEventListener('focusout', onLeave)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, true)
  window.addEventListener('resize', hide)
})

onBeforeUnmount(() => {
  hide()
  document.removeEventListener('pointerover', onEnter)
  document.removeEventListener('pointerout', onLeave)
  document.removeEventListener('focusin', onEnter)
  document.removeEventListener('focusout', onLeave)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', hide)
})
</script>

<template>
  <aside
    v-if="preview"
    id="footnote-source-preview"
    ref="panel"
    class="footnote-source-preview"
    role="dialog"
    aria-label="脚注を参照している本文"
    :style="position"
  >
    <strong>元の本文</strong>
    <p>{{ preview.text }}</p>
    <a :href="preview.href" @click="hide">本文へ戻る</a>
  </aside>
</template>

<style lang="scss">
.footnote-source-preview {
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  padding: 0.875rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-elv);
  box-shadow: 0 4px 20px var(--vp-c-shadow);
  color: var(--vp-c-text);
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-wrap: anywhere;

  p {
    margin: 0.5rem 0;
  }

  a {
    color: var(--vp-c-accent);
  }
}
</style>
