import type { Ref } from 'vue'
import { computed } from 'vue'

export function useNameValidator(enteredName: Ref<string> | string) {
  return computed(() => {
    const lenghtAndAllowedSpecialChars = /(?=.{1,16}$)^[\sa-zA-Z0-9\-\_\.\ö\ä\ü\ß]+$/
    const onlyWhiteSpaces = /^\s*$/

    const name = unref(enteredName)
    return lenghtAndAllowedSpecialChars.test(name) && !onlyWhiteSpaces.test(name)
  })
}
