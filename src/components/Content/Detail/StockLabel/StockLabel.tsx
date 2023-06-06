import { clsx } from 'clsx';
import {
  StockLabel as StockLabelElement,
  StockLabelTwoColumn,
  StockLabelThreeColumn,
  StockLabelToday,
  StockLabelStorageLocation as StockLabelStorageLocationElement,
  Label,
  LabelPlane,
} from './StockLabel.style';
import {
  Stock,
  AvailabilityStock, DeliveryDocumentTablesEnum,
} from '@/constants';
import { Arrow } from '@/components/Arrow';
import { Select } from '@/components/Form';
import React from 'react';

interface StockLabelProps {
  className?: string;
  stock: Stock;
  availabilityStock: AvailabilityStock;
}

interface StockLabelStorageLocationProps {
  className?: string;
  storageLocationFullName: string;
  storageBin: string;
  deliverToPlantBatchValidityEndDate: string;
  deliverToPlantBatchValidityEndTime: string;
  stock: Stock;
}

export const LabelPanelToday = ({ className }: { className?: string }) => {
  return (
    <StockLabelToday className={clsx(
      'relative',
      className
    )}>
      <Arrow className={'left'} />
      <LabelPlane className={'Label leftArrow rightArrow'} color='skin'>
        <div className={'text-xs'}>今日</div>
      </LabelPlane>
      <Arrow className={'right'} />
    </StockLabelToday>
  )
}

export const StockLabel = ({ className, stock, availabilityStock }: Partial<StockLabelProps>) => {
  return (
    <>
      <div>
        <StockLabelElement className={clsx(
          'font-bold',
          className
        )}>
          <StockLabelTwoColumn className={'StockLabelColumn'}>
            <Label className={'Label'} color='yellow'>
              <div className={'text-lg'}>入出荷先在庫: {stock?.ProductStock}</div>
            </Label>
          </StockLabelTwoColumn>
          <StockLabelTwoColumn className={'StockLabelColumn'}>
            <Label className={'Label'} color='skin'>
              <div className={'text-lg'}>入出荷元在庫: {availabilityStock?.ProductStock}</div>
            </Label>
          </StockLabelTwoColumn>
        </StockLabelElement>
      </div>
      <div>
        <StockLabelElement className={clsx(
          'font-bold relative',
          className
        )}>
          <StockLabelTwoColumn className={'relative'}>
            <Arrow className={'left'} />
            <LabelPlane
              className={'Label leftArrow rightArrow'}
              color='yellow'
            >

              {/*<div className={'text-xs'}>{stock?.StorageLocation}</div>*/}
              {/*<Select*/}
              {/*  className={'isBlock'}*/}
              {/*  isEditing={(() => {*/}
              {/*    if (!editList[listType][item.DeliveryDocument]) { return false; }*/}
              {/*    return editList[listType][item.DeliveryDocument]['DeliverToPlantName'].isEditing;*/}
              {/*  })()}*/}
              {/*  currentValue={item.DeliverToPlant}*/}
              {/*  isLabelMark={true}*/}
              {/*  isNoLabel={true}*/}
              {/*  select={(() => {*/}

              {/*  })()}*/}
              {/*  onChange={async (value) => {*/}

              {/*  }}*/}
              {/*></Select>*/}
            </LabelPlane>
            <Arrow className={'right'} />
          </StockLabelTwoColumn>
          <StockLabelTwoColumn className={'relative'}>
            <Arrow className={'left'} />
            <LabelPlane className={'Label leftArrow rightArrow'} color='skin'>
              <div className={'text-xs'}>{availabilityStock?.StorageLocation}</div>
            </LabelPlane>
            <Arrow className={'right'} />
          </StockLabelTwoColumn>
        </StockLabelElement>
      </div>
    </>
  )
}

export const StockLabelStorageLocation = ({
                                            className,
                                            stock,
                                            storageLocationFullName,
                                            storageBin,
                                            deliverToPlantBatchValidityEndDate,
                                            deliverToPlantBatchValidityEndTime,
                                          }: Partial<StockLabelStorageLocationProps>) => {
  return (
    <>
      <div>
        <StockLabelElement className={clsx(
          'font-bold items-stretch',
          className
        )}>
          <StockLabelTwoColumn className={'StockLabelColumn'}>
            <Label className={'Label'} color='yellow'>
              <div className={'text-lg'}>入出荷先在庫: <span className={'font-bold'}>{stock?.ProductStock}</span></div>
            </Label>
            <div className={'relative'}>
              <Arrow className={'left'} />
              <LabelPlane className={'Label leftArrow rightArrow mt-2.5'} color='yellow'>
                <div className={'text-xs'}>{stock?.StorageLocation}</div>
              </LabelPlane>
              <Arrow className={'stockLabelStorageLocation right'} />
            </div>
          </StockLabelTwoColumn>
          <StockLabelTwoColumn>
            <StockLabelStorageLocationElement>
              <div>
                <span className={'smallTitle'}>入出荷先保管場所:</span>
              </div>
              <div>{storageLocationFullName}</div>
              <div><span className={'smallTitle'}>棚番:</span> {storageBin}</div>
              <div><span className={'smallTitle'}>消費期限:</span> <span className={'time'}>{deliverToPlantBatchValidityEndDate} {deliverToPlantBatchValidityEndTime}</span></div>
            </StockLabelStorageLocationElement>
          </StockLabelTwoColumn>
        </StockLabelElement>
      </div>
    </>
  )
};
