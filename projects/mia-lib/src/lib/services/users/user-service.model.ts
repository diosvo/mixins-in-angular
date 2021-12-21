import { environment } from '@env/environment';
import { IUser } from '@lib/models/user';

type User = Partial<IUser>;
const users_endpoint: string = environment.jsonPlaceHolderUrl + 'users/';
const user_id_endpoint = (id: number | string): string => users_endpoint + `${id}`;

export { User, users_endpoint, user_id_endpoint };
