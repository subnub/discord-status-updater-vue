<template>
  <header class="w-full bg-primary flex justify-between fixed shadow-lg">
    <h3
      class="text-lg text-white p-4 cursor-pointer select-none"
      @click="$router.push('/')"
    >
      Discord Status Updater
    </h3>
    <div class="flex items-center p-4">
      <nuxt-link
        to="/create"
        class="text-white hover:text-secondary cursor-pointer select-none mr-3"
      >
        Create Message
      </nuxt-link>
      <nuxt-link
        to="/settings"
        class="text-white hover:text-secondary cursor-pointer select-none"
      >
        Settings
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
