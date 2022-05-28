<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { User } from "../../@types/auth";
  import { UserStore } from "../../store/user";

  import Heading from "../heading.svelte";

  const allUsers = JSON.parse(
    localStorage.getItem("@password-generator:users") || "[]"
  ) as User[];
  const loggedUsers = JSON.parse(
    localStorage.getItem("@password-generator:logged-user-id") || "[]"
  ) as string[];

  let users: User[] = [];
  allUsers.forEach((user) => {
    if (loggedUsers.includes(user.id)) {
      users.push(user);
      return;
    }
  });

  const error = {
    id: "",
    message: "",
  };

  const dispatch = createEventDispatcher();

  let storeUser: User | null = null;

  UserStore.subscribe((user) => {
    storeUser = user;
  });

  function handleChangeAccount(userId: string) {
    const selectedUser = users.find((user) => user.id === userId);

    if (!selectedUser) {
      error.id = userId;
      error.message = "Could not find that user, please refresh the page";
      return;
    }

    UserStore.set(selectedUser);

    dispatch("change", {
      user: selectedUser,
    });
  }
</script>

<ul>
  {#each users as user, index}
    <li>
      <input
        on:input={() => handleChangeAccount(user.id)}
        id={user.id}
        checked={storeUser?.id === user.id}
        type="radio"
        for="account-choice"
      />

      <div class="checkmark" />

      <label for={user.id}>
        <Heading variant="paragraph">Account nº{index}</Heading>
        <small>@{user.username}</small>
      </label>

      {#if error.id === user.id}
        <span>* {error.message}</span>
      {/if}
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--size-300);

    li {
      width: 100%;
      position: relative;

      --accent-color: var(--color-gray-100);

      span {
        color: var(--color-red-300);
      }

      label {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: var(--size-100);

        align-items: flex-start;

        padding: var(--size-200);
        border: 4px solid var(--accent-color);

        cursor: pointer;

        small {
          color: var(--color-gray-300);
        }
      }

      .checkmark {
        position: absolute;
        top: var(--size-200);
        right: var(--size-200);

        width: 12px;
        height: 12px;

        background: var(--accent-color);
      }

      input {
        position: absolute;
        opacity: 0;

        &:checked ~ .checkmark,
        &:checked ~ label {
          --accent-color: var(--color-primary-400);
        }
      }
    }
  }
</style>
