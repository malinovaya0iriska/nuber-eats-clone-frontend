import { Routes, Route } from 'react-router-dom';

import { Login, NotFound, SignUp } from 'pages';
import { BASE_URL, SIGN_UP } from 'routes/constants';
import { ReturnComponentType } from 'types';

export const LoggedOutRouter = (): ReturnComponentType => {
  return (
    <Routes>
      <Route path={BASE_URL} element={<Login />} />
      <Route path={SIGN_UP} element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
