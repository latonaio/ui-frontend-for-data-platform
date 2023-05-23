import { clsx } from 'clsx';
import { FooterWrapper } from './Footer.style';
import { Button } from '@/components/Button';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <FooterWrapper className={clsx(
      className
    )}>
      <Button className={'text-base'}></Button>
    </FooterWrapper>
  )
};
