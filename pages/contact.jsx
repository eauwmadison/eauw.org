import Link from "next/link";

import PageLayout from "../components/layouts/page";
import Icon from "../components/icon";

import data from "../lib/data";
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Contact({ page, placeholders }) {
  const randomPlaceholder = placeholders[
    Math.floor(Math.random() * placeholders.length)
  ] || {
    email: "you@example.com",
    name: "Your name",
    message: "Your message."
  };

  return (
    <PageLayout page={page}>
      <div className="columns">
        <div className="column">
          <p className="editor-link">
            <a
              href="cloudcannon:collections/content/data/company.yml"
              className="btn"
            >
              <strong>&#9998;</strong> Update Company Details
            </a>
          </p>

          <label>Email Address</label>
          <p className="contact-info">
            <a href={`mailto:${data.organization.contactEmailAddress}`}>
              {data.organization.contactEmailAddress}
            </a>
          </p>

          <label>Office Address</label>
          <address
            className="contact-info"
            dangerouslySetInnerHTML={{
              __html: data.organization.officeAddress.replace(/,/g, "<br>")
            }}
          ></address>

          <label>Postal Address</label>
          <address
            className="contact-info"
            dangerouslySetInnerHTML={{
              __html: data.organization.postalAddress.replace(/,/g, "<br>")
            }}
          ></address>

          <label>Social Accounts</label>
          <ul className="social-links">
            {data.social.links.map((link) => (
              <li key={link.name}>
                <Link href={link.link}>
                  <a target={link.newTab ? "_blank" : "_self"}>
                    {link.socialIcon && <Icon icon={link.socialIcon} />}{" "}
                    {link.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="column">
          <form method="post" action="/contact-success">
            <label htmlFor="email_address">Your Email Address</label>
            <input
              id="email_address"
              type="text"
              name="email"
              placeholder={randomPlaceholder.email}
            />

            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={randomPlaceholder.name}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder={randomPlaceholder.message}
            ></textarea>

            <input
              type="hidden"
              name="_to"
              value={data.organization.contactEmailAddress}
            />
            <input type="text" name="_gotcha" style={{ display: "none" }} />

            <input type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", "contact");
  const placeholders = await getCollection("form-placeholders");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      placeholders
    }
  };
}
