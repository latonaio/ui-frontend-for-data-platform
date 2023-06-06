import { clsx } from 'clsx';
import { Arrow as ArrowStyle } from './Arrow.style';
import { useRouter } from 'next/router';

interface ArrowProps {
  className?: string;
  href?: string;
}

export const Arrow = ({
                        className,
                        href,
                      }: ArrowProps) => {
  const router = useRouter();

  return (
    <ArrowStyle
      className={clsx(
        '',
      className
    )}
      onClick={() => {
        if (href) {
          router.push(href);
        }
      }}
    ></ArrowStyle>
  )
};
