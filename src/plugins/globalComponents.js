import TextField from '@/components/FormInputs/TextField/index.vue'
import TextareaField from '@/components/FormInputs/TextareaField/index.vue'
import SelectField from '@/components/FormInputs/SelectField/index.vue'
import AutocompleteField from '@/components/FormInputs/AutocompleteField/index.vue'
import DatepickerField from '@/components/FormInputs/DatepickerField/index.vue'
import EmptyState from '@/components/EmptyState/index.vue'
import Toast from '@/components/Toast/index.vue'
import ConfirmationModal from '@/components/ConfirmationModal/index.vue'

const components = {
  TextField,
  TextareaField,
  SelectField,
  AutocompleteField,
  DatepickerField,
  EmptyState,
  Toast,
  ConfirmationModal
}
export default {
  install(app) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}
