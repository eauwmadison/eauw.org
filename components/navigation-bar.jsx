import { useState } from "react";

import Link from "next/link";

/* third-party component imports */
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

/* site data */
import siteData from "../lib/data";

export default function NavigationBar({ links, currentPage }) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <Link href="/" passHref className="navbar-logo">
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
  );
}
