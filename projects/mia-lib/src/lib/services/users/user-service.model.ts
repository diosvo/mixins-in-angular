import { environment } from '@env/environment';
import { State } from '@lib/models/server.model';
import { IUser } from '@lib/models/user';

type User = Partial<IUser>;
const endpoint: string = environment.jsonPlaceHolderUrl + 'users/';
const id_endpoint = (id: number): string => endpoint + `${id}`;

const INITIAL_USER_STATE: State<User> = {
  data: null,
  params: {
    query: ''
  },
  loading: true
};

export { User, endpoint, id_endpoint, INITIAL_USER_STATE };
