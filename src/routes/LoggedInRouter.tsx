import { FC } from 'react';

import { gql, useQuery } from '@apollo/client';

import { MeQuery } from '__generatedTypes__/MeQuery';

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter: FC = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>{data.me.email}</h1>
    </div>
  );
};
