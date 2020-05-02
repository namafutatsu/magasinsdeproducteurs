<template lang="pug">
#main.content.full-height
  .title Qui sommes-nous ?
  p Bienvenue dans l'annuaire des magasins de producteurs. J'espère qu'il vous permettra de trouver un magasin près de chez vous et qu'il vous donnera envie d'y faire vos courses !
  p Artisane installée dans les Cévennes, je m'occupe de ce site bénévolement. Si vous aussi vous soutenez les magasins de producteurs, n'hésitez pas à nous communiquer toute information utile les concernant en utilisant le formulaire de contact.
  p
    i Manuelle
  .text-center
    img(src='~/src/assets/images/ManuellePortraitLavande.png')
    p Manuelle Vaguelsy
    p
      a(href="https://lerouquet.fr/", target='_blank') Domaine Le Rouquet

</template>

<script>
</script>

<style scoped lang="scss">
@import "src/variables";

#main {
  padding: 1rem;
}

.title {
  font-family: olivier;
  font-size: 2rem;
}
</style>
