import { clsx } from 'clsx';
import { HeaderWrapper, HeaderContent, HeaderIcon } from "@/components/Header/Header.style";
import Link from 'next/link';
import { PublicImage } from '@/components/Image';

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
          <PublicImage imageName={'aionLogo'} />
        </div>
        <HeaderIcon>
          <PublicImage imageName={'headerGirl'} />
        </HeaderIcon>
      </HeaderContent>
    </HeaderWrapper>
  )
};
