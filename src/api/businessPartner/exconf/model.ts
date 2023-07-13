import {
    BusinessPartnerItem,
    UIKeyGeneral,
    BusinessPartnerDetailExconfList,
  } from '@/constants';
  
  export interface params extends UIKeyGeneral {
    // isMarkedForDeletion: boolean;
    businessPartner: number;
    userType: string;
  }
  
  export interface response {
    businessPartnerDetailExconfListHeader: BusinessPartnerItem;
    businessPartnerDetailExconfList: BusinessPartnerDetailExconfList;
  }
  