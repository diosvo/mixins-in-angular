interface BaseAuth {
  username: string;
  password: string;
}

interface AuthUser extends BaseAuth {
  firstName: string;
  token: string;
  roles: Array<string>;
}

export { BaseAuth, AuthUser };

