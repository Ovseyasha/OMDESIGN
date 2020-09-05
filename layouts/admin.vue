<template>
  <!-- eslint-disable -->
  <div class="admin">
    <AdminNavbar />
    <button class="admin__logout" @click="logout">Выйти</button>
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
  async beforeMount () {
    // пофиксить
    const user = await this.$store.dispatch('admin/getUid')
    if (user === 'null') {
      this.$router.push('/admin/login?msg=auth')
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('admin/logOut')
        this.$router.push('/admin/login')
      } catch (error) {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.admin {
  position: relative;
  width: 100%;
  height: 100%;
  &__logout {
    position: absolute;
    top: 1%;
    right: 1%;
  }
  &__content {
    padding-top: 5%;
    margin-left: 10%;
    width: 85%;
    @media (max-width: 1000px) {
      margin-left: 25%;
      width: 70%;
    }
  }
}
</style>
