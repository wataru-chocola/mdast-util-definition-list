import { defListToMarkdown } from './to-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { dedent } from 'ts-dedent';

const compile = (mdast: any) =>
  toMarkdown(mdast, {
    extensions: [defListToMarkdown],
  });

test('mdast -> markdown: basic', () => {
  const mdast = {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Test for defList.',
          },
        ],
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
              },
            ],
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
                  },
                ],
              },
            ],
          },
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: 'Orange',
              },
            ],
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
              },
            ],
          },
        ],
      },
    ],
  };
  const md = `
  Test for defList.

  Apple
  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange
  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const result = compile(mdast);
  expect(result).toEqual(dedent(md) + '\n');
});

test('mdast -> markdown: multiples items, spreading', () => {
  const mdast = {
    type: 'root',
    children: [
      {
        type: 'defList',
        children: [
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: 'Apple',
              },
            ],
          },
          {
            type: 'defListDescription',
            spread: true,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    value: 'Pomaceous fruit of plants of the genus Malus in\nthe family Rosaceae.',
                  },
                ],
              },
            ],
          },
          {
            type: 'defListDescription',
            spread: true,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    value: 'Pomaceous fruit of plants of the genus Malus in\nthe family Rosaceae.',
                  },
                ],
              },
            ],
          },
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: 'Orange1',
              },
            ],
          },
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: 'Orange2',
              },
            ],
          },
          {
            type: 'defListDescription',
            spread: true,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    value: 'The fruit of an evergreen tree of the genus Citrus.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const md = `
  Apple

  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange1
  Orange2

  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const result = compile(mdast);
  expect(result).toEqual(dedent(md) + '\n');
});

test('mdast -> markdown: unsafe (1)', () => {
  const mdast = {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Test for defList.',
          },
        ],
      },
      {
        type: 'defList',
        children: [
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: ': Apple',
              },
            ],
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
                  },
                ],
              },
            ],
          },
          {
            type: 'defListTerm',
            children: [
              {
                type: 'text',
                value: 'Orange:',
              },
            ],
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
              },
            ],
          },
        ],
      },
    ],
  };
  const md = `Test for defList.

  \\: Apple
  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange:
  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const result = compile(mdast);
  expect(result).toEqual(dedent(md) + '\n');
});

test('mdast -> markdown: unsafe (2)', () => {
  const mdast = {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Not Term',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: ': Not Definition.',
          },
        ],
      },
    ],
  };
  const md = `
  Not Term

  \\: Not Definition.
  `;
  const result = compile(mdast);
  expect(result).toEqual(dedent(md) + '\n');
});
