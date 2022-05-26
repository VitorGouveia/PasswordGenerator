<script lang="ts">
  export let orientation: "column" | "row";
  console.log({ orientation });
  const size = {
    step: 9,
    base: 6,
  };

  type Sizes = Array<{
    size: number;
    color: string;
  }>;

  const sizes: Sizes = [];

  for (let i = 0; i <= 8; i++) {
    sizes.push({
      color: `var(--color-gray-${(i + 1) * 100})`,
      size: size.base + size.step * i,
    });
  }
</script>

<div
  class="section-content"
  style={`display: flex; flex-direction: ${orientation}`}
>
  {#each sizes as size}
    <div
      style={`background: ${size.color}; width: ${size.size}px; height: 32px`}
    />
  {/each}
</div>
