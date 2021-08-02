interface BaseAuth {
  username: string;
  password: string;
}

interface IUser extends BaseAuth {
  firstName: string;
  token: string;
  roles: Array<string>;
}

export { BaseAuth, IUser };

