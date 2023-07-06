import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
  IcnOutside,
  IcnInvoice,
} from './List.style';
import {
  UserTypeEnum,
} from '@/constants';
import { GreenButton, BlueButton } from '@/components/Button';
import { BusinessPartnerTablesEnum, BuyerItem, SellerItem, BusinessPartnerItem } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { PublicImage } from '@/components/Image';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/business-partner/list';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';
import { rem } from 'polished';
import { toLowerCase } from '@/helpers/common';

export type onUpdateItem = (
	value: any,
	index: number,
	itemType: string,
	params: any,
	listType: string,
	apiType?: string,
  ) => void;


interface ListProps {
  className?: string;
  formData: formData;
  onClickHandler: (type: BusinessPartnerTablesEnum) => void;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: BusinessPartnerTablesEnum;
  display: BusinessPartnerTablesEnum;
  list: BusinessPartnerItem[];
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  onUpdateItem,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: BusinessPartnerItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `/business-partner/detail/exconf/list/${toLowerCase(UserTypeEnum.BusinessPartner)}/${item.BusinessPartner}`,
              router
            );
          }}>
            <td>{item.BusinessPartner}</td>
            <td>{item.BusinessPartnerName}</td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
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
                            item.IsMarkedForDeletion ? 'ビジネスパートナーの削除を取り消しますか？' : 'ビジネスパートナーを削除しますか？',
                            () => {
							onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  BusinessPartner: {
                                    BusinessPartner: item.BusinessPartner,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  }
                                },
                                listType,
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
        )
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={5}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}

export const BusinessPartnerList = ({
                             formData,
                             onClickHandler,
                             className,
                             onUpdateItem,
                           }: ListProps) => {
  const summaryData = {
    [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: [
      'ビジネスパートナコード',
      'ビジネスパートナ名',
      '',
    ],
  };

  const [display, setDisplay] = useState<BusinessPartnerTablesEnum>(
    BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem
  );
  const [summary, setSummary] = useState<string[]>(
    summaryData[BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]
  );

  useEffect(() => {
    setSummary(summaryData[
      BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem
        ],
    );
  }, [display]);

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <DetailListTableElement
        summary={summary}
        type={BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem}
        display={display}
        list={formData[BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem] || []}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};
