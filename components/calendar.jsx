import Link from "next/link";

import useSWR from "swr";
import Moment from "react-moment";

import siteData from "../lib/data";

import Event from "./event";

import Masonry from "@mui/lab/Masonry";

const fetcher = async (url) => {
  const res = await fetch(url);

  // if the status code is not in the range 200–299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function Calendar() {
  const { data, error } = useSWR(
    "https://www.googleapis.com/calendar/v3/calendars/" +
      siteData.site.google_calendar_id +
      "/events?key=" +
      siteData.site.google_calendar_read_only_api_key,
    fetcher
  );

  if (error) {
    return (
      <div className="calendar-error">
        An error occurred while trying to fetch our{" "}
        <a href={siteData.site.google_calendar_share_link}>Google Calendar</a>.
        <br />
        Please <Link href="/contact">contact us</Link> to let us know.
        <div className="error">
          Error code: {error.status || "unknown"}
          <br />
          Error message: {error.info.error.message || "unknown"}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <div>Loading...</div>
        <noscript>
          <div className="calendar-error">
            Please enable JavaScript to view events from our{" "}
            <a href={siteData.site.google_calendar_share_link}>
              Google Calendar
            </a>{" "}
            on this page.
          </div>
        </noscript>
      </>
    );
  }

  const now = new Date();

  let filteredEvents = [];

  if (data) {
    // the first 6 non-private events which haven't ended
    filteredEvents = data.items
      .sort(
        (a, b) =>
          new Date(a.start.dateTime || a.start.date) -
          new Date(b.start.dateTime || b.start.date) // .date for all-day
      )
      .filter((event) => {
        const eventEnd = new Date(event.end.dateTime || event.end.date);
        return eventEnd > now && event.visibility !== "private";
      })
      .slice(0, 6);
  }

  return (
    <>
      <Masonry columns={3} spacing={3}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, i) => {
            return <Event event={event} key={i} />;
          })
        ) : (
          <div>No events for now.</div>
        )}
      </Masonry>
      <div className="time">
        Last updated{" "}
        <Moment fromNow interval={30000}>
          {now}
        </Moment>{" "}
        via{" "}
        <a href={siteData.site.google_calendar_share_link}>Google Calendar</a>.
      </div>
    </>
  );
}
