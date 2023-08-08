import styled from 'styled-components';
import { rem } from 'polished';

export const Button = styled.button`
  padding: ${rem(10)} ${rem(16)};
  background-color: #253962;
  border-radius: ${rem(4)};
  
  &.whiteInfo {
    border: 1px solid #000;
    background-color: #fff;
    font-weight: normal !important;
    color: #000 !important;
  }
`;

export const GreenButton = styled.button`
  display: inline-block;
  min-width: ${rem(90)};
  margin-top: ${rem(3)};
  border-radius: ${rem(6)};
  padding: ${rem(4)} ${rem(6)};
  background-color: #A7D08C;
  color: #fff;
  font-size: ${rem(13)};
  
  &.deep {
    background-color: #538135;
  }

  &.size-relative {
    min-width: ${rem(32)};
  }
`;

export const BlueButton = styled(GreenButton)`
  background-color: #8ca7d0;

  &.deep {
    background-color: #526c94;
  }
`;

export const WhiteButton = styled.button`
  background-color: #fff;
  border: 2px solid #000;
  padding: ${rem(0)} ${rem(16)};
  border-radius: ${rem(6)};
`;
