import { Dialog as DialogMaterialUi, DialogContent } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks';

export const GlobalDialog = () => {
  const state = useAppSelector(state => state.dialog);
  const isOpen = state.consent.isOpen;
  const children = state.consent.children;

  return (
    <DialogMaterialUi
      open={isOpen}
    >
      {children &&
        <DialogContent>
          {children}
        </DialogContent>
      }
    </DialogMaterialUi>
  );
}
