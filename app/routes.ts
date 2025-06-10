import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('bottles', 'routes/bottles/home.tsx'),
  route('bottles/:bottleId', 'routes/bottles/bottle.tsx'),
] satisfies RouteConfig;
