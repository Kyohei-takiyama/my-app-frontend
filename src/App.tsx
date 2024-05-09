import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState } from './stores/Account/Account'
import { useNavigate } from 'react-router-dom'

function App() {
  const account = useRecoilValue(accountState)
  const setAccount = useSetRecoilState(accountState)
  const navigate = useNavigate()

  const logout = () => {
    setAccount({
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
    })
    navigate('/login')
  }

  return (
    <>
      <div>
        <h2>Account</h2>
        <p>Username: {account?.user?.username}</p>
        <p>Password: {account?.user?.password}</p>
      </div>
      <div>
        <h2>logout</h2>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default App
