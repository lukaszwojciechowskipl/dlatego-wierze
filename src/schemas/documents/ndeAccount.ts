import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ndeAccount',
  title: 'NDE / wizja',
  type: 'document',
  fields: [
    defineField({
      name: 'personName',
      type: 'string',
      title: 'Imię osoby świadczącej',
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
      name: 'kind',
      type: 'string',
      title: 'Rodzaj doświadczenia',
      options: {
        list: [
          { title: 'Doświadczenie z pogranicza śmierci (NDE)', value: 'nde' },
          { title: 'Wizja Chrystusa', value: 'wizja-chrystusa' },
          { title: 'Wizja Maryi', value: 'wizja-maryi' },
          { title: 'Doświadczenie nawrócenia muzułmanina', value: 'nawrocenie-muzulmanina' },
          { title: 'Inne nadprzyrodzone', value: 'inne' },
        ],
      },
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Pochodzenie / kontekst',
      description: 'np. „muzułmanin", „ateista przed NDE", „buddysta"',
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok zdarzenia' }),
    defineField({ name: 'country', type: 'string', title: 'Kraj' }),
    defineField({ name: 'shortSummary', type: 'text', title: 'Krótkie streszczenie', rows: 3 }),
    defineField({ name: 'fullStory', type: 'richText', title: 'Pełne świadectwo' }),
    defineField({
      name: 'medicalContext',
      type: 'text',
      title: 'Kontekst medyczny (dla NDE)',
      rows: 3,
    }),
    defineField({ name: 'sourceUrl', type: 'url', title: 'Źródło online' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'YouTube / Vimeo' }),
    defineField({ name: 'portrait', type: 'image', title: 'Portret', options: { hotspot: true } }),
    defineField({
      name: 'verified',
      type: 'boolean',
      title: 'Świadectwo zweryfikowane',
      initialValue: false,
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'personName', subtitle: 'kind', media: 'portrait' },
  },
});
