import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { BorderSolidPanel as BorderSolidPanelElement } from './BorderSolidPanel.style';
import {
  Title
} from './BorderSolidPanel.style';

interface BorderSolidPanelProps {
  title: string;
  children?: ReactNode,
  className?: string;
}

export const BorderSolidPanel = ({ title, children, className }: BorderSolidPanelProps) => {
  return (
    <BorderSolidPanelElement className={clsx(
      'mb-2 relative',
      className
    )}>
      <Title className={'font-bold absolute'}>{title}</Title>
      <div className={'font-bold'}>
        {children}
      </div>
    </BorderSolidPanelElement>
  );
};
