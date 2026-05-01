import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Etykieta (PL)', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'label', maxLength: 64 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      title: 'Kategoria taga',
      options: {
        list: [
          { title: 'Tematyczny', value: 'tematyczny' },
          { title: 'Geograficzny', value: 'geograficzny' },
          { title: 'Historyczny', value: 'historyczny' },
          { title: 'Doktrynalny', value: 'doktrynalny' },
          { title: 'Inne', value: 'inne' },
        ],
      },
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Kolor (HSL/HEX)',
      description: 'Opcjonalny — używany w UI dla podświetlenia',
    }),
    defineField({ name: 'description', type: 'text', title: 'Krótki opis', rows: 2 }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'kind' },
  },
});
