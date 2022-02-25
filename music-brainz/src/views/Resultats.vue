<template>
  <div class="container">
      <div class="row">

        <div v-if="type == 1">
          <h1 class="mb-4">Artist(s)</h1>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <ArtistResultComponent v-for="artist in resultats.artists" :key="artist" :artist="artist" class="col-12 mt-3 mb-3" />
          </div>
        </div>
        <div v-else-if="type == 2">
          <h1>Titre(s)</h1><div class="row row-cols-1 row-cols-md-2 g-4">
            <TitleResultComponent v-for="titre in resultats.recordings" :key="titre" :titre="titre" class="col-12 mt-3 mb-3" />
          </div>
        </div>
        <div v-else>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            Une Erreur est survenue lors du rendu des résultats
          </div>
        </div>
      </div>
  </div>
</template>

<script>


import ArtistResultComponent from "../components/ArtistResultComponent.vue";
import TitleResultComponent from "../components/TitleResultComponent.vue";

export default {
  name: "Resultats",
  components: {
    ArtistResultComponent,
    TitleResultComponent,
  },
  data: function () {
      return {
        type : 1,
        resultats : [],
    }
  },
  created(){
      // If the array is empty : redirect to Home
      if (!this.$parent.$parent.results){
        this.$router.push({name:'Home'})
      }
      this.type = this.$parent.$parent.type
      this.resultats = this.$parent.$parent.results
      console.log(this.resultats)
      if (this.resultats == null){
        this.$router.push({name:'Home'})
        
      }else if (this.resultats.artists == null && this.resultats.recordings == null){
        this.$router.push({name:'Home'})
      }
  }
};
</script>
