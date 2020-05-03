<template lang="pug">
.content.full-height.vert-flex
  #shop-detail.flex-grow.full-height
    div(v-if="shop")
      .shop-header
        h2 {{ shop.name }}
        img.shop(:src="shop.picture")
      p.description {{ shop.description }}
      p
        b
          a(:href='mapsLink' target='_blank')
            img.external-link(src="~/src/assets/images/external-link.png")
            span {{ shop.full_address }}
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
      span.title Connaissez-vous les huiles aromatiques ?&nbsp;
      i Les huiles aromatiques Le Rouquet sont obtenues par macération de plantes fraîches dans une huile d’olive vierge extra.
      p
        a(href="https://lerouquet.fr/", target='_blank') Les découvrir ici !

</template>

<script>
/* global MdpApi */

export default {
  data: function () {
    return {
      shop: null,
    }
  },
  computed: {
    mapsLink () {
      return `http://maps.google.com/maps?q=${this.shop.coords.lat},${this.shop.coords.lng}`
    },
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
      // URL = http://maps.google.com/maps?q=24.197611,120.780512
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

img.external-link {
  height: 1.2rem;
  margin-right: 0.5rem;
}

#map {
  height: 120px;
  width: 100%;
  margin-bottom: 1rem;
}

#shop-detail {
  margin-top: 2rem;
  padding: 2rem;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

#oil-banner {
  margin-top: auto;
  margin-bottom: 10px;
  box-shadow: 0px 0px 6px #aaa;
  display: flex;
  align-items: center;
  height: 160px;
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

</style>
