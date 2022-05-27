import Button from "../components/button/index.svelte.js";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Design System/Dark/Button",
  component: Button,
};

const Template = (args) => ({
  component: Button,
  props: {
    ...args,
    label: "Lorem Ipsum",
  },
});

export const Solid = Template.bind({});
Solid.args = {
  variant: "solid",
};

export const NeoExpertise = Template.bind({});
NeoExpertise.args = {
  variant: "NeoExpertise",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
};

export const MoonKnight = Template.bind({});
MoonKnight.args = {
  variant: "MoonKnight",
};
