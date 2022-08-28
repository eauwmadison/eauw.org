import DefaultLayout from "./default";
import PostSummary from "../post-summary";
import PostSummaryDetails from "../post-summary-details";
import Leader from "../leader";
import data from "../../lib/data";
import { DiscussionEmbed } from "disqus-react";

export default function PostLayout({ children, page, author }) {
  return (
    <DefaultLayout page={page}>
      <div className="page-header">
        <h2>{page.title}</h2>
      </div>

      <article className="content">
        <PostSummaryDetails post={page} />
        <div dangerouslySetInnerHTML={{ __html: page.contentHTML }} />

        <h2>Meet the author</h2>
        <ul className="post-author staff-list">
          <Leader leader={author} />
        </ul>

        {data.site.disqus_shortname && (
          <>
            <h2>Have your say</h2>
            <DiscussionEmbed
              className="post-comments"
              shortname={data.site.disqus_shortname}
              config={{
                url: `${data.site.url}/posts/${page.slug}`.replace(/\/+/g, "/"),
                identifier: page.slug,
                title: page.title
              }}
            />
          </>
        )}
      </article>
    </DefaultLayout>
  );
}
