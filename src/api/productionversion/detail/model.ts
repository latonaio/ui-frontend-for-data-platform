import {
	ProductionVersionDetailListItem,
	ProductionVersionDetailListHeader,
	UIKeyGeneral,
	Pagination,
  } from '@/constants';
  
  export interface ReadsDetailListParams extends UIKeyGeneral {
	userType: string;
	productionVersion: number;
  }
  
  
  export interface ReadsDetailListResponse extends Pagination {
	productionVersionDetailList: ProductionVersionDetailListItem[];
	productionVersionDetailListHeader: ProductionVersionDetailListHeader;
  }
  
  