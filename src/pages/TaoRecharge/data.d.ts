export type TableListItem = {
  id: string;
  cardId: string;
  cardType: '0' | '1';
  createdAt: Date;
  isYearCard: boolean;
  money: number;
  name: string;
  overdate: Date;
  phone: string;
  placeId: string;
  remark: string;
  restTotal: number;
  sex: '0' | '1';
  total: number;
  updatedAt: Date;
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
