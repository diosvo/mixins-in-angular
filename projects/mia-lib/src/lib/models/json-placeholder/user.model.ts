declare type Gender = 'male' | 'female' | 'others';

interface UserInput {
  id?: number;
  name: string;
  email: string;
  hobbies: string[];
}

interface IUser extends UserInput {
  lastName: string;
  firstName: string;
  gender: Gender;
}

export { UserInput, IUser };

