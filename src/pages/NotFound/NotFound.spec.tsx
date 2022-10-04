import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NotFound } from 'pages';

describe('<NotFound />', () => {
  it('renders OK', async () => {
    render(
      <Router>
        <NotFound />
      </Router>,
    );
    await waitFor(() => {
      expect(document.title).toBe('Not Found | Nuber Eats');
    });
  });
});
