/* eslint-disable @next/next/no-img-element */

/* Next.js imports */
// import ExportedImage from "next-image-export-optimizer";

/* first-party component imports */
import Icon from "./icon";

const open = (date) => {
  const now = new Date();
  const open = new Date(date);
  return now < open;
};

export default function Program({ program }) {
  program.open = open(program.applicationDeadline);

  return (
    <div
      className={`program ${program.main && "main"} ${program.open && "hover"}`}
    >
      {program.image && (
        <div className="image">
          <img src={program.image} alt={`Photo for ${program.name}`} />
        </div>
      )}
      <div className="header">
        <span className="title">{program.name}</span>
        <div className="info">
          <span>
            <Icon icon="Date" />
            {new Date(program.startingDate).toLocaleDateString()}
          </span>
          <span>
            <Icon icon="Time" />
            {program.duration}
          </span>
        </div>
      </div>
      <div className="description">
        <div dangerouslySetInnerHTML={{ __html: program.contentHTML }} />
        {program.applicationLink}
      </div>
      <div className="type">
        <span>{program.semester}</span>
      </div>
    </div>
  );
}
