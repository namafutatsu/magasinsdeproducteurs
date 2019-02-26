<template lang="pug">
div
  #region-map
  #disclaimer
    .content
      .row
        .col.laius
          span.olivier "
          span Nous éprouvons un réel plaisir à manger et boire des aliments qui ont du goût, une histoire...
          p Et ce plaisir est encore plus grand lorsque ces produits nous sont vendus par ceux qui les ont faits.
          p.olivier C'est pourquoi ON AIME les magasins de producteurs."
        .col.images
          img(
            alt='vache',
            title='vache',
            src='~src/assets/images/carottes.png'
          )
          img(
            alt='carottes',
            title='carottes',
            src='~src/assets/images/vache_accueil.png'
          )
</template>

<script>
/* global MdpApi, GoogleLoad, Vue */

export default {
  data: function () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped lang="scss">
@import "src/variables";

#region-map {
  height: 380px;
  background-color: $purple;
}

@media (min-width: 1024px) {
  .laius {
    padding-top: 2rem;
    width: 50%;
    font-size: 1.5rem;
    color: $deep-purple;
  }
  .images {
    width: 50%;
    position: absolute;
    bottom: 0px;
    right: 0px;
    img {
    }
  }
}

.olivier {
  font-family: 'Olivier';
  font-size: 3rem;
}
</style>
