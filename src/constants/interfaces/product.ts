interface ProductDetailExconfListItem {
  Content: string;
  Exist: boolean;
  Param: unknown[];
}

interface ProductDetailExconfList {
  Product: string;
  Existences: ProductDetailExconfListItem[];
}

interface ProductItem {
  Product: string;
  ProductName: string;
  ProductGroup: string;
  ProductGroupName: string;
  BaseUnit: string;
  ValidityStartDate: string;
  Images: {
    Product: ProductImage;
  };
  IsMarkedForDeletion: boolean;
}

interface ProductDetailExconfListHeader extends ProductItem {
}

interface ProductImage {
  BusinessPartnerID: number;
  DocID: string;
  FileExtension: string;
}

interface BarcodeImage {
  Id: string;
  Barcode: string;
  BarcodeType: string;
}

interface Accepter {
  accepter: string[];
  api_type: string;
}

interface ProductInfo {
  KeyName: string;
  Key: string;
  Value: any;
}

interface ProductTag {
  Key: string;
  Doc_count: number;
}

interface Allergen {
  AllergenName: string;
  AllergenIsContained: boolean;
}

interface Stock {
  ProductStock: number;
  StorageLocation: string;
}

interface AvailabilityStock {
  ProductStock: number;
  StorageLocation: string;
}

interface Quantity {
  Quantity: number;
  Unit: string;
}

interface ProductDetail {
  ProductName: string
  ProductCode: string
  ProductInfo: ProductInfo[]
  ProductTag: ProductTag[]
  Images: {
    Product: ProductImage;
    Barcode: BarcodeImage;
  }
  Stock: Stock;
  AvailabilityStock: AvailabilityStock;
  OrderQuantityInDelivery: Quantity;
  OrderQuantityInBase: Quantity;
  ConfirmedOrderQuantityByPDTAvailCheck: Quantity;
  Allergen: Allergen[];
}

export type {
  ProductItem,
  Accepter,
  Allergen,
  ProductInfo,
  ProductTag,
  Stock,
  AvailabilityStock,
  ProductImage,
  BarcodeImage,
  Quantity,
  ProductDetail,
  ProductDetailExconfListItem,
  ProductDetailExconfList,
  ProductDetailExconfListHeader,
}
