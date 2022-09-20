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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
