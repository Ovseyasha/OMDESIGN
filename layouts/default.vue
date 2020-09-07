<template>
  <div class="bg">
    <Navbar />
    <div class="container">
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__slideInRight "
        leave-active-class="animate__animated animate__fadeOut "
      >
        <Nuxt class="con" />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      scroll: null
    }
  },
  computed: {
    title () {
      let title = ''
      switch (this.$route.path) {
        case '/about':
          title = '| обо мне'
          break
        case '/services':
          title = '| услуги'
          break
        case '/projects':
          title = '| портфолио'
          break
        case '/contacts':
          title = '| контакты'
          break
      }
      return title
    }
  },
  head () {
    return {
      title: `OMDESIGN  ${this.title.toUpperCase()}`
    }
  }

}
</script>
<style lang="less">
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(
      180deg,
      rgba(196, 196, 196, 0.3) 0%,
      rgba(196, 196, 196, 0.3) 100%
    ),
    url('/bg2.jpg') no-repeat center center fixed;
  // scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0px;
  }
}
.bg {
  margin: 0;
  padding: 0;
}
.container {
  .con{
  @media (max-width: 720px) {
    padding-top: 30px;
  }
  }
  margin: 0;
  padding: 5% 10% 3% 10%;
  overflow: hidden;
  // padding-bottom: 0;
  // height: 100vh;
  height: 100%;
  // &::-webkit-scrollbar {
  //   width: 0px;
  // }
  @media (max-width: 1160px) {
    padding: 30px 10%;
  }
  @media (max-width: 800px) {
    padding: 30px 5%;
  }
  @media (max-width: 600px) {
    padding: 60px 5%;
  }
  @media (max-width: 500px) {
    padding: 60px 5%;
  }
}
</style>
