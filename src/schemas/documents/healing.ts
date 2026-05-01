import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'healing',
  title: 'Uzdrowienie',
  type: 'document',
  fields: [
    defineField({
      name: 'personName',
      type: 'string',
      title: 'Imię osoby uzdrowionej',
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
      name: 'condition',
      type: 'string',
      title: 'Schorzenie / problem zdrowotny',
    }),
    defineField({
      name: 'place',
      type: 'string',
      title: 'Miejsce uzdrowienia (np. „Lourdes")',
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      title: 'Współrzędne (opcjonalnie)',
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok' }),
    defineField({ name: 'country', type: 'string', title: 'Kraj' }),
    defineField({
      name: 'medicalVerification',
      type: 'string',
      title: 'Weryfikacja medyczna',
      description: 'np. „Międzynarodowy Komitet Medyczny w Lourdes (CMIL)"',
    }),
    defineField({ name: 'shortSummary', type: 'text', title: 'Krótkie streszczenie', rows: 2 }),
    defineField({ name: 'fullStory', type: 'richText', title: 'Pełna historia' }),
    defineField({
      name: 'documentation',
      type: 'array',
      title: 'Dokumentacja medyczna i źródła',
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
      name: 'portrait',
      type: 'image',
      title: 'Zdjęcie (opcjonalnie)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'personName', subtitle: 'condition', media: 'portrait' },
  },
});
