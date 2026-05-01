import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'conversion',
  title: 'Nawrócenie',
  type: 'document',
  fields: [
    defineField({
      name: 'personName',
      type: 'string',
      title: 'Imię osoby nawróconej',
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
      name: 'fromBackground',
      type: 'string',
      title: 'Z czego się nawrócił/a',
      description: 'np. „ateizm", „islam", „satanizm", „indyferentyzm"',
    }),
    defineField({
      name: 'toBackground',
      type: 'string',
      title: 'Na co się nawrócił/a',
      description: 'np. „katolicyzm", „prawosławie"',
      initialValue: 'katolicyzm',
    }),
    defineField({ name: 'year', type: 'number', title: 'Rok nawrócenia' }),
    defineField({ name: 'country', type: 'string', title: 'Kraj' }),
    defineField({
      name: 'profession',
      type: 'string',
      title: 'Zawód / dziedzina (jeśli istotne)',
    }),
    defineField({ name: 'portrait', type: 'image', title: 'Portret', options: { hotspot: true } }),
    defineField({ name: 'shortSummary', type: 'text', title: 'Krótkie streszczenie', rows: 2 }),
    defineField({ name: 'turningPoint', type: 'text', title: 'Punkt zwrotny', rows: 3 }),
    defineField({ name: 'fullStory', type: 'richText', title: 'Pełna historia' }),
    defineField({ name: 'sourceUrl', type: 'url', title: 'Źródło online' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'YouTube/Vimeo' }),
    defineField({
      name: 'relatedArguments',
      type: 'array',
      title: 'Powiązane argumenty',
      of: [{ type: 'reference', to: [{ type: 'argument' }] }],
    }),
  ],
  preview: {
    select: { title: 'personName', subtitle: 'fromBackground', media: 'portrait' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `z: ${subtitle}` : undefined,
        media,
      };
    },
  },
});
