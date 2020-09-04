<template>
  <!-- eslint-disable -->
  <div class="view">
    <Loader v-if="loading" />
    <template v-else>
      <div class="view__item view__item_header">{{header}}</div>
      <input
        type="text"
        class="view__input input"
        placeholder="Название"
        v-if="category === 'service'"
        v-model="service.title"
      />
      <input
        type="text"
        class="view__input input"
        placeholder="Название"
        v-else
        v-model="project.title"
      />
      <div class="view__item view__item_desc">
        <template v-if="category === 'service'">
          <div class="view__item view__item_sub">Описание</div>
          <!-- for services SubsEditor -->
          <SubsEditor :subs="service.description" @upd="loadSubs"></SubsEditor>
        </template>
        <template v-else>
          <!-- for projects -->
          <div class="view__item view__item_sub">Краткое описание</div>
          <input
            type="text"
            class="view__input input"
            placeholder="Для карточки проекта"
            v-model="project.subTitle"
          />
        </template>
      </div>
      <div class="view__item view__item_img">
        <!-- ChangeImg -->
        <div
          class="view__item view__item_sub"
        >Обложка {{ category === 'service' ? 'услуги' : 'проекта'}}</div>
        <ChangeImg v-if="category === 'service' " :img="service.img" @changed-img="changeImg"></ChangeImg>
        <ChangeImg v-else :img="project.img" @changed-img="changeImg"></ChangeImg>
      </div>
      <div class="view__item view__item_settings">
        <!-- for services steps StepsEditor -->
        <template v-if="category == 'service'">
          <div class="view__item view__item_sub">Этапы работы</div>
          <StepsEditor :steps="service.steps" @upd="changeSteps"></StepsEditor>
        </template>

        <template v-else>
          <!-- for project slides -->
          <div class="view__item view__item_sub">
            Изображения проекта
            <br />
            <small>
              <i>( разрешение 1345х755px )</i>
            </small>
          </div>
          <SlideEditor :slides="project.imgs" @changed="slideChange"></SlideEditor>
          <!-- for project SubsEditor x2-->
          <div class="view__item view__item_sub">О компании</div>
          <SubsEditor :subs="project.aboutCompany" @upd="loadCompSubs"></SubsEditor>
          <div class="view__item view__item_sub">Задачи</div>
          <SubsEditor :subs="project.task" @upd="loadTaskSubs"></SubsEditor>
        </template>
      </div>
      <!-- for services -->
      <template v-if="category == 'service'">
        <div class="view__item view__item_sub">Срок выполнения:</div>
        <input
          type="text"
          class="view__input view__input_date input"
          placeholder="Пример: Срок выполнения от 25 дней"
          v-model="service.date"
        />
      </template>
      <!-- for projects -->
      <template v-else>
        <div class="view__sub">Ссылка на проект</div>
        <br />
        <input type="text" class="view__input input" v-model="project.link" />
        <div class="view__sub">Выберите предоставленную услугу:</div>
        <select class="input view__select" v-model="project.nameOfService">
          <option
            class="view__option input"
            v-for="(name,index) in categoryName"
            :key="index"
          >{{name}}</option>
        </select>
      </template>
      <button type="submit" class="view__save btn" @click="save">Сохранить</button>
    </template>
  </div>
</template>

