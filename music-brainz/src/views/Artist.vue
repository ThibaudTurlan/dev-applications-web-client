<template>
  <div>
    <ArtistComponent  :artist=this.artist /> 
  </div>
</template>

<script>

import ArtistComponent from "../components/ArtistComponent.vue";

export default {
  name: "Artist",
  components: {
    ArtistComponent,
  },
  data: function () {
      return {
      artist : [],
    }
  },
  created(){
      this.artist = this.$parent.$parent.clickedArtist
      console.log(this.artist)
      //  if array reslut is empty redirected in home page
      if (this.artist == null){
        this.$router.push({name:'Home'})
    }
  }

};
</script>
