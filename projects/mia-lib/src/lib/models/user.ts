declare type Gender = 'male' | 'female' | 'others';

interface IUser {
  id: string;
  lastName: string;
  firstName: string;
  name: string;
  gender: Gender;
  email: string;
}

export { IUser };

