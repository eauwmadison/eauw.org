/* first party component imports */
import DefaultLayout from "./default";
import ProjectSummaryDetails from "../project-summary-details";
import Leader from "../leader";

export default function ProjectLayout({ page, author }) {
  return (
    <DefaultLayout page={page}>
      <div className="page-header">
        <h2>{page.title}</h2>
      </div>

      <article className="content">
        <ProjectSummaryDetails project={page} />
        <div dangerouslySetInnerHTML={{ __html: page.contentHTML }} />

        <h2>Meet the author</h2>
        <Leader leader={author} />
      </article>
    </DefaultLayout>
  );
}
