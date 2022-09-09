import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { LoginMutation, LoginMutationVariables } from '__generatedTypes__/LoginMutation';
import { FormError } from 'components/FormError';
import { ILoginForm } from 'pages/Login/interfaces';
import { ReturnComponentType } from 'types';

const LOGIN_MUTATION = gql`
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
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const onCompleted = (data: LoginMutation): void => {
    const {
      login: { ok, token },
    } = data;

    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
    onError: () => null,
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
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            className="input"
          />

          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}

          <input
            {...register('password', { required: 'Password is required', minLength: 3 })}
            type="password"
            placeholder="Password"
            className="input"
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}

          <button type="submit" className="mt-3 btn">
            Log In
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
