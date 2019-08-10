<template lang="pug">
div.full-height
  #header
    .logo
      a(href="/")
        img(
          id="top_logo"
          src="~/src/assets/images/logo-small.png"
          alt="Magasin de Producteurs"
          title="Magasin de Producteurs"
        )
    input#search.form-control.form-control-lg(type="text", placeholder="Chercher un magasin")
    button#switch-btn.btn.btn-lg.btn-outline-light(type="button") 
      span.oi.oi-list(title='list' aria-hidden='true')
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
  display: inline;
}

#search {
  margin: 6px;
  cursor: pointer;
}

#switch-btn {
  margin: 6px;
  cursor: pointer;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  position: relative;
  min-height: 52px;
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
