import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function getVipList(searchKey: string) {
  return request('/api/vip', {
    params: {
      searchKey,
    },
  });
}

export async function remove(deleteArr: string[]) {
  return request('/api/vip', {
    method: 'delete',
    data: {
      deleteArr,
    },
  });
}

export async function add(data: TableListItem) {
  return request('/api/vip', {
    method: 'POST',
    data,
  });
}

export async function getTaoList(params: TableListItem) {
  return request('/api/getTaoRecharge', {
    method: 'get',
    params,
  });
}

export async function update(data: TableListParams) {
  return request(`/api/vip/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export async function getVipRecord(vipId: string) {
  return request('/api/vip/getVipRecord', {
    params: {
      vipId,
    },
  });
}

export async function consume({ id, deleteNum }) {
  return request(`/api/taoRecharge/consume/${id}`, {
    method: 'POST',
    data: {
      deleteNum,
    },
  });
}
