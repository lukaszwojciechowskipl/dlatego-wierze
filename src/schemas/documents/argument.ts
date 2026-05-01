import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'argument',
  title: 'Argument (linia argumentacyjna)',
  type: 'document',
  fields: [
    defineField({
      name: 'orderIndex',
      type: 'number',
      title: 'Numer (1-15)',
      validation: r => r.required().min(1).max(15),
    }),
    defineField({ name: 'title', type: 'string', title: 'Tytuł', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'subtitle', type: 'string', title: 'Podtytuł' }),
    defineField({ name: 'lead', type: 'text', title: 'Lead', rows: 3 }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Kategoria',
      options: {
        list: [
          { title: 'Filozoficzny', value: 'filozoficzny' },
          { title: 'Naukowy', value: 'naukowy' },
          { title: 'Historyczny', value: 'historyczny' },
          { title: 'Biblijny', value: 'biblijny' },
          { title: 'Cudowny', value: 'cudowny' },
          { title: 'Świadectwa', value: 'swiadectwa' },
          { title: 'Cywilizacyjny', value: 'cywilizacyjny' },
          { title: 'Zasoby', value: 'zasoby' },
        ],
      },
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Kolor konstelacji (HSL)',
      description: 'np. hsl(45 80% 60%)',
    }),
    defineField({ name: 'heroImage', type: 'image', title: 'Zdjęcie nagłówkowe', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'richText', title: 'Treść' }),
    defineField({
      name: 'keyTakeaways',
      type: 'array',
      title: 'Kluczowe wnioski',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'thinkers',
      type: 'array',
      title: 'Myśliciele',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),
    defineField({
      name: 'relatedTestimonies',
      type: 'array',
      title: 'Powiązane świadectwa',
      of: [{ type: 'reference', to: [{ type: 'testimony' }] }],
    }),
    defineField({
      name: 'relatedMiracles',
      type: 'array',
      title: 'Powiązane cuda',
      of: [{ type: 'reference', to: [{ type: 'miracle' }] }],
    }),
    defineField({
      name: 'relatedSaints',
      type: 'array',
      title: 'Powiązani święci',
      of: [{ type: 'reference', to: [{ type: 'saint' }] }],
    }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
    defineField({
      name: 'resources',
      type: 'array',
      title: 'Zasoby (książki, kanały)',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        { name: 'title', type: 'string', title: 'Tytuł SEO' },
        { name: 'description', type: 'text', title: 'Opis SEO', rows: 2 },
        { name: 'ogImage', type: 'image', title: 'Obraz Open Graph' },
      ],
    }),
  ],
  orderings: [
    { title: 'Kolejność (1-15)', name: 'orderAsc', by: [{ field: 'orderIndex', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'heroImage' },
  },
});
