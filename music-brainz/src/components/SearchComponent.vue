<template>
  <div class="container">
    <form class="row g-3">
      <!-- INPUT SEARCH -->
      <div class="col-7">
        <input
          type="text"
          class="form-control"
          placeholder="search"
          v-model="value"
        />
      </div>
      <!-- INPUT SEARCH -->

      <!-- INPUT OPTION SEARCH -->
      <div class="col-2">
        <label class="visually-hidden" for="inlineFormSelectPref"
          >Preference</label
        >
        <select
          class="form-select"
          id="inputGroupSelect01"
          v-on:change="onChangeType($event)"
        >
          <option selected>Option</option>
          <option value="1">Artist</option>
          <option value="2">Titre</option>
        </select>
      </div>
      <!-- INPUT OPTION SEARCH -->

      <!-- BTN SEARCH -->
      <div class="col-3">
        <button
          class="btn btn-dark"
          type="button"
          id="button-addon2"
          @click="handleSearchClick"
        >
          Search
        </button>
      </div>
      <!-- BTN SEARCH -->
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchComponent",
  data: function () {
    return {
      optionForm: 1,
      value: "",
    };
  },
  methods: {
    handleSearchClick() {
      // log value form
      console.log(this.value);
      console.log(this.optionForm);
      this.sendRequest();
    },
    onChangeType: function (e) {
      this.optionForm = e.target.value;
      console.log(this.optionForm);
    },
    sendRequest() {
      let apiURL = "";
      if (this.optionForm == 1) {
        // Artist
        apiURL = `https://musicbrainz.org/ws/2/artist?query=artist:${this.value}%20AND%20type:person&limit=12&fmt=json`;
      } else if (this.optionForm == 2) {
        // Titre
        apiURL = `https://musicbrainz.org/ws/2/recording?query=${this.value}&limit=10&fmt=json`;
      } else {
        throw new Error();
      }
      axios
        .get(apiURL, {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "music-brainz/1.0 ( monkeys.dev@gmail.com )",
          },
        })
        .then((response) => {
          this.datas = response.data;
          this.$parent.$parent.$parent.type = this.optionForm;
          this.$parent.$parent.$parent.results = response.data;

          console.log(this.$parent.$parent.$parent.results);
          this.$router.push({ name: "Resultats" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
