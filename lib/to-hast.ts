import { Handler } from 'mdast-util-to-hast';
import { types } from 'micromark-extension-definition-list';

export const mdastDefList2hast: Handler = (h, node, parent) => {
  return null;
};

export const mdastDefListTerm2hast: Handler = (h, node, parent) => {
  return null;
};

export const mdastDefListDescription2hast: Handler = (h, node, parent) => {
  return null;
};

export const defListHastHandlers = {
  [types.defList]: mdastDefList2hast,
  [types.defListTerm]: mdastDefListTerm2hast,
  [types.defListDescription]: mdastDefListDescription2hast,
};
