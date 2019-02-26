<template lang="pug">
div
  #header
    .content
      .row
        .col.logo
          a(href="/")
            img(
              id="top_logo"
              src="~/src/assets/images/logo.png"
              alt="Magasin de Producteurs"
              title="Magasin de Producteurs"
            )
        .col.mentions
          a(href='#')
            img(
              alt='Histoires de Producteurs',
              title='Histoires de Producteurs',
              src='~/src/assets/images/footer_catalog.png'
            )
            | Histoires de Producteurs
          a(href='#')
            img(
              alt='Si vous êtes un Magasin de Producteurs',
              title='Si vous êtes un Magasin de Producteurs',
              src='~src/assets/images/home.png'
            )
            | Si vous êtes un Magasin de Producteurs
          a(href='#')
            img(
              alt='Se Connecter',
              title='Se Connecter',
              src='~src/assets/images/logon.png'
            )
            | Se connecter
          a(href='#')
            img(
              alt="S'inscrire",
              title="S'inscrire",
              src='~src/assets/images/subscribe.png'
            )
            | S'inscrire

  router-view
  #footer
</template>

<script>
/* global Vue */

import router from 'src/routes'

export default {
  data: function () {
    return {}
  },
  methods: {
  },
  computed: {
  },
  components: {
  },
}
</script>

<style scoped lang="scss">
@import "src/variables";

#top_logo {
  margin: 6px;
  float: left;
}

#header {
  color: white;
  position: relative;
  min-height: 100px;
  background-color: $deep-purple;
  margin-bottom: 0px;

  a {
    color: white;
    text-decoration: none;
  }

  .mentions a {
    margin-left: 12px;
    img {
      margin-right: 6px;
    }
  }
}

@media (max-width: 1024px) {
  .logo { width: 100%; }
  .mentions { width: 100%; }
}

@media (min-width: 1024px) {
  .logo { width: 30%; }
  .mentions {
    width: 70%;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}
</style>
