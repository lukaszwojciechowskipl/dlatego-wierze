import { sanityClient } from './sanity';

// GROQ queries are plain template strings; the `groq` tag is just an identity
// helper for editor highlighting. Keeping it inline avoids depending on the
// (now-bundled) `groq` package while still giving search/highlight tools a
// recognisable marker.
const groq = (strings: TemplateStringsArray, ...values: unknown[]): string =>
  String.raw({ raw: strings }, ...values);

/* Argument */
export const ARGUMENT_BY_SLUG = groq`*[_type == "argument" && slug.current == $slug][0]{
  _id, orderIndex, title, subtitle, lead, category, color, "slug": slug.current,
  heroImage, body, keyTakeaways,
  thinkers[]->{_id, name, role, "slug": slug.current, portrait},
  relatedTestimonies[]->{_id, personName, "slug": slug.current, kind, portrait, shortSummary},
  relatedMiracles[]->{_id, title, "slug": slug.current, place, year, "image": gallery[0]},
  relatedSaints[]->{_id, name, "slug": slug.current, rank, portrait, shortBio},
  relatedArguments[]->{_id, title, "slug": slug.current, orderIndex, subtitle},
  resources[]->{_id, title, "slug": slug.current, kind, author, url, lang, level, summary, cover}
}`;

export const ALL_ARGUMENTS = groq`*[_type == "argument"] | order(orderIndex asc){
  _id, orderIndex, title, "slug": slug.current, subtitle, lead, category, color, heroImage
}`;

/* Testimonies */
export const ALL_TESTIMONIES = groq`*[_type == "testimony"] | order(_createdAt desc){
  _id, personName, "slug": slug.current, shortSummary, kind, background, year, country, portrait, verified
}`;

export const TESTIMONY_BY_SLUG = groq`*[_type == "testimony" && slug.current == $slug][0]{
  ..., relatedArguments[]->{_id, title, "slug": slug.current}
}`;

export const RECENT_TESTIMONIES = groq`*[_type == "testimony"] | order(_createdAt desc)[0...$limit]{
  _id, personName, "slug": slug.current, shortSummary, kind, portrait
}`;

/* Saints */
export const ALL_SAINTS = groq`*[_type == "saint"] | order(name asc){
  _id, name, "slug": slug.current, rank, birthYear, deathYear, feastDay,
  incorrupt, stigmata, portrait, shortBio
}`;

export const SAINT_BY_SLUG = groq`*[_type == "saint" && slug.current == $slug][0]{
  ..., relatedArguments[]->{_id, title, "slug": slug.current}
}`;

/* Famous people */
export const ALL_FAMOUS_PEOPLE = groq`*[_type == "famousPerson"] | order(name asc){
  _id, name, "slug": slug.current, profession, country, portrait, shortBio
}`;

export const FAMOUS_PERSON_BY_SLUG = groq`*[_type == "famousPerson" && slug.current == $slug][0]{
  ..., relatedArguments[]->{_id, title, "slug": slug.current}
}`;

/* Miracles */
export const ALL_MIRACLES = groq`*[_type == "miracle"] | order(year asc){
  _id, title, "slug": slug.current, kind, year, place, location,
  "thumb": gallery[0], shortDescription, verifiedBy
}`;

export const MIRACLE_BY_SLUG = groq`*[_type == "miracle" && slug.current == $slug][0]{
  ..., relatedArguments[]->{_id, title, "slug": slug.current}
}`;

export const RECENT_MIRACLES = groq`*[_type == "miracle"] | order(_createdAt desc)[0...$limit]{
  _id, title, "slug": slug.current, place, year, "thumb": gallery[0]
}`;

/* Healings, conversions, debates, NDE */
export const ALL_HEALINGS = groq`*[_type == "healing"] | order(year desc){
  _id, personName, "slug": slug.current, condition, place, year, country, portrait
}`;

export const ALL_CONVERSIONS = groq`*[_type == "conversion"] | order(year desc){
  _id, personName, "slug": slug.current, fromBackground, year, country, profession, portrait, shortSummary
}`;

export const ALL_DEBATES = groq`*[_type == "debate"] | order(year desc){
  _id, title, "slug": slug.current, topic, year, place, "apologistName": apologist.name, "opponentName": opponent.name, videoUrl, shortSummary
}`;

export const ALL_NDE = groq`*[_type == "ndeAccount"] | order(year desc){
  _id, personName, "slug": slug.current, kind, background, year, country, portrait, shortSummary, verified
}`;

/* Resources */
export const ALL_RESOURCES = groq`*[_type == "resource"] | order(_createdAt desc){
  _id, title, "slug": slug.current, kind, author, url, lang, level, year, summary, cover
}`;

/* Knowledge graph — flat list of all nodes + edges in one query */
export const KNOWLEDGE_GRAPH = groq`{
  "arguments": *[_type == "argument"]{_id, "slug": slug.current, title, orderIndex, category, color},
  "testimonies": *[_type == "testimony"]{_id, "slug": slug.current, personName, kind, "argRefs": relatedArguments[]._ref},
  "saints": *[_type == "saint"]{_id, "slug": slug.current, name, rank, "argRefs": relatedArguments[]._ref},
  "miracles": *[_type == "miracle"]{_id, "slug": slug.current, title, kind, "argRefs": relatedArguments[]._ref},
  "famousPeople": *[_type == "famousPerson"]{_id, "slug": slug.current, name, profession, "argRefs": relatedArguments[]._ref},
  "argumentLinks": *[_type == "argument"]{_id, "argRefs": relatedArguments[]._ref}
}`;

/* Convenience runners */
export async function getArgumentBySlug(slug: string) {
  return sanityClient.fetch(ARGUMENT_BY_SLUG, { slug });
}

export async function getRecentTestimonies(limit = 6) {
  return sanityClient.fetch(RECENT_TESTIMONIES, { limit });
}

export async function getRecentMiracles(limit = 3) {
  return sanityClient.fetch(RECENT_MIRACLES, { limit });
}
