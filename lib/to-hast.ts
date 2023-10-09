import type { Handler } from 'mdast-util-to-hast';
import type { Element } from 'hast';
import { u } from 'unist-builder';
import { types } from 'micromark-extension-definition-list';
import type {
  DefListNode as MdastDefList,
  DefListTermNode as MdastDefListTerm,
  DefListDescriptionNode as MdastDefListDescription,
} from './types.js';

export const mdastDefList2hast: Handler = (state, node: MdastDefList, _parent) => {
  const items = state.all(node);
  const children = [];
  for (let i = 0; i < items.length; i++) {
    children.push(u('text', '\n'));
    children.push(items[i]);
  }
  if (items.length > 0) {
    children.push(u('text', '\n'));
  }

  const result: Element = { type: 'element', tagName: 'dl', children, properties: {} };
  state.patch(node, result);
  return result;
};

export const mdastDefListTerm2hast: Handler = (state, node: MdastDefListTerm, _parent) => {
  const result: Element = {
    type: 'element',
    tagName: 'dt',
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return result;
};

export const mdastDefListDescription2hast: Handler = (
  state,
  node: MdastDefListDescription,
  _parent,
) => {
  const children = [];
  const tmpChildren = state.all(node);

  for (let i = 0; i < tmpChildren.length; i++) {
    const child = tmpChildren[i];

    if (node.spread || i !== 0 || child.type !== 'element' || child.tagName !== 'p') {
      children.push(u('text', '\n'));
    }
    if (!node.spread && child.type === 'element' && child.tagName === 'p') {
      children.push(...child.children);
    } else {
      children.push(child);
    }
  }

  const tail = children[children.length - 1];
  if (tail && (node.spread || !('tagName' in tail) || tail.tagName !== 'p')) {
    children.push(u('text', '\n'));
  }

  const result: Element = { type: 'element', tagName: 'dd', properties: {}, children };
  state.patch(node, result);
  return result;
};

export const defListHastHandlers = {
  [types.defList]: mdastDefList2hast,
  [types.defListTerm]: mdastDefListTerm2hast,
  [types.defListDescription]: mdastDefListDescription2hast,
};
