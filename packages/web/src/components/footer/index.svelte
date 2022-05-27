<script lang="ts">
  import Button from "../button/index.svelte";
  import Link from "../link.svelte";

  import Flag from "./assets/flag.svelte";
  import Github from "./assets/github.svelte";
  import Moon from "./assets/moon.svelte";

  function handleThemeChange() {}
</script>

<footer>
  <Button classname="svg-button" variant="outlined">
    <Flag />
  </Button>
  <a target="_blank" href="https://github.com/vitorGouveia/PasswordGenerator">
    <Button classname="svg-button" variant="outlined">
      <Github />
    </Button>
  </a>
  <Button
    classname="svg-button"
    variant="outlined"
    on:click={handleThemeChange}
  >
    <Moon />
  </Button>
</footer>

<style lang="scss">
  footer {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: var(--size-100);

    :global(.svg-button) {
      padding: var(--size-100);
    }
  }
</style>
