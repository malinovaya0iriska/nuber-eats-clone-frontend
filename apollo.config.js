module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'nuber-eats-clone',
      url: 'http://localhost:4000/graphql',
    },
  },
};
