declare type Gender = 'male' | 'female' | 'others';

interface IUser {
  id: number;
  lastName: string;
  firstName: string;
  name: string;
  gender: Gender;
  email: string;
  hobbies: Array<string>;
}

export { IUser };

