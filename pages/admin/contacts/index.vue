<template>
  <!-- eslint-disable -->
  <div class="list">
    <div class="list__header">Контактные данные</div>
    <Loader v-if="loading" />
    <form class="list__edit" v-else @submit.prevent="save">
      <div class="list__item">
        <input type="email" class="input list__input" placeholder="Ваш Email" v-model="email" />
      </div>
      <div class="list__item">
        <input type="phone" class="input list__input" placeholder="Ваш телефон" v-model="phone" />
      </div>
      <div class="list__item list__item_file">
        <input
          type="file"
          style="display: none"
          accept="application/pdf"
          ref="fileInput"
          @change="onfilePicked"
        />
        <button class="btn list__btn" type="button" @click="onPickFile">Обновить прайслист</button>
        <a
          :href="price"
          class="list__filename"
          target="_blank"
          v-if="fileName === ''"
        >Ссылка на прайс</a>
        <div class="list__filename">{{fileName}}</div>
      </div>
      <div class="list__item">
        <button type="submit" class="btn list__btn">Сохранить</button>
      </div>
    </form>
    <List :mode="'contacts'"></List>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  // middleware: ['auth'],
  data () {
    return {
      loading: true,
      fileName: '',
      file: null,
      email: '',
      phone: '',
      price: ''
    }
  },
  async mounted () {
    await this.$store.dispatch('contacts/loadContacts')
    const data = this.$store.getters['contacts/contacts']
    this.email = data.email
    this.phone = data.phone
    this.price = data.price
    this.loading = false
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onfilePicked (event) {
      const files = event.target.files
      const fileName = files[0].name
      this.fileName = fileName
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      this.file = files[0]
    },
    async save () {
      try {
        this.loading = true
        await this.$store.dispatch('contacts/editContacts', {
          contacts: {
            email: this.email,
            phone: this.phone,
            price: this.price
          },
          price: this.file
        })
        this.file = null
        this.fileName = ''
        await this.$store.dispatch('contacts/loadContacts')
        const data = this.$store.getters['contacts/contacts']
        this.email = data.email
        this.phone = data.phone
        this.price = data.price
        this.loading = false
      } catch (error) {
        alert(error)
        this.loading = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
@green: #4d6a00;
.list {
  display: flex;
  flex-direction: column;
  &__header {
    align-self: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 35px;
    line-height: 37px;
    /* identical to box height */
    margin-bottom: 30px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
  &__edit {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-bottom: 2px solid grey;
  }
  &__item {
    @media (max-width: 1100px) {
      flex-basis: 50%;
      margin-bottom: 20px;
    }
    @media (max-width: 600px) {
      flex-basis: 100%;
    }
    display: flex;
    justify-content: center;
    height: 100%;
    &_file {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
  }
  &__input {
    flex-basis: 30%;
    padding: 10px;
  }
  &__btn {
    margin-bottom: 10px;
  }
  &__filename {
    color: #000;
    @media (max-width: 600px) {
      text-align: center;
    }
  }
}
</style>
