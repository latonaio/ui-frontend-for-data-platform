import { clsx } from 'clsx';
import { Button as ButtonElement } from './Button.style';
import { useRouter } from 'next/router';

interface ButtonProps {
  className?: string;
}

export const Button = ({ className }: ButtonProps) => {
  const router = useRouter();

  return (
    <ButtonElement className={clsx(
      'text-2xl font-bold text-white',
      className
    )} onClick={async () => { await router.push('/'); }}>
      戻る
    </ButtonElement>
  )
};
