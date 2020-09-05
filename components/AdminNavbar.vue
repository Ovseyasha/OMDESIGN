<template>
  <!-- eslint-disable -->
  <div class="navbar">
    <nuxt-link class="navbar__link" no-prefetch to="/" exact>Сайт</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/about">Обо мне</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/services">Услуги</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/projects">Проекты</nuxt-link>
    <nuxt-link class="navbar__link con" no-prefetch exact to="/admin/contacts">
      Контакты
      <span v-if="mailCount > 0">{{mailCount}}</span>
    </nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin">SEO</nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    mailCount () {
      return this.$store.getters['contacts/mails'].length
    }
  },
  async mounted () {
    await this.$store.dispatch('contacts/loadMails')
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  background: #a0c601;
  .nuxt-link-active {
    background: darken(#a0c601, 10%);
  }
  &__link {
    @media (max-width: 1000px) {
      font-size: 14px;
      padding: 0 5px;
    }
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    height: 16.6vh;
    transition: background-color ease-in-out 0.4s;
    &:hover {
      background: darken(#a0c601, 5%);
    }
  }
}
.con{
  display: flex;
  flex-direction: column;
  span{
    &::before{
      content: 'New - ';
      color: brown;
    }
  }
}
</style>
