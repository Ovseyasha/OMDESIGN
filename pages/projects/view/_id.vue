<template>
  <!-- eslint-disable -->
  <div class="project">
    <Loader v-if="loading" />
    <template v-else>
      <div class="project__back">
        <a class="link-back" @click="$router.go(-1)">
          <i class="fas fa-arrow-circle-left"></i> Назад
        </a>
      </div>
      <div class="project__content">
        <div class="project__slider animate__animated animate__slideInRight">
          <swiper ref="slider" :options="swiperOptions">
            <swiper-slide v-for="(img,index) in project.imgs" :key="index">
              <img :src="img.img" style="width: 100%">
            </swiper-slide>
            <div class="btn swiper-button-prev" @click="prev" slot="button-prev"></div>
            <div class="btn swiper-button-next" @click="next" slot="button-next"></div>
          </swiper>
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/node_modules/swiper/swiper.less'
// If you use Swiper 6.0.0 or higher
import '@/node_modules/swiper/swiper-bundle.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      // ind: 1,
      loading: true,
      project: {},
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    // 1345х755px
    swiper () {
      return this.$refs.slider.$swiper
    }
  },
  async mounted () {
    const id = this.$route.params.id
    await this.$store.dispatch('projects/LoadProjects')
    this.project = this.$store.getters['projects/getById'](id)
    if (this.project === null) {
      this.$router.push('/projects')
    }
    this.loading = false
  },
  methods: {
    prev () {
      this.swiper.slidePrev()
    },
    next () {
      this.swiper.slideNext()
    }
  }
}
</script>
<style lang="less" >
.btn{
  color: grey;
  &:hover{
    color: lighten(grey, 20%);
  }
}
// _______________________
.project {
  position: relative;
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
    @media (max-width: 1200px) {
      width: 100%;
    }
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
