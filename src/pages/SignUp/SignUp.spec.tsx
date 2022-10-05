import { ApolloProvider } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';

import { UserRole } from '__generatedTypes__/globalTypes';
import { CREATE_ACCOUNT_MUTATION, SignUp } from 'pages';
import { BASE_URL } from 'routes/constants';
import { render, RenderResult, waitFor } from 'test-utils';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');

  return {
    ...realModule,
    useNavigate: () => mockNavigate,
  };
});

describe('<SignUp />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <SignUp />
        </ApolloProvider>,
      );
    });
  });
  it('renders OK', async () => {
    await waitFor(() => expect(document.title).toBe('Create Account | Nuber Eats'));
  });

  it('renders validation errors', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const button = getByRole('button');

    userEvent.type(email, 'wont@work');
    email.blur();

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    });

    userEvent.clear(email);

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/email is required/i);
    });

    userEvent.type(email, 'working@email.com');
    userEvent.click(button);

    await waitFor(() => {
      const errorMessage = getByRole('alert');

      expect(errorMessage).toHaveTextContent(/password is required/i);
    });
  });

  it('submits mutation with form values', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');
    const formData = {
      email: 'working@mail.com',
      password: '12345',
      role: UserRole.Client,
    };
    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: null,
        },
      },
    });

    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedLoginMutationResponse);
    jest.spyOn(window, 'alert').mockImplementation(() => null);
    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
        createAccountInput: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      });

      expect(window.alert).toHaveBeenCalledWith('Account Created! Log in now!');
      expect(mockNavigate).toHaveBeenCalledWith(BASE_URL);
    });
  });

  it('display error if it occurs via loginization', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');
    const formData = {
      email: 'working@mail.com',
      password: '12345',
      role: UserRole.Client,
    };
    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: false,
          error: 'mutation-error',
        },
      },
    });

    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedLoginMutationResponse);
    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
        createAccountInput: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      });

      const mutationError = getByRole('alert');

      expect(mockNavigate).not.toHaveBeenCalledWith(BASE_URL);
      expect(mutationError).toHaveTextContent('mutation-error');
    });
  });

  it('display error if passwort is less than 5 chars', async () => {
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

  afterAll(() => {
    jest.clearAllMocks();
  });
});
