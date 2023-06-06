import styled from "styled-components";
import { rem } from 'polished';
import { style } from '@/constants';

export const BorderSolidPanel = styled.div`
  padding: ${rem(14)} ${rem(18)} ${rem(10)};
  border: 1px solid #a8a8a8;
  
  &.minHeight-48 {
    min-height: ${rem(48)};
  }

  &.smallFont {
    padding: ${rem(2)} ${rem(10)};
    font-size: ${rem(13)};
  }
  
  &.productionOrder {
    height: ${rem(395)};
    overflow-y: scroll;
    
    &::-webkit-scrollbar{
      display: none;
    }
  }
`;

export const ScrollButton = styled.div`
  position: absolute;
  left: 50%;
  width: 0;
  height: 0;
  border-style: solid;
  border-right: ${rem(28)} solid transparent;
  border-left: ${rem(28)} solid transparent;
  border-top: ${rem(15)} solid rgba(82, 82, 82, 0.5);
  border-bottom: 0;
  cursor: pointer;
`;

const time = '0.5s';

export const ScrollButtonTop = styled(ScrollButton)`
  border-right: ${rem(28)} solid transparent;
  border-left: ${rem(28)} solid transparent;
  border-bottom: ${rem(15)} solid rgba(82, 82, 82, 0.5);
  border-top: 0;
  opacity: 0;

  &.appear {
    animation: fadeIn ease ${time};
    -webkit-animation: fadeIn ease ${time};
    -moz-animation: fadeIn ease ${time};
    -o-animation: fadeIn ease ${time};
    -ms-animation: fadeIn ease ${time};
    opacity: 1;

    @keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
    }
  }
`;

export const Title = styled.div`
  padding: ${rem(2)} ${rem(16)};
  background-color: ${style.content};
  top: -${rem(15)};
  left: ${rem(20)};
  z-index: 1;
`;
