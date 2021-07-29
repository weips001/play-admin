import type { Effect, Reducer } from 'umi';
import type { SubscriptionsMapObject } from 'dva';
import { getUserAuth, getCurrentAllAuth, saveUserInfo } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import { queryCurrent, query as queryUsers } from '@/services/user';

export type VipProps = {
  birthday: string;
  createdAt: Date;
  id: string;
  name: string;
  phone: string;
  remark: string;
  sex: '0' | '1';
  updatedAt: Date;
};

export type ActionOptions = 'recharge' | 'consume';
export type TabOptions = 'settle' | 'rechargeRecord' | 'consumeRecord' | 'card' | 'gameBi';

export type ConsumeModelState = {
  searchKey: string;
  vipInfo: VipProps;
  activeAction: ActionOptions;
  activeTab: TabOptions;
};

export type ConsumeModelType = {
  namespace: 'consume';
  state: ConsumeModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ConsumeModelState>;
    changeNotifyCount: Reducer<ConsumeModelState>;
  };
  subscriptions: SubscriptionsMapObject;
};

const ConsumeModel: ConsumeModelType = {
  namespace: 'consume',

  state: {
    currentUser: {},
    currentAllAuthList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const userInfo = response.data;
      const { auth } = userInfo;
      saveUserInfo(userInfo);
      // const allAuth = getUserAuth(data.role, auth);
      // const currentAuthList = getCurrentAllAuth();
      setAuthority(auth);
      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
      return userInfo;
      // yield put({
      //   type: 'saveCurrentAuthList',
      //   payload: currentAuthList,
      // });
    },
  },

  reducers: {
    saveCurrentAuthList(state, action) {
      return {
        ...state,
        currentAllAuthList: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
  subscriptions: {
    init({ dispatch }) {
      console.log('in');
    },
  },
};

export default ConsumeModel;
