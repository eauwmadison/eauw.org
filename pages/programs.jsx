/* Next.js & React imports*/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Program from "../components/program";
import Grid, { Item } from "../components/grid";

/* site data */
import { getCollection, getCollectionItem } from "../lib/collections";
import data from "../lib/data";

export default function Programs({ page, programs, popups }) {
  programs.sort((a, b) => a.priority - b.priority);

  const [groupFilter, setGroupFilter] = useState(data.parentGroups.default);
  const currentPrograms = programs.filter(
    (program) =>
      !program.previous &&
      (groupFilter.includes(program.parentGroup) ||
        groupFilter === data.parentGroups.default)
  );
  const previousPrograms = programs.filter(
    (program) =>
      program.previous &&
      (groupFilter.includes(program.parentGroup) ||
        groupFilter === data.parentGroups.default)
  );

  const router = useRouter();
  useEffect(() => {
    if (router.asPath.includes("#")) {
      let entry = router.asPath.substring(9);
      // let entry = router.asPath.indexOf("#")

      for (const element of data.parentGroups.groups) {
        if (element.link === entry) {
          setGroupFilter(element.name);
          break;
        }
      }
    }
  }, [router.asPath]);

  const getSelectedOption = () => {
    let option = data.parentGroups.groups.find(
      (group) => group.name === groupFilter
    );
    option.label = option.name;

    return option;
  };

  const getOptions = () => {
    const options = data.parentGroups.groups.map((group) => {
      const name = group.name;

      return {
        label: name,
        value: name
      };
    });

    return options;
  };

  const handleFilterChange = (event) => {
    const parentGroupName = event.label;
    const link = data.parentGroups.groups.filter(
      (entry) => entry.name === parentGroupName
    )[0].link;
    router.push("/programs" + link);
  };

  const dropDownStyles = {
    singleValue: (provided) => ({
      ...provided,
      color: data.parentGroups.color,
      padding: "1em"
    }),
    option: (provided) => ({
      ...provided,
      color: data.parentGroups.color
    })
  };

  return (
    <PageLayout page={page} popups={popups}>
      <Select
        styles={dropDownStyles}
        // className="program-group-select"
        value={getSelectedOption()}
        options={getOptions()}
        onChange={(e) => handleFilterChange(e)}
      />

      <div className="programs-grid">
        {currentPrograms.map((program, i) => (
          <Program program={program} key={i} />
        ))}
      </div>
      {currentPrograms.length === 0 && <h3>No programs found!</h3>}

      {previousPrograms.length !== 0 && <h2>Previous Programs</h2>}
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
