import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  route('/', 'routes/home.tsx'),
  layout('layouts/auth.tsx', [
    route('login/', 'routes/auth/login.tsx'),
    route('register/', 'routes/auth/register.tsx'),
    route('logout/', 'routes/auth/logout.tsx'),
  ]),
  layout('layouts/bottles.tsx', [
    route('bottles/', 'routes/bottles/home.tsx'),
    route('bottles/new', 'routes/bottles/new.tsx'),
    route('bottles/:bottleId', 'routes/bottles/bottle.tsx'),
    route('bottles/:bottleId/edit', 'routes/bottles/edit-bottle.tsx'),
    route('bottles/:bottleId/destroy', 'routes/bottles/destroy-bottle.tsx'),
  ]),
] satisfies RouteConfig;
