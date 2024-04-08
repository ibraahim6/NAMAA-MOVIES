<template>
  <v-dialog v-model="innerDialog" persistent max-width="500px">
    <v-alert :color="confirmation.color" border>
      <template v-slot:title>
        {{ confirmation.title }}
      </template>
      <p>
        {{ confirmation.text }}
      </p>
      <v-row class="justify-end align-center my-2 px-2">
        <v-btn small color="primary" class="mx-2" @click="confirmAction"> ok </v-btn>
        <v-btn variant="outlined" small text class="mx-2" @click="closeDialog"> close </v-btn>
      </v-row>
    </v-alert>
  </v-dialog>
</template>
<script>
export default {
  name: 'ConfirmationDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },

    confirmation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      innerDialog: false
    }
  },
  watch: {
    dialog: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.innerDialog = newVal
      }
    }
  },
  methods: {
    confirmAction() {
      this.innerDialog = false
      this.$emit('confirmAction')
    },
    closeDialog() {
      this.innerDialog = false
      this.$emit('closeDialog', this.innerDialog)
    }
  }
}
</script>
<style scoped>
@import "./index.scss";
</style>
