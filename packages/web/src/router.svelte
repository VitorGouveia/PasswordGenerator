<script lang="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";

  import StyleGuide from "./pages/style-guide.svelte";
  import NotFound from "./pages/not-found.svelte";

  const routes = {
    "/": wrap({
      asyncComponent: () => import("./pages/home.svelte"),
    }),
    "/login": wrap({
      asyncComponent: () => import("./pages/auth/login.svelte"),
    }),
    "/register": wrap({
      asyncComponent: () => import("./pages/auth/register.svelte"),
    }),
    "/style-guide": StyleGuide,
    "*": NotFound,
  };
</script>

<Router {routes} />
