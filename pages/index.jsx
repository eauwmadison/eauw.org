/* first-party component imports */
import PageLayout from "../components/layouts/page";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Home({ page, popups }) {
  return <PageLayout page={page} popups={popups} />;
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "index");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups
    }
  };
}
