/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Program from "../components/program";
import Grid, { Item } from "../components/grid";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Programs({ page, programs, popups }) {
  programs.sort((a, b) => a.priority - b.priority);

  const currentPrograms = programs.filter((program) => !program.previous);
  const previousPrograms = programs.filter((program) => program.previous);

  return (
    <PageLayout page={page}>
      {currentPrograms.length !== 0 && <h2>Current Programs </h2>}
      <div className="programs-grid">
        {currentPrograms.map((program, i) => (
          <Program program={program} popups={popups} key={i} />
        ))}
      </div>
      <h2>Previous Programs</h2>
      {previousPrograms.map((program, i) => (
        <Program program={program} popups={popups} key={i} />
      ))}
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
      programs: JSON.parse(JSON.stringify(programs)),
      popups
    }
  };
}
