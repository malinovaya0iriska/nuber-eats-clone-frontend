/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress';
import '@testing-library/cypress/add-commands';

export default defineConfig({
  projectId: '4qe9x7',

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
