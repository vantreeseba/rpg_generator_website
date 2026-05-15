import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import Layout from './app/layout';
import Home from './app/page';
import CharacterPage from './app/character/page';
import DeityPage from './app/deity/page';
import TrinketPage from './app/trinket/page';
import QuestPage from './app/quest/page';
import LocalityPage from './app/locality/page';
import TavernPage from './app/tavern/page';

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const characterRoute = createRoute({ getParentRoute: () => rootRoute, path: '/character', component: CharacterPage });
const deityRoute = createRoute({ getParentRoute: () => rootRoute, path: '/deity', component: DeityPage });
const trinketRoute = createRoute({ getParentRoute: () => rootRoute, path: '/trinket', component: TrinketPage });
const questRoute = createRoute({ getParentRoute: () => rootRoute, path: '/quest', component: QuestPage });
const localityRoute = createRoute({ getParentRoute: () => rootRoute, path: '/locality', component: LocalityPage });
const tavernRoute = createRoute({ getParentRoute: () => rootRoute, path: '/tavern', component: TavernPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  characterRoute,
  deityRoute,
  trinketRoute,
  questRoute,
  localityRoute,
  tavernRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: (import.meta as any).env.BASE_URL,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
