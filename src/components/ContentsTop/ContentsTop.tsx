import { clsx } from 'clsx';
import {
  ContentsTopWrapper,
  Input,
  Search,
  IconWrapper,
} from "@/components/ContentsTop/ContentsTop.style";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { AuthState, setAuth } from '@/store/authSlice';
import { useEffect, useState } from "react";
import { getLocalStorage } from '@/helpers/common';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ContentsTopProps {
  className?: string;
}

export const ContentsTop = ({ className }: ContentsTopProps) => {
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

  // dispatch(setAuth({
  //   loginId: 'test',
  //   businessPartner: 'test',
  // }));

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
        <IconWrapper className={'flex items-center'}>
          <img src={'icon-present.png'}  alt={''}/>
          <div className={'pl-3'}>オーダー詳細を照会しています</div>
        </IconWrapper>
      </div>
      <div className={'flex items-center'}>
        <Search className="text-3xl icon-search"></Search>
        <Input type="text" id="name" name="name" required />
      </div>
    </ContentsTopWrapper>
  )
};
