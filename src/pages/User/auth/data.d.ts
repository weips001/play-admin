export type TableListItem = {
  id: string;
  authCode: string;
  authName: string;
  createdAt: Date;
  desc: string;
  updatedAt: Date;
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

export type UpdateUItem = {
  id?: string;
  authCode: string;
  authName: string;
  desc: string;
};

export type TableListParams = {
  id: string;
  authCode: string;
  authName: string;
  createdAt: Date;
  desc: string;
  updatedAt: Date;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
