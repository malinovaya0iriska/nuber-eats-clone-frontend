import { useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';

import { VerifyEmail, VerifyEmailVariables } from '__generatedTypes__/VerifyEmail';
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
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    VerifyEmail,
    VerifyEmailVariables
  >(VERIFY_EMAIL_MUTATION);

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

  if (verifyingEmail) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don&apos;t close this page...
      </h4>
    </div>
  );
};
