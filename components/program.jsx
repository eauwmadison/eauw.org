/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

export default function Program({ program }) {
  return (
    <li className="program">
      <h3>{program.name}</h3>
      <ExportedImage
        src={program.image}
        alt={`Staff photo for ${program.name}`}
        width="120"
        height="120"
        unoptimized
      />

      <div dangerouslySetInnerHTML={{ __html: program.contentHTML }}></div>
    </li>
  );
}
