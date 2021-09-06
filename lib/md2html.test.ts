import { defListHastHandlers } from './to-hast';
import { defListFromMarkdown } from './from-markdown';

import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { defList } from 'micromark-extension-definition-list';

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

test('markdown -> mdast: tight description', () => {
  const md = `
Test for defList.

Apple
:   Pomaceous fruit of plants of the genus Malus in
    the family Rosaceae.

Orange
:   The fruit of an evergreen tree of the genus Citrus.
`;
  const expected = `<p>Test for defList.</p>
<dl><dt>Apple</dt>
<dd>Pomaceous fruit of plants of the genus Malus in
the family Rosaceae.
</dd>
<dt>Orange</dt>
<dd>The fruit of an evergreen tree of the genus Citrus.
</dd>
</dl>`;
  expect(md2html(md)).toBe(expected);
});

test('markdown -> mdast: spread description', () => {
  const md = `
Test for defList.

Apple

:   Pomaceous fruit of plants of the genus Malus in
    the family Rosaceae.

Orange

:   The fruit of an evergreen tree of the genus Citrus.
`;
  const expected = `<p>Test for defList.</p>
<dl><dt>Apple</dt>
<dd>
<p>Pomaceous fruit of plants of the genus Malus in
the family Rosaceae.</p>
</dd>
<dt>Orange</dt>
<dd>
<p>The fruit of an evergreen tree of the genus Citrus.</p>
</dd>
</dl>`;
  expect(md2html(md)).toBe(expected);
});
