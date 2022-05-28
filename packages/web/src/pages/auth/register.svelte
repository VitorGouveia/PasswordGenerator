<script lang="ts">
  import type { User } from "../../@types/auth";
  import { replace } from "svelte-spa-router";
  import { nanoid } from "nanoid";
  import { generatePassword } from "@password-generator/core";

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

  // password strength stuff
  let strength = 0;

  let validations: boolean[] = [];

  function validatePassword(password: string) {
    validations = [
      password.length > 5,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[$&+,:;=?@#]/) > -1,
    ];

    // @ts-ignore
    strength = validations.reduce((acc, cur) => acc + cur, 0);
  }

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
      return;
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
    if (strength < 4) {
      passwordInput.setError({
        // message: "Your password is not strong enough i'm afraid :(",
        message: "Wait, how did you?? Did you really hack the page?",
      });
      return;
    }

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

    // push to home
    replace("/");
  }

  function handleLoginNeoExpertise() {
    console.log("");
  }

  let suggestPassword: string;
</script>

<svelte:head>
  <title>Create your account - PasswordGenerator</title>
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
      type="email"
      label="E-mail"
      placeholder="ex: vitorneves.gouveia10@gmail.com"
      variant="primary"
    />

    <InputField
      bind:this={passwordInput}
      bind:value={password}
      on:input={({ detail }) => {
        suggestPassword = "";
        validatePassword(detail.value);
      }}
      on:blur={() => {
        validations = [];
        // suggestPassword = "";
      }}
      on:focus={() => {
        // suggest password
        if (password === "") {
          suggestPassword = generatePassword({
            length: 20,
          });
          return;
        }
      }}
      classname={strength > 3 ? "valid" : ""}
      type="password"
      label="Password"
      placeholder="*******************"
      variant="primary"
    />

    {#if !!suggestPassword}
      <button
        on:click={() => {
          // use suggested password
          passwordInput.setValue(suggestPassword);
          validatePassword(suggestPassword);
          suggestPassword = "";
        }}
        class="suggest-password-box"
      >
        <small>Use suggested password</small>

        <small>{suggestPassword}</small>
      </button>
    {/if}

    <div class="strength">
      <span class="bar bar-1" class:bar-show={strength > 0} />
      <span class="bar bar-2" class:bar-show={strength > 1} />
      <span class="bar bar-3" class:bar-show={strength > 2} />
      <span class="bar bar-4" class:bar-show={strength > 3} />
    </div>

    {#if validations.length}
      <ul>
        <li>{validations[0] ? "✔️" : "❌"} must be at least 5 characters</li>
        <li>{validations[1] ? "✔️" : "❌"} must contain a capital letter</li>
        <li>{validations[2] ? "✔️" : "❌"} must contain a number</li>
        <li>
          {validations[3] ? "✔️" : "❌"} must contain one of [!@#$%&*()-_]
        </li>
      </ul>
    {/if}

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
      <Button
        disabled={strength < 4}
        on:click={handleSubmitForm}
        variant="solid">Register</Button
      >
      <Button on:click={handleLoginNeoExpertise} variant="NeoExpertise" />
    </header>

    <Button variant="MoonKnight" />

    <Link href="/login">Already has an account?</Link>
  </section>

  <Footer />
</main>

<style lang="scss">
  .strength {
    display: flex;
    height: 20px;
    gap: var(--size-100);
    width: 100%;
  }
  .bar {
    height: 100%;
    width: var(--size-900);
    transition: box-shadow 500ms;
    box-shadow: inset 0px 20px var(--color-gray-800);
  }
  .bar-show {
    box-shadow: none;
  }
  .bar-1 {
    background: linear-gradient(
      to right,
      var(--color-red-400),
      hsl(24, 46%, 51%)
    );
  }
  .bar-2 {
    background: linear-gradient(
      to right,
      hsl(24, 46%, 51%),
      var(--color-yellow-400)
    );
  }
  .bar-3 {
    background: linear-gradient(
      to right,
      var(--color-yellow-400),
      hsl(80, 46%, 50%)
    );
  }
  .bar-4 {
    background: linear-gradient(
      to right,
      hsl(80, 46%, 50%),
      var(--color-green-400)
    );
  }
  .bar:last-child {
    margin-right: 0;
  }
  .strength-text {
    margin-top: 20px;
  }
  ul {
    list-style: none;

    width: 100%;
    border: 4px solid var(--color-gray-100);
    padding: var(--size-200);
    text-align: left;
  }

  .suggest-password-box {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: transparent;
    padding: var(--size-100);

    border: 4px solid var(--color-gray-100);

    transform: translateY(-15px);

    &:hover {
      border-color: var(--color-primary-400);
    }

    > small {
      &:nth-child(1) {
        color: var(--color-gray-700);
      }

      &:nth-child(2) {
        color: var(--color-gray-300);
      }
    }
  }

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
