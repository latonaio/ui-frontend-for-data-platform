import { Checkbox as CheckboxElement } from './Checkbox.style';
import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

interface CheckboxProps {
  hrefPath?: string | undefined;
  children?: ReactNode,
  className?: string;
  isChecked?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Checkbox = (
  {
    isChecked = false,
    className,
    onClick,
  }: CheckboxProps
) => {
  return (
    <CheckboxElement className={clsx(
      `relative`,
      className,
    )}
                     onClick={(e) => onClick ? onClick(e) : null}
    >
      <i className={`${!isChecked ? 'hidden' : ''} icon-checkmark`} />
    </CheckboxElement>
  );
}
