export interface IAuthResponse {
  id: number
  username: string
  roles: string[]
  accessToken: string
  tokenType: string
  admin?: boolean
  modo?: boolean
}

