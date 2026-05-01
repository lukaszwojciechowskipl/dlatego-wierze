import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'glossaryTerm',
  title: 'Termin słownikowy',
  type: 'document',
  fields: [
    defineField({ name: 'term', type: 'string', title: 'Termin (PL)', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'term', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'pronunciation',
      type: 'string',
      title: 'Wymowa (zapis fonetyczny)',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Kategoria',
      options: {
        list: [
          { title: 'Filozoficzny', value: 'filozoficzny' },
          { title: 'Teologiczny', value: 'teologiczny' },
          { title: 'Liturgiczny', value: 'liturgiczny' },
          { title: 'Biblijny', value: 'biblijny' },
          { title: 'Historyczny', value: 'historyczny' },
        ],
      },
    }),
    defineField({
      name: 'shortDefinition',
      type: 'text',
      title: 'Definicja krótka (1-2 zdania)',
      rows: 2,
      validation: r => r.required(),
    }),
    defineField({ name: 'fullExplanation', type: 'richText', title: 'Pełne wyjaśnienie' }),
    defineField({
      name: 'relatedTerms',
      type: 'array',
      title: 'Powiązane terminy',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'sources',
      type: 'array',
      title: 'Źródła',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Tytuł' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'term', subtitle: 'category' },
  },
});
