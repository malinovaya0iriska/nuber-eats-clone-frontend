/* eslint-disable camelcase */
import { myRestaurant_myRestaurant_restaurant_menu_options } from '__generatedTypes__/myRestaurant';

export interface IDishProps {
  description: string | null;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
}
