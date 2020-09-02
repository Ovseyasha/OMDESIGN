<template>
  <!-- eslint-disable -->
  <div class="service">
    <!-- добавить бг в ковер -->
    <div class="service__cover" @click="open" :style="getBg">
      <div class="blur"></div>
      <div class="service__header">{{service.title}}</div>
    </div>

    <transition
      enter-active-class="animate__animated animate__faster animate__fadeInLeft"
      leave-active-class="animate__animated animate__faster animate__fadeOutRight"
    >
      <!-- <div class="fixxx" v-show="fullPage"> -->
      <div class="service__full-page page" v-show="fullPage">
        <div class="wrapper__full-page">
          <img src="/close.svg" alt class="page__close" @click="close" />
          <h1 class="page__header">{{ service.title }}</h1>
          <div class="page__description">
            <!-- циклом вывести абзацы -->
            <p class="page__sub" v-for="(sub,index) in service.description" :key="index">{{ sub }}</p>
          </div>
          <div class="page__steps steps">
            <div class="steps__header">Этапы работы</div>
            <div class="steps__items">
              <div class="steps__item step" v-for="(step,index) in service.steps" :key="index">
                <div class="wrapper_desc">
                  <div class="step__title">{{step.title}}</div>
                  <div class="step__description">{{step.description}}</div>
                </div>
                <div class="wrapper_num">
                  <div class="step__number">{{index + 1}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="page__date">{{service.date}}</div>
          <div class="page__hr"></div>
          <div class="page__projects projects">
            <div class="projects__header">Проекты</div>
            <div class="projects__items">
              <!-- циклом вывести проекты у котрых данная услуга -->
              <div
                class="projects__item"
                v-for="project in projects"
                :key="project.id"
                :style="{ background: 'url(' + project.img + ') no-repeat' , backgroundSize: '100% 100%' }"
                @click="link(project.id)"
              >
                <div class="projects__title" :ref="`title_${project.id}`">{{project.title}}</div>
                <div class="projects__short-desc" :ref="`sub_${project.id}`">{{project.subTitle}}</div>
                <div class="projects__blur"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      fullPage: false
    }
  },
  computed: {
    projects () {
      // заменить на диспатч из бд с сортировкой по категории услуги
      const allProjects = this.$store.getters['projects/projects']
      const service = this.service.title.toLowerCase()
      const projects = allProjects.filter((item) => {
        return item.nameOfService.toLowerCase() === service
      })
      return projects
    },
    getBg () {
      return {
        background: `url(${this.service.img}) no-repeat`,
        backgroundSize: '100% 100%'
      }
    }
  },
  mounted () {
    if (this.$route.query.name === this.service.id) {
      this.fullPage = true
    }
  },
  methods: {
    open () {
      this.$router.push(`/services?name=${this.service.id}`)
      this.fullPage = !this.fullPage
    },
    close () {
      this.$router.push('/services')
      this.fullPage = !this.fullPage
    },
    link (id) {
      if (window.outerWidth <= 600) {
        if (this.$refs[`title_${id}`][0].style.top !== '20%') {
          this.$refs[`title_${id}`][0].style.top = '20%'
          this.$refs[`sub_${id}`][0].style.opacity = '1'
        } else {
          this.$router.push(`/projects/${id}`)
        }
      } else {
        this.$router.push(`/projects/${id}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.service__cover {
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7em;
  /* text */
  cursor: pointer;
  color: white;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4em;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  position: relative;
  /* background: red; */
  animation: gradient 0.5s ease infinite;
  @media (max-width: 500px) {
    width: 320px;
    height: 320px;
  }
}
.service__cover:hover .blur {
  opacity: 0;
}
.service__cover:hover .service__header {
  opacity: 0;
}

.service__header {
  transition: 0.5s;
  z-index: 1;
  margin: 0 2%;
}
.blur {
  transition: 0.5s;
  position: absolute;
  background: #000;
  opacity: 0.6;
  height: 100%;
  width: 100%;
}
// .fixxx {
//   top: 2%;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   z-index: 200;
//   @media (max-width: 700px) {
//     top: 4%;
//   }
// }
.service__full-page {
  z-index: 200;
  overflow: auto;
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  height: 95%;
  width: 100%;
  bottom: 0;
  @media (max-width: 700px) {
    width: 100%;
    height: 95%;
  }
}
.service__full-page::-webkit-scrollbar {
  width: 0px;
}
.wrapper__full-page {
  margin: 2% 5%;
  display: flex;
  flex-direction: column;
}
.page__close {
  position: fixed;
  z-index: 100000;
  cursor: pointer;
  align-self: flex-end;
}
.page__header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: calc(1em + 1vw);
  line-height: 44px;
  /* identical to box height */
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: #4d6a00;
  margin-bottom: 2%;
  @media (max-width: 700px) {
    margin-top: 10%;
  }
}
.page__description {
  max-width: 75%;
  @media (max-width: 1160px) {
    max-width: 100%;
  }
}
.page__sub {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: calc(1em + 0.2vw);
  line-height: 22px;
  letter-spacing: 0.05em;

  color: #000000;
}
.steps {
  display: flex;
  flex-direction: column;
}
.steps__header {
  align-self: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.09em;

  color: #4f4f4f;
  margin-top: 2%;
  margin-bottom: 1%;
}
.steps__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.steps__item {
  margin: 1%;
  flex-basis: 23%;
  @media (max-width: 1200px) {
    flex-basis: 46%;
  }
  @media (max-width: 600px) {
    margin: 0;
    flex-basis: 98%;
  }
}

.step {
  position: relative;
  font-family: Montserrat;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 129% */
  letter-spacing: 0.09em;
  color: #000000;
  /* margin: 0.5%; */
}
.wrapper_desc {
  position: relative;
  z-index: 2;
}
.step__title {
  font-weight: 600;
  margin-bottom: 5%;
  min-height: 30px;
  @media (max-width: 600px) {
    margin-bottom: 2%;
  }
}
.step__description {
  /* z-index: 2; */
  @media (max-width: 600px) {
    margin-bottom: 10%;
  }
}
.wrapper_num {
  position: absolute;
  left: 50%;
  top: 50%;
}
.step__number {
  /* z-index: 1; */
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10em;
  line-height: 15px;
  /* or 10% */
  letter-spacing: 0.09em;

  color: #e5e5e5;
}
.page__date {
  align-self: flex-end;
  font-family: Montserrat;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: 0.09em;
  margin-top: 3%;
  color: #4d6a00;
}
.page__hr {
  margin-top: 1%;
  background: #4d6a00;
  height: 2px;
  /* margin: 0 10% 0 10%; */
}
.projects__header {
  margin-top: 2%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 37px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin-bottom: 2%;
}
.projects__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10%;
}
.projects__item {
  cursor: pointer;
  text-decoration: none;
  color: white;
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1%;
  margin: 1%;
  background: gray;
  position: relative;
  @media (max-width: 700px) {
    margin: 0;
    margin-bottom: 10%;
  }
}

@media (min-width: 600px) {
  .projects__item:hover .projects__title {
    top: 20%;
  }
  .projects__item:hover .projects__short-desc {
    opacity: 1;
  }
}
.projects__blur {
  position: absolute;
  transition: 0.5s;
  background: #000;
  opacity: 0.4;
  height: 100%;
  width: 100%;
}
.projects__title {
  z-index: 1;
  color: white;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 19.8px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  position: absolute;
  top: 45%;
  height: 50%;
  transition: all 0.3s;
  margin: 0 2%;
}
.projects__short-desc {
  z-index: 1;
  color: white;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.05em;
  opacity: 0;
  transition: opacity 0.5s;
  height: 15%;
  margin: 0 5%;
}
</style>
