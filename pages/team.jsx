import PageLayout from "../components/layouts/page";
import Leader from "../components/leader";
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Team({ page, leaders }) {
  return (
    <PageLayout page={page}>
      <p>Meet the members of our capable team:</p>

      <ul className="staff-list">
        {leaders.map((leader, i) => (
          <Leader leader={leader} key={i} />
        ))}
      </ul>
    </PageLayout>
  );
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", "team");
  const leaders = await getCollection("leadership-team");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      leaders
    }
  };
}
