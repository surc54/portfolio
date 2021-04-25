<template>
  <div class="h-full bg-gray-100">
    <sidebar class="fixed top-0 left-0 h-screen w-80 shadow-lg" />
    <main class="pl-80 h-full">
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
