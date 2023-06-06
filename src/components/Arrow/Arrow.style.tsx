import styled from 'styled-components';
import { rem } from 'polished';

export const Arrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-top: ${rem(10)} solid transparent;
  border-bottom: ${rem(10)} solid transparent;
  cursor: pointer;
  
  &.right,
  &.left {
    margin-top: -${rem(10)};
    position: absolute;
    top: 50%;
  }
  
  &.right {
    border-left: ${rem(5)} solid #BBBBBBFF;
    border-right: 0;
    right: ${rem(5)};
  }

  &.left {
    border-right: ${rem(5)} solid #BBBBBBFF;
    border-left: 0;
    left: ${rem(5)};
  }
  
  &.stockLabelStorageLocation {
    &.right {
      right: ${rem(0)} !important;
    }
  }
  
  &.detailArrow {
    margin-top: -${rem(15)};
    border-top: ${rem(30)} solid transparent;
    border-bottom: ${rem(30)} solid transparent;
    
    &.right {
      border-left: ${rem(20)} solid #BBBBBBFF;
      right: -${rem(35)} !important;
    }

    &.left {
      border-right: ${rem(20)} solid #BBBBBBFF;
      left: -${rem(35)} !important;
    }
  }
`;
