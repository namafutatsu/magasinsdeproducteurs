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
      router-link#login(to="/login")
        .oi.oi-account-login

  transition(name='slide-fade' mode='out-in')
    router-view
  #footer.header-footer
    .horiz-flex
      router-link(to="/qui-sommes-nous") Qui sommes-nous ?
      a(href='mailto:contact@magasins-de-producteurs.com')
        span.oi.oi-envelope-closed &nbsp;
        span Contact
      router-link(to="/mentions-legales") Mentions légales
    .horiz-flex
      a(href='https://www.facebook.com/magasindeproducteurs', target='_blank')
        img.link-img(src="~/src/assets/images/facebook.png")
      a(href='http://www.bienvenue-a-la-ferme.com/', target='_blank')
        img.link-img(src="~/src/assets/images/baf_small.png")
      a(href='https://www.boutiquespaysannes.fr/', target='_blank')
        img.link-img(src="~/src/assets/images/bpaysannes_small.png")
      a(href='http://www.terredenvies.fr/', target='_blank')
        img.link-img(src="~/src/assets/images/terredenvies_small.png")
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
  z-index: 10000;

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
  width: 24px;
}

#header {
  padding: 0.8rem 0;
  box-shadow: 0px 3px 3px #888;
}

#footer {
  box-shadow: 0px -3px 3px #888;

  text-align: center;
  padding: 0.5rem;

  .horiz-flex {
    justify-content: space-around;
    margin-bottom: 0.8rem;
  }

  .link-img {
    height: 2rem;
    border-radius: 3px;
  }
}

#login {
  font-size: 1.5rem;
  margin: 0 0.8rem;
}

@media screen and (min-width: 1024px) {
  #footer {
    .horiz-flex {
      margin: 0 auto;
      margin-bottom: 0.8rem;
      width: 400px;
    }
  }
}
</style>
