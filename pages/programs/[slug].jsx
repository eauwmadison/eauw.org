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
  let ignored = await getCollection("pages/programs");
  ignored = ignored
    .filter((program) => program.redirectURL)
    .map((program) => program.slug);
  ignored.push("_defaults");

  let slugs = await getCollectionSlugs("pages/programs");
  slugs = slugs.filter(({ params }) => !ignored.includes(params.slug));

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
