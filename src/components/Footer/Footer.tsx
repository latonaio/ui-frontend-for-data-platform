import { clsx } from 'clsx';
import { FooterWrapper } from './Footer.style';
import { BackButton } from '@/components/Button';

interface FooterProps {
  className?: string;
  hrefPath?: string;
  isHidden?: boolean;
}

export const Footer = ({ className, hrefPath, isHidden }: FooterProps) => {
  return (
    <FooterWrapper className={clsx(
      className
    )}>
      <BackButton
        className={`text-base ${isHidden ? 'hidden' : ''}`}
        hrefPath={`${hrefPath}`}>戻る</BackButton>
    </FooterWrapper>
  )
};
