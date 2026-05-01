import type { SchemaTypeDefinition } from 'sanity';

// Objects (used inside documents — register first so references resolve)
import portableText from './objects/portableText';
import sidenote from './objects/sidenote';
import statistic from './objects/statistic';
import citation from './objects/citation';
import pullQuote from './objects/pullQuote';

// Documents
import argument from './documents/argument';
import testimony from './documents/testimony';
import saint from './documents/saint';
import famousPerson from './documents/famousPerson';
import miracle from './documents/miracle';
import healing from './documents/healing';
import conversion from './documents/conversion';
import debate from './documents/debate';
import ndeAccount from './documents/ndeAccount';
import resource from './documents/resource';
import author from './documents/author';
import tag from './documents/tag';
import glossaryTerm from './documents/glossaryTerm';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  portableText,
  sidenote,
  statistic,
  citation,
  pullQuote,
  // documents
  argument,
  testimony,
  saint,
  famousPerson,
  miracle,
  healing,
  conversion,
  debate,
  ndeAccount,
  resource,
  author,
  tag,
  glossaryTerm,
];
