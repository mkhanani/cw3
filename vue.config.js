const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cw3/'  // Adjust this to match your GitHub repository name
    : '/',
  transpileDependencies: true
});
