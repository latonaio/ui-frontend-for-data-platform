import styled from 'styled-components';
import { rem } from 'polished';

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

export const SearchTextWrapper = styled.div`
`;

export const SelectMenuTab = styled.button`
  width: ${rem(140)};
  margin-left: ${rem(10)};
  padding: ${rem(2)} ${rem(10)};
  border-radius: ${rem(4)};
  background-color: #e5e5e5;
  border: ${rem(1)} solid #bebebe;
  font-family: 'UD';
  font-size: ${rem(18)};
  text-align: center;

  &.active {
    background-color: #fe8282;
    border-color: #ff5757
  }
`;
