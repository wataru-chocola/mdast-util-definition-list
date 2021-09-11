# mdast-util-definition-list

[![Node.js CI](https://github.com/wataru-chocola/mdast-util-definition-list/actions/workflows/node.js.yml/badge.svg)](https://github.com/wataru-chocola/mdast-util-definition-list/actions/workflows/node.js.yml)

mdast extension for definition list

## Feature

This package provides mdast utilities to handle definition list with [micromark-extension-definition-list].

This includes:

* `defListFromMarkdown`: [mdast-util-from-markdown] extension (markdown -> mdast)
* `defListToMarkdown`: [mdast-util-to-markdown] extension (mdast -> markdown)
* `defListHastHandlers`: [mdast-util-to-hast] extension (mdast -> hast)

[micromark-extension-definition-list]: https://github.com/wataru-chocola/micromark-extension-definition-list
[mdast-util-from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown
[mdast-util-to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown
[mdast-util-to-hast]: https://github.com/syntax-tree/mdast-util-to-hast

## Install

From npm:

```console
$ npm install mdast-util-definition-list
```

## Use

```javascript
import {
  defListFromMarkdown,
  defListToMarkdown,
  defListHastHandlers,
} from 'mdast-util-definition-list';
import { defList } from 'micromark-extension-definition-list';

import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { toHast } from 'mdast-util-to-hast';

const md = `
Apple
:   Pomaceous fruit of plants of the genus Malus in
    the family Rosaceae.

Orange
:   The fruit of an evergreen tree of the genus Citrus.
`;

const mdast = fromMarkdown(md, {
  extensions: [defList],
  mdastExtensions: [defListFromMarkdown],
});
console.log(mdast);

const markdown = toMarkdown(mdast, {
    extensions: [defListToMarkdown],
});
console.log(markdown);


const hast = toHast(mdast, {
  handlers: defListHastHandlers,
});
console.log(hast);
``` 
