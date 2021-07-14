export type TableListItem = {
  id: string;
  roleName: string;
  roleCode: string;
  placeId: string;
  desc: string;
  createdAt: Date;
  createdAt: Date;
  auth?: string[];
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  id?: string;
  roleName?: string;
  roleCode?: string;
  placeId?: string;
  desc?: string;
  createdAt?: Date;
  createdAt?: Date;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type UpdateParams = {
  roleId?: string;
  roleName: string;
  roleCode: string;
  auth: string[];
};
