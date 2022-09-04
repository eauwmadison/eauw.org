/* first-party component imports */
import PageLayout from "../components/layouts/page";

/* site data */
import { getCollectionItem } from "../lib/collections";

export default function Home({ page }) {
  return <PageLayout page={page} />;
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", "index");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page))
    }
  };
}
