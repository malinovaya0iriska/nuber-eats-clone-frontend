/* eslint-disable react/no-array-index-key */
import { FC } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from '__generatedTypes__/CreateAccountMutation';
import { Button } from 'components/Button';
import { FormError } from 'components/FormError';
import { UserRole } from 'graphql/generated/schema';
import nuberLogo from 'images/logo.svg';
import { BASE_URL } from 'routes/constants';

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: { role: UserRole.Client },
  });

  const onCompleted = (data: CreateAccountMutation): void => {
    const {
      createAccount: { ok },
    } = data;

    if (ok) {
      alert('Account Created! Log in now!');
      navigate(BASE_URL);
    }
  };

  const [createAccountMutation, { loading, data: createAccountMutationResult }] =
    useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        onCompleted,
      },
    );

  const onSubmit = (): void => {
    if (!loading) {
      const { email, password, role } = getValues();

      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  const listOfRoles = Object.keys(UserRole).map((role: string, index) => (
    <option key={index}>{role}</option>
  ));

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let&apos;s get started
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
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
            {...register('password', { required: 'Password is required', minLength: 5 })}
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

          <select {...register('role', { required: true })} className="input">
            {listOfRoles}
          </select>
          <Button isDisabled={!isValid} isLoading={loading} actionText="Create Account" />
          {createAccountMutationResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutationResult.createAccount.error} />
          )}
        </form>
        <div>
          Already have an account?
          <Link to={BASE_URL} className="text-lime-600 font-medium hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
