export type TableListItem = {
  id: string;
  cardId: string;
  cardType: '0' | '1';
  createdAt: Date;
  isYearCard: boolean;
  money: number;
  remark: string;
  restTotal: number;
  total: number;
  usedTotal: number;
  vipId: string;
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
  status?: string;
  compName?: string;
  bossName?: string;
  bossPhone?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type VipParams = {
  birthday: Date;
  createdAt: Date;
  id: string;
  name: string;
  phone: string;
  placeId: string;
  remark: string;
  sex: '0' | '1';
  updatedAt: Date;
};

export type CardTypeProps = {
  label: string;
  value: string;
  total: number;
  money: number;
  month: number;
  cardType: '0' | '1';
};
export interface CommonRes<T> {
  code: 0 | 1;
  data: T;
  msg: string;
}
