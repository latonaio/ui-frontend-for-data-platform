import styled from 'styled-components';
import { rem } from 'polished';

export const Checkbox = styled.div`
  box-sizing: border-box;
  width: ${rem(30)};
  height: ${rem(30)};
  margin: auto;
  border: ${rem(2)} solid #989898;
  border-radius: ${rem(4)};
  
  i {
    font-size: ${rem(26)};
    margin-top: -${rem(13)};
    margin-left: -${rem(13)};
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;
