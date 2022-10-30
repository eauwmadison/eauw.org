/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

export default function Program({ program }) {
  return (
    <li className="program hover">
      <div className="event-header">
        <ExportedImage
          src={program.image}
          alt={`Staff photo for ${program.name}`}
          width="120"
          height="120"
          unoptimized
        />

        <span className="event-title">
          <h3>{program.name}</h3>
        </span>
      </div>
      <div className="event-description">
        <div dangerouslySetInnerHTML={{ __html: program.contentHTML }}></div>
      </div>
    </li>
  );
}
