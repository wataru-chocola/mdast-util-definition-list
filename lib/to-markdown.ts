import type { Handle } from 'mdast-util-to-markdown';

const defListHandler: Handle = (node, _parent, context) => {
  return '';
};

const defListTermHandler: Handle = (node, _parent, context) => {
  return '';
};

const defListDescriptionHandler: Handle = (node, _parent, context) => {
  return '';
};

export const defListToMarkdown = {
  handlers: {
    defList: defListHandler,
    defListTerm: defListTermHandler,
    defListDescription: defListDescriptionHandler,
  },
};
