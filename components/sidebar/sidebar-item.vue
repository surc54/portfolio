<template>
  <button class="flex items-center w-full p-3 rounded-lg border-gray-200 border hover:shadow-md transition-all">
    <div
      class="flex items-center justify-center w-8 h-8 mr-3 rounded-md shadow-md bg-gradient-to-br from-blue-500 to-purple-500 text-white"
      :class="{ 'opacity-0': !icon }"
    >
      <span class="material-icons text-lg">{{ icon }}</span>
    </div>
    <p class="font-medium text-base">
      <slot />
    </p>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'info'
    }
  }
}
</script>
