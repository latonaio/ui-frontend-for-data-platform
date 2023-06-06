import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/slices/auth';
import {
  LoginForm as Root,
  LoginFormBorder,
  Tittle,
  Input,
  LinkForgotPassword,
  LinkBottom,
  ErrorMessage,
} from './LoginForm.style';
import { setCookie, removeLocalStorage, removeCookie } from '@/helpers/common';
import { Button } from './Button/Button';
import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  AuthedUser,
  form,
  message,
} from '@/constants';
import { postAuthenticate } from '@/api/authenticator';
import { CacheDatabase } from '@/services/cacheDatabase';
import { getLocalStorage } from '@/helpers/common';
import { clearState } from '@/store/slices/orders/detail';
import * as paginationState from '@/store/slices/orders/pagination';

interface LoginFormProps {
  className?: string;
}

type FormState = {
  emailAddress: string
  password: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    emailAddress: Yup
      .string()
      .email(message.emailAddress.correct)
      .required(message.emailAddress.required),
    password: Yup
      .string()
      .required(message.password.required)
      .min(
        form.password.minPasswordLength,
        message.password.min,
      )
      .max(
        form.password.maxPasswordLength,
        message.password.max,
      )
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm<FormState>(formOptions);
  const { errors } = formState;

  const onSubmit = async (params: FormState) => {
    const result = await postAuthenticate({
      emailAddress: params.emailAddress,
      password: params.password,
    });

    try {
      const localStorageData = getLocalStorage('auth');
      const { emailAddress }: AuthedUser = localStorageData ? localStorageData : {};

      if (emailAddress !== result.user.emailAddress) {
        await new CacheDatabase().cacheAllClear();
        dispatch(clearState());
        dispatch(paginationState.paginationSlice.actions.clearState());
      }

      setCookie('accessToken', result.accessToken);

      dispatch(setAuth({
        emailAddress: result.user.emailAddress,
        businessPartner: result.user.businessPartner,
        businessPartnerName: result.user.businessPartnerName,
        businessUserFirstName: result.user.businessUserFirstName,
        businessUserLastName: result.user.businessUserLastName,
        businessUserFullName: result.user.businessUserFullName,
        language: result.user.language,
      }));
    } catch (e) {
      removeCookie('accessToken');
      removeLocalStorage('auth');
    }

    window.location.href = '/';
  };

  return (
    <Root className={clsx(
      className
    )}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <LoginFormBorder className={`mb-4`}>
          <div className={`mb-4`}>
            <Tittle className={'font-bold text-base'}>メールアドレス</Tittle>
            <Input
              className={`text-lg ${!!errors.emailAddress ? 'error': ''}`}
              type="emailAddress"
              {...register('emailAddress')}
            />
            <ErrorMessage className={'error'}>{errors.emailAddress?.message}</ErrorMessage>
          </div>
          <div className={`mb-6`}>
            <Tittle className={'font-bold text-base'}>パスワード</Tittle>
            <Input
              className={`text-lg ${!!errors.password ? 'error': ''}`}
              type="password"
              {...register('password')}
            />
            <ErrorMessage className={'error'}>{errors.password?.message}</ErrorMessage>
          </div>
          <div className={'mb-6'}>
            <Button></Button>
          </div>
          <LinkForgotPassword
            href={'#'}
            className={`w-full text-center text-base`}
          >パスワードを忘れた方はこちら</LinkForgotPassword>
        </LoginFormBorder>
        <div className={'text-center'}>
          <LinkBottom
            className={'text-sm'}
            href={'#'}
          >新しく企業アカウントを作成する</LinkBottom>
        </div>
        <div className={'text-center'}>
          <LinkBottom
            className={'text-sm'}
            href={'#'}
          >確認メールを再送する</LinkBottom>
        </div>
      </form>
    </Root>
  )
}
