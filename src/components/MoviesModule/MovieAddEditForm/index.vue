<template>
  <v-container>
    <Form ref="movieForm" @submit="handleSubmitData">
      <v-row>
        <v-col cols="12" md="6">
          <TextField name="Title" label="Title" rules="required" v-model="movie.title" />
        </v-col>
        <v-col cols="12" md="6">
          <TextField
            name="Year"
            label="Year"
            type="number"
            rules="required|min:4|max:4|min_value:1800|max_value:2100"
            v-model="movie.year"
          />
        </v-col>
        <v-col cols="12">
          <TextareaField
            name="Description"
            label="Description"
            v-model="movie.description"
          />
        </v-col>
      </v-row>
      <v-row class="justify-end align-center">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between align-center my-2">
              <h3 class="text-primary">Actors Section</h3>
              <v-btn v-if="movie.listOfActors.length" color="primary" @click="addActor">
                <v-icon icon="mdi-plus" />Add a new Actor
              </v-btn>
            </v-col>
          </v-row>
          <ActorsTable
            :items="movie.listOfActors"
            @editActor="editActor"
            @deleteActor="deleteActor"
          />
        </v-col>
      </v-row>
      <v-row class="justify-end align-center">
        <v-btn color="primary" class="ma-2" type="submit">
          {{ isEditMode ? "Edit movie" : "Add movie" }}
        </v-btn>
        <v-btn color="primary" class="ma-2" variant="outlined" type="button" to="/">
          {{ isEditMode ? "Cancel" : "back to home" }}
        </v-btn>
      </v-row>
    </Form>

    <ActorAddEditModal
      :dialog="actorDialog"
      :outerActor="selectedActor"
      @submitData="handleAddActor"
      @editData="handleEditActor"
      @closeDialog="handleCloseActorDialog"
    />

    <ConfirmationModal
      :dialog="actorDeleteDialog"
      :confirmation="confirmationObj"
      @confirmAction="handleDeleteActor"
      @closeDialog="closeActorDeleteDialog"
    />

    <Toast
      :outer-toast-modal="toastModal"
      :toast-obj="toastObj"
      @closeToast="toastModal = $event"
    />
  </v-container>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import ActorsTable from "@/components/ActorsModule/ActorsTable/index.vue";
import ActorAddEditModal from "@/components/ActorsModule/ActorAddEditModal/index.vue";
export default {
  name: "MovieAddEditForm",
  components: {
    ActorsTable,
    ActorAddEditModal,
  },
  props: {
    outerMovie: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    outerMovie: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (!newVal) return;
        this.movie = JSON.parse(JSON.stringify(newVal));
      },
    },
  },
  computed: {
    isEditMode() {
      return !!this.outerMovie?.id;
    },
  },
  data() {
    return {
      movie: {
        id: null,
        title: null,
        description: null,
        year: null,
        listOfActors: [],
      },
      actorsHeaders: [
        { title: "Name", key: "name" },
        { title: "Age", key: "age" },
        {
          title: "Joining date",
          key: "joiningDate",
        },
        {
          title: "Actor role",
          key: "actorRole",
        },
        { title: "", key: "actions" },
      ],
      actorDialog: false,
      selectedActor: null,
      actorDeleteDialog: false,
      confirmationObj: {
        text: "",
        title: "",
        color: "",
      },
      toastObj: {
        text: "",
        title: "",
        color: "",
      },
      toastModal: false,
    };
  },
  methods: {
    addActor() {
      this.actorDialog = true;
      this.selectedActor = null;
      this.toastModal = false;
      this.toastObj = {
        text: "",
        title: "",
        color: "",
      };
    },
    handleCloseActorDialog() {
      this.actorDialog = false;
      this.selectedActor = null;
    },
    handleAddActor(data) {
      this.movie.listOfActors.unshift(data);
      this.handleCloseActorDialog();
      this.toastModal = true;
      this.toastObj = {
        text: "Success !",
        title: "Actor Added on movie successfully.",
        color: "success",
      };
    },

    editActor(actor) {
      this.actorDialog = true;
      this.selectedActor = actor;
      this.toastObj = {
        text: "",
        title: "",
        color: "",
      };
    },
    handleEditActor(updatedActor) {
      const foundedIndex = this.movie.listOfActors.findIndex(
        (actor) => actor.id === updatedActor.id
      );
      if (foundedIndex === -1) {
        this.toastModal = true;
        this.toastObj = {
          text: "Error !",
          title: "Actor Not founded.",
          color: "danger",
        };
      }
      this.movie.listOfActors[foundedIndex] = updatedActor;
      this.handleCloseActorDialog();
      this.toastModal = true;
      this.toastObj = {
        text: "Success !",
        title: "Actor edited on movie successfully.",
        color: "success",
      };
    },

    deleteActor(actor) {
      this.actorDeleteDialog = true;
      this.selectedActor = actor;
      this.confirmationObj = {
        title: "Delete actor",
        text: "Are you sure for delete actor ?",
        color: "danger",
      };
    },
    closeActorDeleteDialog() {
      this.actorDeleteDialog = false;
      this.selectedActor = null;
    },
    handleDeleteActor() {
      this.movie.listOfActors = this.movie.listOfActors.filter(
        (actor) => actor.id != this.selectedActor.id
      );
    },

    async handleSubmitData(values) {
      this.toastModal = false;
      this.toastObj = {
        text: "",
        title: "",
        color: "",
      };
      const validForm = await this.$refs.movieForm.validate();
      if (!validForm.valid) {
        this.toastModal = true;
        this.toastObj = {
          title: "Error !",
          text: "You must fill required fields.",
          color: "danger",
        };
        return false;
      }
      if (!this.movie?.listOfActors?.length) {
        this.toastModal = true;
        this.toastObj = {
          title: "Error !",
          text: "You must add actors.",
          color: "danger",
        };
        return false;
      }

      if (this.isEditMode) {
        this.$emit("editData", this.movie);
      } else {
        this.$emit("submitData", { ...this.movie, id: uuidv4() });
      }
    },
    handleResetFilter() {
      this.filter = {
        title: null,
        year: null,
        numOfActors: null,
      };
      this.$emit("filterData", this.filter);
    },
    handleCloseFilter() {
      this.$emit("closeFilter");
    },
  },
};
</script>
<style scoped>
@import "./index.scss";
</style>
