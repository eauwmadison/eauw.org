/* first-party component imports */
import DefaultLayout from "./default";
import Popup from "../popup";
import Icon from "../icon";

export default function PageLayout({ children, page, popups }) {
  return (
    <DefaultLayout page={page}>
      {page.showTitle && (
        <div className="page-header">
          <h2>{page.title}</h2>
        </div>
      )}
      {page.introHTML && (
        <div className="page-header short-beige-section">
          <div dangerouslySetInnerHTML={{ __html: page.introHTML }} />
          {page.applicationLink && (
            <div className="btn-center-container">
              
                className="btn btn-go"
                href={page.applicationLink}
                target="_blank"
                rel="noreferrer"
              >
                Apply Now
                <Icon icon="Go" />
              </a>
            </div>
          )}
        </div>
      )}
      <article>
        {page.contentHTML && (
          <div dangerouslySetInnerHTML={{ __html: page.contentHTML }} />
        )}
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
