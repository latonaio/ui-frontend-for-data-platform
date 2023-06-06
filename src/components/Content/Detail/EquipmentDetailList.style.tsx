import { rem } from 'polished';
import styled from 'styled-components';

export const EquipmentDetail = styled.div`
`;

export const EquipmentDetailHeader = styled.div`
`;

export const EquipmentDetailHeaderWrapper = styled.div`
`;

export const EquipmentDetailHeaderImage = styled.div`
  //margin-left: ${rem(30)};
`;

export const EquipmentDetailHeaderInfo = styled.div`
  margin-left: ${rem(30)};

  &:first-child {
    margin-left: ${rem(20)};
  }
`;

export const EquipmentDetailHeaderInfoTop = styled.div`
  margin-bottom: ${rem(13)};
`;

export const EquipmentDetailHeaderInfoBottom = styled.div`
`;

export const EquipmentDetailContent = styled.ul`
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

export const EquipmentDetailContentList = styled.ul`
  display: flex;
  justfy-content: space-between;
  flex-wrap: wrap;
`;

export const EquipmentDetailContentListLi = styled.li`
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





export const EquipmentDetailitem = styled.div`
`;

export const EquipmentDetailitemHeader = styled.div`
`;

export const EquipmentDetailitemHeaderWrapper = styled.div`
`;

export const EquipmentDetailitemHeaderImage = styled.div`
  //margin-left: ${rem(30)};
`;

export const EquipmentDetailitemHeaderInfo = styled.div`
  margin-left: ${rem(30)};

  &:first-child {
    margin-left: ${rem(20)};
  }
`;

export const EquipmentDetailitemHeaderInfoTop = styled.div`
  margin-bottom: ${rem(13)};
`;

export const EquipmentDetailitemHeaderInfoBottom = styled.div`
`;

export const EquipmentDetailitemContent = styled.ul`
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

export const EquipmentDetailitemContentList = styled.ul`
  display: flex;
  justfy-content: space-between;
  flex-wrap: wrap;
`;

export const EquipmentDetailitemContentListLi = styled.li`
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


export const EquipmentInfo  = styled.div

export const DetailLabel  = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
 div{
  width: 32%;
 }
`;

export const DetailContent  = styled.div`
display: flex;
justify-content: space-between;
`;