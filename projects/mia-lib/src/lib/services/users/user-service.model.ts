import { environment } from '@env/environment';
import { IUser } from '@lib/models/user';

type User = Partial<IUser>;
const endpoint: string = environment.jsonPlaceHolderUrl + 'users/';
const id_endpoint = (id: number): string => endpoint + `${id}`;

export { User, endpoint, id_endpoint };
