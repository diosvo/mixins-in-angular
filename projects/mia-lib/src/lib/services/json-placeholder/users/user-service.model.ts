import { environment } from '@env/environment';
import { IUser } from '@lib/models/json-placeholder/user.model';
import { State } from '@lib/models/server.model';

type User = Partial<IUser>;
const endpoint: string = environment.jsonPlaceHolderUrl + 'users/';
const id_endpoint = (id: number): string => endpoint + `${id}`;

const INITIAL_USER_STATE: State<User> = {
  data: [],
  params: {
    query: ''
  },
  loading: true
};

export { User, endpoint, id_endpoint, INITIAL_USER_STATE };
