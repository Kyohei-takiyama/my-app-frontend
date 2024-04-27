import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export interface Account {
  userId: string
  username: string
  password: string
  created_at: string
  updated_at: string
  token: {
    access_token: string
    token_type: string
  }
}

export const accountState = atom<Account>({
  key: 'accountState',
  default: {
    userId: '',
    username: '',
    password: '',
    created_at: '',
    updated_at: '',
    token: {
      access_token: '',
      token_type: '',
    },
  },
  effects_UNSTABLE: [persistAtom],
})
