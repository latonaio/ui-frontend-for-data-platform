import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  ProductionOrder: {
    ProductionOrder: number;
    IsMarkedForDeletion: boolean;
  }
}
