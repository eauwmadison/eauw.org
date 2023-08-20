/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Calendar from "../components/calendar";
import Icon from "../components/icon";

export default function Events() {
  return (
    <PageLayout
      page={{
        title: "Events",
        callToAction: "Contact"
      }}
    >
      <section className="white-section calendar container">
        <h2>Upcoming Events</h2>
        <div className="info-subtitle">
          <Icon icon="Info" />
          <p className="editable">
            All events are free and open to the public unless otherwise noted.
          </p>
        </div>
        <Calendar maxEvents={6} />
      </section>
    </PageLayout>
  );
}
