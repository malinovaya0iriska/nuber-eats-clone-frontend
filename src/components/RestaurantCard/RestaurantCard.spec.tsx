import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { RestaurantCard } from 'components';
import { RESTAURANTS } from 'routes/constants';

describe('<RestaurantCard />', () => {
  it('renders OK with props', () => {
    const restaurantProps = {
      id: '11',
      name: 'Sweets',
      categoryName: 'Bakery',
      coverImage: 'oops',
    };
    const { getByText, container } = render(
      <Router>
        <RestaurantCard {...restaurantProps} />
      </Router>,
    );

    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      'href',
      `${RESTAURANTS}/${restaurantProps.id}`,
    );
  });
});
