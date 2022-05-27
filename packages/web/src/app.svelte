<script lang="ts">
  import Router, { link } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";

  import "./styles/global.scss";

  import StyleGuide from "./pages/style-guide.svelte";
  import NotFound from "./pages/not-found.svelte";

  const routes = {
    "/": wrap({
      asyncComponent: () => import("./pages/home.svelte"),
    }),
    "/style-guide": StyleGuide,
    "*": NotFound,
  };
</script>

<!-- <Router {routes} prefix="PasswordGenerator" /> -->
<Router {routes} />
<!-- <Link to="/style-guide">style guide</Link> -->
<a use:link href="/style-guide">bruh</a>
