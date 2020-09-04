<template>
  <div class="edit">
    <Views :mode="'edit'" :category="'project'" />
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
