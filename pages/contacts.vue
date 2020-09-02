<template>
  <!-- eslint-disable -->
  <div class="contacts">
    <div class="contacts__items">
      <div class="links">
        <div class="links__item">
          <div class="links__header animate__animated animate__fadeInLeft">Позвоните мне:</div>
          <a
            :href="`tel:${contacts.phone}`"
            class="links__text animate__animated animate__fadeInLeft"
          >{{contacts.phone}}</a>
        </div>
        <div class="links__item">
          <div class="links__header animate__animated animate__fadeInLeft">Напишите мне:</div>
          <a
            :href="`mailto:${contacts.email}`"
            class="links__text animate__animated animate__fadeInLeft"
          >{{contacts.email}}</a>
        </div>
        <div class="links__item">
          <div class="links__header animate__animated animate__fadeInLeft">Я в социальных сетях</div>
          <div class="links__soc">
            <a
              href="https://www.facebook.com/omdesign.su"
              target="_blank"
              class="links__text animate__animated animate__fadeInLeft"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.behance.net/maova"
              target="_blank"
              class="links__text animate__animated animate__fadeInLeft"
            >
              <i class="fab fa-behance"></i>
            </a>
            <a
              href="https://www.instagram.com/ovchinnikova_m_design/"
              target="_blank"
              class="links__text animate__animated animate__fadeInLeft"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <a
          :href="contacts.price"
          class="links__item btn animate__animated animate__fadeInUp"
          target="_blank"
        >скачать прайс</a>
      </div>
      <form class="form animate__animated animate__slideInRight" @submit.prevent="send">
        <textarea
          class="form__input input form__input_text"
          placeholder="Задача"
          v-model.trim="task"
          :class="{'form__input_invalid' : $v.task.$dirty &&! $v.task.required || $v.task.$dirty && !$v.task.minLength}"
        ></textarea>
        <div class="form__inputs">
          <input
            type="text"
            class="form__input input"
            placeholder="Имя"
            v-model.trim="name"
            :class="{'form__input_invalid' : $v.name.$dirty &&! $v.name.required }"
          />
          <input
            type="phone"
            class="form__input input"
            placeholder="Телефон"
            v-model.number="phone"
            :class="{'form__input_invalid' : $v.phone.$dirty && !$v.phone.required || $v.phone.$dirty && !$v.phone.minLength || $v.phone.$dirty &&  !$v.phone.numeric}"
          />
          <input
            type="email"
            class="form__input input"
            placeholder="E-mail"
            v-model.trim="email"
            :class="{'form__input_invalid' : $v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email}"
          />
        </div>
        <div class="form__section">
          <div class="form__msg">{{msg}}</div>

          <button type="submit" class="form__btn btn">
            <template v-if="sending">Отправляем...</template>
            <template v-else>Отправить</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'
export default {
  async fetch ({ store }) {
    await store.dispatch('contacts/loadContacts')
    await store.dispatch('contacts/meta')
  },
  data () {
    return {
      sending: false,
      msg: '',
      task: '',
      name: '',
      phone: '',
      email: ''
    }
  },
  validations: {
    task: {
      required,
      minLength: minLength(8)
    },
    name: {
      required
    },
    phone: {
      required,
      numeric,
      minLength: minLength(11)
    },
    email: {
      required,
      email
    }
  },
  computed: {
    contacts () {
      return this.$store.getters['contacts/contacts']
    },
    desc () {
      return this.$store.getters['contacts/meta']
    }
  },
  methods: {
    async send () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.sending = true
        await this.$store.dispatch('contacts/addMail', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          task: this.task
        })
        this.name = ''
        this.email = ''
        this.phone = ''
        this.task = ''
        this.$v.$reset()
        this.msg = 'Письмо отправленно! Скоро мы вам ответим'
        this.sending = false
      } catch (error) {
        this.msg = 'Не предвиденная ошибка!'
      }
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
.contacts {
  margin-top: 10%;
  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.links {
  flex-basis: 30%;
  @media (max-width: 1355px) {
    flex-basis: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__item {
    margin-bottom: 10%;
    @media (max-width: 1355px) {
      text-align: center;
    }
  }
  .btn {
    // flex-basis: 50%;
    width: 80%;
    @media (max-width: 1355px) {
      width: 100%;
    }
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    text-decoration: none;
    letter-spacing: 0.09em;
    text-transform: lowercase;
    text-align: center;
    padding: 20px;

    /* Gray 2 */
    color: #4f4f4f;
    background: none;
    border: 1px solid #4d6a00;
    box-sizing: border-box;
    transition: all 0.3s;
    &:hover {
      background: #4d6a00;
      color: white;
    }
  }
  &__header {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;

    color: #4f4f4f;
  }
  &__text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    text-decoration: none;
    color: #4d6a00;
  }
  &__soc {
    display: flex;
    margin-top: 2%;
    .links__text {
      margin-right: 20%;
      @media (max-width: 1355px) {
        margin-right: 0;
      }
    }
    @media (max-width: 1355px) {
      justify-content: space-around;
      margin: 0 auto;
      width: 65%;
    }
  }
}
.form {
  flex-basis: 65%;
  @media (max-width: 1355px) {
    flex-basis: 100%;
  }
  &__input {
    @media (max-width: 1355px) {
      flex-basis: 100%;
    }
    flex-basis: 30%;
    margin-bottom: 2%;
    &_text {
      height: 55%;
      width: 100%;
      resize: none;
      padding: 2%;
      margin-bottom: 2%;
    }
    &_invalid {
      border: 1px solid #f57f6c;
    }
    &_success {
      border: 1px solid #a0c601;
    }
  }
  &__inputs {
    display: flex;
    justify-content: space-between;
    @media (max-width: 1355px) {
      flex-wrap: wrap;
    }
  }
  &__section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &__btn {
    text-transform: lowercase;
    margin-top: 20px;
    width: 35%;
    padding: 20px;
    @media (max-width: 1355px) {
      flex-basis: 100%;
      margin-top: 0;
    }
  }
}
</style>
