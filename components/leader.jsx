// import Link from "next/link";
import Image from "next/image";
// import data from "../lib/data";

export default function Leader({ leader }) {
  return (
    <li className="staff">
      <div className="staff-details">
        <div className="staff-image">
          <Image
            src={leader.image}
            alt={`Staff photo for ${leader.name}`}
            width="120"
            height="120"
          />
        </div>
        <ul className="staff-info">
          <li>{leader.name}</li>
          <li>
            <small>{leader.role}</small>
          </li>
          <li></li>
        </ul>
      </div>

      <div
        className="staff-bio"
        dangerouslySetInnerHTML={{ __html: leader.contentHTML }}
      ></div>
    </li>
  );
}
