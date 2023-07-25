import { clsx } from 'clsx';
import { TextField as TextFieldStyle } from './TextField.style';
import {
  TextField as TextFieldMaterial,
} from '@material-ui/core';
import React, { useEffect } from 'react';

interface TextFieldInternalProps {
  className?: string;
  isEditing: boolean;
  currentValue: any;
  onChange?: (value: any) => void;
  onClose?: () => void;
  inputProps?: any;
  type?: string;
  checkInvalid?: (value: any) => void;
}

export interface TextFieldProps {
  isEditing: boolean;
  currentValue?: any;
}

export const TextField = ({
                            className,
                            isEditing,
                            currentValue,
                            type,
                            onChange,
                            onClose,
                            inputProps,
                            checkInvalid,
                          }: TextFieldInternalProps) => {
  const [value, setValue] = React.useState('');
  const [typing, setTyping] = React.useState(false);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <TextFieldStyle
      className={clsx(
        '',
        className
      )}>
      <div className={`${!isEditing ? '' : 'hidden'}`}>
        {currentValue}
      </div>
      <div className={`${!isEditing ? 'hidden' : ''}`}>
        <TextFieldMaterial
          value={value}
          type={type}
          inputProps={{
            // inputMode: "numeric",
            // pattern: "[0-9]*"
          }}
          onCompositionStart={() => setTyping(true)}
          onCompositionEnd={() => setTyping(false)}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setValue(target.value);

            console.log(target.value)

            checkInvalid && checkInvalid(target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (
              (e.code !== 'Enter' && e.code !== 'Escape') ||
              typing
            ) return;

            if (e.code === 'Enter') {
              const target = e.target as HTMLInputElement;

              if (type === 'number') {
                onChange && onChange(Number(target.value));
              } else {
                onChange && onChange(target.value);
              }
            }

            if (e.code === 'Escape') {
              onClose && onClose();
            }
          }}
        />
      </div>
    </TextFieldStyle>
  )
};
