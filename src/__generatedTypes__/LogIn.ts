/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_login {
  __typename: 'LoginOutput';
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface LogIn {
  login: LogIn_login;
}

export interface LogInVariables {
  loginInput: LoginInput;
}
