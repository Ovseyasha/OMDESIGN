<template>
  <!-- eslint-disable -->
  <div class="main" ref="screen" @mousemove="mouseMove">
    <div class="animate__animated animate__fadeInLeft www">
      <h1
        class="main__logo"
        :style="{'transform': `translate(${x * 15}px, ${y * 15}px)` }"
      >OM DESIGN</h1>
    </div>

    <div
      class="main__header animate__animated animate__fadeIn"
      :style="{'transform': `translate(-${x * 20}px, -${y * 20}px)`}"
    >
      <header class="header">Марина Овчинникова</header>
      <footer class="footer">графический дизайнер</footer>
    </div>

    <img
      src="/fon_site.png"
      alt="bgMain"
      class="main__bg"
      :style="{'transform': `translate(-${x * 15}px, -${y * 15}px)`}"
    />
  </div>
</template>

<script>
export default {
  layout: 'main',
  data () {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    mouseMove (e) {
      if (this.$refs.screen.offsetWidth) {
        if (this.$refs.screen.offsetWidth > 400) {
          this.x = e.pageX / this.$refs.screen.offsetWidth
          this.y = e.pageY / this.$refs.screen.offsetHeight
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.www {
  position: relative;
  z-index: 2222;
}
.main {
  position: relative;
  background: rgb(161, 199, 0);
  background: radial-gradient(
    circle,
    rgba(161, 199, 0, 1) 0%,
    rgba(120, 153, 0, 1) 30%,
    rgba(89, 123, 0, 1) 93%
  );
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main__logo {
  white-space: nowrap;
  font-size: calc(1em + 10vw);
  position: absolute;
  color: white;
  text-shadow: 42px 41px 21px rgba(0, 0, 0, 0.28);
  margin-top: 5%;
  margin-left: 5%;
  z-index: 100000;
  font-weight: lighter;
}
.main__header {
  z-index: 1;
  position: absolute;
  margin-top: 30%;
  margin-left: 5%;
}
.main__bg {
  right: 0;
  position: relative;
  animation-name: sizer;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
}
.header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 37px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #000000;
  @media (min-width: 600px) {
    font-size: 35px;
  }
}
.footer {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.09em;
  text-transform: lowercase;
  color: #000000;
  @media (min-width: 600px) {
    font-size: 25px;
  }
}
@media (max-width: 500px) {
  .main {
    background: linear-gradient(
      180deg,
      rgba(77, 106, 0, 1) 0%,
      rgba(161, 199, 0, 1) 100%
    );
  }
  .main__bg {
    top: -50%;
    right: 90%;
  }
  .main__header {
    margin-top: 80%;
  }
  .main__logo {
    margin-top: 30%;
    text-shadow: -15px 41px 10px rgba(0, 0, 0, 0.28);
  }
}
@keyframes sizer {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}
</style>
