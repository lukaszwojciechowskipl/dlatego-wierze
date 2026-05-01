import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'famousPerson',
  title: 'Sławna osoba wierząca',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Imię i nazwisko', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'profession',
      type: 'string',
      title: 'Zawód / dziedzina',
      description: 'np. „naukowiec", „aktor", „polityk"',
    }),
    defineField({ name: 'birthYear', type: 'number', title: 'Rok urodzenia' }),
    defineField({ name: 'deathYear', type: 'number', title: 'Rok śmierci (jeśli nie żyje)' }),
    defineField({ name: 'country', type: 'string', title: 'Kraj' }),
    defineField({ name: 'denomination', type: 'string', title: 'Wyznanie / tradycja' }),
    defineField({ name: 'portrait', type: 'image', title: 'Portret', options: { hotspot: true } }),
    defineField({ name: 'shortBio', type: 'text', title: 'Krótka biografia', rows: 3 }),
    defineField({ name: 'fullStory', type: 'richText', title: 'Pełna historia wiary' }),
    defineField({
      name: 'famousQuote',
      type: 'object',
      title: 'Najbardziej znany cytat o wierze',
      fields: [
        { name: 'text', type: 'text', title: 'Cytat', rows: 3 },
        { name: 'source', type: 'string', title: 'Źródło' },
      ],
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
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'profession', media: 'portrait' },
  },
});
