<template>
  <!-- eslint-disable -->
  <div class="projects">
    <h1 class="projects__header">Портфолио</h1>

    <!-- <Loader v-show="loading" /> -->
    <transition-group
      class="projects__items"
      enter-active-class="animate__fadeIn animate__animated animate__faster"
    >
      <div
        v-for="(project) in projects"
        :key="project.id"
        :style="getBg(project.img)"
        class="projects__item project-block"
        @click="link(project.id)"
      >
        <div class="project-block__wrapper">
          <div :ref="`title_${project.id}`" class="project-block__title">{{project.title}}</div>
          <div :ref="`sub_${project.id}`" class="project-block__sub-title">{{project.subTitle}}</div>
        </div>
        <div class="project-block__blur" />
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  async fetch ({ store }) {
    if (store.getters['projects/projects'].length === 0) {
      await store.dispatch('projects/LoadProjects')
    }
    await store.dispatch('projects/meta')
  },
  computed: {
    projects () {
      return this.$store.getters['projects/projects']
    },
    desc () {
      return this.$store.getters['projects/meta']
    }
  },
  methods: {
    getBg (img) {
      return {
        background: `url(${img}),  no-repeat`,
        backgroundSize: '100% 100%'
      }
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
  },
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.desc
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.projects {
  &__header {
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 35px;
    line-height: 37px;
    /* identical to box height */

    text-align: center;
    letter-spacing: 0.09em;
    text-transform: uppercase;

    color: #000000;
  }
  &__items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__item {
    position: relative;
    width: 350px;
    height: 350px;
    overflow: hidden; /* clearfix */
    margin: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    @media (min-width: 600px) {
      &:hover .project-block__title {
        top: 20%;
      }
      &:hover .project-block__sub-title {
        opacity: 1;
      }
    }
  }
}
.project-block {
  cursor: pointer;
  &__wrapper {
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__title {
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
  }

  &__sub-title {
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
  &__blur {
    position: absolute;
    transition: 0.5s;
    background: #000;
    opacity: 0.4;
    height: 100%;
    width: 100%;
  }
}
</style>
