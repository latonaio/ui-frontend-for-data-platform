import styled from 'styled-components';

export const SelectStyle = styled.div`
  display: inline-block;
  
  &.isBlock {
    display: block;
    
    .MuiSelect-nativeInput {
      position: relative;
    }
    
    .MuiSelect-selectMenu {
      white-space: normal;
    }
  }
`;
