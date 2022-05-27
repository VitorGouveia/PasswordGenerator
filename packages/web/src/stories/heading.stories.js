import Heading from "../components/heading.svelte";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Design System/Dark/Heading",
  component: Heading,
};

const Template = (args) => ({
  component: Heading,
  props: {
    ...args,
    label: "Lorem Ipsum",
  },
});

export const Title = Template.bind({});
Title.args = {
  variant: "title",
};

export const Subtitle = Template.bind({});
Subtitle.args = {
  variant: "subtitle",
};

export const Suptitle = Template.bind({});
Suptitle.args = {
  variant: "suptitle",
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  variant: "paragraph",
};
