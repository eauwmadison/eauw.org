/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Program from "../components/program";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Programs({ page, programs }) {
  return (
      <PageLayout page={page}>
        <ul className="team-list">
          {programs.map((program, i) => (
            <Program program={program} key={i} />
          ))}
        </ul>
      </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "programs");
  const programs = await getCollection("programs");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      programs
    }
  };
}
