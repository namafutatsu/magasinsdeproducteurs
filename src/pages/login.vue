<template lang="pug">
#main.content.full-height
  .title Se connecter

  #content
    form
      .form-group
        label Nom d'utilisateur
        input.form-control(
          autofocus,
          type="text",
          required,
          v-model="username",
          :class="{'animate-shake': shakeUsername}",
          placeholder="Nom d'utilisateur",
          @keyup.enter="submit",
          @keyup.esc="closeLoginForm",
        )
      .form-group
        label Mot de passe
        input.form-control(
          type="password",
          required,
          v-model="password",
          :class="{'animate-shake': shakePassword}",
          placeholder="Mot de passe",
          @keyup.enter="submit",
          @keyup.esc="closeLoginForm",
        )
      .form-check
         input.form-check-input(type="checkbox")
         label.form-check-label Se souvenir de moi
      .row(v-if="invalidLogin")
        b.active Nom d'utilisateur ou mot de passe erroné.
      .row(v-if="unexpectedError")
        b.active Une erreur s'est produite dans l'accès à nos serveurs. Veuillez contacter le support technique.
      button.btn.btn-primary(type="submit" @click="submit") Se connecter
</template>

<script>
/* global grecaptcha, MdpApi, RecaptchaLoad */

export default {
  data: function () {
    return {
      rememberMe: true,
      processingLogin: false,
      shakeUsername: false,
      shakePassword: false,
      username: null,
      password: null,
      invalidLogin: false,
      unexpectedError: false,
    }
  },
  mounted () {
    // not useful here...
    RecaptchaLoad.then(() => {
      grecaptcha.render('recaptcha', {
        'sitekey': '6LfwHi8UAAAAAAcPnsYGLTrqWudhe36AaEwZqZhZ',
        'callback': () => {
          this.captchaVerified = true
        },
      })
    })
  },
  methods: {
    updateRememberMe () {
      this.rememberMe = !this.rememberMe
    },
    validate () {
      if (!this.username) {
        this.shakeUsername = true
        throw new Error('invalid username')
      }
    },
    async _doLogin () {
      this.processingLogin = true
      try {
        await MdpApi.getToken(this.username, this.password, this.rememberMe)
      } catch (e) {
        this.processingLogin = false
        if (e.status === 400) {
          this.invalidLogin = true
        } else {
          this.unexpectedError = true
        }
      }
    },
    _resetShakes () {
      setTimeout(() => {
        this.shakeUsername = false
        this.shakePassword = false
      }, 1000)
    },
    async submit () {
      try {
        this.validate()
      } catch (e) {
        this._resetShakes()
        return
      }

      await this._doLogin()
    },
  },
}
</script>

<style scoped lang="scss">
@import "src/variables";

#main {
  padding: 1rem;
}

.title {
  font-family: olivier;
  font-size: 2rem;
}

@media screen and (min-width: 1024px) {
  #main {
    margin: 2rem auto;
    width: 400px;
  }
}
</style>
