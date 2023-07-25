import { clsx } from 'clsx';
import { SnackbarErrorStyle } from './Error.style';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { forEach } from 'react-bootstrap/ElementChildren';
import { setGlobalSnackbar, clearMessage } from '@/store/slices/snackbar';

interface SnackbarErrorProps {
  className?: string;
  href?: string;
  isGlobal?: boolean;
}

export const SnackbarError = ({
                                className,
                                href,
                                isGlobal = false,
                              }: SnackbarErrorProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (message: string) => () => {
    // messages.forEach((message) => {
    //   enqueueSnackbar(message, { variant: 'error' });
    // });
  };

  const state = useAppSelector(state => state.snackbar);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    // handleClickVariant(state.message);
    if (state.message !== '') {
      enqueueSnackbar(state.message, { variant: 'error' });
      appDispatch(setGlobalSnackbar({
        message: state.message,
      }));
      appDispatch(clearMessage({}));
    }
  }, [state.message]);

  return (
    <React.Fragment>
      {/*<Button onClick={handleClick}>Show snackbar</Button>*/}
      {/*<Button onClick={handleClickVariant('success')}>Show success snackbar</Button>*/}
    </React.Fragment>
  );
};
