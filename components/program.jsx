/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

export default function Program({ program }) {
  return (
    <li className="staff">
      <div className="staff-details">
        <div className="staff-image">
          <ExportedImage
            src={program.image}
            alt={`Staff photo for ${program.name}`}
            width="120"
            height="120"
            unoptimized
          />
        </div>
        <ul className="staff-info">
          <li>{program.name}</li>
        </ul>
      </div>

      <div
        className="staff-bio"
        dangerouslySetInnerHTML={{ __html: program.contentHTML }}
      ></div>
    </li>
  );
}
