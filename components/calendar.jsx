/* React imports */
import { useEffect, useState } from "react";

/* Next.js imports */
import Link from "next/link";
import useSWR from "swr";

/* misc. library imports */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

/* third-party component imports */
import Masonry from "@mui/lab/Masonry";

/* first-party component imports */
import Event from "./event";

/* site data */
import siteData from "../lib/data";

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

const TimeAgo = ({ data }) => {
  const [fetchTime, setFetchTime] = useState(new Date());
  const [timeAgo, setTimeAgo] = useState(dayjs().fromNow());

  // update time ago every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(dayjs(fetchTime).fromNow());
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchTime]);

  // reset time ago and fetch time when data changes
  useEffect(() => {
    setFetchTime(new Date());
    setTimeAgo(dayjs().fromNow());
  }, [data]);

  return <span>{timeAgo}</span>;
};

export default function Calendar({ maxEvents }) {
  const { data, error } = useSWR(
    "https://www.googleapis.com/calendar/v3/calendars/" +
      siteData.calendar.google_calendar_id +
      "/events?key=" +
      siteData.calendar.google_calendar_read_only_api_key,
    fetcher
  );

  // grab current time for checking if event is upcoming
  const now = new Date();

  if (error) {
    return (
      <div className="noscript-error">
        An error occurred while trying to fetch our{" "}
        <a href={siteData.calendar.google_calendar_share_link}>
          Google Calendar
        </a>
        .
        <br />
        Please <Link href="/contact">contact us</Link> to let us know.
        <div className="error">
          Error code: {error.status || "unknown"}
          <br />
          Error message: {error.info?.error.message || "unknown"}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <div>Loading...</div>
        <noscript>
          <div className="noscript-error">
            Please enable JavaScript to view events from our{" "}
            <a href={siteData.calendar.google_calendar_share_link}>
              Google Calendar
            </a>{" "}
            on this page.
          </div>
        </noscript>
      </>
    );
  }

  let filteredEvents = [];

  if (data) {
    // `maxEvents` number of non-private events which haven't ended
    filteredEvents = data.items
      .filter((event) => event.start) // events must have a start
      .sort(
        (a, b) =>
          new Date(a.start.dateTime || a.start.date) -
          new Date(b.start.dateTime || b.start.date) // .date for all-day
      )
      .filter((event) => {
        const eventEnd = new Date(event.end.dateTime || event.end.date);
        return eventEnd > now && event.visibility !== "private";
      })
      .slice(0, maxEvents);
  }

  return (
    <>
      <Masonry
        columns={{ xs: 1, sm: 2, lg: 3 }}
        spacing={3}
        sx={{ width: "auto" }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, i) => {
            return <Event event={event} key={i} />;
          })
        ) : (
          <div>No events for now.</div>
        )}
      </Masonry>
      <div className="time">
        Last updated <TimeAgo data={data} /> via{" "}
        <a href={siteData.calendar.google_calendar_share_link}>
          Google Calendar
        </a>
        .
      </div>
    </>
  );
}
