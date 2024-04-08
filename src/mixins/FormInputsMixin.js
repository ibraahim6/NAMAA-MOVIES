export const FormInputsMixin = {
  props: {
    name: {
      type: String
    },
    modelValue: {
      type: null,
      default: null
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelStyles: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    innerValue: null,
    oldValue: null
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('update:model-value', newVal)
      this.$emit('onUpdate:model-value', newVal)
    },
    // Handles external model changes.
    modelValue(newVal) {
      this.innerValue = newVal
    }
  },
  created() {
    this.innerValue = this.modelValue
    this.oldValue = JSON.parse(JSON.stringify(this.modelValue))
  },
  computed: {
    isRequired() {
      if (typeof this.rules === 'string') return !!this.rules.includes('required')
      else return this.rules.hasOwnProperty('required') ? this.rules.required : false
    }
  }
}
