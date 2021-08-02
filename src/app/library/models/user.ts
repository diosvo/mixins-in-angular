declare type Gender = 'male' | 'female' | 'others';

interface IUserBaseValue {
  id: string;
  lastName: string;
  firstName: string;
  gender: Gender;
}

export { IUserBaseValue };

