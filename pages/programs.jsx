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

  // let filter = "Animal Advocacy";

  // const currentPrograms = programs.filter((program) => !program.previous && program.parentGroup === filter);

  /*
  Filter functionality:
  - "All" displays all programs
  - drop-down for specific programs
    - displays on previous programs as well
    - changes heading "current programs" to "current animal advocacy programs" etc.
    - THIS WILL BE ON A NEW PAGE. NEEDS A SHAREABLE LINK.
  - message or display if no programs available
  */

  // a href link: 117 program.jsx
  // programGroup.jsx ?
  // might need to change the names here, could get confusing... or just add more comments lol

  const router = useRouter();

  const [groupFilter, setGroupFilter] = useState("All");
  const new_currentPrograms = programs.filter(
    (program) =>
      !program.previous &&
      (groupFilter.includes(program.parentGroup) || groupFilter.includes("All"))
  );
  const new_previousPrograms = programs.filter(
    (program) =>
      program.previous &&
      (groupFilter.includes(program.parentGroup) || groupFilter.includes("All"))
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
      <select value={groupFilter} onChange={(e) => handleFilterChange(e)}>
        {data.parentGroups.groups.map((parentGroup, i) => (
          <option value={parentGroup.name} key={parentGroup.name}>
            {parentGroup.name} Programs
          </option>
        ))}
      </select>

      {new_currentPrograms.length !== 0 && <h2>{groupFilter} Programs</h2>}
      <div className="programs-grid">
        {new_currentPrograms.map((program, i) => (
          <Program program={program} key={i} />
        ))}
      </div>
      {new_currentPrograms.length === 0 && <h3>No programs found!</h3>}

      {new_previousPrograms.length !== 0 && <h2>Previous Programs</h2>}
      <Grid>
        {new_previousPrograms.map((program, i) => (
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
