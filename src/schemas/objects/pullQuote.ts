import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pullQuote',
  title: 'Wyróżniony cytat',
  type: 'object',
  fields: [
    defineField({ name: 'quote', type: 'text', title: 'Cytat', rows: 3, validation: r => r.required() }),
    defineField({ name: 'attribution', type: 'string', title: 'Autor / źródło' }),
  ],
  preview: {
    select: { title: 'quote', subtitle: 'attribution' },
  },
});
