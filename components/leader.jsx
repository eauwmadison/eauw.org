/* Next.js imports */
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";

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
            // layout="responsive"
            unoptimized
          />
        )}
      </div>

      <h3>{leader.name}</h3>
      <small>{leader.pronouns}</small>
      { leader.role && leader.role.split(", ").map((role, i) => (
        <label key={i}>{role}</label>
      ))}

      <div
        className="leader-bio"
        dangerouslySetInnerHTML={{ __html: leader.contentHTML }}
      ></div>

      {leader.calUsername && (
        <a className="btn" data-cal-link={leader.calUsername}>
          Book a 1-on-1
        </a>
      )}
    </li>
  );
}
