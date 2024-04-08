<template>
  <div>
    <v-empty-state :image="image" size="200" text-width="250">
      <template v-slot:title>
        <div class="text-h6 text-high-emphasis">{{ title }}</div>
      </template>

      <template v-if="hasBtn" v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" :text="btnText" @click="$emit('btnAction')"></v-btn>

        <v-spacer></v-spacer>
      </template>
    </v-empty-state>
  </div>
</template>
<script>
import { VEmptyState } from 'vuetify/labs/VEmptyState'
export default {
  name: "EmptyState",
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    hasBtn: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  components: {
    VEmptyState
  },
}
</script>
<style scoped>
@import "./index.scss";
</style>
