<template>
  <v-snackbar v-model="toastModal" :color="toastObj.color" :timeout="5000" vertical>
    <div class="text-subtitle-1 pb-2">{{ toastObj.title }}</div>

    <p>{{ toastObj.text }}</p>

    <template v-slot:actions>
      <v-btn variant="outlined" @click="closeToast"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'ToastComponent',
  props: {
    outerToastModal: {
      type: Boolean,
      default: false
    },
    toastObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      toastModal: false
    }
  },
  watch: {
    outerToastModal: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.toastModal = newVal
      }
    }
  },
  methods: {
    closeToast() {
      this.toastModal = false
      this.$emit('closeToast', this.toastModal)
    }
  }
}
</script>
<style></style>
