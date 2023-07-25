import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  DetailList,
  DetailListTable,
  List as ListElement,
  ListHeaderInfo,
  ListHeaderInfoBottom,
  ListHeaderInfoTop,
  NoImage,
} from '../List/List.style';
import {
  BillOfMaterialTablesEnum,
} from '@/constants';
import { summaryHead } from '../List/List';
import { OtherButton, BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent/Consent';
import { texts } from '@/constants/message';
import { rem } from 'polished';
import { generateImageProductUrl } from '@/helpers/common';
import React, { useState } from 'react';
import { DatePicker, TextField } from '@/components/Form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  BillOfMaterialDetailListItem,
  BillOfMaterialDetailHeader,
  editItemAsync,
  closeItem,
  pushItemToEdit,
  checkInvalid,
} from '@/store/slices/bill-of-material/detail-list';
import { PopupTranslucent } from '@/components/Popup/index';


export interface BillOfMaterialDetailListProps {
  className?: string;
  userType: string;
  billOfMaterial: number;
}

interface DetailListTableElementProps {
  userType: string;
  billOfMaterial: number;
  summary: string[];
  list: BillOfMaterialDetailListItem[] | [];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const itemState = useAppSelector(state => state.billOfMaterialDetailList) as {
    [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: BillOfMaterialDetailHeader,
    [BillOfMaterialTablesEnum.billOfMaterialDetailList]: BillOfMaterialDetailListItem[],
  };

  const renderList = (
    list: BillOfMaterialDetailListItem[],
  ) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            // clickHandler(`/billOfMaterial/detail/${billOfMaterial}/${item.BillOfMaterial}/${userType}/${item.Product}`, router);
          }}>
            <td>{item.BillOfMaterialItem}</td>
            <td>{item.ComponentProduct}</td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  if (item.isEditing['BillOfMaterialItemText']) {
                    return;
                  }

                  appDispatch(pushItemToEdit({
                    index,
                    item,
                    key: 'BillOfMaterialItemText',
                  }));
                }}
              >
                <TextField
                  isEditing={item.isEditing['BillOfMaterialItemText']}
                  currentValue={item.BillOfMaterialItemText}
                  checkInvalid={(value) => {
                    checkInvalid({
                      index,
                      item,
                      key: 'BillOfMaterialItemText',
                      checkValue: value,
                    }, appDispatch);
                  }}
                  onChange={async (value: string) => {
                    await editItemAsync({
                        params: {
                          BillOfMaterial: {
                            BillOfMaterial: item.BillOfMaterial,
                            Item: [
                              {
                                ...item,
                                BillOfMaterialItemText: value,
                              },
                            ],
                          },
                          api_type: 'updates',
                          accepter: ['Item'],
                        },
                        index,
                        key: 'BillOfMaterialItemText',
                      },
                      appDispatch, itemState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'BillOfMaterialItemText',
                  }))}
                />
              </span>
            </td>
            <td>{item.StockConfirmationPlantName}</td>
            <td className={`${item.errors['ComponentProductStandardQuantityInBaseUnit'].isError ? 'invalid' : ''}`}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  if (item.isEditing['ComponentProductStandardQuantityInBaseUnit']) {
                    return;
                  }

                  appDispatch(pushItemToEdit({
                    index,
                    item,
                    key: 'ComponentProductStandardQuantityInBaseUnit',
                  }));
                }}
              >
                <TextField
                  isEditing={item.isEditing['ComponentProductStandardQuantityInBaseUnit']}
                  currentValue={item.ComponentProductStandardQuantityInBaseUnit}
                  inputProps={{
                    // inputMode: "numeric",
                    // pattern: "[0-9]*"
                  }}
                  type={'number'}
                  checkInvalid={(value) => {
                    checkInvalid({
                      index,
                      item,
                      key: 'ComponentProductStandardQuantityInBaseUnit',
                      checkValue: value,
                    }, appDispatch);
                  }}
                  onChange={async (value: number) => {
                    await editItemAsync({
                      params: {
                        BillOfMaterial: {
                          BillOfMaterial: item.BillOfMaterial,
                          Item: [
                            {
                              ...item,
                              ComponentProductStandardQuantityInBaseUnit: value,
                            },
                          ],
                        },
                        api_type: 'updates',
                        accepter: ['Item'],
                      },
                      index,
                      key: 'ComponentProductStandardQuantityInBaseUnit',
                    },
                      appDispatch, itemState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'ComponentProductStandardQuantityInBaseUnit',
                  }))}
                />
              </span>
            </td>
            <td>{item.ComponentProductBaseUnit}</td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  if (item.isEditing['ValidityStartDate']) {
                    return;
                  }

                  appDispatch(pushItemToEdit({
                    index,
                    item,
                    key: 'ValidityStartDate',
                  }));
                }}
              >
                <DatePicker
                  className={'orderDateDataPicker'}
                  isEditing={item.isEditing['ValidityStartDate']}
                  parseDateFormat={'yyyy-MM-dd'}
                  currentValue={item.ValidityStartDate}
                  onChange={async (value) => {
                    await editItemAsync({
                        params: {
                          BillOfMaterial: {
                            BillOfMaterial: item.BillOfMaterial,
                            Item: [
                              {
                                ...item,
                                ValidityStartDate: value,
                              },
                            ],
                          },
                          api_type: 'updates',
                          accepter: ['Item'],
                        },
                        index,
                        key: 'ValidityStartDate',
                      },
                      appDispatch, itemState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'ValidityStartDate',
                  }))}
                />
              </span>
            </td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
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
                              // onUpdateItem(
                              //   !item.IsMarkedForDeletion,
                              //   index,
                              //   'IsMarkedForDeletion',
                              //   {
                              //     BillOfMaterial: {
                              //       BillOfMaterial: item.BillOfMaterial,
                              //       Item: [
                              //         {
                              //           BillOfMaterialItem: item.BillOfMaterialItem,
                              //           IsMarkedForDeletion: !item.IsMarkedForDeletion,
                              //         }
                              //       ]
                              //     },
                              //     accepter: ['Item'],
                              //   },
                              //   'delete',
                              // );
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
        {renderList(
          list,
        )}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const BillOfMaterialDetailList = ({
                                           userType,
                                           billOfMaterial,
                                           className,
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

  const list  = useAppSelector(state => state.billOfMaterialDetailList) as {
    [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: BillOfMaterialDetailHeader,
    [BillOfMaterialTablesEnum.billOfMaterialDetailList]: BillOfMaterialDetailListItem[],
  };

  const [closedPopup, setClosedPopup] = useState(true);

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
                {list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].BillOfMaterial}
              </div>
              <div>
                <span>有効開始日付: </span>
                {list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].ValidityStartDate}
              </div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
            <div>
                <span>オーナー製造プラント: </span>
                {list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].OwnerProductionPlantName}
              </div>
              <div>
                <span>品目: </span>
                {list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].Product} / {list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].ProductDescription}
              </div>
            </ListHeaderInfoBottom>
          </div>
          <div className={'columnLeft'}>
              {list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].Images?.Product && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].Images && generateImageProductUrl(
                    list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].Images?.Product?.BusinessPartnerID ?
                    list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].Images?.Product?.BusinessPartnerID.toString() : null, list.billOfMaterialDetailHeader?.Images?.Product || {}
                  )}
                  alt={`${list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].ProductDescription}`}
                />
              )}
              {!list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader].Images?.Product && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
              </div>
          <div className={'columnRight'}>
            <OtherButton
            closedPopup={closedPopup}
            setClosedPopup={setClosedPopup}
            >
              そのほかの情報
            </OtherButton>
            <PopupTranslucent
            title={'部品表ヘッダ情報'}
            closedPopup={closedPopup}
            setClosedPopup={setClosedPopup}
            >
              <div className='flex'>
                <div className='w-1/2'>
                <ul>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>部品表:</div>
                    <div className={'listContent-formal'}>12148191</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>部品表タイプ:</div>
                    <div className={'listContent-formal'}>P0</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>SCRID:</div>
                    <div className={'listContent-formal'}>10100100</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>SCR入出荷ID:</div>
                    <div className={'listContent-formal'}>10100144</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>SCR入出荷プラントID:</div>
                    <div className={'listContent-formal'}>100000022</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>SCR製造プラントID:</div>
                    <div className={'listContent-formal'}>100000043</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>買い手::</div>
                    <div className={'listContent-formal'}>山崎製パン</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>売り手:</div>
                    <div className={'listContent-formal'}>山崎製パン</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>目的地入出荷先:</div>
                    <div className={'listContent-formal'}>山崎製パン</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>目的地入出荷先プラント:</div>
                    <div className={'listContent-formal'}>山崎製パン 松戸第二工場</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出発地入出荷元:</div>
                    <div className={'listContent-formal'}>山崎製パン</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出発地入出荷元プラント:</div>
                    <div className={'listContent-formal'}>山崎製パン 松戸第二工場</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>オーナー製造プラントビジネスパートナ:</div>
                    <div className={'listContent-formal'}>山崎製パン</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>オーナー製造プラント:</div>
                    <div className={'listContent-formal'}>山崎製パン</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>品目基本数量単位:</div>
                    <div className={'listContent-formal'}>PC</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>品目入出荷数量単位:</div>
                    <div className={'listContent-formal'}>PC</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>品目製造単位:</div>
                    <div className={'listContent-formal'}>PC</div>
                  </li>
                </ul>
                </div>
                <div className='w-1/2'>
                  <ul>
                    <li className={'flex justify-start items-center'}>
                      <div className={'listTitle'}>部品表ヘッダテキスト:</div>
                      <div className={'listContent-formal'}></div>
                    </li>
                    <li className={'flex justify-start items-center'}>
                      <div className={'listTitle'}>有効終了日付:</div>
                      <div className={'listContent-formal'}>9999-12-31</div>
                    </li>
                    <li className={'flex justify-start items-center'}>
                      <div className={'listTitle'}>登録日付:</div>
                      <div className={'listContent-formal'}>2023-06-23</div>
                    </li>
                    <li className={'flex justify-start items-center'}>
                      <div className={'listTitle'}>最終更新日付:</div>
                      <div className={'listContent-formal'}>2023-06-23</div>
                    </li>
                    <li className={'flex justify-start items-center'}>
                      <div className={'listTitle'}>削除フラグ:</div>
                      <div className={'listContent-formal'}>false</div>
                    </li>
                  </ul>
                </div>
              </div>
            </PopupTranslucent>
          </div>
        </ListHeaderInfo>
      </div>
      <DetailListTableElement
        userType={userType}
        summary={summary}
        billOfMaterial={billOfMaterial}
        list={list[BillOfMaterialTablesEnum.billOfMaterialDetailList] || []}
      />
    </ListElement>
  );
};
