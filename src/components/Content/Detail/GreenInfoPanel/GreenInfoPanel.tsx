import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { GreenInfoPanel as Root } from './GreenInfoPanel.style';

interface GreenInfoPanelProps {
  className?: string;
  children: ReactNode,
}

export const GreenInfoPanel = ({ children, className }: GreenInfoPanelProps) => {
  return (
    <Root className={clsx(
      '',
      className
    )}>
      {children}
    </Root>
  )
}
