/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyEmailInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: VerifyEmail
// ====================================================

export interface VerifyEmail_verifyEmail {
  __typename: 'VerifyEmailOutput';
  ok: boolean;
  error: string | null;
}

export interface VerifyEmail {
  verifyEmail: VerifyEmail_verifyEmail;
}

export interface VerifyEmailVariables {
  input: VerifyEmailInput;
}
