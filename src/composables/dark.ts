import { useDark, usePreferredDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dracula',
  valueLight: 'cmyk',
})
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
