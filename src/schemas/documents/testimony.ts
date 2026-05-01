import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimony',
  title: 'Świadectwo',
  type: 'document',
  fields: [
    defineField({
      name: 'personName',
      type: 'string',
      title: 'Imię i nazwisko świadka',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'personName', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'shortSummary',
      type: 'text',
      title: 'Krótkie streszczenie (1-2 zdania)',
      rows: 2,
    }),
    defineField({
      name: 'kind',
      type: 'string',
      title: 'Rodzaj',
      options: {
        list: [
          { title: 'Nawrócenie', value: 'nawrocenie' },
          { title: 'Uzdrowienie', value: 'uzdrowienie' },
          { title: 'Wizja', value: 'wizja' },
          { title: 'Inne', value: 'inne' },
        ],
      },
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Pochodzenie / kontekst (np. ateista, muzułmanin, naukowiec)',
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok' }),
    defineField({ name: 'country', type: 'string', title: 'Kraj' }),
    defineField({ name: 'portrait', type: 'image', title: 'Portret', options: { hotspot: true } }),
    defineField({ name: 'fullStory', type: 'richText', title: 'Pełna historia' }),
    defineField({ name: 'sourceUrl', type: 'url', title: 'Źródło online' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'YouTube/Vimeo embed' }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tagi',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
    defineField({
      name: 'verified',
      type: 'boolean',
      title: 'Zweryfikowane',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'personName', subtitle: 'kind', media: 'portrait' },
  },
});
