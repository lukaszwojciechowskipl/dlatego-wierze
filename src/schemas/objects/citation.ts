import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'citation',
  title: 'Cytat źródłowy',
  type: 'object',
  fields: [
    defineField({ name: 'author', type: 'string', title: 'Autor' }),
    defineField({ name: 'work', type: 'string', title: 'Dzieło' }),
    defineField({ name: 'page', type: 'string', title: 'Strona / sekcja' }),
    defineField({ name: 'url', type: 'url', title: 'URL' }),
  ],
});
