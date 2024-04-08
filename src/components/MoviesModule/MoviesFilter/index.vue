<template>
  <v-card variant="outlined" width="100%" class="py-3 px-5">
    <v-card-text>
      <Form @submit="handleFilterData">
        <v-row>
          <v-col cols="12">
            <TextField name="Title" label="Movie title" v-model="filter.title" />
          </v-col>
          <v-col cols="6">
            <TextField
              name="Movie year"
              label="Movie year"
              type="number"
              rules="min:4|max:4|min_value:1800|max_value:2100"
              v-model="filter.year"
            />
          </v-col>
          <v-col cols="6">
            <TextField
              name="Number of actors"
              label="Number of actors"
              type="number"
              rules="min_value:1"
              v-model="filter.numOfActors"
            />
          </v-col>
        </v-row>
        <v-row class="justify-end align-center">
          <v-btn color="primary" class="ma-2" type="submit">Filter</v-btn>
          <v-btn color="primary" class="ma-2" variant="outlined" @click="handleResetFilter">
            Reset
          </v-btn>
          <v-btn color="danger" class="ma-2" variant="text" @click="handleCloseFilter">
            close
          </v-btn>
        </v-row>
      </Form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MoviesFilter',
  data() {
    return {
      filter: {
        title: null,
        year: null,
        numOfActors: null
      }
    }
  },
  methods: {
    handleFilterData() {
      this.$emit('filterData', this.filter)
    },
    handleResetFilter() {
      this.filter = {
        title: null,
        year: null,
        numOfActors: null
      }
      this.$emit('filterData', this.filter)
    },
    handleCloseFilter() {
      this.$emit('closeFilter')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
