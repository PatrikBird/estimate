import { mount } from '@vue/test-utils'
import VoteResults from '../VoteResults.vue'
import { User } from '~/types'

function factory(users: User[], availableVotes: string[]) {
  const wrapper = mount(VoteResults, {
    props: { users },
    provide: { availableVotes },
  })
  return { wrapper }
}

describe('VoteResults.vue', () => {
  it.skip('placeholder', () => {
    // GIVEN
    const voters = [
      { id: '1', username: 'user1', vote: '0', isObserver: false },
      { id: '2', username: 'user2', vote: '100', isObserver: false },
    ]
    const availableVotes = ['0', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?']

    // WHEN
    const { wrapper } = factory(voters, availableVotes)

    // THEN
    expect(wrapper.find('[data-test="foo"]')).toBeTruthy()
  })
})
