<template>
  <textarea v-model="nMeta.value" :placeholder="`Введите описание стрницы ${text}`" class="seo_txt" @keydown.enter="edit" />
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      nMeta: {}
    }
  },
  computed: {
    text () {
      let ans
      switch (this.meta.type) {
        case 'about':
          ans = 'обо мне'
          break
        case 'main':
          ans = 'главная'
          break
        case 'services':
          ans = 'услуг'
          break
        case 'projects':
          ans = 'портфолио'
          break
        case 'contacts':
          ans = 'контактов'
          break
      }
      return ans
    }
  },
  mounted () {
    this.nMeta.type = this.meta.type
    this.nMeta.value = this.meta.value
  },
  methods: {
    async edit () {
      try {
        await this.$store.dispatch('editMeta', this.nMeta)
      } catch (error) {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.seo_txt{
  resize: none;
  width: 100%;
  height: 150px;
}
</style>
