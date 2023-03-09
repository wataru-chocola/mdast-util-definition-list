import { defListFromMarkdown } from './from-markdown';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { defList } from 'micromark-extension-definition-list';
import { dedent } from 'ts-dedent';

const compile = (md: string) =>
  fromMarkdown(md, {
    extensions: [defList],
    mdastExtensions: [defListFromMarkdown],
  });

test('markdown -> mdast', () => {
  const md = `
  Test for defList.

  Apple
  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange
  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const mdast = {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Test for defList.',
            position: {
              start: { column: 1, line: 2, offset: 1 },
              end: { column: 18, line: 2, offset: 18 },
            },
          },
        ],
        position: {
          start: { column: 1, line: 2, offset: 1 },
          end: { column: 18, line: 2, offset: 18 },
        },
      },
      {
        type: 'defList',
        children: [
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: 'Apple',
                position: {
                  start: { column: 1, line: 4, offset: 20 },
                  end: { column: 6, line: 4, offset: 25 },
                },
              },
            ],
            position: {
              start: { column: 1, line: 4, offset: 20 },
              end: { column: 1, line: 5, offset: 26 },
            },
          },
          {
            type: 'defListDescription',
            spread: false,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    value: 'Pomaceous fruit of plants of the genus Malus in\nthe family Rosaceae.',
                    position: {
                      start: { column: 5, line: 5, offset: 30 },
                      end: { column: 25, line: 6, offset: 102 },
                    },
                  },
                ],
                position: {
                  start: { column: 5, line: 5, offset: 30 },
                  end: { column: 25, line: 6, offset: 102 },
                },
              },
            ],
            position: {
              start: { column: 5, line: 5, offset: 30 },
              end: { column: 1, line: 8, offset: 104 },
            },
          },
          {
            type: 'defListTerm',
            children: [
              {
                position: {
                  start: { column: 1, line: 8, offset: 104 },
                  end: { column: 7, line: 8, offset: 110 },
                },
                type: 'text',
                value: 'Orange',
              },
            ],
            position: {
              start: { column: 1, line: 8, offset: 104 },
              end: { column: 1, line: 9, offset: 111 },
            },
          },
          {
            type: 'defListDescription',
            spread: false,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    value: 'The fruit of an evergreen tree of the genus Citrus.',
                    position: {
                      start: { column: 5, line: 9, offset: 115 },
                      end: { column: 56, line: 9, offset: 166 },
                    },
                  },
                ],
                position: {
                  start: { column: 5, line: 9, offset: 115 },
                  end: { column: 56, line: 9, offset: 166 },
                },
              },
            ],
            position: {
              start: { column: 5, line: 9, offset: 115 },
              end: { column: 56, line: 9, offset: 166 },
            },
          },
        ],
        position: {
          start: { column: 1, line: 4, offset: 20 },
          end: { column: 56, line: 9, offset: 166 },
        },
      },
    ],
    position: {
      start: { column: 1, line: 1, offset: 0 },
      end: { column: 56, line: 9, offset: 166 },
    },
  };
  const result = compile('\n' + dedent(md));
  expect(result).toEqual(mdast);
});
