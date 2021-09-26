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

interface IMenu {
  name: string;
  route: EUrl;
  active: boolean;
}

class IPanel {
  subTitle: string;
  openState: boolean;
}

export { IGroupValue, IBaseValue, IMenu, IPanel };

