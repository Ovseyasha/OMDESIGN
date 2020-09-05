<template>
  <div class="seo">
    <h2 class="seo__header">
      SEO
    </h2>
    <Loader v-if="loading" />
    <div v-else class="seo__items">
      <SeoUpd v-for="(m, index) in meta" :key="index" :meta="m" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    meta () {
      const meta = []
      meta.push(this.$store.getters['about/getMetaMain'])
      meta.push(this.$store.getters['about/getMetaAbout'])
      meta.push(this.$store.getters['services/meta'])
      meta.push(this.$store.getters['projects/meta'])
      meta.push(this.$store.getters['contacts/meta'])
      return meta
    }
  },
  async mounted () {
    await this.$store.dispatch('about/metaMain')
    await this.$store.dispatch('about/metaAbout')
    await this.$store.dispatch('services/meta')
    await this.$store.dispatch('projects/meta')
    await this.$store.dispatch('contacts/meta')
    this.loading = false
  }
}
</script>

<style scoped>
</style>
