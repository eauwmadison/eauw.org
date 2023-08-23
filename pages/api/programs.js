// Used in components/navigation-bar.jsx to populate the dropdown menu for programs.
// This needs to be in pages because it needs to run client-side.
// If you have any idea how to make this work in lib... go for it! :)

import { getCollection } from "../../lib/collections";

export default async function handler(req, res) {
  const programs = await getCollection("pages/programs");
  res.status(200).json(programs);
}
