/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

export default function Leader({ leader }) {
  return (
    <li className="staff">
      <div className="staff-details">
        <div className="staff-image">
          <ExportedImage
            src={leader.image}
            alt={`Staff photo for ${leader.name}`}
            width="120"
            height="120"
          />
        </div>
        <ul className="staff-info">
          <li>{leader.name}</li>
          <li>
            <small>{leader.pronouns}</small>
          </li>
          <li>
            {leader.calUsername && (
              <button data-cal-link={leader.calUsername}>
                Book an Appointment
              </button>
            )}
          </li>
        </ul>
      </div>

      <div
        className="staff-bio"
        dangerouslySetInnerHTML={{ __html: leader.contentHTML }}
      ></div>
    </li>
  );
}
