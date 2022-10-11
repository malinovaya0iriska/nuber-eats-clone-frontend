import { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { SearchRestaurants } from 'components';
import { Header } from 'components/Header';
import { useMe } from 'hooks';
import {
  ConfirmEmail,
  Restaurants,
  EditProfile,
  Category,
  Restaurant,
  MyRestaurants,
  AddRestaurant,
  MyRestaurant,
  AddDish,
} from 'pages';
import { Paths } from 'routes/constants';

const commonRoutes = [
  { path: Paths.ConfirmEmail, component: <ConfirmEmail /> },
  { path: Paths.EditProfile, component: <EditProfile /> },
];

const restaurantRoutes = [
  { path: Paths.BaseUrl, component: <MyRestaurants /> },
  { path: `${Paths.Restaurants}/:id`, component: <MyRestaurant /> },
  { path: Paths.AddRestaurant, component: <AddRestaurant /> },
  { path: `${Paths.Restaurants}/:id${Paths.AddDish}`, component: <AddDish /> },
];

const clientRoutes = [
  {
    path: Paths.BaseUrl,
    component: <Restaurants />,
  },
  {
    path: Paths.SearchItem,
    component: <SearchRestaurants />,
  },
  {
    path: `${Paths.Category}/:slug`,
    component: <Category />,
  },
  {
    path: `${Paths.Restaurants}/:id`,
    component: <Restaurant />,
  },
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
        {commonRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}

        {data.me.role === 'Client' &&
          clientRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}

        {data.me.role === 'Owner' &&
          restaurantRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}

        <Route
          key={Paths.NonMatchUrl}
          path={Paths.NonMatchUrl}
          element={<Navigate to={Paths.BaseUrl} />}
        />
      </Routes>
    </div>
  );
};
