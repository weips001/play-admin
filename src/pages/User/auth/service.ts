import request from '@/utils/request';
import type { UpdateUItem } from './data.d';

export async function queryRule(params?: any) {
  return request('/api/auth', {
    params,
  });
}

export async function removeRule(id: string) {
  return request(`/api/auth/${id}`, {
    method: 'delete',
  });
}

export async function addRule(data: UpdateUItem) {
  return request('/api/auth', {
    method: 'POST',
    data,
  });
}

export async function updateRule(data: UpdateUItem) {
  return request(`/api/auth/${data.id}`, {
    method: 'PUT',
    data,
  });
}
