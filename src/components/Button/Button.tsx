import { clsx } from 'clsx';
import {
  Button as ButtonElement,
  GreenButton as GreenButtonElement,
  WhiteButton as WhiteButtonElement,
  BlueButton as BlueButtonElement,
  OtherButton as OtherButtonElement,
} from './Button.style';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

interface ButtonProps {
  hrefPath?: string | undefined;
  children?: ReactNode,
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface GreenButtonProps extends ButtonProps {
  isFinished?: boolean;
}

interface WhiteButtonProps extends ButtonProps {
}

interface OtherButtonButtonProps extends ButtonProps {
  closedPopup?: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
}

export const BackButton = (
  {
    hrefPath,
    children,
    className,
  }: ButtonProps
) => {
  const router = useRouter();

  return (
    <ButtonElement className={clsx(
      'text-2xl font-bold text-white',
      className
    )} onClick={async () => {
      await router.push(hrefPath === 'undefined' ? '/' : hrefPath === undefined ? '/' : hrefPath);
    }}>
      {children}
    </ButtonElement>
  );
};

export const GreenButton = (
  {
    isFinished,
    children,
    className,
    onClick,
  }: GreenButtonProps
) => {
  return (
    <GreenButtonElement
      className={clsx(
        `${isFinished ? 'deep' : ''}`,
        className
      )}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </GreenButtonElement>
  );
};

export const BlueButton = (
  {
    isFinished,
    children,
    className,
    onClick,
  }: GreenButtonProps
) => {
  return (
    <BlueButtonElement
      className={clsx(
        `${isFinished ? 'deep' : ''}`,
        className
      )}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </BlueButtonElement>
  );
};

export const WhiteButton = (
  {
    children,
    className,
  }: WhiteButtonProps
) => {
  return (
    <WhiteButtonElement className={clsx(
      '',
      className
    )}>
      {children}
    </WhiteButtonElement>
  );
}

export const OtherButton = (
  {
    children,
    className,
    closedPopup,
    setClosedPopup,
  }: OtherButtonButtonProps
) => {
  return (
    <OtherButtonElement className={clsx(
      '',
      className,
    )}
    onClick={() => {
      setClosedPopup(!closedPopup);
    }}
    >
      {children}
    </OtherButtonElement>
  );
}

