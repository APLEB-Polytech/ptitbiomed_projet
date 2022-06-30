export interface IAuthRequest {
  username: string
  password: string
}

export class AuthRequest implements IAuthRequest {
  constructor(public username: string, public password: string) {
  }
}
