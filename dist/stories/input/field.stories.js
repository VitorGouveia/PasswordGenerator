import Field from "../../components/input/field.svelte.js";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Design System/Dark/Input/Field",
  component: Field,
};

const Template = (args) => ({
  component: Field,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Lorem Ipsum Label",
  placeholder: "ex: Lorem Ipsum",
  disabled: false,
};

export const Box = Template.bind({});
Box.args = {
  variant: "box",
  label: "Lorem Ipsum Label",
  placeholder: "ex: Lorem Ipsum",
  disabled: false,
};

export const Errrored = Template.bind({});
Errrored.args = {
  variant: "box",
  label: "Lorem Ipsum Label",
  placeholder: "ex: Lorem Ipsum",
  disabled: false,
  error: {
    message: "bruh",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "primary",
  label: "Lorem Ipsum Label",
  placeholder: "ex: Lorem Ipsum",
  disabled: true,
};
