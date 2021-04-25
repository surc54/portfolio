<template>
  <div class="h-full py-4 bg-white">
    <div class="mx-3">
      <sidebar-item class="my-1" icon="recent_actors">Resume</sidebar-item>
      <sidebar-item class="my-1" icon="assignment">Portfolio</sidebar-item>
    </div>
  </div>
</template>

<script>
import SidebarItem from './sidebar-item.vue'

export default {
  components: { SidebarItem }
}
</script>
