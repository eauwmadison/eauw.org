/* misc. library imports */
// import { DiscussionEmbed } from "disqus-react";

/* first party component imports */
import DefaultLayout from "./default";
// import PostSummary from "../post-summary";
import PostSummaryDetails from "../post-summary-details";
import Leader from "../leader";

/* site data */
import siteData from "../../lib/data";

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
        <ul className="post-author team-list">
          <Leader leader={author} />
        </ul>

        {siteData.site.disqus_shortname && (
          <>
            <h2>Have your say</h2>
            {/* <DiscussionEmbed
              className="post-comments"
              shortname={siteData.site.disqus_shortname}
              config={{
                url: `${siteData.site.url}/posts/${page.slug}`.replace(
                  /\/+/g,
                  "/"
                ),
                identifier: page.slug,
                title: page.title
              }}
            /> */}
          </>
        )}
      </article>
    </DefaultLayout>
  );
}
