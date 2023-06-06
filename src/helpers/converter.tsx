import { units, deliveryStatus, billingStatus } from '@/constants/enums';

export const priceUnitQty = (unit: string) => {
  return units[unit];
}

export const convertDeliverStatus = (status: string) => {
  return deliveryStatus[status];
}

export const convertBillingStatus = (status: string) => {
  return billingStatus[status];
}
