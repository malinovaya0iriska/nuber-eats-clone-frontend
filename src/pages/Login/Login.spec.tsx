/* eslint-disable import/no-extraneous-dependencies */
import { ApolloProvider } from '@apollo/client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Login, LOGIN_MUTATION } from 'pages';

describe('<Login />', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();

      renderResult = render(
        <Router>
          <ApolloProvider client={mockedClient}>
            <Login />
          </ApolloProvider>
        </Router>,
      );
    });
  });

  it('should render OK', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | Nuber Eats');
    });
  });

  it('displays email validation errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    userEvent.type(email, 'this@wot');
    email.blur();

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    });

    userEvent.clear(email);
    email.blur();

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/email is required/i);
    });
  });

  it('display password required errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole('button');

    userEvent.type(email, 'this@wont.com');
    userEvent.click(submitBtn);

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/password is required/i);
    });
  });

  it('display password length errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');

    userEvent.type(email, 'this@wont.com');
    userEvent.type(password, '123');
    userEvent.click(submitBtn);

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/password must be more than 5 chars/i);
    });
  });

  it('submits form and calls mutation', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'real@test.com',
      password: '12345',
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'XXX',
          error: null,
        },
      },
    });

    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        loginInput: {
          email: formData.email,
          password: formData.password,
        },
      });
    });
  });

  it('login error occurs and is displayed', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'real@test.com',
      password: '12345',
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: false,
          token: null,
          error: 'mutation error',
        },
      },
    });

    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.click(submitBtn);

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/mutation error/i);
    });
  });

  it('if authorization is successful token is set to LocalStorage', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'real@test.com',
      password: '12345',
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'XXX',
          error: null,
        },
      },
    });

    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, 'setItem');

    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('nuber-token', 'XXX');
    });
  });
});
