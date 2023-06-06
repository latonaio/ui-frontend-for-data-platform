import { clsx } from 'clsx';
import React, { ReactNode } from 'react';
import {
  CircularProgress,
} from '@material-ui/core';
import {
  Loading as LoadingElement
} from './Loading.style';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

interface LoadingProps {
  children?: ReactNode,
  className?: string;
  isOpen: boolean;
}

interface GlobalLoadingProps {
  className?: string;
}

export const Loading = (
  {
    isOpen = false,
    children,
    className,
  }: LoadingProps
) => {
  return (
    <LoadingElement>
      <CircularProgress
        className={clsx(
          `${!isOpen ? 'hidden' : ''}`,
          className
        )}
      ></CircularProgress>
    </LoadingElement>
  );
}

export const GlobalLoading = (
  {
    className,
  }: GlobalLoadingProps
) => {
  const state = useAppSelector(state => state.loading);
  const isOpen = state.isOpen;

  return (
    <LoadingElement>
      <CircularProgress
        className={clsx(
          `${!isOpen ? 'hidden' : ''}`,
          className
        )}
      ></CircularProgress>
    </LoadingElement>
  );
}
