<script lang="ts">
  // import Router, { link } from "svelte-spa-router";
  // import { wrap } from "svelte-spa-router/wrap";

  import { Router } from "svelte-router-spa";

  import "./styles/global.scss";

  import Home from "./pages/home.svelte";
  import StyleGuide from "./pages/style-guide.svelte";
  import NotFound from "./pages/not-found.svelte";
  const routes = [
    {
      name: "/",
      component: Home,
    },
    {
      name: "/style-guide",
      component: StyleGuide,
    },
  ];

  // const routes = {
  //   "/": wrap({
  //     asyncComponent: () => import("./pages/home.svelte"),
  //   }),
  //   "/storybook": wrap({}),
  //   "/style-guide": StyleGuide,
  //   "*": NotFound,
  // };
</script>

<!-- <Router {routes} prefix="PasswordGenerator" /> -->
<Router {routes} />
<!-- <Link to="/style-guide">style guide</Link> -->
<a href="/style-guide">bruh</a>
