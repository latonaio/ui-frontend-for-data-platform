import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  BorderSolidPanel as BorderSolidPanelElement,
  Title,
  ScrollButton,
  ScrollButtonTop,
} from './BorderSolidPanel.style';

interface BorderSolidPanelProps {
  title?: string;
  children?: ReactNode,
  className?: string;
  isSideBySide?: boolean;
  isScrollButton?: boolean;
}

export const BorderSolidPanel = ({
                                   title,
                                   children,
                                   className,
                                   isSideBySide = true,
                                   isScrollButton = false,
}: BorderSolidPanelProps) => {
  const [
    isScrollButtonVisible,
    setIsScrollButtonVisible
  ] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const borderSolidPanelElementRef = useRef<HTMLDivElement>(null);
  const handleScrollButtonClick = (type: string) => {
    if (borderSolidPanelElementRef.current) {
      borderSolidPanelElementRef.current.scrollTo({
        top: type === 'bottom' ? borderSolidPanelElementRef.current.scrollHeight : 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!borderSolidPanelElementRef.current) return;
      const position = borderSolidPanelElementRef.current.scrollTop;
      setScrollPosition(position);
    };

    borderSolidPanelElementRef?.current?.addEventListener('scroll', handleScroll);
    return () => borderSolidPanelElementRef?.current?.removeEventListener('scroll', handleScroll);
    }, []);

  const borderSolidPanelElement = () => {
    const template = () => {
      return (
        <>
          {title && isScrollButton && <Title className={'font-bold absolute'}>{title}</Title>}
          <BorderSolidPanelElement className={clsx(
            'mb-2 relative',
            className
          )}
                                   ref={borderSolidPanelElementRef}
          >
            {
              isScrollButton && (
                <ScrollButtonTop
                  className={`top ${scrollPosition !== 0 ? 'appear' : ''}`}
                  onClick={() => handleScrollButtonClick('top')}
                />
              )
            }
            {title && !isScrollButton && <Title className={'font-bold absolute'}>{title}</Title>}
            <div className={'font-bold'}>
              {children}
            </div>
          </BorderSolidPanelElement>
          {
            isScrollButton && (
              <ScrollButton
                onClick={() => handleScrollButtonClick('bottom')}
              />
            )
          }
        </>
      )
    }

    return (
      <>{isScrollButton ? <div>{template()}</div> : <>{template()}</>}</>
    )
  }

  return (
    <>
      {isSideBySide && <>{borderSolidPanelElement()}</>}
      {!isSideBySide && <div className={'relative'}>{borderSolidPanelElement()}</div>}
    </>
  );
};
