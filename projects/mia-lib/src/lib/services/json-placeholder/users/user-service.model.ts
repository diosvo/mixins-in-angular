import { environment } from '@env/environment';
import { User } from '@lib/models/json-placeholder/user.model';
import { State } from '@lib/models/server.model';

const endpoint: string = environment.jsonPlaceHolderUrl.concat('users');
const id_endpoint = (id: number): string => `${endpoint}/${id}`;

const INITIAL_USER_STATE: State<User> = {
  data: [],
  params: {
    query: ''
  },
  loading: true
};

export { endpoint, id_endpoint, INITIAL_USER_STATE };

