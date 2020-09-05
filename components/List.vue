<template>
  <!-- eslint-disable -->
  <div class="list">
    <div class="list__header">{{ header}}</div>
    <template v-if="mode !== 'contacts'">
      <router-link class="list__add" :to="pathToAdd">
        <button>
          <i class="fas fa-plus-square"></i>
          Добавить
        </button>
      </router-link>
      <Loader v-if="loading" />
      <div class="list__items" v-else>
        <template v-if="data !== null">
          <div class="list__item" v-for="(item,index) in data" :key="item.id">
            <div class="list__i list__column">{{++index}}</div>
            <div class="list__title list__column">{{item.title}}</div>
            <router-link class="list__edit list__column" :to="pathToEdit + item.id">
              <i class="far fa-edit"></i>
            </router-link>
            <button
              type="button"
              class="list__delete list__column"
              @click="open(item.title, item.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <Loader v-if="loading" />
      <div class="list__items" v-else>
        <template v-if="data !== null">
          <div
            class="list__item"
            :class="{'list__item_new': item.state === 'new'}"
            v-for="(item,index) in data"
            :key="item.id"
          >
            <div class="list__i list__column list__column_contacts">{{++index}}</div>
            <div class="list__name list__column list__column_contacts">{{item.name}}</div>
            <a
              :href="`mailto:${item.email}`"
              class="list__email list__column list__column_contacts"
            >{{item.email}}</a>
            <router-link
              class="list__edit list__column list__column_contacts"
              :to="pathToView + item.id"
            >
              <i class="far fa-eye"></i>
            </router-link>
            <button
              type="button"
              class="list__delete list__column list__column_contacts"
              @click="open(item.name, item.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </template>
      </div>
    </template>
    <transition
      enter-active-class="animate__animated animate__faster animate__flipInX"
      leave-active-class="animate__animated animate__faster animate__flipOutX"
    >
      <div class="modal" v-show="modal">
        <div class="modal__text">Вы действительно хотите удалить "{{title}}"?</div>
        <div class="modal__btns">
          <button class="modal__btn btn close" @click="modal = !modal">Отмена</button>
          <button class="modal__btn btn del" @click="remove(id)">Удалить</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: true,
      data: [],
      modal: false,
      title: '',
      id: ''
    }
  },
  computed: {
    header () {
      return this.mode === 'services' ? 'Услуги' : this.mode === 'projects' ? 'Проекты' : 'письма'
    },
    pathToAdd () {
      return this.mode === 'services' ? '/admin/services/add' : '/admin/projects/add'
    },
    pathToEdit () {
      return this.mode === 'services' ? '/admin/services/edit/' : '/admin/projects/edit/'
    },
    pathToView () {
      return 'contacts/'
    }
  },
  async mounted () {
    if (this.mode === 'services') {
      await this.$store.dispatch('services/loadServices')
      this.data = this.$store.getters['services/services']
    } else if (this.mode === 'projects') {
      await this.$store.dispatch('projects/LoadProjects')
      this.data = this.$store.getters['projects/projects']
    } else {
      await this.$store.dispatch('contacts/loadMails')
      this.data = this.$store.getters['contacts/mails']
    }
    this.loading = false
  },
  methods: {
    open (title, id) {
      this.modal = true
      this.title = this.mode === 'contacts' ? `письмо от ${title}` : title
      this.id = id
    },
    async remove (id) {
      if (this.mode === 'services') {
        try {
          this.loading = true
          await this.$store.dispatch('services/deleteServicesById', id)
          await this.$store.dispatch('services/loadServices')
          this.data = this.$store.getters['services/services']
        } catch (error) {
          alert(error)
        }
      } else if (this.mode === 'projects') {
        try {
          this.loading = true
          await this.$store.dispatch('projects/deleteProjectById', id)
          await this.$store.dispatch('projects/LoadProjects')
          this.data = this.$store.getters['projects/projects']
        } catch (error) {
          alert(error)
        }
      } else {
        try {
          this.loading = true
          await this.$store.dispatch('contacts/deleteMailById', id)
          await this.$store.dispatch('contacts/loadMails')
          this.data = this.$store.getters['contacts/mails']
        } catch (error) {
          alert(error)
        }
      }
      this.loading = false
      this.modal = false
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  &__header {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 35px;
    line-height: 37px;
    /* identical to box height */
    margin-bottom: 30px;
    text-align: center;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  &__add {
    margin-bottom: 50px;
    width: 20%;
    padding: 20px;
    @media (max-width: 660px) {
      width: 100%;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__item {
    padding: 1% 0;
    margin: 1%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_new {
      background: #a0c601;
    }
  }
  &__column {
    text-align: center;
    @media (max-width: 660px) {
      font-size: 14px;
    }
    &_contacts {
      width: 20%;
    }
  }
  &__i {
    font-weight: bold;
    flex-basis: 5%;
  }

  &__title {
    font-size: 20px;
    flex-basis: 80%;
    @media (max-width: 660px) {
      font-size: 14px;
    }
  }
  &__name {
    flex-basis: 40%;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &__email {
    flex-basis: 40%;
    color: #4d6a00;
    font-style: italic;
  }
  &__edit {
    flex-basis: 5%;
    font-size: 20px;
    color: black;

    &:hover {
      color: grey;
    }
  }

  &__delete {
    color: black;
    flex-basis: 5%;
    outline: none;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 20px;
    &:hover {
      color: grey;
    }
  }
}
.modal {
  display: flex;
  flex-direction: column;
  background: #dcdcdc;
  position: fixed;
  right: 10%;
  top: 5%;
  width: 400px;
  height: 100px;
  .close {
    border: 1px solid #4d6a00;
    box-sizing: border-box;
    color: #4f4f4f;
  }
  .del {
    background: #4d6a00;
    color: #f2f2f2;
  }
  &__text {
    margin: 3%;
    font-size: 0.8em;
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    margin: 0 20%;
  }
  &__btn {
    background: none;
  }
}
</style>
