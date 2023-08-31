import { getCollection } from "../../lib/collections";

const handler = async (req, res) => {
  const programs = await getCollection("pages/programs");

  const trimmedPrograms = programs.map((program) => ({
    title: program.title,
    priority: program.priority,
    redirectURL: program.redirectURL,
    slug: program.slug
  }));

  res.status(200).json(trimmedPrograms);
};

export default handler;
