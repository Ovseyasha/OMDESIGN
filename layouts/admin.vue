<template>
  <!-- eslint-disable -->
  <div class="admin">
    <AdminNavbar />
    <div class="admin__content">
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__faster animate__fadeIn"
        leave-active-class="animate__animated animate__faster animate__fadeOut "
      >
        <nuxt />
      </transition>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.admin {
  position: relative;
  width: 100%;
  height: 100%;
  &__content {
    padding-top: 5%;
    margin-left: 10%;
    width: 85%;
  }
}
</style>
