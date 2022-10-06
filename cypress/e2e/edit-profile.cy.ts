import { EDIT_PROFILE } from '../../src/routes/constants/index';

describe('Edit Profile', () => {
  const user = cy;
  beforeEach(() => {
    user.login('free@samuraijs.com', '12345');
  });

  it('can go to /edit-profile using the header', () => {
    user.get(`a[href="${EDIT_PROFILE}"]`).click();
    user.wait(1000);
    user.assertTitle('Edit Profile');
  });

  it('can change email', () => {
    user.intercept('POST', 'http://localhost:4000/graphql', req => {
      if (req.body.operationName === 'EditProfile') {
        // @ts-ignore
        req.body.variables.input.email = 'new@samuraijs.com';
      }
    });
    user.visit(EDIT_PROFILE);
    user.findByPlaceholderText(/email/i).clear().type('new@samuraijs.com');
    user.findByRole('button').click();
  });
});
