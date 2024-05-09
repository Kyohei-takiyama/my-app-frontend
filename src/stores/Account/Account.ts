import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Account } from './Type'

const { persistAtom } = recoilPersist()

export const accountState = atom<Account>({
  key: 'accountState',
  default: {
    user: {
      userId: '',
      username: '',
      password: '',
      created_at: '',
      updated_at: '',
    },
    token: {
      accessToken: '',
      tokenType: '',
    },
  },
  effects_UNSTABLE: [persistAtom],
})
