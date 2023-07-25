import React from 'react';
import {
  ExConfs,
  ExConfsContent,
  ExConfsContentList,
  ExConfsContentListLi,
  ExConfsHeader,
  ExConfsHeaderWrapper,
  ExConfsHeaderInfo,
  ExConfsHeaderInfoTop,
} from './BusinessPartnerExconfList.style';
import { DisplayData } from '@/pages/business-partner/detail/exconf/list/[userType]/[businessPartner]';
import { BusinessPartnerTablesEnum, UserTypeEnum } from '@/constants';
import { toLowerCase } from '@/helpers/common';
import { clickHandler } from '@/components/Content/List/List';
import { useRouter } from 'next/router';

export const BusinessPartnerDetailExconfList = ({
                                                          data,
                                                          userType,
                                                        }: {
                                                          data: DisplayData;
                                                          userType: string;
                                                        },
) => {
  const contentList = [
    { type: 'General', color: 'blue' },
    { type: 'GeneralFinInst', color: 'green' },
    { type: 'Role', color: 'blue' },
    { type: 'Accounting', color: 'green' },
    { type: 'Address', color: 'blue' },
  ]

  const businessPartnerDetailExconfListHeader = data && data[BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader];
  const businessPartnerDetailExconfList = data && data[BusinessPartnerTablesEnum.businessPartnerDetailExconfList]?.Existences;
  const router = useRouter();

  return (
    <ExConfs>
      <ExConfsHeader>
        <ExConfsHeaderWrapper
          className={'flex justify-start items-center'}
        >
          <div
            className={'flex justify-start items-center'}
          >
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>ビジネスパートナーコード: {businessPartnerDetailExconfListHeader?.BusinessPartner}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>ビジネスパートナ名: {businessPartnerDetailExconfListHeader?.BusinessPartnerName}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
          </div>
        </ExConfsHeaderWrapper>
      </ExConfsHeader>
      <ExConfsContent>
        <ExConfsContentList>
          {businessPartnerDetailExconfList?.map((item, index) => {
            const foundContent = contentList
              .find((content) => content.type === item.Content);

            if (!foundContent) {
              return;
            }
			
			return (
              <ExConfsContentListLi
                key={index}
                className={
                  `${foundContent.color} ` +
                  `${!item.Exist ? 'disable' : 'cursor-pointer'} `
                }
                onClick={() => {
                  clickHandler(
                    `/business-partner/detail` +
                    `/${userType}` +
                    `/${toLowerCase(item.Content)}` +
                    `/${data && data[BusinessPartnerTablesEnum.businessPartnerDetailExconfList]?.BusinessPartner}`,
                    router,
                  );
                }}
              >{item.Content} {item.Exist}</ExConfsContentListLi>
            );
          })}
        </ExConfsContentList>
      </ExConfsContent>
    </ExConfs>
  );
};


