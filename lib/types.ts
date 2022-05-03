import type { Node } from 'unist';
import type { Parent } from 'mdast';

export interface DefListNode extends Node {
  type: 'defList';
  children: (DefListTermNode | DefListDescriptionNode)[];
}
export interface DefListTermNode extends Parent {
  type: 'defListTerm';
  children: [];
}
export interface DefListDescriptionNode extends Parent {
  type: 'defListDescription';
  spread: boolean;
  children: [];
}

declare module 'mdast' {
  // module augmentation
  interface BlockContentMap {
    deflist: DefListNode;

    // HACK: these are NOT block contents
    deflistterm: DefListTermNode;
    deflistdescription: DefListDescriptionNode;
  }
}
