<template>
  <div class="flex flex-col flex-nowrap h-full pt-4 bg-white">
    <h1 class="mx-3 my-6 text-lg font-bold">
      Adithya Haridas
    </h1>

    <div class="flex-1 mx-3">
      <sidebar-item icon="recent_actors" to="/resume" active>Resume</sidebar-item>
      <sidebar-item icon="assignment" to="/portfolio">Portfolio</sidebar-item>
      <sidebar-item to="https://www.github.com/surc54" external>GitHub</sidebar-item>
      <sidebar-item to="https://www.linkedin.com/in/surc" external>LinkedIn</sidebar-item>
    </div>

    <sidebar-footer />
  </div>
</template>

<script>
import SidebarFooter from './sidebar-footer.vue'
import SidebarItem from './sidebar-item.vue'

export default {
  components: { SidebarItem, SidebarFooter }
}
</script>
