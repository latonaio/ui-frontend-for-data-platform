import { units } from '@/constants/enums';

export const priceUnitQty = (unit: string) => {
  return units[unit];
}
