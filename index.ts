// @ts-nocheck
import type { CompileContext, Token } from 'mdast-util-from-markdown';
import type { Root, Content, Parent } from 'mdast';

export const definitionListFromMarkdown = {
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
export const definitionListtoMarkdown = {};

interface DefListNode extends Parent {
  type: 'defList';
  children: [];
}
interface DefListTermNode extends Parent {
  type: 'defListTerm';
  children: [];
}
interface DefListDescriptionNode extends Parent {
  type: 'defListDescription';
  children: [];
}
type ExtendedNode = DefListNode;

function enterDefList(this: CompileContext, token: Token): void {
  this.enter<DefListNode>({ type: 'defList', children: [] }, token);
}

function exitDefList(this: CompileContext, token: Token): void {
  this.exit(token);
}

function enterDefListTerm(this: CompileContext, token: Token): void {
  this.enter<DefListTermNode>({ type: 'defListTerm', children: [] }, token);
}

function exitDefListTerm(this: CompileContext, token: Token): void {
  this.exit(token);
}

function enterDefListDescription(this: CompileContext, token: Token): void {
  this.enter<DefListDescriptionNode>({ type: 'defListDescription', children: [] }, token);
}

function exitDefListDescription(this: CompileContext, token: Token): void {
  this.exit(token);
}
