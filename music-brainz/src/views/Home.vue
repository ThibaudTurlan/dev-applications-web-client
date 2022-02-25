<template>  
  <div class="mt-3">
    <SearchComponent/>
  </div>
</template>

<script>

import SearchComponent from '../components/SearchComponent.vue';

export default {
  name: "Home",
  components: {
    SearchComponent,    
  },
};
</script>