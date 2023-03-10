import type { Handle, Join, Options } from 'mdast-util-to-markdown';

declare module 'mdast-util-to-markdown' {
  interface ConstructNameMap {
    defList: 'defList';
    defListTerm: 'defListTerm';
    defListDescription: 'defListDescription';
  }
}

const defListHandler: Handle = (node, _parent, state, info) => {
  const exit = state.enter('defList');
  const value = state.containerFlow(node, info);
  exit();
  return value;
};

const defListTermHandler: Handle = (node, _parent, state, info) => {
  const exit = state.enter('defListTerm');
  const subexit = state.enter('phrasing');
  const value = state.containerPhrasing(node, { ...info, before: '\n', after: '\n' });
  subexit();
  exit();
  return value;
};

const defListDescriptionHandler: Handle = (node, _parent, state, info) => {
  const exit = state.enter('defListDescription');
  const value = state.indentLines(state.containerFlow(node, info), map);
  exit();
  return value;

  function map(line: string, index: number, blank: boolean) {
    if (index) {
      return blank ? '' : ' '.repeat(4) + line;
    }

    return blank ? ':' + ' '.repeat(3) : ':' + ' '.repeat(3) + line;
  }
};

const joinDefItems: Join = (left, right, parent, _state) => {
  if (parent.type !== 'defList') {
    return;
  }
  if (left.type === 'defListDescription' && right.type === 'defListTerm') {
    return 1;
  }
  return 'spread' in right && right.spread ? 1 : 0;
};

export const defListToMarkdown: Options = {
  join: [joinDefItems],
  unsafe: [{ character: ':', atBreak: true, after: '(?:[ \t\r\n])' }],
  handlers: {
    defList: defListHandler,
    defListTerm: defListTermHandler,
    defListDescription: defListDescriptionHandler,
  },
};
