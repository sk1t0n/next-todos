const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  reactStrictMode: true,
  modifyVars: {
    '@primary-color': '#0050b3',
  },
  env: {
    API_HOST: process.env.API_HOST
  }
});
