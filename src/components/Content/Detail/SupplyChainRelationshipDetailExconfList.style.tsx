import { rem } from 'polished';
import styled from 'styled-components';

export const ExConfs = styled.div`
`;

export const ExConfsHeader = styled.div`
`;

export const ExConfsHeaderWrapper = styled.div`
`;

export const ExConfsHeaderImage = styled.div`
  //margin-left: ${rem(30)};
`;

export const ExConfsHeaderInfo = styled.div`
  margin-left: ${rem(30)};
  
  &:first-child {
    margin-left: ${rem(20)};
  }
`;

export const ExConfsHeaderInfoTop = styled.div`
  margin-bottom: ${rem(13)};
`;

export const ExConfsHeaderInfoBottom = styled.div`
`;

export const ExConfsContent = styled.ul`
  li {
    width: 30%;
    margin: 0.5em;

    button {
      &[value=false] {
        background-color: #a6a6a6;
      }
    }

    
  }
`;

export const ExConfsContentList = styled.ul`
  display: flex;
  justfy-content: space-between;
  flex-wrap: wrap;
`;

export const ExConfsContentListLi = styled.li`
  display: block;
  width: 100%;
  border: 10px solid #000;
  border-radius: 5px;
  padding: 10px 0;
  box-sizing: border-box;
  color: #fff;
  font-size: 38px;
  text-align: center;
  letter-spacing: 0.05em;

  &.blue {
    background-color: #9dc3e6;
  }

  &.green {
    background-color: #a9d18e;
  }

  &.disable {
    background-color: #b7b7b7;
  }
`;
