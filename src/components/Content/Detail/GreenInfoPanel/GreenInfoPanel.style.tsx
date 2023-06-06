import styled from 'styled-components';
import { rem } from 'polished';

export const GreenInfoPanel = styled.div`
  padding: ${rem(10)};
  color: #fff;
  background-color: #b1cf95;
  
  &.deliveryDocumentDetail {
    position: relative;
    min-height: ${rem(100)};
    
    &.deliveryDocumentDetail-icon {
      min-height: ${rem(150)};
    }
    
    .imgBox {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      right: 0;
      opacity: 0.8;
    }
    
    .iconWrapper {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      top: ${rem(10)};
      right: ${rem(10)};
    }
    
    .icon {
      cursor: pointer;
    }
  }
  
  .icon {
    position: absolute;
    bottom: ${rem(10)};
    right: ${rem(6)};
  }
`;
