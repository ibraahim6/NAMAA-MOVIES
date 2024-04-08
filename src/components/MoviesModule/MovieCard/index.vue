<template>
  <v-card class="mx-auto" variant="outlined">
    <v-img height="200px" src="@/assets/movie-simple.png" cover></v-img>

    <v-card-title> {{ movieObj.title }} </v-card-title>

    <v-card-subtitle>
      <div class="d-flex justify-space-between align-center">
        <span>
          <v-icon icon="mdi-calendar-star-outline"></v-icon>
          <span class="mx-2">
            {{ movieObj.year }}
          </span>
        </span>

        <v-chip color="primary" outlined variant="flat">
          <v-icon icon="mdi-account-group-outline"></v-icon>
          <span class="mx-2">
            {{ numOfActors }}
          </span>
        </v-chip>
      </div>
    </v-card-subtitle>

    <v-card-text v-if="readOnlyMode" class="my-2">
      <p class="overflow-description">
        {{ movieObj.description }}
      </p>
    </v-card-text>

    <v-card-actions v-if="!readOnlyMode" class="d-flex justify-end align-center my-2">
      <v-btn color="primary" variant="tonal" :to="`/movie/${movieObj.id}/view`">
        <v-icon class="me-2" size="small"> mdi-eye </v-icon>
        View
      </v-btn>
      <v-btn color="primary" variant="tonal" :to="`/movie/${movieObj.id}/edit`">
        <v-icon class="me-2" size="small"> mdi-pencil </v-icon>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'MovieCard',
  props: {
    movieObj: {
      type: Object,
      default: () => {}
    },
    readOnlyMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    numOfActors() {
      return this.movieObj.listOfActors?.length || 0
    }
  },
}
</script>

<style scoped>
@import "./index.scss";
</style>
