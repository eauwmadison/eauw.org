/* Next.js imports */
import Script from "next/script";

/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Grid, { Item } from "../components/grid";
import Leader from "../components/leader";
import Icon from "../components/icon";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Team({ page, leaders, popups }) {
  leaders.sort((a, b) => a.priority - b.priority);

  return (
    <>
      <PageLayout page={page} popups={popups}>
        <section id="executive" className="executive-section">
          <div className="container">
            <h2>Executive Team</h2>
            <p className="executive-info editable">
              <Icon icon="Info" /> Members of our executive team commit about 10
              hours per week or more to the organization.
            </p>
            <Grid>
              {" "}
              {/*check back here, making a grid but for the programs*/}
              {leaders
                .filter(
                  (leader) =>
                    leader.executive && !leader.previous && !leader.hidden
                )
                .map((leader, i) => (
                  <Item key={i}>
                    {" "}
                    {/* specificy column size*/}
                    <Leader leader={leader} />
                  </Item>
                ))}
            </Grid>
          </div>
        </section>
        <section className="main container">
          <Grid>
            {leaders
              .filter(
                (leader) =>
                  !leader.executive && !leader.previous && !leader.hidden
              )
              .map((leader, i) => (
                <Item key={i}>
                  <Leader leader={leader} key={i} />
                </Item>
              ))}
          </Grid>
          <h2 id="alumni-and-affiliates">Alumni and Affiliates</h2>
          <Grid>
            {leaders
              .filter((leader) => leader.previous && !leader.hidden)
              .map((leader, i) => (
                <Item key={i}>
                  <Leader leader={leader} key={i} />
                </Item>
              ))}
          </Grid>
        </section>
      </PageLayout>
      <Script
        id="cal-embed"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://cal.eauw.org/embed/embed.js", "init");
          Cal("init", {origin:"https://cal.eauw.org"});
          Cal("ui", {"theme":"light","styles":{"branding":{"brandColor":"#0c869b"}}});
        `
        }}
      />
    </>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "team");
  const leaders = await getCollection("leadership-team");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      leaders,
      popups
    }
  };
}
