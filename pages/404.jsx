/* first-party component imports */
import PageLayout from "../components/layouts/page";

export default function NotFound() {
  return (
    <PageLayout
      page={{
        title: "Not Found",
        callToAction: "Contact"
      }}
    >
      <p>This page doesn&apos;t exist.</p>
    </PageLayout>
  );
}
