import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import PostSummaryDetails from "./post-summary-details";

export default function PostSummary({ post }) {
  return (
    <li className="post-summary hover">
      <div className="post-summary-image">
        <ExportedImage
          src={post.image}
          alt={`Photo of ${post.title}`}
          width={600}
          height={450}
        />
      </div>

      <div className="post-summary-content has-post-summary-image">
        <h3 className="post-summary-title">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>

        <PostSummaryDetails post={post} />

        <p className="post-summary-author">
          <ExportedImage
            src={post.author.image}
            alt={`Photo of ${post.author.name}`}
            width="30"
            height="30"
          />{" "}
          {post.author.name}
        </p>
      </div>

      <p
        className="post-summary-excerpt"
        dangerouslySetInnerHTML={{ __html: post.excerptHtml }}
      />
    </li>
  );
}
