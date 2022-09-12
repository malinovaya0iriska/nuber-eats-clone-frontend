import { FC } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MeQuery } from '__generatedTypes__/MeQuery';
import { Restaurants } from 'pages';
import { BASE_URL, NON_MATCH_URL } from 'routes/constants';

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

const ClientRoutes = [<Route key={BASE_URL} path={BASE_URL} element={<Restaurants />} />];

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
    <Routes>
      {data.me.role === 'Client' && ClientRoutes}
      <Route
        key={NON_MATCH_URL}
        path={NON_MATCH_URL}
        element={<Navigate to={BASE_URL} />}
      />
    </Routes>
  );
};
