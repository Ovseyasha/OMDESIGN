<template>
  <!-- eslint-disable -->
  <div class="about">
    <h1 class="about__header">обо мне</h1>
    <template>
      <div class="desc">
        <img :src="img" alt="avatar" class="desc__pic animate__animated animate__fadeInDown" />
        <div class="desc__text animate__animated animate__fadeInRightBig">
          <p v-for="(sub,index) in about" :key="index" class="desc__sub">{{ sub }}</p>
        </div>
      </div>
      <div class="skills animate__animated animate__fadeInRight">
        <h2 class="skills__header">Основные инструменты которые я использую в работе</h2>
        <div class="skills__items">
          <div class="skill" v-for="skill in skills" :key="skill.title">
            <img :src="skill.img" class="skill__pic" />
            <div class="skill__title">{{ skill.title }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  // для vuex
  async fetch ({ store }) {
    if (store.getters['about/all'] === null) {
      await store.dispatch('about/loadAbout')
    }
    await store.dispatch('about/metaAbout')
  },
  computed: {
    img () {
      return this.$store.getters['about/img']
    },
    skills () {
      return this.$store.getters['about/skills']
    },
    about () {
      return this.$store.getters['about/about']
    },
    desc () {
      return this.$store.getters['about/getMetaAbout']
    }
  },
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.desc.value
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
img {
  max-width: 100%;
}
.about {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  &__header {
    margin: 0;
    padding: 0;
    font-weight: 300;
    margin-bottom: 1%;
    font-size: 35px;
    line-height: 37px;
    /* identical to box height */

    text-align: center;
    letter-spacing: 0.09em;
    text-transform: uppercase;

    color: #000000;
  }
}
.desc {
  margin-bottom: 2%;
  &__pic {
    float: left;
    margin-right: 2%;
    width: 400px;
    // height: 400px;

    @media (max-width: 600px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 5%;
    }
  }
  &__sub {
    margin: 0;
    padding-bottom: 1%;
    @media (max-width: 600px) {
      padding-bottom: 3%;
    }
  }
}
.skills {
  &__header {
    margin: 0;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    letter-spacing: 0.09em;
    color: #4f4f4f;
    border-bottom: 2px solid #c4c4c4;
    padding-bottom: 1%;
  }

  &__items {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 600px) {
      // justify-content: space-evenly;
    }
  }
}
.skill {
  // flex-basis: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  @media (max-width: 600px) {
    // flex-basis: 25%;
    margin: 10px 0;
  }
  &__pic {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    align-self: start;
    @media (max-width: 600px) {
      align-self: center;
      width: 70px;
      height: 70px;
    }
  }
  &__title {
    align-self: start;
    @media (max-width: 600px) {
      align-self: center;
      text-align: center;
    }
  }
}
</style>
