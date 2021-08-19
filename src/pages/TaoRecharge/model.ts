import type {  Reducer } from 'umi';
import {TaoRechargeModelState} from './data'



export type TaoRechargeModelType = {
  namespace: 'taoRecharge';
  state: TaoRechargeModelState;
  effects: {
    
  };
  reducers: {
    saveSearchForm: Reducer<TaoRechargeModelState>;
  };
};

const initState = {
  searchForm: {}
};

const ConsumeModel: TaoRechargeModelType = {
  namespace: 'taoRecharge',

  state: initState,

  effects: {
    
  },

  reducers: {
    saveSearchForm(state = initState, { payload }) {
      return {
        ...state,
        searchForm: payload.searchForm,
      };
    },
  },
};

export default ConsumeModel;
