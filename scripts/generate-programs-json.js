/*

Generates a JSON file containing the list of programs to be used by the
programs page and navbar. This allows for dynamic population based
on the markdown files in the content/pages/programs directory.

It's ran before the build step in the package.json file,
using the command: "prebuild": "node scripts/generate-programs-json.js".

The file is placed in public/programs.json, and is read by
context/program-context.jsx which serves as context to the navbar.

This comment was last updated on August 30, 2023. The first implementation
of this script can be found in this commit:

https://github.com/eauwmadison/eauw.org/commit/a7cb0975a1537c44d269bf56166a2b5f4a8186e2

*/

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const contentDirectory = path.join(process.cwd(), "content/pages/programs");
const publicDirectory = path.join(process.cwd(), "public");

async function generateProgramsJson() {
  const fileNames = await fs.promises.readdir(contentDirectory);
  const programs = fileNames.map((fileName) => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const match = /---\n([\s\S]+?)\n---/.exec(fileContents);
    const frontMatter = match ? match[1] : "";
    const data = yaml.load(frontMatter);

    const slug = path.basename(fileName, ".md");
    const { title, priority, redirectURL } = data;

    return { slug, title, priority, redirectURL };
  });

  const filteredPrograms = programs.filter(({ slug }) => slug !== "_defaults");
  fs.writeFileSync(
    path.join(publicDirectory, "programs.json"),
    "" + JSON.stringify(filteredPrograms)
  );
}

generateProgramsJson();
