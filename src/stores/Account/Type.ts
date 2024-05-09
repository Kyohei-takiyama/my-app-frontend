export interface User {
  userId: string
  username: string
  password: string
  created_at: string
  updated_at: string
}

export interface Token {
  accessToken: string
  tokenType: string
}

export interface Account {
  user: User
  token: Token
}

export interface ResponseAccount {
  access_token: string
  token_type: string
  user: {
    created_at: string
    password: string
    updated_at: string
    user_id: string
    username: string
  }
}
