import styled from 'styled-components';
import { rem } from 'polished';

export const Popup = styled.div`
`;

export const PopupTranslucentStyle = styled.div`
  width: 80%;
  padding: ${rem(20)};
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: ${rem(10)};
  left: ${rem(40)};
  
  .content {
    li {
      margin-bottom: ${rem(3)};
    }
  }
  
  .leftColumn,
  .rightColumn {
    width: 50%;
  }
  
  .title {
    margin-bottom: ${rem(10)};
    padding-left: ${rem(10)};
    
    i {
      font-size: ${rem(36)};
    }
    
    span {
      padding-left: ${rem(20)};
      line-height: ${rem(36)};
    }
  }
  
  .listTitle {
    font-size: ${rem(14)};
    line-height: ${rem(20)};
  }
  
  .listContent {
    font-family: 'AgencyB', serif;
    padding-left: ${rem(10)};
    font-size: ${rem(20)};
    line-height: ${rem(20)};
  }
  
  &.compositionTable {
    width: ${rem(450)};
    padding: 0;
    border: 1px solid #000;
    top: ${rem(250)};
    right: ${rem(0)};
    
    li {
      .name,
      .value {
        width: 50%;
        box-sizing: content-box;
        padding: ${rem(10)};
        border-bottom: 1px solid #000;
      }
      
      .value {
        border-left: 1px solid #000;
      }

      &:last-child {
        .name,
        .value {
          border-bottom: none;  
        }
      }
    }

    .closeButton {
      color: #333333;
      top: ${rem(-37)};
      right: ${rem(-30)};
    }
  }
`;

export const PopupTranslucentStyleTitle = styled.div`
  margin-bottom: ${rem(20)};
  text-align: center;
  font-size: ${rem(24)};
`;

export const PopupTranslucentStyleCloseButton = styled.div`
  font-size: ${rem(28)};
  cursor: pointer;
  position: absolute;
  top: ${rem(10)};
  right: ${rem(10)};
`;
