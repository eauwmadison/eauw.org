const AccordionPanel = ({ title, content, isActive, clickHandler }) => {
  return (
    <div>
      <div className="accordion-header" onClick={clickHandler}>
        <h4> {title} </h4>
        <div className="accordion-icon">{isActive ? "-" : "+"}</div>
      </div>
      <div
        className={"accordion-content " + (isActive ? "accordion-active" : "")}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default AccordionPanel;
