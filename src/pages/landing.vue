<template lang="pug">
#map-container.flex-grow.full-height
  #map(ref="googleMap")
  transition(name='slide-fade' mode='out-in')
    router-link#current-shop(
      v-if="shop"
      :key='shop',
      :to="{ name: 'detail', params: { slug: shop.slug }}"
    )
      .horiz-flex
        div
          h3 {{ shop.name }}
          p
            b {{ shop.full_address }}
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

    // Flexbox and Google maps don't mix well
    this.$refs.googleMap.style.height = document.getElementById('map-container').clientHeight + 'px'

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

#map-container {
  position: relative;
  width: 100%;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
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

  font-size: 12px;

  padding: 2rem;
  padding-bottom: 1rem;

  white-space: nowrap;

  color: #666 !important;

  h3 {
    font-family: 'olivier';
  }
}
</style>
