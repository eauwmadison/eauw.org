/* Next.js & React imports*/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Program from "../components/program";
import Grid, { Item } from "../components/grid";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";
import data from "../lib/data";

export default function Programs({ page, programs, popups }) {
  programs.sort((a, b) => a.priority - b.priority);

  const router = useRouter();

  const [groupFilter, setGroupFilter] = useState("Current");
  const currentPrograms = programs.filter(
    (program) =>
      !program.previous &&
      (groupFilter.includes(program.parentGroup) ||
        groupFilter.includes("Current"))
  );
  const previousPrograms = programs.filter(
    (program) =>
      program.previous &&
      (groupFilter.includes(program.parentGroup) ||
        groupFilter.includes("Current"))
  );

  const handleFilterChange = (event) => {
    event.preventDefault();

    const parentGroupName = event.target.value;
    const link = data.parentGroups.groups.filter(
      (entry) => entry.name === parentGroupName
    )[0].link;
    router.push("/programs" + link);
  };

  useEffect(() => {
    if (router.asPath.includes("#")) {
      let entry = router.asPath.substring(9);

      for (const element of data.parentGroups.groups) {
        if (element.link === entry) {
          setGroupFilter(element.name);
          break;
        }
      }
    }
  }, [router.asPath]);

  return (
    <PageLayout page={page} popups={popups}>
      <select
        class="program-group-select"
        value={groupFilter}
        onChange={(e) => handleFilterChange(e)}
      >
        {data.parentGroups.groups.map((parentGroup, i) => (
          <option value={parentGroup.name} key={i}>
            {parentGroup.name} Programs
          </option>
        ))}
      </select>

      <div className="programs-grid">
        {currentPrograms.map((program, i) => (
          <Program program={program} key={i} />
        ))}
      </div>
      {currentPrograms.length === 0 && <h3>No programs found!</h3>}

      {previousPrograms.length !== 0 && (
        <h2>Previous {groupFilter} Programs</h2>
      )}
      <Grid>
        {previousPrograms.map((program, i) => (
          <Item key={i}>
            <Program program={program} />
          </Item>
        ))}
      </Grid>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "programs");
  const programs = await getCollection("programs");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      programs: JSON.parse(JSON.stringify(programs)),
      popups
    }
  };
}
