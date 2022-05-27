import Checkbox from "../../components/input/checkbox.svelte";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Design System/Dark/Input/Checkbox",
  component: Checkbox,
};

const Template = (args) => ({
  component: Checkbox,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};
