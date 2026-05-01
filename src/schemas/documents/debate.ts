import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'debate',
  title: 'Debata apologetyczna',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Tytuł debaty', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'topic',
      type: 'string',
      title: 'Temat',
      description: 'np. „Czy Bóg istnieje?", „Czy chrześcijaństwo jest prawdą?"',
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok' }),
    defineField({ name: 'place', type: 'string', title: 'Miejsce / uczelnia' }),
    defineField({
      name: 'apologist',
      type: 'object',
      title: 'Apologeta (strona broniąca chrześcijaństwa)',
      fields: [
        { name: 'name', type: 'string', title: 'Imię i nazwisko' },
        { name: 'affiliation', type: 'string', title: 'Afiliacja' },
        {
          name: 'reference',
          type: 'reference',
          title: 'Pełny profil (opcjonalnie)',
          to: [{ type: 'author' }, { type: 'famousPerson' }],
        },
      ],
    }),
    defineField({
      name: 'opponent',
      type: 'object',
      title: 'Oponent',
      fields: [
        { name: 'name', type: 'string', title: 'Imię i nazwisko' },
        { name: 'affiliation', type: 'string', title: 'Afiliacja' },
        { name: 'position', type: 'string', title: 'Stanowisko' },
      ],
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'YouTube / Vimeo URL',
    }),
    defineField({
      name: 'transcriptUrl',
      type: 'url',
      title: 'URL transkryptu',
    }),
    defineField({ name: 'shortSummary', type: 'text', title: 'Streszczenie', rows: 3 }),
    defineField({ name: 'keyArguments', type: 'richText', title: 'Kluczowe argumenty' }),
    defineField({ name: 'verdict', type: 'text', title: 'Wnioski / werdykt', rows: 3 }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'apologist.name', year: 'year' },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: [subtitle, year].filter(Boolean).join(' · '),
      };
    },
  },
});
