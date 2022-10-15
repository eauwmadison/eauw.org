import PageLayout from "../../components/layouts/page";
import ProjectSummary from "../../components/project-summary";

import { getCollection, getCollectionItem } from "../../lib/collections";

export default function Projects({ page, projects }) {
  return (
    <PageLayout page={page}>
      <ol className="project-list">
        {projects.map((project, i) => (
          <ProjectSummary project={project} key={i} />
        ))}
      </ol>
    </PageLayout>
  );
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", "projects");
  const projects = await getCollection("projects", {
    excerpt: true,
    sortKey: "date"
  });

  const projectsWithAuthor = await Promise.all(
    projects.map(async (project) => {
      const author = await getCollectionItem(
        "leadership-team",
        project.author_staff_member
      );
      return { ...project, author };
    })
  );

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      projects: JSON.parse(JSON.stringify(projectsWithAuthor))
    }
  };
}
