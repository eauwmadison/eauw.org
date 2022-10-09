/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

/* first-party component imports */
import Icon from "../components/icon";
import PageLayout from "../components/layouts/page";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Home({ page, popups }) {
  return (
    <PageLayout page={page} popups={popups}>
      <div className="image-and-text">
        <div className="grid-left">
          <ExportedImage
            src="/images/members.png"
            alt="members"
            width={1146}
            height={828}
          />
        </div>

        <div className="grid-right">
          <p className="editable">
            We are a community of UW&ndash;Madison students unified by a common
            desire to do the most we can to improve the world. Our organization
            seeks to promote the global movement of effective altruism, using
            evidence and reason to assess how to benefit others as much as
            possible and taking action based on the findings.
          </p>
          <a
            className="btn"
            href="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about effective altruism
            <Icon icon="Go"/>
          </a>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "index");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups
    }
  };
}
