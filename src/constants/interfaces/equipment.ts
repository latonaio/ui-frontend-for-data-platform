import { ProductImage } from './product';

interface EquipmentImage extends ProductImage {}

interface EquipmentItem {
  Equipment: string;
  EquipmentName: string;
  EquipmentTypeName: string;
  PlantName: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  Images: {
    Equipment: EquipmentImage;
  };
}

interface EquipmentDetailListItem {
  Equipment: string;
}

interface EquipmentDetailHeader {
  Equipment: string;
}

export type {
  EquipmentItem,
  EquipmentDetailListItem,
  EquipmentDetailHeader
}
