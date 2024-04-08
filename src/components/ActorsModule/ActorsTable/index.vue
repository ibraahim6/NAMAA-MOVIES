<template>
  <v-data-table :headers="actorsHeaders" :items="listOfActors">
    <template v-slot:item.joiningDate="{ item }">
      {{ returnTextDate(item.joiningDate) }}
    </template>
    <template v-if="hasActions" v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="$emit('editActor', item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="$emit('deleteActor', item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      <EmptyState
        image="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
        title="No Actors added yet !"
        :hasBtn="hasActions"
        btnText="Add a new actor"
        @btnAction="addActor"
      />
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "ActorsTable",
  props: {
    hasActions: {
      type: Boolean,
      default: true,
    },
    listOfActors: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    hasActions: {
      immediate: true,
      deep: true,
      handler(newVal) {
        newVal && this.pushActionsItem();
        newVal || this.popActionsItem();
      },
    },
  },
  data() {
    return {
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
    };
  },
  methods: {
    actionsItemExist() {
      return this.actorsHeaders.findIndex((item) => item.key === "actions");
    },
    pushActionsItem() {
      if (this.actionsItemExist() === -1) {
        this.actorsHeaders.push({ title: "", key: "actions" });
      }
    },
    popActionsItem() {
      if (this.actionsItemExist() !== -1) {
        this.actorsHeaders = this.actorsHeaders.filter((item) => item.key !== "actions");
      }
    },
    returnTextDate(date) {
      const options = {
        day: "numeric",
        month: "long",
        weekday: "long",
        year: "numeric",
      };
      return new Intl.DateTimeFormat("en-us", options).format(new Date(date));
    },
  },
};
</script>
<style scoped>
@import "./index.scss";
</style>
