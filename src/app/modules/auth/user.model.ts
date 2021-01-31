export class User {
  constructor(
    private _authenticationToken: string,
    private refreshToken: string,
    public expiresAt: Date,
    public username: string
  ) {}

  get authenticationToken() {
    if (!this.expiresAt || new Date() > this.expiresAt) {
      return null;
    }
    return this._authenticationToken;
  }
}
