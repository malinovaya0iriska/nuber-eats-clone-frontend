import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { LoginMutation, LoginMutationVariables } from '__generatedTypes__/LoginMutation';
import { authTokenVar, isLoggedInVar } from 'apollo';
import { Button } from 'components/Button';
import { FormError } from 'components/FormError';
import { LOCAL_STORAGE_TOKEN } from 'constants/index';
import nuberLogo from 'images/logo.svg';
import { ILoginForm } from 'pages/Login/interfaces';
import { SIGN_UP } from 'routes/constants';
import { ReturnComponentType } from 'types';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = (): ReturnComponentType => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: 'onBlur' });

  const onCompleted = (data: LoginMutation): void => {
    const {
      login: { ok, token },
    } = data;

    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = (): void => {
    if (!loading) {
      const { email, password } = getValues();

      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats </title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="Uber Eats" />
        <h4 className="w-full font-medium text-left text-xl lg:text-3xl mb-5">
          Welcome back
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-3">
          <input
            {...register('email', {
              required: 'Email is required',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            className="input"
          />

          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}

          {errors.email?.type === 'pattern' && (
            <FormError errorMessage="Please enter a valid email" />
          )}

          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 5,
            })}
            type="password"
            placeholder="Password"
            className="input"
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 5 chars." />
          )}

          <Button actionText="Log In" isDisabled={!isValid} isLoading={loading} />

          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>

        <div>
          New to Nuber?
          <Link to={SIGN_UP} className="text-lime-600 font-medium hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
