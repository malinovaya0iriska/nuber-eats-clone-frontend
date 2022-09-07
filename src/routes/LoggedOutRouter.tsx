import { isLoggedInVar } from 'apollo';
import { ReturnComponentType } from 'types';

export const LoggedOutRouter = (): ReturnComponentType => {
  const handleLogInClick = (): void => {
    isLoggedInVar(true);
  };

  return (
    <div>
      <h1>Logged Out</h1>

      <button onClick={handleLogInClick} type="button">
        Click to log in
      </button>
    </div>
  );
};
