/* first-party component imports */
import DefaultLayout from "./default";
import Popup from "../popup";
import Icon from "../icon";
import Accordion from "../accordion";

/* third-party component imports */
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProgramLayout({ page, popups }) {
  const small = useMediaQuery("(max-width: 600px)");

  return (
    <DefaultLayout page={page}>
      <div className="page-header">
        <h2>{page.title}</h2>
      </div>

      {page.introHTML && (
        <article>
          {page.introHTML && (
            <div dangerouslySetInnerHTML={{ __html: page.introHTML }} />
          )}
        </article>
      )}

      {page.applicationLink && (
        <div className="btn-center-container">
          <a
            className="btn btn-go"
            href={page.applicationLink}
            target="_blank"
            rel="noreferrer"
          >
            {small ? "Apply Now" : `Apply to the ${page.title}`}
            <Icon icon="Go" />
          </a>
        </div>
      )}

      {page.descriptionHTML && (
        <article>
          {page.descriptionHTML && (
            <div dangerouslySetInnerHTML={{ __html: page.descriptionHTML }} />
          )}
        </article>
      )}

      {page.topics && <Accordion topics={page.topics} />}

      {page.whoShouldApplyHTML && (
        <article>
          <h3>Who Should Apply?</h3>
          {page.whoShouldApplyHTML && (
            <div
              dangerouslySetInnerHTML={{ __html: page.whoShouldApplyHTML }}
            />
          )}
        </article>
      )}

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
