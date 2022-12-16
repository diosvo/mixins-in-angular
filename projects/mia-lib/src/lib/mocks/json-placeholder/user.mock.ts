import { User, UserInput } from '@lib/models/json-placeholder/user.model';

const MOCK_USER_ID: number = 1 as const;

const MOCK_USER_INPUT: UserInput = {
  id: MOCK_USER_ID,
  name: 'Leanne Graham',
  email: 'Sincere@april.biz',
  hobbies: ['coding', 'basketball']
};

const MOCK_USER: User = {
  ...MOCK_USER_INPUT,
  username: 'Bret',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496'
    }
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets'
  }
};

const MOCK_LIST_USERS: User[] = [MOCK_USER];

export { MOCK_USER_ID, MOCK_USER_INPUT, MOCK_USER, MOCK_LIST_USERS };

