/*

This file allows the navbar to dynamically populate based on the contents
of content/pages/programs.

It interacts with public/programs.json, which is generated at build time
with scripts/generate-programs-json.js. This file is used in pages/_app.jsx
and components/navigation-bar.jsx. This comment was last updated on August 30,
2023.

*/

import React, { createContext, useState, useEffect } from "react";

const ProgramContext = createContext();

const ProgramProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function loadPrograms() {
      const res = await fetch("/programs.json");
      const data = await res.json();
      setPrograms(data);
    }

    loadPrograms();
  }, []);

  return (
    <ProgramContext.Provider value={programs}>
      {children}
    </ProgramContext.Provider>
  );
};

export { ProgramProvider, ProgramContext };
