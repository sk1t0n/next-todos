const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  reactStrictMode: true,
  modifyVars: {
    // '@primary-color': '#9900FF',
  },
});
