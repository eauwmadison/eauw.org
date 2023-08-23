/* first-party component imports */
import ProgramLayout from "../../components/layouts/program";

/* site data */
import {
  getCollection,
  getCollectionItem,
  getCollectionSlugs
} from "../../lib/collections";

export default function ProgramPage({ page, popups }) {
  return <ProgramLayout page={page} popups={popups} />;
}

export async function getStaticPaths() {
  const slugs = await getCollectionSlugs("pages/programs");

  return {
    paths: slugs,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages/programs", params.slug);
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups
    }
  };
}
