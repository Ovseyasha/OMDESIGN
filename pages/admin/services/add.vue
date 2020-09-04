<template>
  <div class="add">
    <Views :mode="'add'" :category="'service'" />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth']

}
</script>

<style scoped>
</style>
