/* Next.js imports */
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";
import Icon from "./icon";

export default function Leader({ leader }) {
  return (
    <li className="leader">
      <div className="leader-image">
        {leader.image ? (
          <ExportedImage
            src={leader.image}
            alt={`Photo of ${leader.name}`}
            width="512"
            height="512"
            layout="responsive"
          />
        ) : (
          <ExportedImage
            src="https://placehold.jp/f4efe9/054d5a/512x512.jpg?text=Image+Coming+Soon"
            alt={`Placeholder image for ${leader.name}`}
            width="512"
            height="512"
            layout="responsive"
            unoptimized
          />
        )}
      </div>

      <h3>{leader.name && leader.name}</h3>
      <small>{leader.pronouns && leader.pronouns}</small>
      {leader.role && (
        <div>
          {leader.role.split(", ").map((role, i) => (
            <label key={i}>{role}</label>
          ))}
        </div>
      )}

      <div
        className="leader-bio"
        dangerouslySetInnerHTML={{ __html: leader.contentHTML }}
      ></div>

      {leader.calUsername && (
        <a
          className="btn btn-small btn-flipped"
          data-cal-link={leader.calUsername}
        >
          <Icon icon="Date" /> Book a 1-on-1
        </a>
      )}
    </li>
  );
}
