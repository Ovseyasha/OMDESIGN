<template>
  <!-- eslint-disable -->
  <form class="form" @submit.prevent="login">
    <input
      type="email"
      class="form__input"
      placeholder="Логин"
      v-model.trim="email"
      :class="{'form__input_invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email), 'form__input_success' : !$v.email.$error && $v.email.required}"
    />
    <input
      type="password"
      class="form__input"
      placeholder="Пароль"
      v-model.trim="pas"
      :class="{'form__input_invalid': ($v.pas.$dirty && !$v.pas.required) || ($v.pas.$dirty && !$v.pas.minLength), 'form__input_success' : !$v.pas.$error && $v.pas.required}"
    />
    <button type="submit" class="form__btn">{{ loading ? 'Вход...' : 'Войти' }}</button>
    <span class="form__msg">{{error}}</span>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  layout: 'empty',
  async fetch ({ store, methods }) {
    // await store.dispatch('admin/getUid')
    // const id = store.getters['admin/admin']
    // if (messages[this.$route.query.message]) {
    //   this.error = messages[this.$route.query.message]
    // }
  },
  metaInfo () {
    return { title: 'Вход' }
  },
  data () {
    return {
      email: '',
      pas: '',
      error: null,
      loading: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    pas: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    // errors () {
    //   return this.$store.getters.error
    // }
  },
  // watch: {
  //   errors (fbEr) {
  //     console.log(fbEr)
  //     this.error = messages[fbEr.code] || 'Неизвестная ошибка!'
  //   }
  // },
  methods: {
    async login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      try {
        this.loading = true
        const formData = {
          email: this.email,
          password: this.pas
        }
        await this.$store.dispatch('admin/login', formData)
        this.$router.push('/admin')
      } catch (error) {
        this.error = error
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 30%;
  @media (max-width: 600px) {
    width: 90%;
  }
  display: flex;
  flex-direction: column;
  &__input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    background: #f5f5f5;
    border: 1px solid #959595;
    box-sizing: border-box;
    font-family: Montserrat;
    font-style: italic;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    letter-spacing: 0.09em;
    padding: 1%;
    margin-bottom: 2%;
    border-radius: 0;
    &_invalid {
      border: 1px solid #f57f6c;
    }
    &_success {
      border: 1px solid #a0c601;
    }
  }

  &__btn {
    background: #4d6a00;
    outline: none;
    border: none;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.09em;
    text-transform: lowercase;
    color: #f2f2f2;
    cursor: pointer;
    width: 35%;
    align-self: center;
    padding: 10px;
    @media (max-width: 600px) {
      width: 50%;
    }
    margin-bottom: 2%;
    &:active {
      background: darken(#4d6a00, 5%);
    }
  }

  &__msg {
    align-self: center;
  }
}
</style>
