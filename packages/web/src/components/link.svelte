<script lang="ts">
  import { link } from "svelte-spa-router";

  export let href: string;
  export let label: string;
  export let active: boolean = false;
</script>

<a data-active={active} use:link {href}>{label}</a>

<style lang="scss">
  a {
    width: max-content;

    text-decoration: none;

    color: var(--color-gray-100);
    font-size: var(--font-size-small);

    &:hover,
    &:focus,
    &:active,
    &[data-active="true"] {
      text-decoration: underline;
      font-style: oblique;
      font-style: italic;
    }
  }
</style>
