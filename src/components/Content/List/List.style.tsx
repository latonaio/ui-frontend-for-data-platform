import styled from 'styled-components';
import { style } from "@/constants";
import { rem } from 'polished';

export const List = styled.div`
`;

export const HeadTab = styled.ul`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  
  li {
    width: calc(50% - 4px);
    border-bottom: 2px solid ${style.theme.lightBlue400};
    border-top: 2px solid ${style.theme.lightBlue400};
    border-left: 2px solid ${style.theme.lightBlue400};
    padding: ${rem(8)} ${rem(8)};
    box-sizing: border-box;
    cursor: pointer;
    
    &:last-child {
      border-right: 2px solid ${style.theme.lightBlue400};
    }
    
    &.active {
      color: #ffffff;
      background-color: ${style.theme.lightBlue400};
    }
  }
`;

export const DetailList = styled.div`
`;

export const DetailListTable = styled.table`
  width: 100%;
  table-layout: fixed;

  td {
    vertical-align: middle;

    &:last-child {
      width: ${rem(100)};
    }
  }

  .head {
    td {
      font-weight: bold;
      padding: ${rem(20)};
      text-align: center;
      color: #ffffff;
      background-color: ${style.theme.lightBlue400};
    }
  }
  
  tbody {
    tr {
      &:last-child {
        border-bottom: 2px solid #e0e0e0;
      }
    }
  }

  .record {
    cursor: pointer;
    border-top: 2px solid #e0e0e0;

    &:hover {
      background-color: #e2f0d9;
    }

    td {
      padding: ${rem(10)};
      color: #989898;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }
`;

export const IcnOutside = styled.button`
  img {
    width: ${rem(32)};
  }
`;

export const IcnInvoice = styled.button`
  padding-top: ${rem(3)};
  padding-left: ${rem(10)};
  
  
  img {
    width: ${rem(30)};
  }
`;
