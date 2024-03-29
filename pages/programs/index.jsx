/* first-party component imports */
import PageLayout from "../../components/layouts/page";

/* site data */
import { getCollection, getCollectionItem } from "../../lib/collections";

export default function Programs({ page, popups, programs }) {
  return (
    <PageLayout page={page} popups={popups}>
      <ul>
        {programs
          .filter((program) => program.slug !== "ea-intro-fellowship")
          .sort((a, b) => a.priority - b.priority)
          .map((program, i) => (
            <li key={i}>
              {program.redirectURL ? (
                <a href={program.redirectURL} target="_blank" rel="noreferrer">
                  {program.title}
                </a>
              ) : (
                <a href={"programs/" + program.slug}>{program.title}</a>
              )}
            </li>
          ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: page.contactHTML }} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "programs");
  const popups = await getCollection("popups");
  const programs = await getCollection("pages/programs");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups: popups,
      programs: programs
    }
  };
}
