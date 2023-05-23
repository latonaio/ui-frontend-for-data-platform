import { Acceptor } from '@/constants';

export interface ReadBusinessPartnerGeneralParams extends Acceptor {
  BusinessPartnerGeneral: {
    BusinessPartner: number;
    Language: string;
  }
}

export interface ReadBusinessPartnerGeneralResponse {
  General: {
    BusinessPartnerName: string;
  }
}
