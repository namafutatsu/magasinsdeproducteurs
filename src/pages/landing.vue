<template lang="pug">
.full-height
  #map(ref="googleMap")
  router-link#current-shop(
    v-if="shop"
    :to="{ name: 'detail', params: { slug: shop.slug }}"
  )
    div
      h3 {{ shop.name }}
      p
        b {{ shop.full_address }}
    .arrow-right
</template>

<script>
/* global MdpApi, GoogleLoad, Vue */

export default {
  data: function () {
    return {
      shops: [],
      shop: null,
    }
  },
  async mounted () {
    this.shops = await MdpApi.getShops()
    await GoogleLoad
    const map = new google.maps.Map(this.$refs.googleMap, {
      center: {
        lat: 44.7, 
        lng: 2.7,
      },
      zoom: 5,
      gestureHandling: 'greedy',
      disableDefaultUI: true,
    })
    google.maps.event.addListener(map, 'click', () => {
      this.shop = null
    })
    this.shops.forEach((shop) => {
      shop.full_address = `${shop.address}, ${shop.zipcode} ${shop.city}`
      const coords = {
        lat: shop.latitude,
        lng: shop.longitude,
      }
      const marker = new google.maps.Marker({ // eslint-disable-line no-new
        position: coords,
        map: map,
        title: shop.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
          fillOpacity: 0.8,
          strokeOpacity: 0.7,
          strokeColor: '#801E6E',
          fillColor: '#801E6E',
          strokeWeight: 1,
        },
      })
      google.maps.event.addListener(marker, 'click', () => {
        this.shop = shop
      })
    })
  },
}
</script>

<style scoped lang="scss">
@import "src/variables";

#map {
  width: 100%;
  height: 100%;
}

#current-shop {
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: white;
  border-top: solid 1px #aaa;
  padding: 1rem;
  padding-bottom: 0;

  white-space: nowrap;

  .arrow-right {
    right: 0px;
    margin-top: -1rem;
    top: 0px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 10px;
    border-color: transparent transparent transparent #587ea8;
  }

  h3 {
    font-family: 'olivier';
  }

  color: #666 !important;
}
</style>
