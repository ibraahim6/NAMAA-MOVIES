<template>
  <div class="about">
    <div class="d-flex justify-space-between align-center my-2">
      <h2 class="text-primary my-3">View Movie page</h2>
      <v-btn color="primary" variant="tonal" :to="`/movie/${movieObj.id}/edit`">
        <v-icon class="me-2" size="small"> mdi-pencil </v-icon>
        Edit
      </v-btn>
    </div>
    <v-divider />

    <v-container>
      <v-row>
        <v-col cols="12" class="my-2">
          <MovieCard :movie-obj="movieObj" :readOnlyMode="true" />
        </v-col>
        <v-col cols="12" class="my-2">
          <h3 class="text-primary my-2">Actors Section</h3>
          <ActorsTable :items="movieObj.listOfActors" :hasActions="false" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ActorsTable from '@/components/ActorsModule/ActorsTable/index.vue'

export default {
  name: 'MovieViewPage',
  components: {
    ActorsTable
  },
  computed: {
    ...mapGetters(['singleMovie']),
    movieObj() {
      return this.singleMovie(this.$route.params.id)
    }
  },
}
</script>
<style>
@import './index.scss';
</style>
