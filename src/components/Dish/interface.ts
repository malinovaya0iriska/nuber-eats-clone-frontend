/* eslint-disable camelcase */
import { myRestaurant_myRestaurant_restaurant_menu_options } from '__generatedTypes__/myRestaurant';

export interface IDishProps {
  id?: number;
  description: string | null;
  name: string;
  price: number;
  addItemToOrder?: (dishId: number) => void;
  isCustomer?: boolean;
  orderStarted?: boolean;
  options?: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
  addOptionToItem?: (dishId: number, option: any) => void;
}
