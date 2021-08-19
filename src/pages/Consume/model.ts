import type { Effect, Reducer } from 'umi';
import { getVipRecord, getVipList, recharge } from './service';

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
  vipInfo?: VipProps;
  activeAction?: ActionOptions;
  activeTab?: TabOptions;
  consumeTableList: any[];
  rechargeRecord: any[];
  consumeRecord: any[];
};

export type ConsumeModelType = {
  namespace: 'consume';
  state: ConsumeModelState;
  effects: {
    fetchVipRecord: Effect;
    fetchVipInfo: Effect;
    fetchRecharge: Effect;
  };
  reducers: {
    saveSearchKey: Reducer<ConsumeModelState>;
    saveVipInfo: Reducer<ConsumeModelState>;
    saveActiveAction: Reducer<ConsumeModelState>;
    saveActiveTab: Reducer<ConsumeModelState>;
    saveConsumeTableList: Reducer<ConsumeModelState>;
    saveRechargeRecord: Reducer<ConsumeModelState>;
    saveConsumeRecord: Reducer<ConsumeModelState>;
  };
};

const initState = {
  searchKey: '',
  vipInfo: undefined,
  activeAction: undefined,
  activeTab: undefined,
  consumeTableList: [],
  rechargeRecord: [],
  consumeRecord: [],
};

const ConsumeModel: ConsumeModelType = {
  namespace: 'consume',

  state: initState,

  effects: {
    *fetchVipRecord({ payload }, { call, put }) {
      const { data } = yield call(getVipRecord, payload.vipId);
      const { consumeList, rechargeRecord, consumeRecord } = data;
      yield put({
        type: 'saveConsumeTableList',
        payload: {
          consumeTableList: consumeList,
        },
      });
      yield put({
        type: 'saveRechargeRecord',
        payload: {
          rechargeRecord,
        },
      });
      yield put({
        type: 'saveConsumeRecord',
        payload: {
          consumeRecord,
        },
      });
    },
    *fetchVipInfo({ payload }, { call }) {
      const vipRes = yield call(getVipList, payload.searchKey);
      return vipRes;
    },
    *fetchRecharge({ payload }, { call }) {
      const res = yield call(recharge, payload);
      return res
      
    },
  },

  reducers: {
    saveSearchKey(state = initState, { payload }) {
      return {
        ...state,
        searchKey: payload.searchKey,
      };
    },
    saveVipInfo(state = initState, { payload }) {
      return {
        ...state,
        vipInfo: payload.vipInfo,
      };
    },
    saveActiveAction(state = initState, { payload }) {
      return {
        ...state,
        activeAction: payload.activeAction,
      };
    },
    saveActiveTab(state = initState, { payload }) {
      return {
        ...state,
        activeTab: payload.activeTab,
      };
    },
    saveConsumeTableList(state = initState, { payload }) {
      return {
        ...state,
        consumeTableList: payload.consumeTableList,
      };
    },
    saveRechargeRecord(state = initState, { payload }) {
      return {
        ...state,
        rechargeRecord: payload.rechargeRecord,
      };
    },
    saveConsumeRecord(state = initState, { payload }) {
      return {
        ...state,
        consumeRecord: payload.consumeRecord,
      };
    },
  },
};

export default ConsumeModel;
