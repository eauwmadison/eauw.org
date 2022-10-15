/* first-party component imports */
import PageLayout from "../components/layouts/page";

/* site data */
import {
  getCollection,
  getCollectionItem,
  getCollectionSlugs
} from "../lib/collections";

export default function Page({ page, popups }) {
  return <PageLayout page={page} popups={popups} />;
}

export async function getStaticPaths() {
  const slugs = await getCollectionSlugs("pages");
  const ignored = {
    index: true,
    team: true,
    programs: true,
    contact: true,
    projects: true
  };

  return {
    paths: slugs.filter(({ params }) => !ignored[params.slug]),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", params.slug);
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups
    }
  };
}
