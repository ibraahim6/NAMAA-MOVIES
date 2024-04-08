// vee-validate-plugin.js
import { defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'

import { Field, Form, ErrorMessage } from 'vee-validate'

configure({
  generateMessage: localize({ en }),
  validateOnInput: true
})

export default {
  install(app) {
    Object.keys(AllRules).forEach((rule) => {
      defineRule(rule, AllRules[rule])
      app.config.globalProperties.$veeValidate = { rule: AllRules[rule] }
    })

    app.component('Field', Field).component('Form', Form).component('ErrorMessage', ErrorMessage)
  }
}
