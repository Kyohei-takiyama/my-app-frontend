import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { loginAccount, RequestUser } from '../../api/Api'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState } from '../../../stores/Account/Account'

interface Props {}

const Login: React.FC<Props> = () => {
  const account = useRecoilValue(accountState)
  const navigator = useNavigate()
  const setAccount = useSetRecoilState(accountState)

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  if (account?.token?.accessToken) {
    navigator('/')
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    const request: RequestUser = {
      username: form.username,
      password: form.password,
    }
    const res = await loginAccount(request)
    if (res) {
      console.log(res)
      setAccount({
        ...account,
        user: {
          userId: res.data.user.user_id,
          username: res.data.user.username,
          password: res.data.user.password,
          created_at: res.data.user.created_at,
          updated_at: res.data.user.updated_at,
        },
        token: {
          accessToken: res.data.access_token,
          tokenType: res.data.token_type,
        },
      })
    } else {
      console.log('Login failed')
    }
  }
  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme()

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={changeHandler}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Login
