<template>
  <Field v-slot="{ field, errors }" :name="name" :rules="rules" v-model="innerValue">
    <v-text-field
      :label="label"
      outlined
      dense
      v-bind="field"
      v-model="field.value"
      :type="type"
      :error-messages="errors"
    >
      <template #label>
        {{ label }}<span v-if="isRequired" class="text-red"> *</span>
      </template>
    </v-text-field>
  </Field>
</template>

<script>
import { FormInputsMixin } from "@/mixins/FormInputsMixin.js";

export default {
  name: "TextField",
  mixins: [FormInputsMixin],
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
