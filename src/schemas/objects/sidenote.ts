import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sidenote',
  title: 'Notka boczna',
  type: 'object',
  fields: [
    defineField({ name: 'text', type: 'text', title: 'Treść', rows: 3, validation: r => r.required() }),
    defineField({ name: 'num', type: 'number', title: 'Numer (opcjonalny)' }),
  ],
});
