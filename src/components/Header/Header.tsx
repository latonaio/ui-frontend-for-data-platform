import { clsx } from 'clsx';
import { HeaderWrapper, HeaderContent, HeaderIcon } from "@/components/Header/Header.style";
import aionLogo from '@public/aion-logo.png';
import headerGirl from '@public/header-girl.png';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  className?: string;
}

export const Header = ({ title, className }: HeaderProps) => {
  return (
    <HeaderWrapper className={clsx(
      `HeaderWrapper`,
      className
    )}>
      <HeaderContent>
        <div className={'mr-auto text-gray-100 text-4xl font-bold'}>
          <Link href="/">{title}</Link>
        </div>
        <div className={'pr-6 text-gray-100'}>Powered-by</div>
        <div className={'pr-4'}>
          <Image src={aionLogo}  alt={'aion'}/>
        </div>
        <HeaderIcon>
          <Image src={headerGirl}  alt={''}/>
        </HeaderIcon>
      </HeaderContent>
    </HeaderWrapper>
  )
};