<script>
export default {
  props:
  {
    mode: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      loading: true,
      categoryName: [],
      service: {
        title: '',
        img: '',
        steps: [],
        description: [],
        date: ''
      },
      project: {
        title: '',
        subTitle: '',
        img: '',
        imgs: [],
        aboutCompany: [],
        task: [],
        nameOfService: '',
        link: ''
      },
      deletedName: []
    }
  },
  computed: {
    header () {
      return (this.mode === 'add' ? 'Добавление' : 'Редактирование') + ' ' + (this.category === 'service' ? 'услуги' : 'проекта')
    },
    img () {
      return this.mode === 'add' ? null : this.data.img
    }
  },
  async mounted () {
    if (this.category === 'project') {
      await this.$store.dispatch('services/loadServices')
      this.categoryName = this.$store.getters['services/servicesName']
    }
    if (this.mode === 'edit') {
      const id = this.$route.params.id
      if (this.category === 'service') {
        await this.$store.dispatch('services/loadServiceById', id)
        // this.service = this.$store.getters['services/service']
        this.service.title = this.$store.getters['services/service'].title
        this.service.img = this.$store.getters['services/service'].img
        this.service.steps = this.$store.getters['services/service'].steps
        this.service.description = this.$store.getters['services/service'].description
        this.service.date = this.$store.getters['services/service'].date
      } else {
        await this.$store.dispatch('projects/loadProjectById', id)
        // this.project = this.$store.getters['projects/project']
        const p = this.$store.getters['projects/project']
        this.project.title = p.title
        this.project.subTitle = p.subTitle
        this.project.img = p.img
        this.project.imgs = p.imgs
        this.project.aboutCompany = p.aboutCompany
        this.project.task = p.task
        this.project.nameOfService = p.nameOfService
        this.project.link = p.link || ''
      }
    }
    this.loading = false
  },
  methods: {
    loadSubs (v) {
      this.service.description = v
    },
    loadCompSubs (v) {
      this.project.aboutCompany = v
    },
    loadTaskSubs (v) {
      this.project.task = v
    },
    changeSteps (v) {
      this.service.steps = v
    },
    changeImg (v) {
      if (this.category === 'service') {
        this.service.img = v
      } else {
        this.project.img = v
      }
    },
    slideChange (v, d) {
      this.deletedName = d
      this.project.imgs = v
    },
    async save () {
      if (this.category === 'service') {
        if (this.mode === 'add') {
          try {
            this.loading = true
            await this.$store.dispatch('services/addNewService', {
              service: this.service,
              img: this.service.img
            })
            this.loading = false
            this.$router.push('/admin/services')
          } catch (error) {
            this.loading = false
            // alert(error)
            console.log(error)
          }
        } else {
          try {
            this.loading = true
            await this.$store.dispatch('services/editServices', {
              service: this.service,
              id: this.$route.params.id
            })
            this.loading = false
            this.$router.push('/admin/services')
          } catch (error) {
            this.loading = false
            console.log(error)
          }
        }
      } else {
        this.project.imgs.forEach((i) => {
          delete i.url
        })
        if (this.mode === 'add') {
          try {
            this.loading = true
            await this.$store.dispatch('projects/addNewPorject', {
              project: this.project,
              img: this.project.img
            })
            this.loading = false
            this.$router.push('/admin/projects')
          } catch (error) {
            this.loading = false
            alert(error)
          }
        } else {
          try {
            this.loading = true
            await this.$store.dispatch('projects/editProject', {
              project: this.project,
              id: this.$route.params.id,
              deletedName: this.deletedName
            })
            this.loading = false
            this.$router.push('/admin/projects')
          } catch (error) {
            this.loading = false
            console.log(error)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  margin-bottom: 20px;
}
.view {
  display: flex;
  flex-direction: column;
  &__item {
    margin: 20px 0;
    &_header {
      align-self: center;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 300;
      font-size: 25px;
      line-height: 37px;
      /* identical to box height */
      margin-bottom: 30px;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }
    &_desc {
      padding-bottom: 20px;
      border-bottom: 2px solid grey;
    }
    &_sub {
      font-size: 20px;
    }
    &_img {
      width: 25%;
      @media (max-width: 1200px) {
        width: 50%;
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    }
    &_settings {
      padding-bottom: 20px;
      border-top: 2px solid grey;
      border-bottom: 2px solid grey;
    }
  }
  &__input {
    padding: 1%;
    margin-bottom: 20px;
    width: 100%;
  }
  &__select {
    font-size: 18px;
    padding: 0.5%;
    margin: 1%;
  }
  &__option {
    padding: 0.5%;
    margin: 2%;
  }
  &__save {
    margin: 50px 0%;
  }
}
</style>
