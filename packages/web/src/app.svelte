<script lang="ts">
  import { UserStore } from "./store/user";
  import type { User } from "./@types/auth";

  import "./styles/global.scss";

  import Router from "./router.svelte";
  import Link from "./components/link.svelte";

  const loggedUserID = localStorage.getItem(
    "@password-generator:logged-user-id"
  );

  if (loggedUserID) {
    const users = JSON.parse(
      localStorage.getItem("@password-generator:users") || "[]"
    ) as unknown as User[];

    UserStore.set(users.find((user) => user.id === loggedUserID) || null);
  }
</script>

<Router />

<!-- <Link href="/style-guide" active={false}>go to style guide</Link> -->
