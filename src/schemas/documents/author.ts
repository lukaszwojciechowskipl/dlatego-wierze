import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Autor / Myśliciel',
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
      name: 'role',
      type: 'string',
      title: 'Rola / stanowisko',
      description: 'np. „filozof", „teolog", „apologeta", „naukowiec"',
    }),
    defineField({
      name: 'era',
      type: 'string',
      title: 'Epoka',
      options: {
        list: [
          { title: 'Starożytność', value: 'starozytnosc' },
          { title: 'Średniowiecze', value: 'sredniowiecze' },
          { title: 'Nowożytność', value: 'nowozytnosc' },
          { title: 'Współczesność', value: 'wspolczesnosc' },
        ],
      },
    }),
    defineField({ name: 'birthYear', type: 'number', title: 'Rok urodzenia' }),
    defineField({ name: 'deathYear', type: 'number', title: 'Rok śmierci' }),
    defineField({ name: 'country', type: 'string', title: 'Kraj' }),
    defineField({ name: 'portrait', type: 'image', title: 'Portret', options: { hotspot: true } }),
    defineField({ name: 'shortBio', type: 'text', title: 'Krótka biografia', rows: 3 }),
    defineField({ name: 'fullBio', type: 'richText', title: 'Pełna biografia' }),
    defineField({
      name: 'majorWorks',
      type: 'array',
      title: 'Najważniejsze dzieła',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Tytuł' },
            { name: 'year', type: 'number', title: 'Rok' },
            { name: 'note', type: 'string', title: 'Notka' },
          ],
        },
      ],
    }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'Link zewnętrzny (Wikipedia, strona własna)',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
  },
});
