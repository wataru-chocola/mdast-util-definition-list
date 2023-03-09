import type { Node } from 'unist';
import type { Parent, PhrasingContent, BlockContent, DefinitionContent } from 'mdast';

type FlowContent = BlockContent | DefinitionContent;

export const DefList = 'defList';
export const DefListTerm = 'defListTerm';
export const DefListDescription = 'defListDescription';

export interface DefListNode extends Node {
  type: typeof DefList;
  children: (DefListTermNode | DefListDescriptionNode)[];
}
export interface DefListTermNode extends Parent {
  type: typeof DefListTerm;
  children: PhrasingContent[];
}
export interface DefListDescriptionNode extends Parent {
  type: typeof DefListDescription;
  spread: boolean;
  children: FlowContent[];
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
