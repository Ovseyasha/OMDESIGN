<template>
  <div class="list">
    <List :mode="'projects'" />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth']

}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  &__header {
    align-self: center;
  }
}
</style>
