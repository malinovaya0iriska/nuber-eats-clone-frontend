import { useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { VerifyEmail, VerifyEmailVariables } from '__generatedTypes__/VerifyEmail';
import { useMe } from 'hooks';
import { BASE_URL } from 'routes/constants';
import { ReturnComponentType } from 'types';

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = (): ReturnComponentType => {
  const navigate = useNavigate();

  const { data: userData, refetch } = useMe();

  const onCompleted = async (data: VerifyEmail): Promise<void> => {
    const {
      verifyEmail: { ok },
    } = data;

    if (ok && userData?.me.id) {
      await refetch();
      navigate(BASE_URL);
    }
  };
  const [verifyEmail] = useMutation<VerifyEmail, VerifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    },
  );

  useEffect(() => {
    const [, code] = window.location.href.split('code=');

    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don&apos;t close this page...
      </h4>
    </div>
  );
};
