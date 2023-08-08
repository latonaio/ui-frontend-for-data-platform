import styled from 'styled-components';
import { rem } from 'polished';

export const GlobalMenu = styled.div`
  li {
    font-size: ${rem(16)};
    color: #5b5b5b;

    img {
      width: ${rem(40)};
    }

    .title {
      padding-left: ${rem(8)};
    }
  }

  &.home {
    margin-top: ${rem(30)};
    border-top: 1px solid #d7d7d7;
  }

  .listLink {
    padding: ${rem(16)} ${rem(14)};
    border-bottom: 1px solid #d7d7d7;

    &:hover {
      background-color: #efefef;
    }
  }

  .titleIcon {
    font-size: ${rem(6)};
  }
`;
