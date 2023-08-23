import React, { useState } from "react";

import AccordionPanel from "./accordion-panel";

const Accordion = ({ topics }) => {
  const [activePanel, setActivePanel] = useState("");
  function clickHandler(title) {
    if (activePanel === title) {
      setActivePanel("");
    } else {
      setActivePanel(title);
    }
  }

  return (
    <div className="accordion">
      {topics.map((topic) => (
        <AccordionPanel
          title={topic.title}
          content={topic.contentHTML}
          isActive={activePanel === topic.title}
          clickHandler={() => clickHandler(topic.title)}
          key={topic.title}
        />
      ))}
    </div>
  );
};

export default Accordion;
