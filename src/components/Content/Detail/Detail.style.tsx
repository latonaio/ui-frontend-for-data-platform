import styled from 'styled-components';
import { rem } from 'polished';
import { style } from '@/constants';

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  width: calc(100% - ${rem(30 * 2)});
  margin: auto ${rem(30)};
  padding: ${rem(30)} ${rem(23)};
  border: 4px solid #111111;
  border-radius: 40px;
  background-color: ${style.content};
  box-sizing: border-box;
  font-family: 'UD';
  
  .Column1 {
    width: 40%;
    box-sizing: border-box;
  }

  .Column2 {
    width: 60%;
    padding-left: ${rem(23)};
    box-sizing: border-box;
  }
`;

export const Column = styled.div`
`;

export const OrderInfo = styled.div`
`;

export const ProductCode = styled.div`
  padding-left: ${rem(10)};
`;

export const ProductDetail = styled.div`
`;

export const ProductDetailTop = styled.div`
  .barcodeWrapper {
    width: 22%;
  }
  
  .leftColumn {
    width: 40%;
  }
`;

export const ProductDetailInternalCapacityListTable = styled.ul`
  padding: ${rem(10)};
  font-size: ${rem(18)};
  
  li {
    margin-bottom: ${rem(10)};
  }
`;

export const ProductDetailBottom = styled.div`
`;

export const ItemStructureTable = styled.table`
  width: 100%;
  
  td {
    text-align: center;
  }
  
  .head {
    td {
      font-size: ${rem(14)};
      
      &:first-child {
        width: 30%;
      }
    }
  }
  
  .record {
    border-bottom: ${rem(1)} dashed #000;

    &:last-child {
      border-bottom: none;
    }
    
    td {
      padding: ${rem(10)} 0;
      font-size: ${rem(13)};
      vertical-align: middle;
      
      &:first-child {
        text-align: left;
      }
    }
  }
  
  &.configurationItem {}
  
  &.productionOrder {
    .head {
      td:last-child {
        width: ${rem(55)};
      }
    }
  }
`;

export const BarcodeWrapper = styled.div`
  margin-bottom: ${rem(10)};
  padding: ${rem(3)} ${rem(0)} ${rem(3)};
  background-color: #ffffff;
`;

export const BarcodeNumber = styled.div`
  font-size: ${rem(14)};
  letter-spacing: ${rem(2.4)};
`;

export const Barcode = styled.div`
  background-color: #fff;
  
  img {
    width: ${rem(130)};
  }
`;

export const Tag = styled.li`
  padding-right: ${rem(14)};
  float: left;
`;

export const Allergen = styled.ul`
  margin-left: ${rem(140)};
  font-weight: bold;
  
  li {
    width: ${rem(60)};
    
    &:last-child {
      .definition, .mark  {
        border-right: 2px solid #000;
      }
    }
  }
  
  div {
    height: ${rem(30)};
  }
  
  .definition {
    padding: ${rem(3)} 0 ${rem(2)};
    background-color: #a9d18e;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
    text-align: center;
  }
  
  .mark {
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
    text-align: center;
  }
`;

export const Calendar = styled.i`
  position: absolute;
  top: ${rem(10)};
  right: ${rem(10)};
`;

export const ImgLeaf = styled.div`
  width: ${rem(40)};
  position: absolute;
  top: ${rem(10)};
  right: ${rem(50)};
  cursor: pointer;
`;

export const LocationWrapper = styled.div`
`;

export const Location = styled.div`
  width: ${rem(160)};
  height: ${rem(55)};
  padding: ${rem(3)} ${rem(20)} ${rem(3)};
  position: relative;
  border: 1px solid #111111;
  border-radius: ${rem(10)};
  text-align: center;
  
  i {
    position: absolute;
    top: ${rem(10)};
    left: ${rem(-17)};
    background-color: #e4efdb;
  }
`;

export const QuantityInfo = styled.div`
  .panel {
    margin-bottom: ${rem(4)};
    padding: ${rem(0)} ${rem(10)};
    font-size: ${rem(13)};
    background: #c4d2d5;
  }
  
  &.smallFont {
    .panel {
      font-size: ${rem(11)};
    }
  }
`;
