<template>
  <!-- eslint-disable -->
  <div class="navbar">
    <nuxt-link class="navbar__link" no-prefetch to="/" exact>Сайт</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/about">Обо мне</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/services">Услуги</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/projects">Проекты</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin/contacts">Контакты</nuxt-link>
    <nuxt-link class="navbar__link" no-prefetch exact to="/admin">SEO</nuxt-link>
  </div>
</template>

<script>
export default {

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
</style>
