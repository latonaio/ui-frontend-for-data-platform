import styled from "styled-components";
import { rem } from "polished";

export const StockLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

export const StockLabelColumn = styled.div`
  width: 50%;
  padding-left: ${rem(5)};
  
  &:first-child {
    padding-left: 0;
    padding-right: ${rem(5)};
  }
`;

const labelColor = {
  yellow: '#f4e190',
  skin: '#f0d8bd',
};

export const Label = styled.div`
  padding: ${rem(6)} 0 ${rem(4)};
  text-align: center;
  background-color: ${props => props.color === 'yellow' ? labelColor.yellow : labelColor.skin};
  border: 3px dashed #000;
  border-radius: ${rem(10)};
`;
