export class User {
  constructor(
    private _authenticationToken: string,
    public expiresAt: Date,
    public username: string,
    public roles: string[]
  ) {}

  get authenticationToken() {
    if (!this.expiresAt || new Date() > this.expiresAt) {
      return null;
    }
    return this._authenticationToken;
  }

  public hasRole(role: string): boolean {
    return this.roles.some((r) => r === role);
  }
}
