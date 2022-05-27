import Footer from "../components/footer/index.svelte.js";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Design System/Dark/Footer",
  component: Footer,
};

const Template = (args) => ({
  component: Footer,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
