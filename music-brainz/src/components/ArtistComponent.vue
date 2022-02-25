<template>
  <div class="artist-component">
    <h1>{{ artist.name }}</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum veniam eum earum, ab iusto accusantium!
      
    </p>
    <button class="btn btn-dark" @click="handleClickReturnResults()">Retourner aux résultats</button>
  </div>
</template>

<script>
export default {
  name: 'ArtistComponent',
  props: ['artist'],
  methods: {
    handleClickReturnResults(){
      this.$router.push({name:'Resultats'})
    }
  },
}
</script>