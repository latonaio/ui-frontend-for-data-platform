import { clsx } from 'clsx';
import { SelectStyle } from './Select.style';
import {
  Select as SelectMaterial,
} from '@material-ui/core';
import { convertSelectDataStructure } from '@/helpers/common';

interface SelectProps {
  className?: string;
  isEditing: boolean;
  currentValue: any;
  select: {
    data: {[key: string]: any}[];
    label: string;
    value: string;
  };
  onChange?: (value: any) => void;
  isBlock?: boolean;
  isLabelMark?: boolean;
  isNoLabel?: boolean;
}

const createLabelName = (
  currentValue: any,
  selectList: any[],
) => {
  const findValue = selectList.find((select: {
    label: any;
    value: any;
  }) => {
    return currentValue === select.value;
  })

  if (findValue && findValue.showLabel) {
    return findValue.showLabel;
  }

  return findValue ? findValue.label : '';
};

export const Select = ({
                         className,
                         isEditing,
                         currentValue,
                         select,
                         onChange,
                         isBlock = false,
                         isLabelMark = false,
                         isNoLabel = false,
                       }: SelectProps) => {

  const selectList = convertSelectDataStructure(
    select.data,
    select.label,
    select.value,
    isLabelMark,
  );

  const labelName = createLabelName(currentValue, selectList);

  return (
    <SelectStyle className={clsx(
        '',
        className
      )}>
      <div className={`${!isEditing ? '' : 'hidden'}`}>
        {`${isNoLabel ? '' : currentValue}`} {labelName}
      </div>
      <div className={`selectMaterial ${!isEditing ? 'hidden' : ''}`}>
        {
          currentValue &&
          <SelectMaterial
            autoWidth={true}
            value={currentValue}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
          >
            {selectList.map((item: any) => {
              return (
                <option value={item.value}>{isNoLabel ? ' ' : `${item.value} `}{item.label}</option>
              )
            })}
          </SelectMaterial>
        }
      </div>
    </SelectStyle>
  )
};
