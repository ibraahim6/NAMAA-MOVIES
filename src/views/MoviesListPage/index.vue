<template>
  <div>
    <v-container fluid>
      <v-row v-if="haveOriginalMovies">
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <v-btn color="primary" variant="outlined" @click="showFilterSection = !showFilterSection">
            <v-icon icon="mdi-filter" />Filter Movies
          </v-btn>
          <v-btn color="primary" text="Add a new movie" @click="addMovie">
            <v-icon icon="mdi-plus" />Add a new movie
          </v-btn>
        </v-col>
        <v-col cols="12" class="d-flex align-center">
          <v-expand-transition v-show="showFilterSection">
            <MoviesFilter @filterData="handleFilterData" @closeFilter="showFilterSection = false" />
          </v-expand-transition>
        </v-col>
        <template v-if="filteredMovies.length">
          <v-col cols="12" lg="3" md="4" sm="6" v-for="(movie, idx) in filteredMovies" :key="idx">
            <MovieCard :movieObj="movie" />
          </v-col>
        </template>
        <v-col v-else cols="12" class="mt-5">
          <EmptyState
            image="https://cdn.pixabay.com/photo/2013/07/12/13/56/film-reel-147631_640.png"
            title="No movies founded"
            :hasBtn="false"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="mt-5">
          <EmptyState
            image="https://cdn.pixabay.com/photo/2013/07/12/13/56/film-reel-147631_640.png"
            title="No movies added yet !"
            btnText="Add a new movie"
            @btnAction="addMovie"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import MovieCard from '@/components/MoviesModule/MovieCard/index.vue'
import MoviesFilter from '@/components/MoviesModule/MoviesFilter/index.vue'

export default {
  name: "MoviesListPage",
  components: {
    MovieCard,
    MoviesFilter
  },

  computed: {
    ...mapGetters(['haveOriginalMovies', 'filteredMovies'])
  },

  data() {
    return {
      showFilterSection: false,
      filterData: null
    }
  },

  mounted() {
    this.getAllFilteredMovies(this.filterData)
  },

  methods: {
    ...mapActions(['getAllFilteredMovies']),
    handleFilterData(data) {
      this.getAllFilteredMovies(data)
      this.filterData = data
    },
    addMovie() {
      this.$router.push('/add-movie')
    }
  }
}
</script>
<style scoped>
@import "./index.scss";
</style>
