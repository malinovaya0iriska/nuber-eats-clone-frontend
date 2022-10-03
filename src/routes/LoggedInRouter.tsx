import { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { SearchRestaurants } from 'components';
import { Header } from 'components/Header';
import { useMe } from 'hooks';
import { ConfirmEmail, Restaurants, EditProfile, Category, Restaurant } from 'pages';
import {
  BASE_URL,
  CATEGORY,
  CONFIRM_EMAIL,
  EDIT_PROFILE,
  NON_MATCH_URL,
  RESTAURANTS,
  SEARCH_ITEM,
} from 'routes/constants';

const ClientRoutes = [
  <Route key={1} path={BASE_URL} element={<Restaurants />} />,
  <Route key={2} path={CONFIRM_EMAIL} element={<ConfirmEmail />} />,
  <Route key={3} path={EDIT_PROFILE} element={<EditProfile />} />,
  <Route key={4} path={SEARCH_ITEM} element={<SearchRestaurants />} />,
  <Route key={5} path={`${CATEGORY}/:slug`} element={<Category />} />,
  <Route key={6} path={`${RESTAURANTS}/:id`} element={<Restaurant />} />,
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
