import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker as MuiDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useEffect, useState } from 'react';
import { DatePickerStyle } from './DatePicker.style';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { DateType } from '@date-io/type';

interface DatePickerProps {
  className?: string;
  currentValue: any;
  isEditing?: boolean;
  onChange?: (value: string) => void;
  onClose?: () => void;
  parseDateFormat?: string;
}

export const DatePicker = ({
                             className,
                             currentValue,
                             isEditing,
                             onChange,
                             onClose,
                             parseDateFormat,
                           }: DatePickerProps) => {
  const isInvalidDate = (date: Date) => Number.isNaN(date.getTime());

  const [date, setDate] = useState<Date | null>(new Date());
  const changeDateHandler = (newDate: Date | null): void => {
    setDate(newDate);
  };

  useEffect(() => {
    let dateTime = null;

    if (!isInvalidDate(new Date(currentValue))) {
      dateTime = new Date(currentValue);
    } else {
      dateTime = new Date();
    }

    changeDateHandler(dateTime);
  }, [currentValue]);

  return (
    <DatePickerStyle
      className={clsx(
        '',
        className
      )}
    >
      <div className={`${!isEditing ? '' : 'hidden'} datePickerTitle`}>
        {currentValue}
      </div>
      <div className={`${!isEditing ? 'hidden' : ''} datePickerProvider`}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiDatePicker
            value={date}
            format={parseDateFormat || 'yyyy-MM-dd'}
            onChange={(value: DateType | null = new Date()) => {
              if (!value) { return; }

              if (isInvalidDate(new Date(value))) {
                return;
              }

              const parsedTime = format(
                new Date(value),
                parseDateFormat || 'yyyy-MM-dd'
              );

              changeDateHandler(value);
              onChange && onChange(parsedTime);
            }}
            onClose={onClose}
          />
        </MuiPickersUtilsProvider>
      </div>

    </DatePickerStyle>
  );
};
