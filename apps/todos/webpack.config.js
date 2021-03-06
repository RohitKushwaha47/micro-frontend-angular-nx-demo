const { share, SharedMappings } = require('@angular-architects/module-federation/webpack');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const sharedMappings = new SharedMappings();

sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  /* mapped paths to share */

  '@mfe/shared/auth',
  '@mfe/shared/todos',
]);

module.exports = {
  output: {
    uniqueName: 'todos',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'todos',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './apps/todos/src/app/mfe.module.ts',
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
