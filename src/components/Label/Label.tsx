import { clsx } from 'clsx';
import {
  Label as LabelStyle,
  ProductImageLabel as ProductImageLabelStyle,
} from './Label.style';
import { useRouter } from 'next/router';
import React from 'react';

interface LabelProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  enable?: {
    border?: boolean;
  };
}

export const Label = ({
                        className,
                        children,
                        style,
                        enable = { border: false },
                      }: LabelProps) => {

  return (
    <LabelStyle
      className={clsx(
        `${enable?.border ? 'border-disable' : ''}`,
        className
      )}
      style={style}
    >
      {children}
    </LabelStyle>
  )
};

export const ProductImageLabel = ({
                                    className,
                                    children,
                                    style,
                                  }: LabelProps) => {
  return (
    <ProductImageLabelStyle
      className={clsx(
        ``,
        className
      )}
      style={style}
    >
      {children}
    </ProductImageLabelStyle>
  )
};
