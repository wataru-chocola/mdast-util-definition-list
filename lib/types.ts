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
  interface RootContentMap {
    deflist: DefListNode;
    // mdast.RootContent contains all nodes even if they are not suppose to be children of Root.
    deflistTerm: DefListTermNode;
    deflistDescription: DefListDescriptionNode;
  }

  interface BlockContentMap {
    deflist: DefListNode;
    deflistTerm: DefListTermNode;
    deflistDescription: DefListDescriptionNode;
  }

  interface PhrasingContentMap {
    deflistTerm: DefListTermNode;
  }
}
