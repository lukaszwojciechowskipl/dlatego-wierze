import { defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'richText',
  title: 'Treść',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Akapit', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Cytat', value: 'blockquote' },
      ],
      lists: [
        { title: 'Lista punktowana', value: 'bullet' },
        { title: 'Lista numerowana', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Pogrubienie', value: 'strong' },
          { title: 'Kursywa', value: 'em' },
          { title: 'Kod', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Otwórz w nowej karcie' },
            ],
          },
          {
            name: 'sidenote',
            type: 'object',
            title: 'Notka boczna (Tufte)',
            fields: [{ name: 'text', type: 'text', title: 'Treść notki', rows: 3 }],
          },
          {
            name: 'citation',
            type: 'object',
            title: 'Cytat źródłowy',
            fields: [
              { name: 'author', type: 'string', title: 'Autor' },
              { name: 'work', type: 'string', title: 'Dzieło' },
              { name: 'page', type: 'string', title: 'Strona' },
              { name: 'url', type: 'url', title: 'URL' },
            ],
          },
          {
            name: 'crossRef',
            type: 'object',
            title: 'Odnośnik wewnętrzny',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'argument' },
                  { type: 'saint' },
                  { type: 'testimony' },
                  { type: 'miracle' },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: 'Podpis' },
        { name: 'alt', type: 'string', title: 'Tekst alternatywny' },
      ],
    }),
    defineArrayMember({ type: 'statistic' }),
    defineArrayMember({ type: 'pullQuote' }),
  ],
});
