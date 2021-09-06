import { all, Handler } from 'mdast-util-to-hast';
import { u } from 'unist-builder';
import { types } from 'micromark-extension-definition-list';

export const mdastDefList2hast: Handler = (h, node, _parent) => {
  const items = all(h, node);
  const children = [];
  for (let i = 0; i < items.length; i++) {
    children.push(u('text', '\n'));
    children.push(items[i]);
  }
  if (items.length > 0) {
    children.push(u('text', '\n'));
  }
  return h(node, 'dl', {}, children);
};

export const mdastDefListTerm2hast: Handler = (h, node, _parent) => {
  return h(node, 'dt', {}, all(h, node));
};

export const mdastDefListDescription2hast: Handler = (h, node, _parent) => {
  const children = [];
  const tmpChildren = all(h, node);
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

  return h(node, 'dd', {}, children);
};

export const defListHastHandlers = {
  [types.defList]: mdastDefList2hast,
  [types.defListTerm]: mdastDefListTerm2hast,
  [types.defListDescription]: mdastDefListDescription2hast,
};
