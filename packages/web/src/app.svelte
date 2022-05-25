<script lang="ts">
  /* component logic will go here */
  import { Router, Link, Route } from "svelte-navigator";
  import { generatePassword } from "@password-generator/core";

  console.log(
    generatePassword({
      length: 20,
    })
  );
</script>

<Router basepath="/PasswordGenerator">
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="blog">Blog</Link>
  </nav>
  <div>
    <Route path="/">
      <div>
        <p>hello home</p>
      </div>
    </Route>
    <!-- <Route path="about" component={About} /> -->
    <!-- <Route path="about" component={About} /> -->
    <Route path="blog/*">
      <Route path="/">
        <div>
          <p>hello blog</p>
        </div>
      </Route>
    </Route>
  </div>
</Router>

<style>
  /* css will go here */
</style>
