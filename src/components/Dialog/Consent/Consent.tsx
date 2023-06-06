import { Button } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { setDialog } from '@/store/slices/dialog';

export const Template = (
  dispatch: any,
  message: string,
  consentFunction?: () => void,
  dissentFunction?: () => void,
): ReactNode => {
  return (
    <>
      <div className={'text-center'}>
        <p className={'text-lg font-bold'}>{message}</p>
        <div className={'flex justify-center mt-8'}>
          <Button
            className={'mr-4'}
            variant="outlined"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();

              if (consentFunction) { consentFunction(); }

              dispatch(setDialog(
                {
                  type: 'consent',
                  consent: {
                    isOpen: false,
                  }
                }
              ));
            }}
          >はい</Button>
          <Button
            className={'mr-4'}
            variant="outlined"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();

              if (dissentFunction) { dissentFunction(); }

              dispatch(setDialog(
                {
                  type: 'consent',
                  consent: {
                    isOpen: false,
                  }
                }
              ));
            }}
          >いいえ</Button>
        </div>
      </div>
    </>
  );
}
