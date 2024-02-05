module.exports = {
  apps: [
    {
      name: 'api-staging-4001',
      script: './dist/index.js',
      watch: true,
      restart_delay: 1000,
    },
  ],
};
