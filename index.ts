import type { CompileContext, Token } from 'mdast-util-from-markdown';
import type { Parent } from 'mdast';

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
export const defListToMarkdown = {};

interface DefListNode extends Node {
  type: 'defList';
  children: (DefListTermNode | DefListDescriptionNode)[];
}
interface DefListTermNode extends Parent {
  type: 'defListTerm';
  children: [];
}
interface DefListDescriptionNode extends Parent {
  type: 'defListDescription';
  spread: boolean;
  children: [];
}

function enterDefList(this: CompileContext, token: Token): void {
  // @ts-ignore
  this.enter<DefListNode>({ type: 'defList', children: [] }, token);
}

function exitDefList(this: CompileContext, token: Token): void {
  this.exit(token);
}

function enterDefListTerm(this: CompileContext, token: Token): void {
  // @ts-ignore
  this.enter<DefListTermNode>({ type: 'defListTerm', children: [] }, token);
}

function exitDefListTerm(this: CompileContext, token: Token): void {
  this.exit(token);
}

function enterDefListDescription(this: CompileContext, token: Token): void {
  // @ts-ignore
  this.enter<DefListDescriptionNode>(
    { type: 'defListDescription', spread: Boolean(token._loose), children: [] },
    token,
  );
}

function exitDefListDescription(this: CompileContext, token: Token): void {
  this.exit(token);
}
