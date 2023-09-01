/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Calendar from "../components/calendar";
import Icon from "../components/icon";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Events({ page, popups }) {
  return (
    <PageLayout page={page} popups={popups}>
      <h2>Upcoming Events</h2>
      <div className="info-subtitle">
        <Icon icon="Info" />
        <p className="editable">
          All events are free and open to the public unless otherwise noted.
        </p>
      </div>
      <Calendar maxEvents={6} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "events");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups
    }
  };
}
