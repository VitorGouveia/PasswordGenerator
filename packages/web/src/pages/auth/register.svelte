<script lang="ts">
  import type { User } from "../../@types/auth";
  import { replace } from "svelte-spa-router";
  import { nanoid } from "nanoid";

  import { UserStore } from "../../store/user";

  import Heading from "../../components/heading.svelte";
  import InputField from "../../components/input/field.svelte";
  import Checkbox from "../../components/input/checkbox.svelte";
  import Link from "../../components/link.svelte";
  import Button from "../../components/button/index.svelte";

  import Footer from "../../components/footer/index.svelte";

  let usernameInput: any;
  let emailInput: any;
  let passwordInput: any;

  let username: string;
  let email: string;
  let password: string;
  let rememberUser: boolean = true;

  function handleSubmitForm() {
    // console.log("bruh");
    // console.log({ login, password });
    if (!username) {
      usernameInput.setError({
        message: "hey, fill me please",
      });
    }

    if (!email) {
      emailInput.setError({
        message: "hey, fill me please",
      });
    }

    if (!password) {
      passwordInput.setError({
        message: "Don't forget about me",
      });
    }

    const proceed = username && email && password;

    if (!proceed) {
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("@password-generator:users") || "[]"
    ) as unknown as User[];

    const usernameAlreadyExists = users.find((user) => user.email === email);

    if (usernameAlreadyExists) {
      usernameInput.setError({
        message: "sorry, a user already took that username.",
      });
    }

    const userAlreadyExists = users.find((user) => user.email === email);

    if (userAlreadyExists) {
      emailInput.setError({
        message:
          "uhm a user already took that e-mail. Haven't you already created your account by any chance?",
      });

      return;
    }

    // check for password

    // create user
    const user: User = {
      id: nanoid(10),
      username,
      email,
      password,
    };

    // push user to database
    localStorage.setItem(
      "@password-generator:users",
      JSON.stringify([user, ...users])
    );

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
    }
  });
</script>

<svelte:head>
  <title>Login Into Your Account - PasswordGenerator</title>
</svelte:head>

<main>
  <header>
    <Heading variant="title">Hey there!</Heading>
    <Heading variant="paragraph">
      You're new around here aren't you? Well that's no problem, just tell me
      some of your info and I'll sign you up.
    </Heading>
  </header>

  <form>
    <InputField
      bind:this={usernameInput}
      bind:value={username}
      label="Username"
      placeholder="ex: @VitorGouveia"
      variant="primary"
    />

    <InputField
      bind:this={emailInput}
      bind:value={email}
      label="E-mail"
      placeholder="ex: vitorneves.gouveia10@gmail.com"
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
      <Button on:click={handleSubmitForm} variant="solid">Register</Button>
      <Button on:click={handleLoginNeoExpertise} variant="NeoExpertise" />
    </header>

    <Button variant="MoonKnight" />

    <Link href="/login">Already has an account?</Link>
  </section>

  <Footer />
</main>

<style lang="scss">
  main {
    margin: 0 auto;

    max-width: var(--desktop-max-width);
    height: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: var(--size-500);
    padding: var(--size-400) var(--size-900);

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
