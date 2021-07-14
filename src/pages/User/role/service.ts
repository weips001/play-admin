import request from '@/utils/request';
import type { TableListParams, TableListItem, UpdateParams } from './data.d';

export async function queryRule(params?: any) {
  return request('/api/role', {
    params,
  });
}

export async function removeRule(id: string) {
  return request(`/api/role/${id}`, {
    method: 'delete',
  });
}

export async function addRule(data: TableListItem) {
  return request('/api/role', {
    method: 'POST',
    data,
  });
}

export async function updateRule(data: TableListParams) {
  return request(`/api/role/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export async function getAllAuth() {
  return request(`/api/allAuth`, {
    method: 'GET',
  });
}

export async function bindAuth(data: UpdateParams) {
  return request(`/api/bindAuth`, {
    method: 'POST',
    data,
  });
}
export async function getAuthFromRole(data: { roleId: string }) {
  return request(`/api/getAuthFromRole`, {
    method: 'POST',
    data,
  });
}
