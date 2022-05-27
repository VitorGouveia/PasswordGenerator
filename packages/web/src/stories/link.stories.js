import Link from "../components/link.svelte";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Design System/Dark/Link",
  component: Link,
};

const Template = (args) => ({
  component: Link,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  href: "/",
  label: "My label",
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  href: "/",
  label: "Active Label",
  active: true,
};
