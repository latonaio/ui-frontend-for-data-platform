import styled from 'styled-components';
import { rem } from 'polished';

export const Label = styled.div`
  font-size: ${rem(12)};
  border-radius: ${rem(2)};
  padding: ${rem(2)} ${rem(10)};
  min-width: ${rem(150)};
  border: 1px dashed #4b4b4b;

  &.yellow {
    background-color: #e8e3a9;
  }

  &.blue {
    background-color: #C0CFD4;
  }

  &.red {
    background-color: #E1D3BC;
  }
  
  &.border-disable {
    border: 0;
  }
`;

export const ProductImageLabel = styled.div`
  color: #fff;
  font-weight: bold;
  border: ${rem(4)} solid #000;
  background-color: #9dc3e6;
  border-radius: ${rem(2)};
  text-align: center;
  font-size: ${rem(36)};
  
  &.small {
    font-size: ${rem(28)};
  }

  &.blue {
    background-color: #4472C4;
  }
  
  &.brown {
    background-color: #BF9000;
  }
`;


