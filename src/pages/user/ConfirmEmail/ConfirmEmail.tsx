import { useEffect } from 'react';

import { gql, useApolloClient, useMutation } from '@apollo/client';

import { VerifyEmail, VerifyEmailVariables } from '__generatedTypes__/VerifyEmail';
import { useMe } from 'hooks';
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
  const { data: userData } = useMe();

  const client = useApolloClient();

  const onCompleted = (data: VerifyEmail): void => {
    const {
      verifyEmail: { ok },
    } = data;

    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
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
