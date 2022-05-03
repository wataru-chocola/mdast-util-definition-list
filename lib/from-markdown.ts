import type { CompileContext, Token } from 'mdast-util-from-markdown';

export const defListFromMarkdown = {
  enter: {
    defList: enterDefList,
    defListTerm: enterDefListTerm,
    defListDescription: enterDefListDescription,
  },
  exit: {
    defList: exitDefList,
    defListTerm: exitDefListTerm,
    defListDescription: exitDefListDescription,
  },
};

function enterDefList(this: CompileContext, token: Token): void {
  this.enter({ type: 'defList', children: [] }, token);
}

function exitDefList(this: CompileContext, token: Token): void {
  this.exit(token);
}

function enterDefListTerm(this: CompileContext, token: Token): void {
  this.enter({ type: 'defListTerm', children: [] }, token);
}

function exitDefListTerm(this: CompileContext, token: Token): void {
  this.exit(token);
}

function enterDefListDescription(this: CompileContext, token: Token): void {
  this.enter({ type: 'defListDescription', spread: Boolean(token._loose), children: [] }, token);
}

function exitDefListDescription(this: CompileContext, token: Token): void {
  this.exit(token);
}
