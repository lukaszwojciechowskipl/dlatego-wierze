import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'resource',
  title: 'Zasób apologetyczny',
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
          { title: 'Książka', value: 'ksiazka' },
          { title: 'Kanał YouTube', value: 'kanal-yt' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Artykuł', value: 'artykul' },
          { title: 'Film', value: 'film' },
          { title: 'Strona / serwis', value: 'strona' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'author', type: 'string', title: 'Autor / twórca' }),
    defineField({
      name: 'authorReference',
      type: 'reference',
      title: 'Pełny profil autora (opcjonalnie)',
      to: [{ type: 'author' }, { type: 'famousPerson' }],
    }),
    defineField({ name: 'url', type: 'url', title: 'URL', validation: r => r.required() }),
    defineField({
      name: 'lang',
      type: 'string',
      title: 'Język',
      options: {
        list: [
          { title: 'Polski', value: 'pl' },
          { title: 'Angielski', value: 'en' },
        ],
      },
      initialValue: 'pl',
    }),
    defineField({
      name: 'level',
      type: 'string',
      title: 'Poziom trudności',
      options: {
        list: [
          { title: 'Początkujący', value: 'poczatkujacy' },
          { title: 'Średni', value: 'sredni' },
          { title: 'Zaawansowany', value: 'zaawansowany' },
        ],
      },
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok wydania' }),
    defineField({ name: 'cover', type: 'image', title: 'Okładka / miniatura', options: { hotspot: true } }),
    defineField({ name: 'summary', type: 'text', title: 'Streszczenie / opis', rows: 4 }),
    defineField({
      name: 'topics',
      type: 'array',
      title: 'Tematy',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'cover' },
  },
});
