<script lang="ts">
  import type { User } from "../@types/auth";
  import { UserStore } from "../store/user";
  import { onMount } from "svelte";
  import { replace } from "svelte-spa-router";

  import Heading from "../components/heading.svelte";
  import Link from "../components/link.svelte";
  import AccountList from "../components/account/list.svelte";

  // verify if user is logged in
  onMount(() => {
    UserStore.subscribe((user) => {
      if (!user) {
        console.log("[warning]: not logged in, redirecting to login page.");
        replace("/login");
      }
    });
  });

  let user: User | null = null;

  UserStore.subscribe((u) => {
    user = u;
  });

  let breakText: boolean = true;

  const mql = window.matchMedia("(max-width: 744px)");
  mql.addEventListener("change", (event) => {
    if (event.matches) {
      breakText = false;
      return;
    }

    breakText = true;
  });
</script>

<svelte:head>
  <title>@{user?.username}'s Homepage - PasswordGenerator</title>
</svelte:head>

<main>
  <header>
    <Heading variant="title">
      Hey @{user?.username},{#if breakText === true}<br />
      {:else}{/if} how are you doing?
    </Heading>
    <Heading variant="paragraph">
      At least that's what you told me your name was.
    </Heading>
  </header>

  <section class="accounts-section">
    <Heading variant="suptitle">Your accounts</Heading>

    <AccountList
      on:change={(event) => {
        user = event.detail.user;

        const loggedUsers = JSON.parse(
          localStorage.getItem("@password-generator:logged-user-id") || "[]"
        );

        const newLoggedUsers = [...new Set([user?.id, ...loggedUsers])];

        localStorage.setItem(
          "@password-generator:logged-user-id",
          JSON.stringify(newLoggedUsers)
        );
      }}
    />

    <Link href="/register">
      <button class="dotted">+ add another account</button>
    </Link>
  </section>

  <footer>
    <button
      on:click={() => alert("feature not developed yet :(")}
      class="red-pill">Enter the matrix as @{user?.username}</button
    >
    <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
      <button class="blue-pill">Continue your normal life</button>
    </a>
  </footer>
</main>

<style lang="scss">
  main {
    margin: 0 auto;

    max-width: var(--desktop-max-width);
    height: 100vh;

    border-right: 4px solid var(--color-gray-100);
    border-left: 4px solid var(--color-gray-100);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: var(--size-500);
    padding: 0 var(--size-900);

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      gap: var(--size-100);

      :global(p),
      :global(h1) {
        text-align: center;
        color: var(--color-gray-200);
      }
    }

    .accounts-section {
      align-self: center;
      padding: 0;

      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      gap: var(--size-300);

      :global(a) {
        width: 100%;
      }

      button {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: var(--font-size-text);

        background: transparent;
        padding: var(--size-100) var(--size-200);
        color: var(--color-gray-500);
        border: 4px dotted var(--color-gray-500);

        &:hover,
        &:focus,
        &:active {
          color: var(--color-gray-300);
          border: 4px dotted var(--color-gray-300);
        }
      }
    }

    footer {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: var(--size-200);

      button {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        color: var(--color-gray-100);
        padding: var(--size-100) var(--size-200);

        box-shadow: 4px 4px 0px 0px #000;

        font-size: var(--font-size-text);

        &:not(:disabled):hover,
        &:not(:disabled):focus,
        &:not(:disabled):active {
          box-shadow: 2px 2px 0px 0px #000;
        }
      }

      .red-pill {
        background: var(--color-red-600);
        border: 4px solid var(--color-red-900);
      }

      .blue-pill {
        background: var(--color-blue-600);
        border: 4px solid var(--color-blue-900);
      }
    }

    @media screen and (max-width: 744px) {
      background: transparent;
      padding: var(--size-400) var(--size-500);

      max-width: var(--tablet-max-width);

      .cta-section {
        width: 80%;
      }
    }

    @media screen and (max-width: 428px) {
      background: transparent;
      padding: var(--size-400) var(--size-200);

      max-width: var(--mobile-max-width);
      height: 100vh;

      justify-content: space-between;

      .cta-section {
        width: 100%;
      }
    }
  }
</style>
