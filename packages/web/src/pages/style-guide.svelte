<script lang="ts">
  import Colors from "../components/colors.svelte";
  import Fonts from "../components/fonts.svelte";
  import Weights from "../components/weights.svelte";
  import Sizes from "../components/sizes.svelte";
  import Breakpoint from "../components/style-guide/breakpoint.svelte";
</script>

<main>
  <div class="content">
    <section>
      <h1>Colors</h1>
      <Colors />
    </section>
    <section>
      <h1>Fonts</h1>
      <Fonts />
    </section>
    <section>
      <h1>Weights</h1>
      <Weights />
    </section>
    <section>
      <h1>Sizes</h1>
      <Sizes orientation="row" />
      <Sizes orientation="column" />
    </section>
    <section>
      <h1>Breakpoints</h1>

      <div class="breakpoints-container">
        <Breakpoint width={428} />
        <Breakpoint width={744} />
        <Breakpoint width={1440} />
      </div>
    </section>
  </div>
</main>

<style lang="scss">
  main {
    height: 100vh;
    padding: 10vh;

    background: #1e1e1e;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    .content {
      width: 100%;

      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: row;
      gap: 78px;

      overflow-x: auto;
      position: relative;

      &::before,
      &::after {
        content: "";

        position: fixed;
        top: 0;
        bottom: 0;

        height: 100%;
        width: 100px;
      }

      &::before {
        background: linear-gradient(to right, #1e1e1e, hsla(0, 0%, 12%, 0));
      }

      &::after {
        right: 0px;
        background: linear-gradient(to left, #1e1e1e, hsla(0, 0%, 12%, 0));
      }
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .breakpoints-container {
      display: flex;
      gap: 78px;
    }
  }
</style>
