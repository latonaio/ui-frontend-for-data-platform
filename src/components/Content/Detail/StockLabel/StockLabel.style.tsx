import styled from "styled-components";
import { rem } from 'polished';

export const StockLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

export const StockLabelTwoColumn = styled.div`
  width: 50%;
  margin-bottom: ${rem(10)};
  padding-left: ${rem(5)};
  
  &:first-child {
    padding-left: 0;
    padding-right: ${rem(5)};

    .right {
      right: ${rem(5)} !important;
    }

    .left {
      left: ${rem(0)} !important;
    }
  }

  &:last-child {
    .right {
      right: ${rem(0)} !important;
    }
    
    .left {
      left: ${rem(5)} !important;
    }
  }
`;

export const StockLabelThreeColumn = styled.div`
  width: 33%;
  margin-bottom: ${rem(10)};
  padding: 0 ${rem(5)};
  //padding-left: ${rem(5)};

  &:last-child {
    //padding-right: ${rem(5)};
  }
`;

export const StockLabelToday = styled.div`
  margin-left: ${rem(5)};
  .left {
    left: ${rem(0)} !important;
  }

  .right {
    right: ${rem(0)} !important;
  }
`;

export const StockLabelStorageLocation = styled.div`
  .location {
    font-size: ${rem(20)};
  }
  
  .smallTitle {
    font-size: ${rem(15)};
  }
  
  .time {
    font-size: ${rem(13)};
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
  //border: 3px dashed #000;
  border-radius: ${rem(10)};
`;

export const LabelPlane = styled.div`
  padding: ${rem(6)} ${rem(10)} ${rem(4)};
  text-align: center;
  background-color: ${props => props.color === 'yellow' ? labelColor.yellow : labelColor.skin};
  //border: 2px solid #000;
  border-radius: ${rem(6)};
  cursor: pointer;

  &.leftArrow {
    margin-left: ${rem(7)};
  }
  
  &.rightArrow {
    margin-right: ${rem(7)};
  }
`;

