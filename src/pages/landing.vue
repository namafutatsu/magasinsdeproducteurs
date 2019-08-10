<template lang="pug">
.full-height
  #map(ref="googleMap")
</template>

<script>
/* global MdpApi, GoogleLoad, Vue */

export default {
  data: function () {
    return {
      shops: [],
    }
  },
  async mounted () {
    this.shops = await MdpApi.getShops()
    await GoogleLoad
    const map = new google.maps.Map(this.$refs.googleMap, {
      center: {
        lat: 46.7, 
        lng: 1.7,
      },
      zoom: 5,
      gestureHandling: 'greedy',
      disableDefaultUI: true,
    })
    this.shops.forEach((shop) => {
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
      const infoWindow = new google.maps.InfoWindow({
        content: shop.name,
      })
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker)
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
