<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let checked: boolean = false;

  function handleClick() {
    checked = !checked;

    dispatch("click");
  }
</script>

<button
  aria-roledescription="toggle"
  data-checked={checked}
  on:click={handleClick}
>
  <div class="box" />
</button>

<style lang="scss">
  button {
    cursor: pointer;

    --check-box-size: 12px;
    width: calc(6px + 24px + 6px);

    border: none;
    outline: none;

    background: transparent;
    border: 4px solid var(--color-gray-100);
    padding: 2px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    .box {
      width: 12px;
      height: 12px;
      background: var(--color-gray-100);
    }

    &[data-checked="true"] {
      background: var(--color-gray-900);
      justify-content: flex-end;
    }
  }
</style>
