export class LoginActionModel {
  constructor(
    public message: string,
    public token: string,
    public expiresIn: number,
    public role: string,
    public userEmail: string,
    public userId: string
  ) {}
}
