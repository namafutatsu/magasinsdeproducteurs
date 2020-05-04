<template lang="pug">
#map-container.flex-grow.full-height
  transition(name='slide-fade' mode='out-in')
    #message(v-if='displayTopMessage')
      i.oi.oi-x(@click='displayTopMessage = false')
      p Nous éprouvons un réel plaisir à manger et boire des aliments qui ont du goût, une histoire...
      p Et ce plaisir est encore plus grand lorsque ces produits nous sont vendus par ceux qui les ont faits.
      .emphasis C'est pourquoi ON AIME les magasins de producteurs.
  #map(ref="googleMap")
  transition(name='slide-fade' mode='out-in')
    router-link#current-shop(
      v-if="shop"
      :key='shop',
      :to="{ name: 'detail', params: { slug: shop.slug }}"
    )
      .horiz-flex
        .content
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
      displayTopMessage: true,
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
        lat: 46.9,
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

#message {
  text-align: center;
  position: absolute;
  z-index: 1000;
  left: 50%;
  top: 10px;
  padding: 0.4rem;
  color: $purple;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 5px #888;

  .emphasis {
    font-family: olivier;
    font-size: 1.2rem;
  }

  .oi {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
  }
}

@media (max-width: 1024px) {
  #message {
    width: 96%;
    margin-left: -48%;
  }
}

@media screen and (min-width: 1024px) {
  #message {
    width: 800px;
    margin-left: -400px;
  }

  #current-shop {
    justify-content: space-around;
  }
}
</style>
