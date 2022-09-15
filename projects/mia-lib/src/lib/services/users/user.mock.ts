import { UserInput } from '@lib/models/user';
import { User } from '@lib/services/users/user-service.model';

const MOCK_USER_ID: number = 1 as const;

const MOCK_USER: UserInput = {
  id: MOCK_USER_ID,
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

const MOCK_EXTENDED_USER: User = {
  id: 2,
  firstName: 'Thu',
  lastName: 'Phung'
};

const MOCK_LIST_USERS: User[] = [MOCK_USER, MOCK_EXTENDED_USER];

export { MOCK_USER_ID, MOCK_USER, MOCK_EXTENDED_USER, MOCK_LIST_USERS };

