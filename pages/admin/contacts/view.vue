<template>
  <div class="view">
    <Loader v-if="loading" />
    <template v-else>
      <div class="view__header">Просмотр письма</div>
      <div class="view__info">
        <div class="info">
          <div class="info__header">Имя:</div>
          <div class="info__link">{{mail.name}}</div>
        </div>
        <div class="info">
          <div class="info__header">Почта:</div>
          <a :href="`mailto:${mail.email}`" class="info__link">{{mail.email}}</a>
        </div>
        <div class="info">
          <div class="info__header">Телефон:</div>
          <a :href="`tel:${mail.phone}`" class="info__link">{{mail.phone}}</a>
        </div>
      </div>
      <div class="view__task">
        <div class="view__sub-header">Задача:</div>
        <div class="view__text">{{mail.task}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  // middleware: ['auth'],
  data () {
    return {
      mail: {},
      loading: true
    }
  },
  async mounted () {
    const id = this.$route.params.id
    await this.$store.dispatch('contacts/getMailById', id)
    this.mail = this.$store.getters['contacts/mail']
    await this.$store.dispatch('contacts/readMsg', id)
    this.loading = false
  },
  head () {
    return {
      title: `Письмо от ${this.mail.name || 'пользователя'}| OMDESIGN`
    }
  }
}
</script>

<style lang="less" scoped>
.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header {
    font-size: 30px;
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid grey;
    width: 100%;
  }

  &__task {
    margin-top: 20px;
  }

  &__sub-header {
    font-size: 20px;
    text-align: center;
  }

  &__text {
    text-align: left;
  }
}
.info {
  @media (max-width: 770px) {
    flex-basis: 100%;
  }
  // flex-basis: 30%;
  display: flex;
  margin: 20px;
  &__item {
  }

  &__header {
    margin-right: 10px;
  }

  &__link {
    text-decoration: none;
    font-style: italic;
    color: #a0c601;
  }
}
</style>
