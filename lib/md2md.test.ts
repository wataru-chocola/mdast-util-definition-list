import { defListFromMarkdown } from './from-markdown';
import { defListToMarkdown } from './to-markdown';

import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { defList } from 'micromark-extension-definition-list';

const md2md = (md: string) => {
  const mdast = fromMarkdown(md, {
    extensions: [defList],
    mdastExtensions: [defListFromMarkdown],
  });
  return toMarkdown(mdast, {
    extensions: [defListToMarkdown],
  });
};

test('md -> mdast -> md', () => {
  const md = `Term 1

:   This is a definition with two paragraphs. Lorem ipsum
    dolor sit amet, consectetuer adipiscing elit. Aliquam
    hendrerit mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus.

:   Second definition for term 1, also wrapped in a paragraph
    because of the blank line preceding it.

Term 2

:   This definition has a code block, a blockquote and a list.

        code block.

    > block quote
    > on two lines.

    1.  first list item
    2.  second list item
`;
  expect(md2md(md)).toBe(md);
});

test('nested defList', () => {
  const md = `Term 1

:   This is a definition wrapped by paragraph.

    Nested term 1
    :   Nested description here.
        And next line.

    Nested term 2
    :   Description 2.

:   Description.

Term 2

:   Description.
`;
  expect(md2md(md)).toBe(md);
});
