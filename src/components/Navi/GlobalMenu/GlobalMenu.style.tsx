import styled from 'styled-components';
import { rem } from 'polished';

export const GlobalMenu = styled.div`
ul {
display: flex;
flex-wrap: wrap;
max-width: 1000px;
margin: 0 auto;
padding-top: 60px;
  li {
    width: 33.33%;
    font-size: ${rem(16)};
    color: #5b5b5b;
    margin-bottom: ${rem(60)};
    .titleImg {
      height: 210px;
    }
    img {
      max-width: 60%;
      width: 100%;
      margin: 0 auto;
    }
    .title {
      margin-top: ${rem(40)};
      font-size: ${rem(30)};
    }
  }

  &.home {
    margin-top: ${rem(30)};
  }

  .listLink {
    text-align: center;
    &:hover {
      background-color: #efefef;
    }
  }
}
`
;
