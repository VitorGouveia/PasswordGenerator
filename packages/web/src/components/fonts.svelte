<script lang="ts">
  const placeholder = "Lorem Ipsum";

  const font = {
    base: 14,
    step: 6,
    weights: [200, 400, 700],
  };
  const tags = ["small", "p", "h6", "h5", "h4", "h3", "h2", "h1"];

  type Fonts = Array<{
    size: string;
    tag: string;
  }>;

  const fonts: Fonts = [];

  for (let i = 0; i <= 7; i++) {
    fonts.push({
      size: `${font.base + font.step * i}px`,
      tag: tags[i],
    });
  }
</script>

<div class="section-content">
  {#each fonts as font}
    <svelte:element this={font.tag}>
      {placeholder}
    </svelte:element>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
