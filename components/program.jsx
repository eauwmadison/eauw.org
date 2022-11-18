/* React imports */
import { useEffect, useState } from "react";

/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

/* first-party component imports */
import Icon from "./icon";

const past = (date) => {
  const now = new Date();
  return now > date;
};

const ProgramChildren = ({ program, className }) => {
  const start = new Date(program.startingDate);
  const deadline = new Date(program.applicationDeadline);

  // compensate for timezone differences
  start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
  deadline.setMinutes(deadline.getMinutes() + deadline.getTimezoneOffset());

  return (
    <div className={`program ${program.main ? "main" : ""} ${className}`}>
      {program.image && (
        <div className="image">
          <ExportedImage
            src={program.image}
            alt={`Photo for ${program.name}`}
            width={1200}
            height={600}
            placeholder="blur"
            style={{
              width: "100%",
              height: "auto"
            }}
          />
        </div>
      )}
      <div className="header">
        <span className="title">{program.name}</span>
        <div className="info">
          <span>
            <Icon icon="Date" />
            {!past(start) ? "Begins " : "Began "}
            {start.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}
          </span>
          <span>
            <Icon icon="Time" />
            {program.duration}
          </span>
        </div>
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: program.contentHTML }}
      />
      <div className="link">
        {program.open ? (
          <>
            Apply by{" "}
            {deadline.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              weekday: "long"
            })}
            <Icon icon="Go" />
          </>
        ) : (
          <>
            Application closed on{" "}
            {deadline.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric"
            })}
            .
          </>
        )}
      </div>
      <div className="type">
        <span>{program.semester}</span>
      </div>
    </div>
  );
};

export default function Program({ program }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(() => {
      const now = new Date();
      const deadline = new Date(program.applicationDeadline);

      /* 
        compensate for timezone differences and
        add 1 day to the deadline to allow for
        applications to be submitted on the deadline
      */
      deadline.setMinutes(
        deadline.getMinutes() + deadline.getTimezoneOffset() + 24 * 60
      );

      program.open = now < deadline;

      return program.open;
    });
  }, [program]);

  return open ? (
    <a
      className={`program-link`}
      href={program.applicationLink}
      target="_blank"
      rel="noreferrer"
    >
      <ProgramChildren className="hover" program={program} />
    </a>
  ) : (
    <ProgramChildren program={program} />
  );
}
