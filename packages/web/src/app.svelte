<script lang="ts">
  /* component logic will go here */
  import { generatePassword } from "@password-generator/core";

  console.log(
    generatePassword({
      length: 20,
    })
  );
</script>

<div class="App">
  <header class="App-header">
    <a
      class="App-link"
      href="https://svelte.dev"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn Svelte
    </a>
  </header>
</div>

<style>
  /* css will go here */
</style>
