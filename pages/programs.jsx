/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Program from "../components/program";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Programs({ page, programs, popups }) {
  return (
    <PageLayout page={page}>
      <ul className="team-list">
        {programs.map((program, i) => (
          <Program program={program} popups={popups} key={i} />
        ))}
      </ul>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "programs");
  const programs = await getCollection("programs");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      programs,
      popups
    }
  };
}
