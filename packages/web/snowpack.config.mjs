// @ts-check

/** @type {import("snowpack").SnowpackUserConfig} */
export default {
  mount: {
    /* ... */
    public: { url: "/", static: true },
    src: { url: "/dist" },
    "../core": "/@password-generator/core",
  },
  plugins: [
    /* ... */
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-typescript",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    bundle: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 3000,
    /* ... */
  },
  alias: {
    "@password-generator/core": "../core",
  },
  buildOptions: {
    baseUrl: "./",
    out: "dist",
    /* ... */
  },
};
