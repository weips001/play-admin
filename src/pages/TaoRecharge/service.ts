import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function getTableList(params?: TableListParams) {
  return request('/api/taoRecharge', {
    params,
  });
}

export async function remove(id: string) {
  return request(`/api/taoRecharge/${id}`, {
    method: 'delete',
  });
}

export async function add(data: TableListItem) {
  return request('/api/taoRecharge', {
    method: 'POST',
    data,
  });
}

export async function update(data: TableListParams) {
  return request(`/api/taoRecharge/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export async function getUserByPhone(phone: string) {
  return request('/api/getUserByPhone', {
    params: {
      phone,
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
