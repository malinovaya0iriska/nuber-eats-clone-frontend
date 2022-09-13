import { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from 'components/Header';
import { useMe } from 'hooks';
import { ConfirmEmail, Restaurants } from 'pages';
import { BASE_URL, CONFIRM_EMAIL, NON_MATCH_URL } from 'routes/constants';

const ClientRoutes = [
  <Route key={1} path={BASE_URL} element={<Restaurants />} />,
  <Route key={2} path={CONFIRM_EMAIL} element={<ConfirmEmail />} />,
];

export const LoggedInRouter: FC = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <Header />

      <Routes>
        {data.me.role === 'Client' && ClientRoutes}
        <Route
          key={NON_MATCH_URL}
          path={NON_MATCH_URL}
          element={<Navigate to={BASE_URL} />}
        />
      </Routes>
    </div>
  );
};
