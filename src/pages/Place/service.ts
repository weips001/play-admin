import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/place', {
    params,
  });
}

export async function removeRule(id: string) {
  return request(`/api/place/${id}`, {
    method: 'delete',
  });
}

export async function addRule(data: TableListItem) {
  return request('/api/place', {
    method: 'POST',
    data,
  });
}

export async function updateRule(data: TableListParams) {
  return request(`/api/place/${data.id}`, {
    method: 'PUT',
    data,
  });
}
