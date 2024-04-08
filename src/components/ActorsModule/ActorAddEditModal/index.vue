<template>
  <v-dialog v-model="innerDialog" width="auto">
    <v-card max-width="500">
      <v-card-title>
        {{ isEditMode ? "Edit Actor" : "Add Actor" }}
      </v-card-title>
      <v-card-text>
        <Form ref="actorForm" @submit="handleSubmitData">
          <v-row>
            <v-col cols="12" md="12">
              <TextField v-model="actor.name" name="name" label="name" rules="required" />
            </v-col>
            <v-col cols="12" md="6">
              <TextField
                v-model="actor.age"
                name="age"
                label="age"
                rules="required|min:1|max:3|min_value:1|max_value:999"
              />
            </v-col>
            <v-col cols="12" md="6">
              <DatepickerField
                v-model="actor.joiningDate"
                name="joining date"
                label="joining date"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="12">
              <SelectField
                v-model="actor.actorRole"
                :items="actorRoles"
                name="actor role"
                label="actor role"
                rules="required"
              />
            </v-col>
          </v-row>
          <v-row class="justify-end align-center my-2">
            <v-btn color="primary" class="ma-2" type="submit" @click="handleSubmitData">{{
              isEditMode ? "Edit" : "Add"
            }}</v-btn>
            <v-btn color="danger" class="ma-2" variant="outlined" @click="closeDialog">
              cancel
            </v-btn>
          </v-row>
        </Form>
      </v-card-text>
    </v-card>
    <Toast
      :outer-toast-modal="toastModal"
      :toast-obj="toastObj"
      @closeToast="toastModal = $event"
    />
  </v-dialog>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "ActorAddEditModal",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    outerActor: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    dialog: {
      immediate: true,
      deep: true,
      handler(newVal) {
        newVal && this.fetchActor();
        newVal || this.closeDialog();
      },
    },
    outerActor: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (!newVal) return;
        this.actor = JSON.parse(JSON.stringify(newVal));
      },
    },
  },
  data() {
    return {
      innerDialog: false,
      actor: {
        id: null,
        name: null,
        age: null,
        joiningDate: null,
        actorRole: null,
      },
      actorRoles: [
        "Background role",
        "Cameo",
        "Recurring character",
        "Side character",
        "Series regular",
      ],
      toastObj: {
        text: "",
        title: "",
        color: "",
      },
      toastModal: false,
    };
  },
  computed: {
    isEditMode() {
      return !!this.outerActor?.id;
    },
  },
  methods: {
    fetchActor() {
      this.innerDialog = true;
      if (!this.outerActor) return;
      this.actor = JSON.parse(JSON.stringify(this.outerActor));
    },
    closeDialog() {
      this.innerDialog = false;
      this.actor = {
        id: null,
        name: null,
        age: null,
        joiningDate: null,
        actorRole: null,
      };
      this.$emit("closeDialog", this.innerDialog);
    },
    async handleSubmitData() {
      this.toastModal = false;
      this.toastObj = {
        text: "",
        title: "",
        color: "",
      };
      const validForm = await this.$refs.actorForm.validate();
      if (!validForm.valid) {
        this.toastModal = true;
        this.toastObj = {
          title: "Error !",
          text: "You must fill required fields.",
          color: "danger",
        };
        return false;
      }
      if (this.isEditMode) {
        this.$emit("editData", this.actor);
      } else {
        this.$emit("submitData", { ...this.actor, id: uuidv4() });
      }
      this.actor = {
        id: null,
        name: null,
        age: null,
        joiningDate: null,
        actorRole: null,
      };
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
