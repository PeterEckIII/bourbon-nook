import { type RouteConfig, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/root.tsx', [
    route('/', 'routes/home.tsx'),
    layout('layouts/auth.tsx', [
      route('login/', 'routes/auth/login.tsx'),
      route('register/', 'routes/auth/register.tsx'),
      route('logout/', 'routes/auth/logout.tsx'),
    ]),
    layout('layouts/bottles.tsx', [
      route('bottles/', 'routes/bottles/home.tsx'),
      route('bottles/new', 'routes/bottles/new.tsx'),
      route('bottles/:bottleId/image', 'routes/bottles/image.tsx'),
      route('bottles/:bottleId', 'routes/bottles/bottle.tsx'),
      route('bottles/:bottleId/edit', 'routes/bottles/edit-bottle.tsx'),
      route('bottles/:bottleId/destroy', 'routes/bottles/destroy-bottle.tsx'),
    ]),
    layout('layouts/reviews.tsx', [
      route('reviews/', 'routes/reviews/home.tsx'),
      route('reviews/new/:bottleId', 'routes/reviews/new.tsx'),
      route('reviews/:reviewId', 'routes/reviews/review.tsx'),
      route('reviews/:reviewId/edit', 'routes/reviews/edit-review.tsx'),
      route('reviews/:reviewId/destroy', 'routes/reviews/destroy-review.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
