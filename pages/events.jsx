/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Calendar from "../components/calendar";
import Icon from "../components/icon";

/* site data */
import data from "../lib/data";

export default function Events({ page, placeholders, popups }) {
  return (
    <PageLayout page={page} popups={popups}>
      <section className="white-section calendar container">
        <h2>Upcoming Events</h2>
        <div className="info-subtitle">
          <Icon icon="Info" />
          <p className="editable">
            All events are free and open to the public unless otherwise noted.
          </p>
        </div>
        <Calendar maxEvents={page.maxEvents} />
      </section>
    </PageLayout>
  );
}
