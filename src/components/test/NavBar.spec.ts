import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '~/router'
import { createTestingPinia } from '@pinia/testing'
import { useMainStore } from '~/store/main'
import { shallowMount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'

function factory() {
  const router = createRouter({ routes, history: createMemoryHistory() })
  const wrapper = shallowMount(NavBar, {
    global: {
      plugins: [router, createTestingPinia()],
    },
  })
  const store = useMainStore()

  return { wrapper, store, router }
}

describe('NavBar.vue', () => {
  it('displays whether user is an observer or a voter', () => {
    // GIVEN

    // WHEN
    const { wrapper, store } = factory()
    store.user = store.user = {
      id: '123456789',
      username: 'peter lustig',
      vote: null,
      isObserver: false,
    }
    const btn = wrapper.find('[data-test="toggleObserverBtn"]')

    // THEN
    expect(wrapper.find('[data-test="toggleObserverBtn"]')).toBeTruthy()
    expect(btn.text()).toBe('Voter')
  })
})
