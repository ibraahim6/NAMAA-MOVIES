<template>
  <div class="about">
    <h2 class="text-primary my-3">Edit Movie page</h2>
    <v-divider />
    <MovieAddEditForm :outer-movie="movieObj" @editData="handleEditMovie" />

    <Toast
      :outer-toast-modal="toastModal"
      :toast-obj="toastObj"
      @closeToast="toastModal = $event"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MovieAddEditForm from "@/components/MoviesModule/MovieAddEditForm/index.vue";

export default {
  name: "MovieEditPage",
  components: {
    MovieAddEditForm,
  },
  computed: {
    ...mapGetters(["singleMovie"]),
    movieObj() {
      return this.singleMovie(this.$route.params.id);
    },
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
    ...mapActions(["editMovie"]),
    handleEditMovie(data) {
      this.editMovie(data).then((isSuccess) => {
        if (isSuccess) {
          this.$router.push("/");
          this.toastModal = true;
          this.toastObj = {
            text: "Success !",
            title: "Movie edited successfully.",
            color: "success",
          };
        } else {
          this.toastModal = true;
          this.toastObj = {
            text: "Error !",
            title: "Movie not founded.",
            color: "danger",
          };
        }
      });
    },
  },
};
</script>
<style scoped>
@import "./index.scss";
</style>
