<template>
  <div class="min-h-screen bg-gray-100">
    <sidebar class="fixed top-0 left-0 h-screen w-80" />
    <main class="pl-80">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/sidebar'

export default {
  components: { Sidebar }
}
</script>
