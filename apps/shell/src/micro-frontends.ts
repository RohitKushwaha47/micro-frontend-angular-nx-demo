import { MicroFrontend } from 'ng-module-federation';

export const microFrontends: MicroFrontend[] = [
  {
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
    remoteName: 'auth',
    routePath: 'auth',
  },
  {
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'todos',
    routePath: 'todos',
  },
];
