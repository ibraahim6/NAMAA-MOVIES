<template>
  <Field
    v-slot="{ field, errors }"
    :name="name"
    :rules="rules"
    v-model="innerValue"
  >
    <v-textarea
      :label="label"
      outlined
      dense
      v-bind="field"
      v-model="field.value"
      :error-messages="errors"
    >
      <template #label> {{ label }}<span v-if="isRequired" class="text-red"> *</span> </template>
    </v-textarea>
  </Field>
</template>

<script>
import { FormInputsMixin } from '@/mixins/FormInputsMixin.js'

export default {
  name: 'TextareaField',
  mixins: [FormInputsMixin]
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
