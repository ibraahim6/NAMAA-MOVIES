<template>
  <Field
    v-slot="{ field, errors }"
    :name="name"
    :rules="rules"
    v-model="innerValue"
  >
    <v-autocomplete
      :label="label"
      :items="items"
      v-bind="field"
      v-model="field.value"
      :error-messages="errors"
    >
      <template #label> {{ label }}<span v-if="isRequired" class="text-red"> *</span> </template>
    </v-autocomplete>
  </Field>
</template>

<script>
import { FormInputsMixin } from '@/mixins/FormInputsMixin.js'

export default {
  name: 'AutocompleteField',
  mixins: [FormInputsMixin],
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
