<script lang="ts">
  export let variant: "title" | "subtitle" | "suptitle" | "paragraph";
  export let label: string = "";

  let element: string;

  switch (variant) {
    case "title": {
      element = "h1";
      break;
    }
    case "subtitle": {
      element = "h4";
      break;
    }
    case "suptitle": {
      element = "h5";
      break;
    }
    case "paragraph": {
      element = "p";
      break;
    }
  }
</script>

<svelte:element this={element} class={`variant-${variant}`}>
  <slot />
  {label}
</svelte:element>

<style lang="scss">
  .variant-title {
    font-size: var(--font-size-heading-1);
  }

  .variant-subtitle {
    font-size: var(--font-size-heading-4);
  }

  .variant-suptitle {
    font-size: var(--font-size-heading-5);
  }

  .variant-paragraph {
    font-size: var(--font-size-text);
  }
</style>
