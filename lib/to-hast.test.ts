import { toHast } from 'mdast-util-to-hast';
import { defListHastHandlers } from './to-hast';

const mdast2hast = (mdast: any) => {
  return toHast(mdast, {
    handlers: defListHastHandlers,
  });
};

test('mdast to hast', () => {
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
              start: { column: 1, line: 5, offset: 26 },
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
              start: { column: 1, line: 9, offset: 111 },
              end: { column: 1, line: 10, offset: 167 },
            },
          },
        ],
        position: {
          start: { column: 1, line: 4, offset: 20 },
          end: { column: 1, line: 10, offset: 167 },
        },
      },
    ],
    position: {
      start: { column: 1, line: 1, offset: 0 },
      end: { column: 1, line: 10, offset: 167 },
    },
  };
  const expected = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: {},
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
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'dl',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'dt',
            properties: {},
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
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'dd',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Pomaceous fruit of plants of the genus Malus in\nthe family Rosaceae.',
                position: {
                  start: { column: 5, line: 5, offset: 30 },
                  end: { column: 25, line: 6, offset: 102 },
                },
              },
              {
                type: 'text',
                value: '\n',
              },
            ],
            position: {
              start: { column: 1, line: 5, offset: 26 },
              end: { column: 1, line: 8, offset: 104 },
            },
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'dt',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Orange',
                position: {
                  start: { column: 1, line: 8, offset: 104 },
                  end: { column: 7, line: 8, offset: 110 },
                },
              },
            ],
            position: {
              start: { column: 1, line: 8, offset: 104 },
              end: { column: 1, line: 9, offset: 111 },
            },
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'dd',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'The fruit of an evergreen tree of the genus Citrus.',
                position: {
                  start: { column: 5, line: 9, offset: 115 },
                  end: { column: 56, line: 9, offset: 166 },
                },
              },
              {
                type: 'text',
                value: '\n',
              },
            ],
            position: {
              start: { column: 1, line: 9, offset: 111 },
              end: { column: 1, line: 10, offset: 167 },
            },
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
        position: {
          start: { column: 1, line: 4, offset: 20 },
          end: { column: 1, line: 10, offset: 167 },
        },
      },
    ],
    position: {
      start: { column: 1, line: 1, offset: 0 },
      end: { column: 1, line: 10, offset: 167 },
    },
  };
  const result = mdast2hast(mdast);
  expect(result).toEqual(expected);
});
