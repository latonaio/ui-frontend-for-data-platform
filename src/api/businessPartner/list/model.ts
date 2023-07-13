import {
  BusinessPartnerItem,
  UIKeyGeneral,
} from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  General: BusinessPartnerItem[];
}
