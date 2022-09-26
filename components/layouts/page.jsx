/* first-party component imports */
import DefaultLayout from "./default";
import Popup from "../popup";

export default function PageLayout({ children, page, popups }) {
  return (
    <DefaultLayout page={page}>
      <div className="page-header">
        {page.showTitle && <h2>{page.title}</h2>}
      </div>

      <article className="content">
        <div dangerouslySetInnerHTML={{ __html: page.contentHTML }} />
        {children}
      </article>

      {/* display the first popup that is active */}
      {popups
        ?.filter((popup) => popup.popUpEnabled && page.slug === popup.page)
        .slice(0, 1)
        .map((popup, i) => (
          <Popup popup={popup} key={i} />
        ))}
    </DefaultLayout>
  );
}
