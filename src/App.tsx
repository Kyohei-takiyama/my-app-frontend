import './App.css'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState } from './stores/Account'
import { useNavigate } from 'react-router-dom'

function App() {
  const account = useRecoilValue(accountState)
  const setAccount = useSetRecoilState(accountState)
  const navigate = useNavigate()

  const logout = () => {
    setAccount({
      userId: '',
      username: '',
      password: '',
    })
    navigate('/login')
  }

  return (
    <>
      <div>
        <h2>Account</h2>
        <p>Username: {account.username}</p>
        <p>Password: {account.password}</p>
      </div>
      <div>
        <h2>logout</h2>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default App
