describe('Log In', () => {
  const user = cy;

  it('should see login page', () => {
    user.visit('/').title().should('eq', 'Login | Nuber Eats');
  });

  it('can see email / password validation errors', () => {
    user.visit('/');
    user.findByPlaceholderText(/email/i).type('bad@email').blur();
    user.findByRole('alert').should('have.text', 'Please enter a valid email');
    user.findByPlaceholderText(/email/i).clear().blur();
    user.findByRole('alert').should('have.text', 'Email is required');
    user.findByPlaceholderText(/email/i).type('bad@email.com');
    user
      .findByPlaceholderText(/password/i)
      .type('a')
      .blur();
    user.findByRole('alert').should('have.text', 'Password must be more than 5 chars.');
    user
      .findByPlaceholderText(/password/i)
      .clear()
      .blur();
    user.findByRole('alert').should('have.text', 'Password is required');
  });

  it('can fill out the form', () => {
    user.login('free@samuraijs.com', '12345');
  });
});
