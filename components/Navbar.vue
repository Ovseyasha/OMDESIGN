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
    <div class="container-fluid" id="app" >
      <nav class="row navbar">
        <div class="hamburger-wrap">
          <button class="hamburger" type="button" @click="menuOpen = !menuOpen">
            <svg
              class="ham hamRotate ham7"
              viewBox="0 0 100 100"
              width="80"
              :class="{'active' : menuOpen}"
            >
              <path
                class="line top"
                d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
              />
              <path class="line middle" d="m 70,50 h -40" />
              <path
                class="line bottom"
                d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div class="row dropdown-after" :style="menuOpen ? 'height: 100vh' : ''">
        <ul class="navlist">
          <li
            class="navlistitem"
            @click="menuOpen = !menuOpen"
          >
            <nuxt-link
              class="navlist__item"
              active-class="navlist__item_active"
              exact
              no-prefetch to="/about"
            >Обо мне</nuxt-link>
            <nuxt-link
              class="navlist__item"
              active-class="navlist__item_active"
              exact
              no-prefetch to="/services"
            >Услуги</nuxt-link>
            <nuxt-link
              class="navlist__item"
              active-class="navlist__item_active"
              exact
              no-prefetch to="/projects"
            >Портфолио</nuxt-link>
            <nuxt-link
              class="navlist__item"
              active-class="navlist__item_active"
              exact
              no-prefetch to="/contacts"
            >Контакты</nuxt-link>
          </li>
        </ul>
      </div>
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
      scroll: null,
      menuOpen: false
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
// mobile nav
/* hum btn */
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}
.ham7 .top {
  stroke-dasharray: 40 82;
}
.ham7 .middle {
  stroke-dasharray: 40 111;
}
.ham7 .bottom {
  stroke-dasharray: 40 161;
}
.ham7.active .top {
  stroke-dasharray: 17 82;
  stroke-dashoffset: -62px;
}
.ham7.active .middle {
  stroke-dashoffset: 23px;
}
.ham7.active .bottom {
  stroke-dashoffset: -83px;
}
/* humburger */
.container-fluid {
  display: none;
  width: 100%;
  right: 0;
  z-index: 2;
  position: absolute;
  @media (max-width: 720px){
    display: block;
  }
}
.navbar {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  border-radius: 0px;
}

.logo,
.hamburger-wrap {
  width: 100px;
  height: 100%;
  margin-left: 4%;
  margin-right: 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hamburger-wrap {
  float: right;
  justify-content: flex-end;
  /* right: 2%; */
}

.hamburger {
  position: relative;
  background: none;
  outline: none;
  border: none;
}

.hamburger:focus {
  outline: none;
}

.dropdown-after {
  height: 0px;
  background-color: #4d6a00;
  transition: height .3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  right: 0;
  width: 100%;
}

.navlist {
  list-style: none;
}

.navlistitem {
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.navlist__item {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 2em;
  line-height: 17px;
  /* identical to box height */
  letter-spacing: 0.09em;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  // margin-right: 40px;
  margin-bottom: 50px;
  padding-bottom: 10px;
  transition: all 0.4s;
}

.navlist__item_active {
  box-sizing: border-box;
  border-bottom: 2px solid #a0c601;
}
// mobile nav
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
  @media (max-width: 720px) {
    display: none;
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
</style>
