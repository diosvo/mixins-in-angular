import { EUrl } from './url.enum';

interface IBaseValue {
  name: string;
  route: string;
  description: string;
}

interface IGroupValue {
  groupName: string;
  groupDetails: Array<IBaseValue>;
  groupUrl: EUrl;
}

export { IGroupValue, IBaseValue };

