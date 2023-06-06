import { clsx } from 'clsx';
import React, { ReactNode } from 'react';
import {
  Button,
  Dialog as DialogMaterialUi,
  DialogContent,
} from '@material-ui/core';

interface DialogProps {
  children?: ReactNode,
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

interface DialogDefaultLayoutProps {
  className?: string;
  title?: string;
  message?: string;
  onClose?: () => void;
}

export const Dialog = (
  {
    isOpen = false,
    onClose,
    children,
    className,
  }: DialogProps
) => {
  return (
    <DialogMaterialUi
      open={isOpen}
      onClose={onClose}
      className={clsx(
      '',
      className
    )}>
      <DialogContent>
        {children}
      </DialogContent>
    </DialogMaterialUi>
  );
}

export const DialogDefaultLayout = (
  {
    onClose,
    className,
    title,
    message,
  }: DialogDefaultLayoutProps
) => {
  return (
    <div
      className={clsx(
        '',
        className
      )}
    >
      <div className={'mb-5 text-2xl text-center'}>{title}</div>
      <div className={'mb-6'}>{message}</div>
      <div className={'mb-4 text-center'}>
        <Button
          variant="outlined"
          onClick={onClose}
        >OK</Button>
      </div>
    </div>
  )
}

export const DialogConsentLayout = (
  {
    onClose,
    className,
    title,
    message,
  }: DialogDefaultLayoutProps
) => {
  <div
    className={clsx(
      '',
      className
    )}
  >
    <div className={'mb-5 text-2xl text-center'}>{title}</div>
    <div className={'mb-6'}>{message}</div>
    <div className={'mb-4 text-center'}>
      <Button
        variant="outlined"
        onClick={onClose}
      >OK</Button>
    </div>
  </div>
}

