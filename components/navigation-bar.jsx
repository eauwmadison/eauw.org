import { useState } from "react";

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

const MenuIcon = ({ open, onChange }) => (
  <div className="menu-icon">
    <input
      className="menu-icon__checkbox"
      type="checkbox"
      checked={open}
      onChange={onChange}
    />
    <div>
      <span></span>
      <span></span>
    </div>
  </div>
);

export default function NavigationBar({ links, currentPage }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showMenuIcon = useMediaQuery("(max-width: 900px)");

  return (
    <>
      {showMenuIcon && (
        <MenuIcon
          open={drawerOpen}
          onChange={() => setDrawerOpen(!drawerOpen)}
        />
      )}
      <AppBar position="sticky">
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
              {links.map((link) => (
                <Link
                  href={link.link}
                  key={link.link}
                  className={"/" + currentPage === link.link ? "active" : ""}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="drawer">
          <ul className="links">
            <h2>Pages</h2>

            {siteData.footer.links.map((link) => (
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

          <ul className="links">
            <li>
              <h2>Social</h2>
            </li>

            {siteData.social.links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  target={link.newTab ? "_blank" : "_self"}
                >
                  {link.socialIcon && <Icon icon={link.socialIcon} />}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}
