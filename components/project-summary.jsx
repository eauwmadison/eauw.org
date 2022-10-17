/* Next.js imports */
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

/* first-party component imports */
import ProjectSummaryDetails from "./project-summary-details";

export default function ProjectSummary({ project }) {
  return (
    <li className="project-summary hover">
      <div className="project-summary-image">
        <ExportedImage
          src={project.image}
          alt={`Photo of ${project.title}`}
          width={600}
          height={450}
        />
      </div>

      <div className="project-summary-content has-project-summary-image">
        <h3 className="project-summary-title">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        <ProjectSummaryDetails project={project} />

        <p className="project-summary-author">
          {project.author.image ? (
            <ExportedImage
              src={project.author.image}
              alt={`Photo of ${project.author.name}`}
              width="30"
              height="30"
              placeholder="empty"
            />
          ) : (
            <ExportedImage
              src={
                "https://placehold.jp/f4efe9/054d5a/30x30.jpg?text=Image+Coming+Soon"
              }
              alt={`Photo of ${project.author.name}`}
              width="30"
              height="30"
              unoptimized
            />
          )}{" "}
          {project.author.name}
        </p>
      </div>

      <p
        className="project-summary-excerpt"
        dangerouslySetInnerHTML={{ __html: project.excerptHtml }}
      />
    </li>
  );
}
