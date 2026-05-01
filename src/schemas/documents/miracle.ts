import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'miracle',
  title: 'Cud (eucharystyczny / maryjny)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Tytuł', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      title: 'Rodzaj',
      options: {
        list: [
          { title: 'Eucharystyczny', value: 'eucharystyczny' },
          { title: 'Maryjny', value: 'maryjny' },
          { title: 'Inne', value: 'inne' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok' }),
    defineField({
      name: 'place',
      type: 'string',
      title: 'Miejsce (np. „Lanciano, Włochy")',
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      title: 'Współrzędne geograficzne (do mapy)',
    }),
    defineField({
      name: 'denomination',
      type: 'string',
      title: 'Tradycja / wyznanie świadczące',
      description: 'np. „Kościół katolicki", „prawosławny"',
    }),
    defineField({ name: 'shortDescription', type: 'text', title: 'Krótki opis', rows: 3 }),
    defineField({ name: 'scientificAnalysis', type: 'richText', title: 'Analiza naukowa' }),
    defineField({ name: 'fullStory', type: 'richText', title: 'Pełna historia' }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Galeria',
      of: [{ type: 'image', options: { hotspot: true } }],
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
    defineField({
      name: 'verifiedBy',
      type: 'string',
      title: 'Zweryfikowany przez (np. „Watykan", „lokalny biskup")',
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'place', media: 'gallery.0' },
  },
});
