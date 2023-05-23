import styled from 'styled-components';
import { rem } from "polished";

export const ContentsTopWrapper = styled.div`
  width: 100%;
  margin: ${rem(20)} 0;
`;

export const Input = styled.input`
  border: 1px solid #111111;
  border-radius: 4px;
  height: ${rem(30)};
`;

export const Search = styled.i`
  margin-right: ${rem(15)};
  opacity: 0.8;
`;

export const IconWrapper = styled.i`
  img {
    width: ${rem(60)};
  }
`;
