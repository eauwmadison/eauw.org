import { useEffect, useState } from "react";

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
import getPrograms from "../pages/api/programs";

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
  // Fetch content from content/pages/programs on page load. Store in programs state.
  // This is used to populate the dropdown menu for the Programs link in the navbar.
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    fetch("/api/programs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPrograms(data);
      });
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const showMenuIcon = useMediaQuery("(max-width: 900px)");

  // close the drawer when the window is resized to a width greater than 900px
  useEffect(() => {
    if (!showMenuIcon) {
      setDrawerOpen(false);
    }
  }, [showMenuIcon]);

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
                    <div className="dropdown-menu" key="Programs">
                      <Link
                        href={link.link}
                        key={link.link}
                        className={
                          "/" + currentPage === link.link ? "active" : ""
                        }
                      >
                        {link.name}
                      </Link>
                      <div className="dropdown-container">
                        {programs
                          .sort((a, b) => a.priority - b.priority)
                          .map(
                            (program, i) =>
                              program.slug && (
                                <Link
                                  className="dropdown-link"
                                  href={"/programs/" + program.slug}
                                  key={program.slug}
                                >
                                  {program.title}
                                </Link>
                              )
                          )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <Link
                      href={link.link}
                      key={link.link}
                      className={
                        "/" + currentPage === link.link ? "active" : ""
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
                className={"/" + currentPage === link.link ? "active" : ""}
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
