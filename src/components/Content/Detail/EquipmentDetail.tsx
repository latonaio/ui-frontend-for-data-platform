import { clsx } from 'clsx';
import {
  Content as Root,
  Column,
  OrderInfo,
  ProductCode,
  ProductDetail,
  ProductDetailTop,
  ProductDetailBottom,
  BarcodeWrapper,
  Barcode,
  BarcodeNumber,
  Tag,
  Allergen,
  Calendar,
  LocationWrapper,
  Location,
  QuantityInfo,
} from './Detail.style';
import { BorderSolidPanel } from './BorderSolidPanel/BorderSolidPanel';
import { StockLabel, LabelPanelToday } from './StockLabel/StockLabel';
import { generateImageProductUrl, generateBarcodeImageUrl } from '@/helpers/common';
import { GreenInfoPanel } from './GreenInfoPanel/GreenInfoPanel';
import {
  OrdersProductDetailProps,
  BusinessPartnerDetailProps,
  Allergen as AllergenProps,
  ProductInfo,
  Stock,
  ProductTag,
  AvailabilityStock, BarcodeImage, ProductImage, AuthedUser, Quantity,
} from '@/constants';

interface EquipmentInfoElement{
    EquipmentCategory: string;
    TechnicalObjectType: string; 
    GrossWeight: number;
    NetWeight: number;
    WeightUnit: string;
    SizeOrDimensionText: string;
    OperationStartDate: string;
    OperationEndDate: string;
    AcquisitionDate: string;
    BusinessPartnerName: string;
    ManufacturerCountry: string;
    ManufacturerSerialNumber: string;
    MasterFixedAsset: string;
    FixedAsset: string;
    ValidityEndDate: string;
    IsMarkedForDeletion: string;
    businessPartner: AuthedUser['businessPartner'];
}

interface ProductDetailTopElement{
    stock: Stock;
    availabilityStock: AvailabilityStock;
    productStandardId: string;
    barcode: BarcodeImage;
    tags: string[];
    orderQuantityInDelivery: Quantity;
    orderQuantityInBase: Quantity;

}

const AllergenElement = (Allergens: AllergenProps[]) => {
    return (
      <Allergen>
        <ul className={'flex justify-start'}>
          {Allergens.map((item, index) => {
            return (
              <li key={index}>
                <div className={'definition'}>{item.AllergenName}</div>
              </li>
            );
          })}
        </ul>
      </Allergen>
    );
}