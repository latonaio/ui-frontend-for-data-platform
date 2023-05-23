import styled from "styled-components";
import { rem } from "polished";
import { style } from '@/constants';

export const BorderSolidPanel = styled.div`
  padding: ${rem(14)} ${rem(18)} ${rem(10)};
  border: 1px solid #a8a8a8;
`;

export const Title = styled.div`
  padding: ${rem(2)} ${rem(16)};
  background-color: ${style.content};
  top: -${rem(15)};
  left: ${rem(20)};
`;
