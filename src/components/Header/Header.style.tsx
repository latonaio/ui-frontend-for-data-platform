import styled from 'styled-components';
import { rem } from "polished";
import { style } from "@/constants";

export const HeaderWrapper = styled.header`
`;

export const HeaderContent = styled.div`
  display: flex;
  //justify-content: space-between;
  justify-content: flex-end;
  align-items: center;
  padding: ${rem(24)};
  background-color: ${style.theme.lightBlue400};
`;

export const HeaderIcon = styled.div`
  img {
    width: ${rem(100)};
    height: ${rem(100)};
  }
`;
