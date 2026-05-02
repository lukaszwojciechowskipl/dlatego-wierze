import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity image source types are loosely structured; importing them via the
// public package surface stays portable across image-url v1.x and v2.x.
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2025-01-28';
const token = import.meta.env.SANITY_API_READ_TOKEN;

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  token,
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}
