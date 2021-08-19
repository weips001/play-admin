import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import type { ConsumeModelState } from '@/pages/Consume/model';
import type { StateType } from './login';
import type {TaoRechargeModelState} from '@/pages/TaoRecharge/data'

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  consume: ConsumeModelState;
  taoRecharge:TaoRechargeModelState;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
