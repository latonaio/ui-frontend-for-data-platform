import React, { useState } from 'react';
import { clsx } from 'clsx';
import { DetailList, DetailListTable, HeadTab, List as ListElement } from './List.style';
import { DeliverFromPartyItem, DeliverToPartyItem, DeliveryDocumentTablesEnum } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { DatePicker, Select } from '@/components/Form';
import { BlueButton, GreenButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { editList, formData, onUpdateItem } from '@/pages/delivery-document/list';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';

interface ListProps {
  className?: string;
  formData: formData;
  onClickHandler: (type: DeliveryDocumentTablesEnum) => void;
  // setEditList: (value: any, key: string, isClose?: boolean) => void;
  setEditList: any;
  onUpdateItem: onUpdateItem;
  setFormData: any;
  initLoadTabData: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  formData: formData;
  type: DeliveryDocumentTablesEnum;
  display: DeliveryDocumentTablesEnum;
  list: DeliverToPartyItem[] | DeliverFromPartyItem[];
  editList: editList;
  setEditList: (value: any, key: string, isClose?: boolean) => void;
  onUpdateItem: onUpdateItem;
  setFormData: any;
  initLoadTabData: () => void;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  editList,
                                  setEditList,
                                  formData,
                                  setFormData,
                                  onUpdateItem,
                                  initLoadTabData,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = display === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ?
    DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem :
    DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem;
  const dispatch = useDispatch();

  const renderList = (
    list: DeliverToPartyItem[] | DeliverFromPartyItem[],
    editList: any,
  ) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled || item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/delivery-document/detail/list/${display === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ? 'deliverToParty' : 'deliverFromParty'}/${item.DeliveryDocument}`,
              router,
            );
          }}>
            <td>{item.DeliveryDocument}</td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList[listType][item.DeliveryDocument]['DeliverToPlantName'].isEditing) {
                    return;
                  }

                  const update = () => {
                    const data = {
                      ...formData,
                    };

                    data.editList[listType][item.DeliveryDocument]['DeliverToPlantName'].isEditing =
                      !editList[listType][item.DeliveryDocument]['DeliverToPlantName'].isEditing;

                    return data
                  };

                  setFormData(update());
                }}
              >
                <Select
                  className={'isBlock'}
                  isEditing={(() => {
                    if (!editList[listType][item.DeliveryDocument]) { return false; }
                    return editList[listType][item.DeliveryDocument]['DeliverToPlantName'].isEditing;
                  })()}
                  currentValue={item.DeliverToPlant}
                  isLabelMark={true}
                  isNoLabel={true}
                  select={(() => {
                    const pullDownUserType = type === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ?
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem :
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem;

                    return {
                      data: [
                        ...editList.pullDowns[pullDownUserType][item.SupplyChainRelationshipID].DeliverToParty.map((pullDownItem: any) => {
                          return {
                            ...pullDownItem,
                            label: `${pullDownItem.DeliverToPartyName} / ${pullDownItem.DeliverToPlantName}${pullDownItem.DefaultRelation ? '◉' : ''}`,
                            showLabel: `${pullDownItem.DeliverToPartyName} / ${pullDownItem.DeliverToPlantName}`,
                          }
                        })
                      ],
                      label: 'DeliverToPlantName',
                      value: 'DeliverToPlant',
                    }
                  })()}
                  onChange={async (value) => {
                    const pullDownUserType = type === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ?
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem :
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem;

                    const selected = editList.pullDowns[pullDownUserType][item.SupplyChainRelationshipID].DeliverToParty.find((pullDownItem: any) => {
                      return pullDownItem.DeliverToPlant
                        === value
                    });

                    await onUpdateItem(
                      value,
                      index,
                      'DeliverToPlant',
                      {
                        DeliveryDocument: {
                          DeliveryDocument: item.DeliveryDocument,
                          SupplyChainRelationshipDeliveryID: selected.SupplyChainRelationshipDeliveryID,
                          SupplyChainRelationshipDeliveryPlantID: selected.SupplyChainRelationshipDeliveryPlantID,
                          DeliverToParty: selected.DeliverToParty,
                          DeliverToPlant: selected.DeliverToPlant,
                        }
                      },
                      listType,
                    );

                    // const update = () => {
                    //   const data = {
                    //     ...formData,
                    //   };
                    //
                    //   data.editList[listType][item.DeliveryDocument]['DeliverToPlantName'].isEditing =
                    //     false;
                    //   data[listType].forEach((i) => {
                    //     if (i.DeliveryDocument === item.DeliveryDocument) {
                    //       i.DeliverToPlant = value;
                    //       i.DeliverToPlantName = selected.DeliverToPlantName;
                    //     }
                    //   });
                    //
                    //   return data
                    // };
                    //
                    // setFormData(update());

                    // setTimeout(async () => {
                    //   await initLoadTabData();
                    // }, 1000)

                    await initLoadTabData();
                  }}
                ></Select>
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList[listType][item.DeliveryDocument]['DeliverFromPlantName'].isEditing) {
                    return;
                  }

                  const update = () => {
                    const data = {
                      ...formData,
                    };

                    data.editList[listType][item.DeliveryDocument]['DeliverFromPlantName'].isEditing =
                      !editList[listType][item.DeliveryDocument]['DeliverFromPlantName'].isEditing;

                    return data
                  };

                  setFormData(update());
                }}
              >
                <Select
                  className={'isBlock'}
                  isEditing={(() => {
                    if (!editList[listType][item.DeliveryDocument]) { return false; }
                    return editList[listType][item.DeliveryDocument]['DeliverFromPlantName'].isEditing;
                  })()}
                  currentValue={item.DeliverFromPlant}
                  isLabelMark={true}
                  isNoLabel={true}
                  select={(() => {
                    const pullDownUserType = type === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ?
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem :
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem;

                    return {
                      data: [
                        ...editList.pullDowns[pullDownUserType][item.SupplyChainRelationshipID].DeliverFromParty.map((pullDownItem: any) => {
                          return {
                            ...pullDownItem,
                            label: `${pullDownItem.DeliverFromPartyName} / ${pullDownItem.DeliverFromPlantName}${pullDownItem.DefaultRelation ? '◉' : ''}`,
                            showLabel: `${pullDownItem.DeliverFromPartyName} / ${pullDownItem.DeliverFromPlantName}`,
                          }
                        })
                      ],
                      label: 'DeliverFromPlantName',
                      value: 'DeliverFromPlant',
                    }
                  })()}
                  onChange={async (value) => {
                    const pullDownUserType = type === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ?
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem :
                      DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem;

                    const selected = editList.pullDowns[pullDownUserType][item.SupplyChainRelationshipID].DeliverFromParty.find((pullDownItem: any) => {
                      return pullDownItem.DeliverFromPlant === value
                    });

                    await onUpdateItem(
                      value,
                      index,
                      'DeliverFromPlant',
                      {
                        DeliveryDocument: {
                          DeliveryDocument: item.DeliveryDocument,
                          SupplyChainRelationshipDeliveryID: selected.SupplyChainRelationshipDeliveryID,
                          SupplyChainRelationshipDeliveryPlantID: selected.SupplyChainRelationshipDeliveryPlantID,
                          DeliverFromParty: selected.DeliverFromParty,
                          DeliverFromPlant: selected.DeliverFromPlant,
                        }
                      },
                      listType,
                    );

                    // const update = () => {
                    //   const data = {
                    //     ...formData,
                    //   };
                    //
                    //   data.editList[listType][item.DeliveryDocument]['DeliverFromPlantName'].isEditing =
                    //     false;
                    //   data[listType].forEach((i) => {
                    //     if (i.DeliveryDocument === item.DeliveryDocument) {
                    //       i.DeliverFromPlant = value;
                    //       i.DeliverFromPlantName = selected.DeliverFromPlantName;
                    //     }
                    //   });
                    //
                    //   return data
                    // };
                    //
                    // setFormData(update());

                    // setTimeout(async () => {
                    //   await initLoadTabData();
                    // }, 1000)

                    await initLoadTabData();
                  }}
                ></Select>
              </span>
            </td>
            <td>{item.HeaderDeliveryStatus}</td>
            <td>{item.HeaderBillingStatus}</td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList[listType][item.DeliveryDocument]['PlannedGoodsReceiptDate'].isEditing) {
                    return;
                  }
                  const update = () => {
                    const data = {
                      ...formData,
                    };

                    data.editList[listType][item.DeliveryDocument]['PlannedGoodsReceiptDate'].isEditing =
                      !editList[listType][item.DeliveryDocument]['PlannedGoodsReceiptDate'].isEditing;

                    return data
                  };

                  setFormData(update());
                }}
              >
                <DatePicker
                  className={'orderDateDataPicker'}
                  isEditing={(() => {
                    if (!editList[listType][item.DeliveryDocument]) { return false; }
                    return editList[listType][item.DeliveryDocument]['PlannedGoodsReceiptDate'].isEditing;
                  })()}
                  parseDateFormat={'yyyy-MM-dd'}
                  currentValue={item.PlannedGoodsReceiptDate}
                  onChange={async (value) => {
                    await onUpdateItem(
                      value,
                      index,
                      'PlannedGoodsReceiptDate',
                      {
                        DeliveryDocument: {
                          DeliveryDocument: item.DeliveryDocument,
                          PlannedGoodsReceiptDate: value,
                        }
                      },
                      listType,
                      'update',
                    );

                    const update = () => {
                      const data = {
                        ...formData,
                      };

                      data.editList[listType][item.DeliveryDocument]['PlannedGoodsReceiptDate'].isEditing =
                        false;
                      data[listType].forEach((i) => {
                        if (i.DeliveryDocument === item.DeliveryDocument) {
                          i.PlannedGoodsReceiptDate = value;
                        }
                      });

                      return data
                    };

                    setFormData(update());
                  }}
                  onClose={() => {
                    const update = () => {
                      const data = {
                        ...formData,
                      };

                      data.editList[listType][item.DeliveryDocument]['PlannedGoodsReceiptDate'].isEditing = false;

                      return data
                    };

                    setFormData(update());
                  }}
                />
              </span>
            </td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
                <GreenButton
                  className={'size-relative'}
                  isFinished={item.IsCancelled}
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
                            item.IsCancelled ?
                              '入出荷のキャンセルを取り消しますか？' : '入出荷をキャンセルしますか？',
                            () => {
                              onUpdateItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  DeliveryDocument: {
                                    DeliveryDocument: item.DeliveryDocument,
                                    IsCancelled: !item.IsCancelled,
                                  },
                                },
                                listType,
                                'cancel',
                              );
                            },
                          )
                        ),
                      }
                    }));
                  }}
                >
                  {texts.button.cancel}
                </GreenButton>
                <BlueButton
                  className={'size-relative'}
                  isFinished={item.IsMarkedForDeletion}
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
                              '入出荷の削除を取り消しますか？' : '入出荷を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  DeliveryDocument: {
                                    DeliveryDocument: item.DeliveryDocument,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  },
                                },
                                listType,
                                'delete',
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
                {/*<i*/}
                {/*  className="icon-clipboard-list"*/}
                {/*  style={{*/}
                {/*    fontSize: rem(32),*/}
                {/*  }}*/}
                {/*/>*/}
                {/*<i*/}
                {/*  className="icon-invoice"*/}
                {/*  style={{*/}
                {/*    fontSize: rem(32),*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
            </td>
          </tr>
        )
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={7}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable className={'deliveryDocumentList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list, editList)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const DeliveryDocumentList = ({
                                       onClickHandler,
                                       className,
                                       formData,
                                       setEditList,
                                       setFormData,
                                       onUpdateItem,
                                       initLoadTabData,
                                     }: ListProps) => {
  const [display, setDisplay] = useState<DeliveryDocumentTablesEnum>(DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem);
  const tabClickHandler = (type: DeliveryDocumentTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }
  const summary = [
    '入出荷伝票番号',
    '入出荷先名',
    '入出荷元名',
    '入出荷ステータス',
    '請求ステータス',
    '入出荷予定日',
    '',
  ];

  console.log(formData)

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <div>
        <HeadTab className={'text-center text-1xl mb-2'}>
          <li
            className={`${display === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem)}
          >User ＝ DeliverToParty
          </li>
          <li
            className={`${display === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem)}
          >User ＝ DeliverFromParty
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        formData={formData}
        type={DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem}
        display={display}
        editList={formData.editList}
        list={formData[DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem] || []}
        setEditList={setEditList}
        setFormData={setFormData}
        onUpdateItem={onUpdateItem}
        initLoadTabData={initLoadTabData}
      />

      <DetailListTableElement
        summary={summary}
        formData={formData}
        type={DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem}
        display={display}
        editList={formData.editList}
        list={formData[DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem] || []}
        setEditList={setEditList}
        setFormData={setFormData}
        onUpdateItem={onUpdateItem}
        initLoadTabData={initLoadTabData}
      />
    </ListElement>
  );
};

