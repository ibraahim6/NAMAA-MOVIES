<template>
  <div class="about">
    <h2 class="text-primary my-3">Add a new Movie page</h2>
    <v-divider />
    <MovieAddEditForm @submitData="handleAddMovie" />

    <Toast
      :outer-toast-modal="toastModal"
      :toast-obj="toastObj"
      @closeToast="toastModal = $event"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MovieAddEditForm from '@/components/MoviesModule/MovieAddEditForm/index.vue'

export default {
  name: 'MovieAddPage',
  components: {
    MovieAddEditForm
  },
  data() {
    return {
      toastObj: {
        text: "",
        title: "",
        color: "",
      },
      toastModal: false,
    };
  },
  methods: {
    ...mapActions(['addMovie']),
    handleAddMovie(data) {
      this.addMovie(data).then((isSuccess) => {
        if (isSuccess) {
          this.$router.push("/");
          this.toastModal = true;
          this.toastObj = {
            text: "Success !",
            title: "Movie added successfully.",
            color: "success",
          };
        } else {
          this.toastModal = true;
          this.toastObj = {
            text: "Error !",
            title: "Failed to added movie.",
            color: "danger",
          };
        }
      });
    }
  }
}
</script>
<style scoped>
@import "./index.scss";
</style>
