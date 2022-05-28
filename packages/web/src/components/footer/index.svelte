<script lang="ts">
  import Link from "../link.svelte";
  import Button from "../button/index.svelte";

  import Figma from "./assets/figma.svelte";
  import Flag from "./assets/flag.svelte";
  import Github from "./assets/github.svelte";
  import Layers from "./assets/layers.svelte";
  import Moon from "./assets/moon.svelte";
  import Package from "./assets/package.svelte";

  function handleThemeChange() {}
</script>

<footer>
  <a
    target="_blank"
    href="https://www.figma.com/file/pJyx0DbawEh9lk2nZKapXp/PasswordGenerator"
  >
    <Button classname="svg-button" variant="outlined">
      <Figma />
    </Button>
  </a>
  <Button disabled classname="svg-button" variant="outlined">
    <Flag />
  </Button>
  <a target="_blank" href="https://github.com/vitorGouveia/PasswordGenerator">
    <Button classname="svg-button" variant="outlined">
      <Github />
    </Button>
  </a>
  <a
    target="_blank"
    href="https://vitorgouveia.github.io/PasswordGenerator/storybook"
  >
    <Button classname="svg-button" variant="outlined">
      <Package />
    </Button>
  </a>
  <Link href="/style-guide">
    <Button classname="svg-button" variant="outlined">
      <Layers />
    </Button>
  </Link>
  <Button
    disabled
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
