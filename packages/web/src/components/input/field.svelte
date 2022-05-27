<script lang="ts">
  import { nanoid } from "nanoid";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let variant: "box" | "primary";
  export let label: string;
  export let placeholder: string;
  export let disabled: boolean = false;

  export let focused = false;
  export let success = false;

  const id = nanoid(6);

  export let error: {
    message: string;
  };

  type setErrorProps = {
    message: string;
  };

  export function setError({ message }: setErrorProps) {
    error.message = message;
  }

  export function setSuccess() {
    success = true;
  }

  type EventHandler<
    E extends Event = Event,
    T extends EventTarget = HTMLElement
  > = (event: E & { currentTarget: EventTarget & T }) => any;
  type FocusEventHandler<T extends EventTarget> = EventHandler<FocusEvent, T>;

  function handleFocus(event: any) {
    // @TODO on focus clean error and success states
    success = false;
    error.message = "";

    // function handleFocus(event: EventHandler<FocusEvent, HTMLInputElement>) {
    focused = true;
    dispatch("focus", event as FocusEventHandler<HTMLInputElement>);
  }

  function handleBlur() {
    // @TODO on blur clean error and success states
    success = false;
    error.message = "";

    focused = false;
  }
</script>

<div
  class={`input-wrapper variant-${variant}`}
  data-focused={focused}
  data-errored={!!error.message}
  data-success={success}
  data-disabled={disabled}
>
  <label class="italic" for={id}>{label}</label>

  <input
    {id}
    type="text"
    {placeholder}
    {disabled}
    on:focus={handleFocus}
    on:blur={handleBlur}
  />

  <span class="error italic">
    * {error.message}
  </span>
</div>

<style lang="scss">
  .input-wrapper {
    display: flex;
    flex-direction: column;

    gap: var(--size-100);

    --accent-color: var(--color-gray-100);
    --placeholder-color: var(--color-gray-700);
    --foreground-color: var(--color-gray-900);

    &[data-errored="true"] {
      --accent-color: var(--color-red-400);
      --placeholder-color: var(--color-gray-700);
      --foreground-color: var(--color-red-900);

      .error {
        display: flex;
      }
    }

    &[data-success="true"] {
      --accent-color: var(--color-green-400);
      --placeholder-color: var(--color-gray-700);
      --foreground-color: var(--color-green-900);
    }

    &[data-focused="true"] {
      --accent-color: var(--color-primary-400);
      --placeholder-color: var(--color-gray-700);
      --foreground-color: var(--color-primary-900);
    }

    &[data-disabled="true"] {
      cursor: not-allowed;

      * {
        cursor: not-allowed;
      }

      --accent-color: var(--color-gray-700);
      --placeholder-color: var(--color-gray-800);
      --foreground-color: var(--color-gray-900);
    }

    font-size: var(--font-size-text);

    label,
    input,
    span {
      font-size: inherit;
    }

    label {
      font-weight: 700;
      color: var(--accent-color);
    }

    input {
      color: var(--color-gray-200);
    }

    input::placeholder {
      font-style: oblique;
      font-style: italic;
      color: var(--placeholder-color);
    }

    .error {
      display: none;

      color: var(--color-red-200);
    }

    &.variant-primary {
      input {
        padding: var(--size-200);

        border: 4px solid var(--accent-color);
        background: var(--foreground-color);
      }
    }

    &.variant-box {
      padding: var(--size-200);

      border: 4px solid var(--accent-color);
      background: var(--foreground-color);

      input {
        border: none;
        background: transparent;
      }
    }
  }
</style>
