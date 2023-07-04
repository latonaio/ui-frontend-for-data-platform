import {
  OperationsDetailListItem,
  OperationsDetailHeader,
  UIKeyGeneral,
  Pagination,
} from '@/constants';

export interface ReadsDetailListParams extends UIKeyGeneral {
  userType: string;
  operations: number;
}


export interface ReadsDetailListResponse extends Pagination {
  operationsDetailList: OperationsDetailListItem[];
  operationsDetailHeader: OperationsDetailHeader;
}

