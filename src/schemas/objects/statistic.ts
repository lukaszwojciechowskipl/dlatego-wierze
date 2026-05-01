import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'statistic',
  title: 'Statystyka',
  type: 'object',
  fields: [
    defineField({ name: 'value', type: 'string', title: 'Wartość (np. "10⁻¹⁵⁷")', validation: r => r.required() }),
    defineField({ name: 'label', type: 'string', title: 'Etykieta', validation: r => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Opis kontekstowy', rows: 2 }),
    defineField({ name: 'source', type: 'string', title: 'Źródło' }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
});
