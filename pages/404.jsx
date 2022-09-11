/* first-party component imports */
import PageLayout from "../components/layouts/page";

export default function NotFound() {
  return (
    <PageLayout
      page={{
        title: "Not Found",
        callToAction: "Contact",
        largeHeader: false
      }}
    >
      <p>This page doesn&apos;t exist.</p>
    </PageLayout>
  );
}
