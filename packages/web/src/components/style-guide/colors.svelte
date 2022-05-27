<script lang="ts">
  type Color = {
    hue: number;
    saturation: number;
    base: number;
    step: number;
  };

  const base = {
    step: 9,
    base: 6,
  };

  const colors: Record<string, Color> = {
    gray: {
      hue: 260,
      saturation: 8,
      ...base,
    },
    red: {
      hue: 360,
      saturation: 46,
      ...base,
    },
    yellow: {
      hue: 60,
      saturation: 46,
      ...base,
    },
    green: {
      hue: 120,
      saturation: 46,
      ...base,
    },
    blue: {
      hue: 220,
      saturation: 46,
      ...base,
    },
    primary: {
      hue: 260,
      saturation: 46,
      ...base,
    },
  };

  const colorElements: string[][] = [];

  for (let colorName in colors) {
    const color = colors[colorName];

    const colorMap = [];

    for (let i = 0; i <= 8; i++) {
      colorMap.push(
        `hsl(${color.hue}, ${color.saturation}%, ${
          color.base + i * color.step
        }%)`
      );
    }

    colorElements.push(colorMap);
  }
</script>

<div class="section-content">
  {#each colorElements as colorArray}
    <ul class="color-div">
      {#each colorArray as color}
        <li style={`background: ${color};`} />
      {/each}
    </ul>
  {/each}
</div>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  div {
    display: flex;
  }

  .color-div {
    display: flex;
    flex-direction: column-reverse;

    list-style: none;
  }

  li {
    width: 50px;
    height: 50px;
  }
</style>
