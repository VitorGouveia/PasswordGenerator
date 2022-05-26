module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ],
  addons: [
    "@storybook/theming",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "@storybook/addon-svelte-csf",
  ],
  framework: "@storybook/svelte",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  svelteOptions: {
    preprocess: require("../svelte.config.js").preprocess,
  },
};
