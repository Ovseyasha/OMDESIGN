<template>
  <!-- eslint-disable -->
  <div class="services">
    <h1 class="services__header">услуги</h1>
    <div class="services__items">
      <!-- <Loader v-show="loading" /> -->
      <transition-group
        class="services__items"
        enter-active-class="animate__fadeIn animate__animated "
      >
        <Service
          v-for="(service) in services"
          :key="service.id"
          :service="service"
          class="services__item"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  async fetch ({ store }) {
    await store.dispatch('services/loadServices')
    await store.dispatch('services/meta')
  },
  computed: {
    services () {
      return this.$store.getters['services/services']
    },
    desc () {
      return this.$store.getters['services/meta']
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
.services__header {
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
.services__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.services__item {
  margin: 1%;
  @media (max-width: 500px) {
    margin: 0;
    margin-bottom: 5%;
  }
}
</style>
