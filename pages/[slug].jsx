/* first-party component imports */
import PageLayout from "../components/layouts/page";

/* site data */
import { getCollectionSlugs, getCollectionItem } from "../lib/collections";

export default function Page({ page }) {
  return <PageLayout page={page} />;
}

export async function getStaticPaths() {
  const slugs = await getCollectionSlugs("pages");
  const ignored = {
    team: true,
    posts: true,
    contact: true,
    index: true
  };

  return {
    paths: slugs.filter(({ params }) => !ignored[params.slug]),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", params.slug);

  return {
    props: {
      page: JSON.parse(JSON.stringify(page))
    }
  };
}
