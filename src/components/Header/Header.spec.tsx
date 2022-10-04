/* eslint-disable no-promise-executor-return */
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from 'components';
import { DELAY } from 'constants/index';
import { ME_QUERY } from 'hooks';

describe('<Header />', () => {
  it('renders verify banner', async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );

      await new Promise(resolve => setTimeout(resolve, DELAY));
      getByText('Please verify your email.');
    });
  });

  it('renders without verify banner', async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );

      await new Promise(resolve => setTimeout(resolve, DELAY));
      expect(queryByText('Please verify your email.')).toBeNull();
    });
  });
});
