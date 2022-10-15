export default function ProjectSummaryDetails({ project }) {
  const date = project.date
    ? new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "";

  return (
    <p className="project-summary-details">
      {date}

      {project.tags.map((tag, i) => (
        <span key={i} className="project-summary-category">
          {" "}
          &bull; {tag}
        </span>
      ))}
    </p>
  );
}
