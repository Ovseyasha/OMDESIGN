<template>
  <Views :mode="'add'" :category="'project'" />
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth']

}
</script>

<style scoped>
</style>
