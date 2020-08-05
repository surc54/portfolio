<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <img class="mb-8" :src="image" alt />
    <h1 class="text-2xl">Maintenance mode</h1>

    <p class="mt-4">
      This webpage is under maintenance mode.
      <br />
      <br />
      <md-button class="md-accent" href="https://www.hadithya.com/">
        Go to main website
      </md-button>
    </p>
  </div>
</template>

<script>
import Vue from 'vue'
import img from '@/assets/images/undraw_under_construction_46pa.svg'

export default Vue.extend({
  name: 'maintenance',
  components: {
  },
  data: function () {
    return {
      image: img
    }
  }
})
</script>

<style lang="scss" scoped>
img {
  @apply w-full;

  max-width: 300px;
}
</style>
