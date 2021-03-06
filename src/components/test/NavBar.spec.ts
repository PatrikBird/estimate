import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '~/router'
import { useMainStore } from '~/store/main'
import { createTestingPinia, TestingOptions } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'

function factory(options?: TestingOptions) {
  const router = createRouter({ routes, history: createMemoryHistory() })
  const wrapper = shallowMount(NavBar, {
    global: {
      plugins: [createTestingPinia(options), router],
    },
  })
  const store = useMainStore()

  return { wrapper, store, router }
}

describe('NavBar.vue', () => {
  it('displays whether user is an observer or a voter', () => {
    // GIVEN
    const { wrapper, store } = factory({
      initialState: {
        user: {
          id: '123456789',
          username: 'peter lustig',
          vote: null,
          isObserver: false,
        },
      },
    })
    const btn = wrapper.find('[data-test="toggleObserverBtn"]')

    // THEN
    expect(wrapper.find('[data-test="toggleObserverBtn"]')).toBeTruthy()
    expect(store.user.isObserver).toBe(false)
    expect(btn.text()).toBe('Voter')
  })

  it('user can change state to observer or voter by clicking a button', async () => {
    // GIVEN
    const { wrapper, store } = factory({
      stubActions: false,
      initialState: {
        user: {
          id: '123456789',
          username: 'peter lustig',
          vote: null,
          isObserver: false,
        },
      },
    })
    const btn = wrapper.find('[data-test="toggleObserverBtn"]')

    // WHEN
    await btn.trigger('click')

    // THEN
    expect(wrapper.find('[data-test="toggleObserverBtn"]')).toBeTruthy()
    expect(store.user.isObserver).toBe(true)
    expect(btn.text()).toBe('Observer')
  })
})
