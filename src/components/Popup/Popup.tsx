import { clsx } from 'clsx';
import {
  Popup as Root,
  PopupTranslucentStyle,
  PopupTranslucentStyleTitle,
  PopupTranslucentStyleCloseButton,
} from './Popup.style';
import { ReactNode, useState } from 'react';

interface PopupTranslucentProps {
  className?: string;
  children: ReactNode;
  title?: string;
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
}

export const PopupTranslucent = ({
                                   className,
                                   children,
                                   title,
                                   closedPopup,
                                   setClosedPopup,
                                 }: PopupTranslucentProps) => {

  return (
    <PopupTranslucentStyle
      className={clsx(
        `${closedPopup ? 'hidden' : ''}`,
        className='z-10'
      )}>
      <div>
        <PopupTranslucentStyleTitle
          className={`${title ? '' : 'hidden'}`}
        >{title}</PopupTranslucentStyleTitle>
        <PopupTranslucentStyleCloseButton
          className={'closeButton'}
          onClick={() => {
            setClosedPopup(!closedPopup);
          }}
        >
          <i className="icon-cancel-circle" />
        </PopupTranslucentStyleCloseButton>
        <div>
          {children}
        </div>
      </div>
    </PopupTranslucentStyle>
  );
};
