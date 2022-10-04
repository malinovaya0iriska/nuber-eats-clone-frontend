import { render } from '@testing-library/react';

import { Button } from 'components';

describe('<Button />', () => {
  it('should render OK with props', () => {
    const { getByText } = render(
      <Button isDisabled={false} isLoading={false} actionText="test" />,
    );

    getByText('test');
  });

  it('should display loading', () => {
    const { getByText, container } = render(
      <Button isDisabled isLoading actionText="test" />,
    );

    getByText('Loading...');

    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});
