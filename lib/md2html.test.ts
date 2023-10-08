import { test, expect } from 'vitest';

import { defListHastHandlers } from './to-hast';
import { defListFromMarkdown } from './from-markdown';

import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { defList } from 'micromark-extension-definition-list';

import { dedent } from 'ts-dedent';

const md2html = (md: string) => {
  const mdast = fromMarkdown(md, {
    extensions: [defList],
    mdastExtensions: [defListFromMarkdown],
  });
  const hast = toHast(mdast, {
    handlers: defListHastHandlers,
  });
  return hast != null ? toHtml(hast) : '';
};

test('markdown -> html: tight description', () => {
  const md = `
  Test for defList.

  Apple
  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange
  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const expected = `
  <p>Test for defList.</p>
  <dl>
  <dt>Apple</dt>
  <dd>Pomaceous fruit of plants of the genus Malus in
  the family Rosaceae.
  </dd>
  <dt>Orange</dt>
  <dd>The fruit of an evergreen tree of the genus Citrus.
  </dd>
  </dl>`;
  expect(md2html(dedent(md))).toBe(dedent(expected));
});

test('markdown -> html: spread description', () => {
  const md = `
  Test for defList.

  Apple

  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange

  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const expected = `
  <p>Test for defList.</p>
  <dl>
  <dt>Apple</dt>
  <dd>
  <p>Pomaceous fruit of plants of the genus Malus in
  the family Rosaceae.</p>
  </dd>
  <dt>Orange</dt>
  <dd>
  <p>The fruit of an evergreen tree of the genus Citrus.</p>
  </dd>
  </dl>`;
  expect(md2html(dedent(md))).toBe(dedent(expected));
});

test('markdown -> html: containing other elements', () => {
  const md = `
  Term 1

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
  const expected = `
  <dl>
  <dt>Term 1</dt>
  <dd>
  <p>This is a definition with two paragraphs. Lorem ipsum
  dolor sit amet, consectetuer adipiscing elit. Aliquam
  hendrerit mi posuere lectus.</p>
  <p>Vestibulum enim wisi, viverra nec, fringilla in, laoreet
  vitae, risus.</p>
  </dd>
  <dd>
  <p>Second definition for term 1, also wrapped in a paragraph
  because of the blank line preceding it.</p>
  </dd>
  <dt>Term 2</dt>
  <dd>
  <p>This definition has a code block, a blockquote and a list.</p>
  <pre><code>code block.
  </code></pre>
  <blockquote>
  <p>block quote
  on two lines.</p>
  </blockquote>
  <ol>
  <li>first list item</li>
  <li>second list item</li>
  </ol>
  </dd>
  </dl>`;
  expect(md2html(dedent(md))).toBe(dedent(expected));
});
