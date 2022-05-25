<script lang="ts">
  /* component logic will go here */
  import Router, { link } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";

  import Home from "./home.svelte";
  import NotFound from "./not-found.svelte";

  import { generatePassword } from "@password-generator/core";

  console.log(
    generatePassword({
      length: 20,
    })
  );

  const routes = {
    // Exact path
    "/": wrap({
      asyncComponent: () => import("./home.svelte"),
    }),
    "*": NotFound,
  };
</script>

<main>
  <Router restoreScrollState={true} prefix="PasswordGenerator" {routes} />
  <a href="/" use:link>homepage</a>
  <a href="/burhh" use:link>not found</a>
</main>

<style>
  /* css will go here */
</style>
