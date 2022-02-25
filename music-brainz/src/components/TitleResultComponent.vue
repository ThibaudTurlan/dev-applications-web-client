<template>
    <div id="resultats-component">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ titre.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ this.date }}</h6>
          <p class="card-text"> Artists :  <span v-for="artist in this.artists" :key="artist"> {{ artist.name }} {{ artist.joinphrase }} </span></p>
          <button class="btn btn-dark" @click="handleClickViewMore(titre)">More</button>
        </div>
      </div>  
    </div>
</template>

<script>
export default {
  name: 'ResultatsComponent',
  props: ['titre'],
  methods: {
    handleClickViewMore(titre){
      this.$parent.$parent.$parent.clickedtitre = titre
    }
  },
  data: function () {
      return {
      artists : '',
      date: '',
    }
  },
  created(){
      this.artists = this.titre["artist-credit"]
      this.date = this.titre["first-release-date"]
      console.log(this.date)
  }
}

</script>
