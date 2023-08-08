import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  ListHeaderInfo,
  NoImage,
} from '../List/List.style';
import { BillOfMaterialDetailHeader, BillOfMaterialTablesEnum } from '@/constants';
import { BillOfMaterialDetailListItem } from '@/constants';
import { clickHandler, summaryHead } from '../List/List';
import { BackButton, BlueButton } from '@/components/Button';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/bill-of-material/detail/list/[userType]/[billOfMaterial]';
import { texts } from '@/constants/message';
import { rem } from 'polished';
import { generateImageProductUrl } from '@/helpers/common';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { setDialog } from '@/store/slices/dialog';

export interface BillOfMaterialDetailListProps {
  className?: string;
  userType: string;
  billOfMaterial: number;
  data: {
    billOfMaterialDetailListItem?: BillOfMaterialDetailListItem[];
    billOfMaterialDetailHeader?: BillOfMaterialDetailHeader;
  };
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  userType: string;
  billOfMaterial: number;
  summary: string[];
  list: BillOfMaterialDetailListItem[];
  formData: formData;
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  userType,
                                  billOfMaterial,
                                  summary,
                                  list,
								  onUpdateItem,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = BillOfMaterialTablesEnum.billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (
    list: BillOfMaterialDetailListItem[],
  ) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(`/billOfMaterial/detail/${billOfMaterial}/${item.BillOfMaterial}/${userType}/${item.Product}`, router);
          }}>
            <td>{item.BillOfMaterialItem}</td>
            <td>{item.ComponentProduct}</td>
            <td>{item.BillOfMaterialItemText}</td>
            <td>{item.StockConfirmationPlantName}</td>
            <td>{item.ComponentProductStandardQuantityInBaseUnuit}</td>
            <td>{item.ComponentProductBaseUnit}</td>
            <td>{item.ValidityStartDate}</td>
            <td>
              <div>
                <BlueButton
                  isFinished={item.IsMarkedForDeletion}
                  className={'size-relative'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.preventDefault();

                    dispatch(setDialog({
                      type: 'consent',
                      consent: {
                        isOpen: true,
                        children: (
                          cancelDialogTemplate(
                            dispatch,
                            item.IsMarkedForDeletion ?
                              '部品表の削除を取り消しますか？' : '部品表を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  BillOfMaterial: {
                                    BillOfMaterial: item.BillOfMaterial,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  },
                                  accepter: ['Item']
                                },
                                listType,
                                'deletes',
                              );
                            },
                          )
                        ),
                      }
                    }));
                  }}
                >
                  {texts.button.delete}
                </BlueButton>
              </div>
            </td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={9}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  };

  return (
    <DetailList>
      <DetailListTable>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const BillOfMaterialDetailList = ({
                                   userType,
                                   billOfMaterial,
                                   data,
                                   className,
                                   formData,
								   onUpdateItem
                                 }: BillOfMaterialDetailListProps) => {

  const summary = [
    '部品表明細番号',
    '構成品目',
    '明細テキスト',
    '在庫確認プラント',
    '構成品目基本数量',
    '基本数量単位',
    '有効開始日付',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className,
    )}>
      <div>
        <ListHeaderInfo className={'flex justify-end'}>
          <div className={'columnLeft mr-0'}>
            <ListHeaderInfoTop className={'flex justify-start text-xl'}>
              <div>
                <span>部品表: </span>
                {data.billOfMaterialDetailHeader?.BillOfMaterial}
              </div>
              <div>
                <span>有効開始日付: </span>
                {data.billOfMaterialDetailHeader?.ValidityStartDate}
              </div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
            <div>
                <span>オーナー製造プラント: </span>
                {data.billOfMaterialDetailHeader?.OwnerProductionPlantName}
              </div>
              <div>
                <span>品目: </span>
                {data.billOfMaterialDetailHeader?.Product} / {data.billOfMaterialDetailHeader?.ProductDescription}
              </div>
            </ListHeaderInfoBottom>
          </div>
          <div className={'columnLeft'}>
              {data.billOfMaterialDetailHeader?.Images?.Product && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={data.billOfMaterialDetailHeader?.Images && generateImageProductUrl(
                    data.billOfMaterialDetailHeader?.Images?.Product?.BusinessPartnerID ?
                    data.billOfMaterialDetailHeader?.Images?.Product?.BusinessPartnerID.toString() : null, data.billOfMaterialDetailHeader?.Images?.Product || {}
                  )}
                  alt={`${data.billOfMaterialDetailHeader?.ProductDescription}`}
                />
              )}
              {!data.billOfMaterialDetailHeader?.Images?.Product && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
              </div>
          <div className={'columnRight'}>
            <BackButton className={'whiteInfo text-sm'}>その他の情報</BackButton>
          </div>
        </ListHeaderInfo>
      </div>
      <DetailListTableElement
        userType={userType}
        summary={summary}
        billOfMaterial={billOfMaterial}
        list={formData[BillOfMaterialTablesEnum.billOfMaterialDetailList] || []}
        formData={formData}
		onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};
