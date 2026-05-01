import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'saint',
  title: 'Święty / Błogosławiony',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Imię', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'rank',
      type: 'string',
      title: 'Stopień',
      options: {
        list: [
          { title: 'Święty', value: 'swiety' },
          { title: 'Błogosławiony', value: 'blogoslawiony' },
          { title: 'Sługa Boży', value: 'sluga-bozy' },
          { title: 'Czcigodny', value: 'czcigodny' },
        ],
      },
    }),
    defineField({ name: 'birthYear', type: 'number', title: 'Rok urodzenia' }),
    defineField({ name: 'deathYear', type: 'number', title: 'Rok śmierci' }),
    defineField({
      name: 'feastDay',
      type: 'string',
      title: 'Wspomnienie liturgiczne (np. „23.IX")',
    }),
    defineField({
      name: 'patronOf',
      type: 'array',
      title: 'Patron',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'incorrupt', type: 'boolean', title: 'Nierozłożone ciało' }),
    defineField({ name: 'stigmata', type: 'boolean', title: 'Stygmaty' }),
    defineField({ name: 'bilocation', type: 'boolean', title: 'Bilokacja' }),
    defineField({ name: 'portrait', type: 'image', title: 'Portret', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Galeria',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'shortBio', type: 'text', title: 'Krótka biografia', rows: 3 }),
    defineField({ name: 'fullBio', type: 'richText', title: 'Pełna biografia' }),
    defineField({
      name: 'famousQuotes',
      type: 'array',
      title: 'Słynne cytaty',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'pl', type: 'text', title: 'Cytat (PL)' },
            { name: 'source', type: 'string', title: 'Źródło' },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'rank', media: 'portrait' },
  },
});
