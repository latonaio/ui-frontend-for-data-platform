import styled from 'styled-components';
import { rem } from "polished";
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

export const OrderNumber = styled(OrderInfo)`
  padding: ${rem(10)};
  color: #fff;
  background-color: #b1cf95;
`;

export const ProductCode = styled.div`
  padding-left: ${rem(10)};
`;

export const ProductDetail = styled.div`
`;

export const ProductDetailTop = styled.div`
  .leftColumn {
    width: 40%;
  }
`;

export const ProductDetailBottom = styled.div`
`;

export const JanCode = styled.div`
  background-color: #fff;
  
  img {
    width: ${rem(220)};
  }
`;

export const Tag = styled.li`
  padding-right: ${rem(14)};
  float: left;
`;

export const Allergen = styled.ul`
  margin-left: ${rem(30)};
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

