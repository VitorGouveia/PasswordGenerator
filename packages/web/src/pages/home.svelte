<script lang="ts">
  import { UserStore } from "../store/user";
  import { onMount } from "svelte";
  import { replace } from "svelte-spa-router";

  // verify if user is logged in
  onMount(() => {
    UserStore.subscribe((user) => {
      if (!user) {
        console.log("[warning]: not logged in, redirecting to login page.");
        replace("/login");
      }
    });
  });
</script>

<main>my page</main>
