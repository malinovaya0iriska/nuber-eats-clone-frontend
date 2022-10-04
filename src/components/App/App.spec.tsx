import { render, waitFor } from '@testing-library/react';

import { isLoggedInVar } from 'apollo';
import { App } from 'components/App';

jest.mock('routes/LoggedOutRouter', () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});
jest.mock('routes/LoggedInRouter', () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe('<App />', () => {
  it('renders LoggedOutRouter', () => {
    const { getByText } = render(<App />);

    getByText('logged-out');
  });

  it('renders LoggedInRouter', async () => {
    await waitFor(() => {
      isLoggedInVar(true);
    });

    const { getByText } = render(<App />); // you can access debug here

    getByText('logged-in');
  });
});
