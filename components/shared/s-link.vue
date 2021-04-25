<template>
  <nuxt-link v-if="!external" :to="to" v-bind="$attrs">
    <slot />
  </nuxt-link>
  <a v-else :href="to" v-bind="$attrs" rel="noreferred noopener" :target="!noPopup ? '_blank' : undefined">
    <slot />
  </a>
</template>

<script>
export default {
  name: 's-link',
  props: {
    to: {
      type: String,
      default: '#'
    },
    external: Boolean,
    noPopup: Boolean
  }
}
</script>
