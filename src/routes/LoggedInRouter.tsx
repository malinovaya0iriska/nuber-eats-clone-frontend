import { isLoggedInVar } from 'apollo';
import { ReturnComponentType } from 'types';

export const LoggedInRouter = (): ReturnComponentType => {
  const handleLogInClick = (): void => {
    isLoggedInVar(false);
  };

  return (
    <div>
      <h1>Logged In</h1>

      <button onClick={handleLogInClick} type="button">
        Click to log out
      </button>
    </div>
  );
};
