interface UserInput {
  id?: number;
  name: string;
  email: string;
  hobbies?: string[];
}

interface User extends UserInput {
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  }
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export { UserInput, User };

