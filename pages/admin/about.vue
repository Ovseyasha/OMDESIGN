<template>
  <!-- eslint-disable -->
  <form class="about" @submit.prevent="save">
    <Loader v-if="loading" />
    <template v-else>
      <div class="about__desc">
        <div class="about__img">
          <ChangeImg :img="img" @changed-img="newImg" />
        </div>
        <div class="about__text">
          <SubsEditor :subs="about" @upd="updSub" />
        </div>
      </div>
      <div class="about__hr" />
      <div class="about__skills">
        <SkillsEditor :skills="skills" @changed-skills="deletedSkill" @upd-skills="upsSkills" />
      </div>
      <button type="submit" class="about__btn btn">Сохранить</button>
    </template>
  </form>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  data () {
    return {
      nameOfDeleteSkills: [],
      img: null,
      skills: [],
      about: [],
      loading: true
    }
  },
  async mounted () {
    await this.$store.dispatch('about/loadAbout')
    this.img = this.$store.getters['about/img']
    this.about = this.$store.getters['about/about']
    this.skills = this.$store.getters['about/skills']
    this.loading = false
  },
  methods: {
    newImg (img) {
      this.img = img
    },
    deletedSkill (val) {
      this.nameOfDeleteSkills = val
    },
    updSub (v) {
      this.about = v
    },
    upsSkills (v) {
      this.skills = v
    },
    async save () {
      for (let i = 0; i < this.skills.length; i++) {
        this.skills[i].url = ''
      }
      try {
        this.$nuxt.$loading.start()
        await this.$store.dispatch('about/update', {
          img: this.img,
          about: this.about,
          skills: this.skills,
          names: this.nameOfDeleteSkills
        })
        await this.$store.dispatch('about/loadAbout')
        this.img = this.$store.getters['about/img']
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.about {
  display: flex;
  flex-direction: column;
  &__desc {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 1000px) {
      flex-basis: auto;
    }
  }
  &__img {
    flex-basis: 30%;
    @media (max-width: 1000px) {
      flex-basis: auto;
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 2px solid grey;
    }
  }
  &__text {
    flex-basis: 60%;

    @media (max-width: 1000px) {
      flex-basis: 100%;
    }
  }
  &__hr {
    margin: 20px 0;
    width: 100%;
    height: 2px;
    background: grey;
    opacity: 0.7;
  }
  &__btn {
    margin: 20px 0;
    align-self: center;
    padding: 10px;
  }
}
</style>
