import type { Handle, Join, Options } from 'mdast-util-to-markdown';
import { containerPhrasing } from 'mdast-util-to-markdown/lib/util/container-phrasing.js';
import { containerFlow } from 'mdast-util-to-markdown/lib/util/container-flow.js';
import { indentLines } from 'mdast-util-to-markdown/lib/util/indent-lines.js';

const defListHandler: Handle = (node, _parent, context) => {
  const exit = context.enter('defList');
  const value = containerFlow(node, context);
  exit();
  return value;
};

const defListTermHandler: Handle = (node, _parent, context) => {
  const exit = context.enter('defListTerm');
  const subexit = context.enter('phrasing');
  const value = containerPhrasing(node, context, { before: '\n', after: '\n' });
  subexit();
  exit();
  return value;
};

const defListDescriptionHandler: Handle = (node, _parent, context) => {
  const exit = context.enter('defListDescription');
  const value = indentLines(containerFlow(node, context), map);
  exit();
  return value;

  function map(line: string, index: number, blank: boolean) {
    if (index) {
      return blank ? '' : ' '.repeat(4) + line;
    }

    return blank ? ':' + ' '.repeat(3) : ':' + ' '.repeat(3) + line;
  }
};

const joinDefItems: Join = (left, right, parent, _context) => {
  // @ts-ignore
  if (parent.type !== 'defList') {
    return;
  }
  // @ts-ignore
  if (left.type === 'defListDescription' && right.type === 'defListTerm') {
    return 1;
  }
  return 'spread' in right && right.spread ? 1 : 0;
};

export const defListToMarkdown: Options = {
  join: [joinDefItems],
  unsafe: [{ character: ':', atBreak: true, inConstruct: ['defListTerm'] }],
  handlers: {
    defList: defListHandler,
    defListTerm: defListTermHandler,
    defListDescription: defListDescriptionHandler,
  },
};
