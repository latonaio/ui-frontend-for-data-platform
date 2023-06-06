import { clsx } from 'clsx';
import {
  ContentsTopWrapper,
  Input,
  Search,
  IconWrapper,
  SearchTextWrapper,
  SelectMenuTab,
} from "@/components/ContentsTop/ContentsTop.style";
import { AuthState, setAuth } from '@/store/slices/auth';
import { ReactNode, useEffect, useState } from 'react';
import { getLocalStorage } from '@/helpers/common';
import { PublicImage } from '@/components/Image';

interface selectMenuTab {
  type: string;
  text: string;
  className?: string;
}

interface ContentsTopProps {
  title: string;
  className?: string;
  searchTextDescription?: string;
  isSearchHidden?: boolean;
  isIconHidden?: boolean;
  selectMenuTabs?: {
    activeMenuTab: string;
    menu: selectMenuTab[];
    onClick?: (type: string) => void;
  };
}

const selectMenuElement = (
  activeMenuTab: string,
  selectMenuTabs: selectMenuTab[],
  onClick?: (type: string) => void,
): ReactNode => {
  return selectMenuTabs.map((menu, index) => {
    return (
      <SelectMenuTab
        key={index}
        className={clsx(
          `${activeMenuTab === menu.type ? 'active' : ''}`,
          menu.className,
        )}
        onClick={() => {
          if (onClick) {
            onClick(menu.type);
          }
        }}
      >
        {menu.text}
      </SelectMenuTab>
    );
  });
}

export const ContentsTop = ({
                              title,
                              className,
                              searchTextDescription,
                              isSearchHidden,
                              isIconHidden,
                              selectMenuTabs,
                            }: ContentsTopProps) => {
  const [userInfo, setUserInfo] = useState<AuthState>({
    emailAddress: '',
    businessPartner: null,
    businessPartnerName: '',
    businessUserFirstName: '',
    businessUserLastName: '',
    businessUserFullName: '',
    language: '',
  });

  useEffect(() => {
    const storageValue = getLocalStorage('auth');
    setUserInfo({
      ...storageValue,
    });
  }, []);

  return (
    <ContentsTopWrapper className={clsx(
      'flex flex-row justify-between items-center font-bold',
      className
    )}>
      <div className={'text-2xl'}>
        <div>
          <span>ユーザー：{userInfo.businessPartnerName}</span>
          <span className={'pl-8'}>{userInfo.businessUserFullName}</span>
        </div>
        <IconWrapper className={`flex items-center ${isIconHidden ? 'hidden' : ''}`}>
          <PublicImage imageName={'iconPresent'} />
          <div className={'pl-3'}>{title}</div>
        </IconWrapper>
      </div>
      <SearchTextWrapper>
        <div className={'flex justify-end items-center'}>
          <div hidden={!searchTextDescription}>
            <PublicImage
              imageName={'iconWing'}
              width={38}
              height={38}
            />
          </div>
          <div>{searchTextDescription}</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <div className={'flex justify-start items-center mr-5'}>
            {selectMenuTabs &&
              selectMenuElement(
                selectMenuTabs.activeMenuTab,
                selectMenuTabs.menu,
                selectMenuTabs.onClick,
              )
            }
          </div>
          <div className={`flex justify-end items-center ${isSearchHidden ? 'hidden' : ''}`}>
            <Search className="text-3xl icon-search"></Search>
            <Input type="text" id="name" name="name" required />
          </div>
        </div>
      </SearchTextWrapper>
    </ContentsTopWrapper>
  )
};
