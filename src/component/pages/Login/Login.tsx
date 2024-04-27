import React from 'react'
import { useNavigate } from 'react-router-dom'

import { loginAccount, RequestUser } from '../../api/Api'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Account, accountState } from '../../../stores/Account'

interface Props {}

const Login: React.FC<Props> = () => {
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
    console.log(request)
    const res = await loginAccount(request)
    if (res) {
      setAccount({
        ...account,
        username: res.user.username,
        password: res.user.password,
        token: {
          access_token: res.access_token,
          token_type: res.token_type,
        },
      })
    } else {
      console.log('Login failed')
    }
  }

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={submit}>Login</button>

      <div>
        <h2>Account</h2>
        <p>Username: {account.username}</p>
        <p>Password: {account.password}</p>
      </div>

      <div>
        <button onClick={() => navigator('/signup')}>signup画面へ遷移</button>
      </div>
    </div>
  )
}

export default Login
