<template>
  <Field
    v-slot="{ field, errors }"
    :name="name"
    :rules="rules"
    v-model="innerValue"
  >
    <v-menu
      ref="datePickerMenu"
      v-model="datePickerMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      min-width="290px"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          :label="label"
          :name="name"
          v-bind="props"
          v-model="field.value"
          readonly
          :error-messages="errors[0]"
        >
          <template #label>
            {{ label }}<span v-if="isRequired" class="text-red"> *</span>
          </template>
        </v-text-field>
      </template>
      <v-date-picker v-bind="field" v-model="innerValue" no-title scrollable>
        <template #actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="handleCancelDate">Cancel</v-btn>
          <v-btn text color="primary" @click="handleSaveDate">Save</v-btn>
        </template>
      </v-date-picker>
    </v-menu>
  </Field>
</template>

<script>
import { FormInputsMixin } from '@/mixins/FormInputsMixin.js'

export default {
  name: 'DatepickerField',
  mixins: [FormInputsMixin],
  data() {
    return {
      datePickerMenu: false
    }
  },
  watch: {
    datePickerMenu(newVal) {
      newVal || this.handleCancelDate()
    }
  },
  methods: {
    closeMenu() {
      this.datePickerMenu = false
    },
    handleSaveDate() {
      this.closeMenu()
      this.oldValue = this.innerValue ? new Date(JSON.parse(JSON.stringify(this.innerValue))) : null
    },
    handleCancelDate() {
      this.closeMenu()
      this.innerValue = this.oldValue ? new Date(JSON.parse(JSON.stringify(this.oldValue))) : null
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
