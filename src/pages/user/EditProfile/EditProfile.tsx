// import { gql } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from '__generatedTypes__/EditProfileMutation';
import { Button } from 'components/Button';
import { useMe } from 'hooks';
import { ReturnComponentType } from 'types';

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = (): ReturnComponentType => {
  const { data: userData, refetch } = useMe();

  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onCompleted = async (data: EditProfileMutation): Promise<void> => {
    const {
      editProfile: { ok },
    } = data;

    if (ok && userData) {
      await refetch();
    }
  };

  const [editProfile, { loading }] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const onSubmit = (): void => {
    const { email, password } = getValues();

    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }),
        },
      },
    });
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register('email', {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register('password')}
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          isLoading={loading}
          isDisabled={!formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
