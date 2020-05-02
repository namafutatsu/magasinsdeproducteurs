<template lang="pug">
.full-height.vert-flex
  #header.header-footer
    .content.horiz-flex
      .logo
        a(href="/")
          img(
            id="top_logo"
            src="~/src/assets/images/logo.png"
            alt="Magasin de Producteurs"
            title="Magasin de Producteurs"
          )
      input#search.form-control.form-control-lg(type="text", placeholder="Chercher un magasin")
      #spacer
      button#switch-btn.btn.btn-lg.btn-outline-light(type="button") 
        span.oi.oi-grid-three-up(title='menu' aria-hidden='true')
  router-view
  #footer.header-footer
    span Création Jeanne Vaguelsy, Victor Perron
</template>

<script>
/* global MdpApi */

import Awesomplete from 'awesomplete'

export default {
  async mounted () {
    const names = await MdpApi.getShopNames()
    let input = document.getElementById('search')
    const shopNameList = names.map((s) => {
      return {
        label: s.name,
        value: s.slug,
      }
    })
    new Awesomplete(input, {
      minChars: 0,
      list: shopNameList,
      replace: function (suggestion) {
        this.input.value = ''
      },
    })
    input.addEventListener('awesomplete-select', (e) => {
      this.$router.push({ name: 'detail', params: { slug: e.text.value } })
    })
  }
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

.header-footer {
  width: 100%;

  color: #ddd;

  background-color: $deep-purple;
  margin-bottom: 0px;

  a {
    color: white;
    text-decoration: none;
  }
}

.logo img {
  height: 4rem;
}

#spacer {
  width: 12px;
}

#header {
  padding: 0.8rem 0;
}

#footer {
  text-align: center;
}

</style>
