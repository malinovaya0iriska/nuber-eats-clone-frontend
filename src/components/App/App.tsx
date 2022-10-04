import { useReactiveVar } from '@apollo/client';

import { isLoggedInVar } from 'apollo';
import { LoggedInRouter, LoggedOutRouter } from 'routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
