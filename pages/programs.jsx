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

  // On page load, the programs are filtered by the default parentGroup
  const [groupFilter, setGroupFilter] = useState(data.parentGroups.default);

  // currentPrograms is populated with all programs that:
  // are not marked previous, and
  // either match the filter, or match the default.
  const currentPrograms = programs.filter(
    (program) =>
      !program.previous &&
      (groupFilter === program.parentGroup ||
        groupFilter === data.parentGroups.default)
  );
  // previousPrograms is the same, except with programs that ARE marked previous.
  const previousPrograms = programs.filter(
    (program) =>
      program.previous &&
      (groupFilter === program.parentGroup ||
        groupFilter === data.parentGroups.default)
  );

  // After page update: check for a "#" in the URL, if it matches, check for matches in parent-groups.json
  // If a parent group match is found, change the filter so currentPrograms and previousPrograms are updated.
  const router = useRouter();
  useEffect(() => {
    if (router.asPath.includes("#")) {
      const urlStub = router.asPath; // returns "/programs#parent-group"
      let entry = urlStub.substring(urlStub.indexOf("#")); // returns "#parent-group"

      for (const element of data.parentGroups.groups) {
        if (element.link === entry) {
          setGroupFilter(element.name);
          break;
        }
      }
    }
  }, [router.asPath]);

  // When user clicks an option in the drop down menu, add "#parent-group-name" to the URL.
  // This causes the group filter to change---see useEffect().
  // Allows for the sharing of parent-group specific links.
  const handleFilterChange = (event) => {
    const parentGroupName = event.label;
    const link = data.parentGroups.groups.filter(
      (entry) => entry.name === parentGroupName
    )[0].link;
    router.push("/programs" + link);
  };

  // Retrieves selected option from parent-groups.json, formatted for the drop down menu
  const getSelectedOption = () => {
    let option = data.parentGroups.groups.find(
      (group) => group.name === groupFilter
    );
    option.label = option.name;

    return option;
  };

  // Retrieves options from parent-groups.json, formatted for the drop down menu
  const getOptions = () => {
    const options = data.parentGroups.groups.map((group) => {
      return {
        label: group.name,
        value: group.name
      };
    });

    return options;
  };

  // Styling for the react-select drop-down menu
  // For specifics see https://react-select.com/styles
  const dropDownStyles = {
    // Modifies border
    control: (provided) => ({
      ...provided,
      "border": "1px solid " + data.parentGroups.color,
      "boxShadow": "none",
      "&:hover": {
        border: "1px solid " + data.parentGroups.color
      }
    }),
    // Modifies the selected value
    singleValue: (provided) => ({
      ...provided,
      color: data.parentGroups.color,
      padding: "1em"
    }),
    // Modifies drop down indicator
    dropdownIndicator: (provided) => ({
      ...provided,
      color: data.parentGroups.color
    }),
    // Modifies the options container
    menu: (provided) => ({
      ...provided,
      "border": "1px solid " + data.parentGroups.color,
      "boxShadow": "none",
      "&:hover": {
        border: "1px solid " + data.parentGroups.color
      }
    }),
    // Modifies drop-down options
    option: (provided, { isFocused }) => ({
      ...provided,
      backgroundColor: isFocused ? "#35bbd233" : null,
      color: data.parentGroups.color
    })
  };

  return (
    <PageLayout page={page} popups={popups}>
      <Select
        isSearchable={false} // default react-select allows search, we just want a drop-down menu
        styles={dropDownStyles}
        value={getSelectedOption()}
        options={getOptions()}
        onChange={(e) => handleFilterChange(e)}
      />

      <div className="programs-grid">
        {currentPrograms.map((program, i) => (
          <Program program={program} key={i} />
        ))}
      </div>
      {currentPrograms.length === 0 && <h2>No programs found!</h2>}

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
