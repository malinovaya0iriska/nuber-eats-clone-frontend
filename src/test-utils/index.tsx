import { FC, PropsWithChildren, ReactElement } from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return <Router>{children}</Router>;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customRender = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
