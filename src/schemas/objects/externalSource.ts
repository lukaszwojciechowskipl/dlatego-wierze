import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'externalSource',
  title: 'Źródło zewnętrzne',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Rodzaj',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Książka', value: 'book' },
          { title: 'Artykuł', value: 'article' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Film dokumentalny', value: 'documentary' },
          { title: 'Strona / serwis', value: 'website' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Tytuł', validation: r => r.required() }),
    defineField({ name: 'author', type: 'string', title: 'Autor / twórca' }),
    defineField({ name: 'url', type: 'url', title: 'URL', validation: r => r.required() }),
    defineField({ name: 'isbn', type: 'string', title: 'ISBN (jeśli książka)' }),
    defineField({ name: 'publisher', type: 'string', title: 'Wydawca' }),
    defineField({ name: 'year', type: 'number', title: 'Rok' }),
    defineField({
      name: 'language',
      type: 'string',
      title: 'Język',
      options: {
        list: [
          { title: 'Polski', value: 'pl' },
          { title: 'Angielski', value: 'en' },
          { title: 'Włoski', value: 'it' },
          { title: 'Francuski', value: 'fr' },
          { title: 'Niemiecki', value: 'de' },
        ],
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Krótki opis (1-2 zdania PL)',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', type: 'type' },
    prepare({ title, subtitle, type }) {
      return {
        title,
        subtitle: [type, subtitle].filter(Boolean).join(' · '),
      };
    },
  },
});
