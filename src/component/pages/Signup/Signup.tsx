import React from 'react'
import { useNavigate } from 'react-router-dom'

import { registerUser, RequestUser } from '../../api/Api'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState } from '../../../stores/Account'

interface Props {}

const Signup: React.FC<Props> = () => {
  const account = useRecoilValue(accountState)
  const navigator = useNavigate()
  const setAccount = useSetRecoilState(accountState)

  if (account.username !== '' && account.password !== '') {
    navigator('/')
  }

  const [form, setForm] = React.useState({
    username: '',
    password: '',
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const submit = async () => {
    const request: RequestUser = {
      username: form.username,
      password: form.password,
    }
    const res = await registerUser(request)
    if (res) {
      setAccount({
        ...account,
        username: form.username,
        password: form.password,
      })
    }
    navigator('/')
  }

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        value={form.username}
        onChange={changeHandler}
        name="username"
      />
      <input
        type="password"
        value={form.password}
        onChange={changeHandler}
        name="password"
      />
      <button onClick={submit}>Signup</button>

      <div>
        <h2>Account</h2>
        <p>Username: {account.username}</p>
        <p>Password: {account.password}</p>
      </div>

      <div>
        <button onClick={() => navigator('/login')}>login画面へ遷移</button>
      </div>
    </div>
  )
}

export default Signup
