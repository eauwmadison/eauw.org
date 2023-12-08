/* first-party component imports */
import PageLayout from "../components/layouts/page";

export default function Welcome({ page, popups }) {
  return (
    <>
      <PageLayout page={page} popups={popups}>
        <meta httpEquiv="refresh" content="0; url=https://eauw.org"></meta>
      </PageLayout>
    </>
  );
}
