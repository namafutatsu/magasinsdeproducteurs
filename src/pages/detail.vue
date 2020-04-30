<template lang="pug">
#main.content
  div(v-if="shop")
    .shop-header
      h2 {{ shop.name }}
      img.shop(:src="shop.picture")
    p.description {{ shop.description }}
    #map(ref="googleMap")
    p
      b {{ shop.full_address }}
    p(v-if="shop.phone")
      span Téléphone:&nbsp;
      a(:href='phoneLink') {{ shop.phone }}
    p(v-if="shop.email")
      span E-Mail:&nbsp;
      a(:href='mailLink') {{ shop.email }}
  div(v-else) Chargement...
  #oil-banner
    img(src="~/src/assets/images/huiles.png")
    .oil-text
      span.title Connaissez-vous les huiles aromatiques ?
      i Les huiles aromatiques Le Rouquet sont obtenues par macération de plantes fraîches dans une huile d’olive vierge extra.
      p
        a(href="https://lerouquet.fr/") Les découvrir ici !

</template>

<script>
/* global google, MdpApi, GoogleLoad */

import { getMapIcon } from 'src/services/utils'

export default {
  data: function () {
    return {
      shop: null,
    }
  },
  computed: {
    phoneLink () {
      return `tel:${this.shop.phone}`
    },
    mailLink () {
      return `mail:${this.shop.email}`
    },
  },
  methods: {
    async onLoad (slug) {
      this.shop = await MdpApi.getShop(slug)
      await GoogleLoad
      const map = new google.maps.Map(this.$refs.googleMap, {
        center: this.shop.coords,
        zoom: 10,
        disableDefaultUI: true,
      })
      google.maps.event.addListener(map, 'click', () => {
        this.shop = null
      })
      // URL = http://maps.google.com/maps?q=24.197611,120.780512
      new google.maps.Marker({ // eslint-disable-line no-new
        position: this.shop.coords,
        map: map,
        title: this.shop.name,
        icon: getMapIcon(),
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.onLoad(to.params.slug)
    next()
  },
  async mounted () {
    this.onLoad(this.$route.params.slug)
  },
}
</script>

<style scoped lang="scss">
@import "src/variables";

#main {
  padding: 1rem;

  .shop-header {
    font-family: 'olivier';
    text-align: center;
  }

  .description {
    white-space: pre-line;
    text-justify: inter-word;
  }

  img.shop {
    max-height: 200px;
    margin-bottom: 1rem;
    border-radius: 50%;
  }

  #map {
    height: 120px;
    width: 100%;
    margin-bottom: 1rem;
  }

  #oil-banner {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 140px;
    background-color: #f8f2e8;
    padding: 1rem;

    img {
      height: 100%;
    }

    .oil-text {
      padding: 1rem;
    }

    span.title {
      font-family: 'olivier';
    }
  }
}

</style>
