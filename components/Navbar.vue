<template>
  <!-- eslint-disable -->
  <div
    class="nav"
    :style="scroll >= 90 ? 'border-bottom: 2px solid rgb(160, 198, 1); background: rgb(237, 237, 237)' : ''"
  >
    <div class="nav__main">
      <nuxt-link to="/" v-if="!main">OMDESIGN</nuxt-link>
    </div>
    <div class="links">
      <nuxt-link class="links__item" no-prefetch to="/about">Обо мне</nuxt-link>
      <nuxt-link class="links__item" no-prefetch to="/services">Услуги</nuxt-link>
      <nuxt-link class="links__item" no-prefetch to="/projects">Портфолио</nuxt-link>
      <nuxt-link class="links__item" no-prefetch to="/contacts">Контакты</nuxt-link>

      <div class="links__hr" :style="width"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    main: Boolean
  },
  data () {
    return {
      scroll: null
    }
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
        pos.left = '-35%'
      }
      return pos
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handlescroll)
  },
  methods: {
    handlescroll () {
      this.scroll = window.scrollY
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  transition: background-color 0.2s;
  z-index: 100000;
  width: 100%;
  // background: rgba(0, 0, 0, 0.021);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 5%;
  &__main {
    margin-left: 2%;
    a {
      text-decoration: none;
      color: #000;
      transition: all 0.4s;
      font-weight: bold;
      font-size: 24px;
      &:hover {
        color: #a0c601;
      }
    }
  }
}
.links {
  right: 2%;
  overflow: hidden;
  padding-left: 2%;
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
    margin-top: 2%;
    &:hover {
      color: #a0c601;
    }
  }

  &__hr {
    background: #a0c601;
    height: 1px;
    width: 0;
    // width: 25%;
    transition: all 0.8s;
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
