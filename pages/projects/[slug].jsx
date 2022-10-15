import ProjectLayout from "../../components/layouts/project";
import { getCollectionSlugs, getCollectionItem } from "../../lib/collections";

export default function Project({ page, author }) {
  return <ProjectLayout page={page} author={author} />;
}

export async function getStaticPaths() {
  return {
    paths: await getCollectionSlugs("projects"),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("projects", params.slug);
  const author = await getCollectionItem(
    "leadership-team",
    page.author_staff_member
  );

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      author
    }
  };
}
