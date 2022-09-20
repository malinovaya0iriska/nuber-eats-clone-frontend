/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: EditProfileMutation
// ====================================================

export interface EditProfileMutation_editProfile {
  __typename: 'EditProfileOutput';
  ok: boolean;
  error: string | null;
}

export interface EditProfileMutation {
  editProfile: EditProfileMutation_editProfile;
}

export interface EditProfileMutationVariables {
  input: EditProfileInput;
}
