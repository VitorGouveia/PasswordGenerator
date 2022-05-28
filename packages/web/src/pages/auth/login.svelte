<script lang="ts">
  import type { User } from "../../@types/auth";
  import { replace } from "svelte-spa-router";

  import { UserStore } from "../../store/user";

  import Heading from "../../components/heading.svelte";
  import InputField from "../../components/input/field.svelte";
  import Checkbox from "../../components/input/checkbox.svelte";
  import Link from "../../components/link.svelte";
  import Button from "../../components/button/index.svelte";

  import Footer from "../../components/footer/index.svelte";

  let loginInput: any;
  let passwordInput: any;

  let login: string;
  let password: string;
  let rememberUser: boolean = true;

  function handleSubmitForm() {
    // console.log("bruh");
    // console.log({ login, password });
    if (!login) {
      loginInput.setError({
        message: "hey, fill me please",
      });
    }

    if (!password) {
      passwordInput.setError({
        message: "Don't forget about me",
      });
    }

    const proceed = login && password;

    if (!proceed) {
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("@password-generator:users") || "[]"
    ) as unknown as User[];

    const user = users.find((user) => {
      const { id, username, email } = user;
      if (id === login || username === login || email === login) {
        return user;
      }

      return null;
    });

    if (!user) {
      loginInput.setError({
        message: "uhm strange, could not find a user with this login.",
      });

      return;
    }

    // check for password
    const passwordMatch = user.password === password;
    if (!passwordMatch) {
      passwordInput.setError({
        message: "i'm sorry to inform this but, your password is incorrect",
      });
      return;
    }

    // set logged user
    if (rememberUser) {
      const loggedUsers = JSON.parse(
        localStorage.getItem("@password-generator:logged-user-id") || "[]"
      );

      const newLoggedUsers = [...new Set([user?.id, ...loggedUsers])];

      localStorage.setItem(
        "@password-generator:logged-user-id",
        JSON.stringify(newLoggedUsers)
      );
    }

    UserStore.set(user);

    // push to home
    replace("/");
  }

  function handleLoginNeoExpertise() {
    console.log("");
  }

  function handleSayMyName() {
    const name = prompt("Your name \n tip: meth");
    if (name === "heisenberg") {
      alert("You're goddamn right.");
    } else {
      alert("hmm, can't recognise it.");
    }
  }

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
  <title>Login Into Your Account - PasswordGenerator</title>
</svelte:head>

<main>
  <header>
    <Heading variant="title">Welcome back!</Heading>
    <Heading variant="paragraph">
      I recognise you but can't quite remember your name,{#if breakText === true}<br
        />
      {:else}{/if} would you mind telling it to me again?
    </Heading>
  </header>

  <form>
    <InputField
      bind:this={loginInput}
      bind:value={login}
      label="Login"
      placeholder="ex: ID, Username, E-mail"
      variant="primary"
    />

    <InputField
      bind:this={passwordInput}
      bind:value={password}
      type="password"
      label="Password"
      placeholder="*******************"
      variant="primary"
    />
    <Link href="/forgot-password" label="Forgot your password?" />

    <div class="remember-section">
      <Checkbox
        checked={rememberUser}
        on:click={(event) => (rememberUser = event.detail.value)}
      />
      <Heading label="Remember me" variant="paragraph" />
    </div>
  </form>

  <section class="cta-section">
    <header>
      <Button on:click={handleSubmitForm} variant="solid">Login</Button>
      <Button on:click={handleLoginNeoExpertise} variant="NeoExpertise" />
    </header>

    <Button on:click={handleSayMyName} variant="outlined">Say my name</Button>

    <Link href="/register">
      Want to create an account instead? <br /> Register Now!
    </Link>
  </section>

  <Footer />
</main>

<style lang="scss">
  main {
    margin: 0 auto;

    max-width: var(--desktop-max-width);
    height: 100vh;

    background: var(--color-gray-800);

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

    form {
      padding: 0 var(--size-300);

      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      gap: var(--size-200);

      :global(a) {
        align-self: flex-start;
      }

      :global(.input-wrapper) {
        width: 100%;
      }

      .remember-section {
        display: flex;
        align-items: center;
        align-self: flex-start;
        gap: var(--size-100);
      }
    }

    .cta-section {
      align-self: center;
      padding: 0 var(--size-300);

      width: 50%;

      display: flex;
      flex-direction: column;
      align-items: center;

      gap: var(--size-300);

      header {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        gap: var(--size-300);

        :global(button:nth-child(1)) {
          width: 100%;
        }

        :global(button:nth-child(2)) {
          width: 30%;
        }
      }

      :global(a) {
        width: 100%;
        text-align: center;
      }

      :global(button) {
        width: 100%;
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
