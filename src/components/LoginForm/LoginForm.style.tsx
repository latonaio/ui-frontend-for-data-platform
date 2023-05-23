import styled from 'styled-components';
import { rem } from "polished";
import { style } from '@/constants';

const borderColor = '#d9d9d9';

export const LoginForm = styled.div`
  width: ${rem(450)};
  margin: auto;
`;

export const LoginFormBorder = styled.div`
  padding: ${rem(40)} ${rem(40)} ${rem(20)};
  border: 1px solid ${borderColor};
`;

export const Tittle = styled.div`
  padding-left: ${rem(8)};
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${borderColor};
  padding: ${rem(5)};
  color: #adadad;
  
  &.error {
    background: #ffbfbf;
  }
`;

export const Link = styled.a`
  color: ${style.loginLink};
`;

export const LinkForgotPassword = styled(Link)`
  display: block;
  width: 100%;
  padding: ${rem(15)};
`;

export const LinkBottom = styled(Link)`
  display: block;
  width: 100%;
  padding: ${rem(7)};
`;

export const ErrorMessage = styled.div`
  font-size: ${rem(12)};
  line-height: ${rem(24)};
  height: ${rem(24)};
  color: #de1212;
`;
