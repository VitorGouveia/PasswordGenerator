<script lang="ts">
  import Router from "svelte-spa-router";

  import Home from "./pages/home.svelte";
  import Login from "./pages/auth/login.svelte";
  import Register from "./pages/auth/register.svelte";
  import StyleGuide from "./pages/style-guide.svelte";
  import NotFound from "./pages/not-found.svelte";

  const routes = {
    "/": Home,
    "/login": Login,
    "/register": Register,
    "/style-guide": StyleGuide,
    "*": NotFound,
  };
</script>

<Router {routes} />
