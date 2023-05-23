import { clsx } from 'clsx';
import { Button as Root } from './Button.style';

interface ButtonProps {
  className?: string;
}

export const Button = ({ className }: ButtonProps) => {
  return (
    <Root className={clsx(
      'text-base font-bold text-white',
      className
    )}>
      ログイン
    </Root>
  )
}
