<template>
  <!-- eslint-disable -->
  <div class="links">
    <div class="links__main" v-if="!main">
      <nuxt-link class="links__item" to="/">
        <h1>OMDESIGN</h1>
      </nuxt-link>
    </div>
    <nuxt-link class="links__item" to="/about">Обо мне</nuxt-link>
    <nuxt-link class="links__item" to="/services">Услуги</nuxt-link>
    <nuxt-link class="links__item" to="/projects">Портфолио</nuxt-link>
    <nuxt-link class="links__item" to="/contacts">Контакты</nuxt-link>

    <div class="links__hr animate__animated animate__fadeIn" :style="width"></div>
  </div>
</template>

<script>
export default {
  props: {
    main: Boolean
  },
  computed: {
    width () {
      const path = this.$route.path
      const pos = {
        width: '25%'
      }
      if (path === '/about') {
        pos.left = '-24px'
      } else if (path === '/services') {
        pos.left = '17.5%'
      } else if (path === '/projects') {
        pos.left = '43%'
      } else if (path === '/contacts') {
        pos.left = '71%'
      } else {
        pos.left = '-300%'
      }
      return pos
    }
  }
}
</script>

<style lang="less">
.links {
  top: 2%;
  position: fixed;
  z-index: 100000;
  right: 2%;
  &__main {
    position: fixed;
    left: 2%;
    font-size: 30px;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    transition: all 0.4s;
  }
  &__item {
    width: 25%;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    letter-spacing: 0.09em;
    text-transform: uppercase;
    text-decoration: none;
    color: #000;
    // margin-right: 40px;
    transition: all 0.4s;
    margin-right: 40px;
    &:hover {
      color: #a0c601;
    }
  }

  &__hr {
    background: #a0c601;
    height: 1px;
    width: 0;
    // width: 25%;
    transition: all 0.3s;
    position: relative;
    // animation: wwww 1s;
  }
}
// @keyframes wwww {
//   0% {
//     opacity: 0;
//   }
// }
</style>
