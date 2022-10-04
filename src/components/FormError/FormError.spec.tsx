import { render } from '@testing-library/react';

import { FormError } from 'components';

describe('<FormError />', () => {
  it('renders OK with props', () => {
    const { getByText } = render(<FormError errorMessage="test" />);

    getByText('test');
  });
});
