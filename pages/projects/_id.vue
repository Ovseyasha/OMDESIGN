<template>
  <!-- eslint-disable -->
  <div class="project">
    <!-- <Loader v-if="loading" /> -->
    <template>
      <div class="project__back">
        <a class="link-back" @click="$router.go(-1)">
          <i class="fas fa-arrow-circle-left"></i> Назад
        </a>
      </div>
      <div class="project__content">
        <div class="project__slider animate__animated animate__slideInRight">
          <swiper class="slider" ref="swiperComponent" :options="swiperOptions" :keyboard="true">
            <swiper-slide class="slide" v-for="img in project.imgs" :key="img.img">
              <div class="project__slide-title">{{img.title}}</div>
              <img :src="img.img" />
            </swiper-slide>
          </swiper>
          <div class="pagi">{{ind}}/{{project.imgs.length}}</div>
          <!-- <button class="swiper-button swiper-button-prev" @click="prev"> -->
          <svg
            class="swiper-button swiper-button-prev"
            @click="prev"
            width="23"
            height="58"
            viewBox="0 0 23 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 57L0.999998 29.4375L22 0.999998"
              stroke="#C4C4C4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <!-- </button> -->
          <!-- <button class="swiper-button swiper-button-next" @click="next"> -->
          <svg
            class="swiper-button swiper-button-next"
            @click="next"
            width="23"
            height="58"
            viewBox="0 0 23 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 57L0.999998 29.4375L22 0.999998"
              stroke="#C4C4C4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <!-- </button> -->
        </div>
        <div class="project__text animate__animated animate__fadeInRight">
          <h1 class="project__name">{{project.subTitle}}</h1>
          <div class="subs">
            <div class="subs__item">
              <div class="subs__title">Деятельность компании:</div>
              <p class="subs__text" v-for="(sub,index) in project.aboutCompany" :key="index">{{sub}}</p>
            </div>
            <div class="subs__item">
              <div class="subs__title">Задача:</div>
              <p class="subs__text" v-for="(sub,index) in project.task" :key="index">{{sub}}</p>
            </div>
            <div class="subs__item">
              <a
                :href="project.link"
                v-if="project.link"
                target="_blank"
                class="project__link"
              >Ссылка на проект</a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {
  },
  async fetch ({ store, params }) {
    const id = params.id
    // if (store.getters['projects/projects'].length === 0) {
    await store.dispatch('projects/loadProjectById', id)
    // }
  },
  data () {
    return {
      swiperOptions: {
        mousewheel: true,
        keyboard: true
      },
      ind: 1
    }
  },
  computed: {
    project () {
      return this.$store.getters['projects/project']
    },
    swiper () {
      return this.$refs.swiperComponent.$swiper
    },
    desc () {
      return this.project.aboutCompany.join(' ')
    }
  },
  mounted () {
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    prev () {
      this.swiper.slidePrev()
      this.ind = this.swiper.activeIndex + 1
    },
    next () {
      this.swiper.slideNext()
      this.ind = this.swiper.activeIndex + 1
    }
  },
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.project.subTitle}. Деятельность компании: ${this.desc} Задача: ${this.project.task.join(' ')}`
        }
      ]
    }
  }
}
</script>

<style lang="less" >
.pagi {
  margin-top: 10px;
  text-align: center;
  font-style: italic;
  // color: #4d6a00;
}
.swiper-button {
  margin: 1%;
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
  position: absolute;
  top: 45%;
  &:hover {
    opacity: 0.7;
  }
}
.swiper-button-next {
  right: 0;
  transform: scale(-1, 1);
}
.img {
  background: rgba(0, 0, 0, 0.205);
}
.swiper-wrapper {
  display: flex;
}
.slide {
  img {
    width: inherit;
  }
}
.project {
  position: relative;
  // margin-left: -6%;
  // margin-right: -6%;
  // @media (max-width: 1500px) {
  //   margin-top: 10%;
  // }
  // @media (max-width: 1300px) {
  //   margin-top: 15%;
  // }
  // @media (max-width: 800px) {
  //   margin-top: 3%;
  //   margin-left: -3%;
  //   margin-right: -3%;
  // }
  &__back {
    padding-bottom: 2%;
    @media (max-width: 500px) {
      padding-bottom: 4%;
    }
  }
  &__link {
    font-style: italic;
    color: #4d6a00;
    &:hover {
      color: #a0c601;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }
  &__slider {
    z-index: 2;
    width: 75%;
    position: relative;
    overflow: hidden;
    @media (max-width: 1200px) {
      width: 100%;
    }
  }
  &__slides {
    width: 100%;
    height: 100%;
  }
  &__slide-title {
    font-family: Montserrat;
    font-style: italic;
    font-weight: medium;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.09em;
    margin-bottom: 1%;
    color: #4d6a00;
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }
  &__text {
    width: 24%;
    margin-top: 0.5%;
    @media (max-width: 1200px) {
      margin-top: 5%;
      width: 100%;
    }
  }

  &__name {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    // line-height: 44px;
    text-transform: uppercase;
    margin-bottom: 10%;
    /* knopka */
    @media (max-width: 1200px) {
      margin-bottom: 2%;
    }
    @media (max-width: 500px) {
      margin-bottom: 4%;
    }
    color: #4d6a00;
  }
}
.link-back {
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a6;
  &:hover {
    color: #808080;
  }
}
.subs {
  &__item {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
  }

  &__title {
    margin-bottom: 2%;
    @media (max-width: 1200px) {
      margin-bottom: 1%;
    }
  }

  &__text {
    margin-bottom: 10%;
    @media (max-width: 1200px) {
      margin-bottom: 2%;
    }
    @media (max-width: 500px) {
      margin-bottom: 10%;
    }
  }
}
</style>
