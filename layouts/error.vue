<template>
  <div class="error">
    <h1 class="error__logo">
      OMDESIGN
    </h1>
    <p v-if="error.statusCode === 404" class="error__stat">
      Страница не найдена
    </p>
    <nuxt-link to="/" class="error__link">
      На Главную
    </nuxt-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['error'],
  layout: 'empty'
}
</script>

<style lang="less" scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__logo {
    width: 100%;
    font-size: 200px;
    font-weight: lighter;
    color: #4D6A00;
    text-shadow: 42px 41px 21px rgba(0, 0, 0, 0.28);
    @media (max-width: 1150px){
      font-size: 150px;
    }
    @media (max-width: 860px){
      font-size: 100px;
    }
     @media (max-width: 560px){
      font-size: 50px;
    }
  }
  &__stat {
    font-size: 20px;
  }

  &__link {
    text-decoration: none;
    color: #4D6A00;
    transition: color .2s ease-in;
    &:hover{
      color: #ABD200;
    }
  }
}

</style>
