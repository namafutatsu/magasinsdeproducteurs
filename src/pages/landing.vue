<template lang="pug">
.full-height
  #map(ref="googleMap")
  router-link#current-shop(
    v-if="shop"
    :to="{ name: 'detail', params: { slug: shop.slug }}"
  )
    .content.horiz-flex
      div
        h3 {{ shop.name }}
        p
          b {{ shop.full_address }}
      .arrow-right
</template>

<script>
/* global google, navigator, MdpApi, GoogleLoad */
import { getMapIcon } from 'src/services/utils'

function getCurrentPosition (options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export default {
  data: function () {
    return {
      shops: [],
      shop: null,
    }
  },
  async mounted () {

    const [, shops] = await Promise.all([
      GoogleLoad,
      MdpApi.getShops(),
    ])

    const map = new google.maps.Map(this.$refs.googleMap, {
      center: {
        lat: 46.2,
        lng: 2.7,
      },
      zoom: 6,
      gestureHandling: 'greedy',
      disableDefaultUI: true,
    })

    google.maps.event.addListener(map, 'click', () => {
      this.shop = null
    })

    getCurrentPosition().then((posData) => {
      const coords = {
        lat: posData.coords.latitude,
        lng: posData.coords.longitude,
      }
      map.setOptions({
        center: coords,
        zoom: 9,
        title: 'Ma position',
      })
      new google.maps.Marker({ // eslint-disable-line no-new
        position: coords,
        map: map,
      })
      console.log('got coordinates', coords)
    }, (err) => {
      console.warn('could not acquire position', err)
    })

    shops.forEach((shop) => {
      shop.full_address = `${shop.address}, ${shop.zipcode} ${shop.city}`
      const coords = {
        lat: shop.latitude,
        lng: shop.longitude,
      }
      const marker = new google.maps.Marker({ // eslint-disable-line no-new
        position: coords,
        map: map,
        title: shop.name,
        icon: getMapIcon(),
      })
      google.maps.event.addListener(marker, 'click', () => {
        this.shop = shop
      })
    })

    this.shops = shops
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
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-top: solid 1px #aaa;

  font-size: 15px;

  padding: 3rem 0 2rem 0;

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
