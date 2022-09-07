import { useReactiveVar } from '@apollo/client';

import { isLoggedInVar } from 'apollo';
import { LoggedInRouter, LoggedOutRouter } from 'routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  console.log('isLoggedIn', isLoggedIn);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
