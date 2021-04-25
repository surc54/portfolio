<template>
  <div class="flex flex-col flex-nowrap h-full pt-4 bg-white">
    <div class="flex-1  mx-3">
      <sidebar-item class="my-1" icon="recent_actors">Resume</sidebar-item>
      <sidebar-item class="my-1" icon="assignment">Portfolio</sidebar-item>
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
