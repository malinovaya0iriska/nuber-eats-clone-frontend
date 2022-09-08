import { Routes, Route } from 'react-router-dom';

import { Login, NotFound, SignUp } from 'pages';
import { ReturnComponentType } from 'types';

export const LoggedOutRouter = (): ReturnComponentType => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
