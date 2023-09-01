import { useEffect, useState, useContext } from "react";
import { ProgramContext } from "../context/program-context";

import Link from "next/link";

import Icon from "./icon";

/* third-party component imports */
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

/* site data */
import siteData from "../lib/data";

/*

To populate the programs dropdown, this file makes use
of the following files:
- context/program-context.jsx
- public/programs.json
- scripts/generate-programs-json.js

*/

const MenuIcon = ({ open, onChange }) => (
  <div className="menu-icon">
    <label htmlFor="menu-toggle" aria-label="Toggle menu" hidden>
      <input
        id="menu-toggle"
        className="menu-icon__checkbox"
        type="checkbox"
        checked={open}
        onChange={onChange}
      />
    </label>
    <div>
      <span></span>
      <span></span>
    </div>
  </div>
);

export default function NavigationBar({ links, currentPage }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showMenuIcon = useMediaQuery("(max-width: 900px)");

  // close the drawer when the window is resized to a width greater than 900px
  useEffect(() => {
    if (!showMenuIcon) {
      setDrawerOpen(false);
    }
  }, [showMenuIcon]);

  // Data for the programs drop-down using context
  const programs = useContext(ProgramContext);

  return (
    <>
      <AppBar position="sticky" classes={{ root: "navbar-root" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Link href="/" passHref className="navbar-logo">
              {/* <ExportedImage
                src="/images/Effective Altruism Lightbulb.svg"
                alt="Effective Altruism Logo"
                width={100}
                height={50}
              /> */}
              <span className="organization-name">
                {siteData.organization.organizationName}
              </span>{" "}
              <span className="organization-subheading">
                {siteData.organization.organizationSubheading}
              </span>
            </Link>

            <div className="links">
              {links.map((link) => {
                if (link.name === "Programs") {
                  return (
                    <div
                      className={
                        "dropdown-menu " +
                        ("/" + currentPage === link.link ||
                        programs
                          .map((program) => program.slug)
                          .includes("/" + currentPage)
                          ? "active"
                          : "")
                      }
                      key="Programs"
                    >
                      <Link href={link.link} key={link.link}>
                        {link.name}
                      </Link>
                      <div className="dropdown-container">
                        {programs
                          .sort((a, b) => a.priority - b.priority)
                          .map((program, i) => (
                            <Link
                              className={
                                "dropdown-link " +
                                (i === 0 ? "first-program" : "")
                              }
                              href={
                                program.redirectURL
                                  ? program.redirectURL
                                  : "/programs/" + program.slug
                              }
                              key={program.link}
                            >
                              {program.title}
                            </Link>
                          ))}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <Link
                      href={link.link}
                      key={link.link}
                      className={
                        "/" + currentPage === link.link ||
                        (currentPage === "index" && link.link === "/")
                          ? "active"
                          : ""
                      }
                    >
                      {link.name}
                    </Link>
                  );
                }
              })}
            </div>
          </Toolbar>
          {showMenuIcon && (
            <MenuIcon
              open={drawerOpen}
              onChange={() => setDrawerOpen(!drawerOpen)}
            />
          )}
        </Container>
      </AppBar>
      <Drawer
        anchor="top"
        classes={{ paper: "drawer" }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ul className="links">
          {siteData.navbar.links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.link}
                target={link.external ? "_blank" : "_self"}
                className={
                  "/" + currentPage === link.link ||
                  (currentPage === "index" && link.link === "/")
                    ? "active"
                    : ""
                }
              >
                {link.external && <Icon icon="Link" />}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
