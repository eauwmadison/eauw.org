/* Next.js imports */
import Link from "next/link";
import { useRouter } from "next/router";

/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Icon from "../components/icon";

/* site data */
import data from "../lib/data";
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Contact({ page, placeholders, popups }) {
  const router = useRouter();

  // handles the submit event on contact form submit.
  const handleSubmit = async (event) => {
    // stop the form from submitting and refreshing the page.
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      name: event.target.name.value,
      message: event.target.message.value,
      source: "new website!"
    };

    const stringifiedData = JSON.stringify(data);

    const endpoint = "https://api.eauw.org/contact";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: stringifiedData
    };

    await fetch(endpoint, options).then((response) => {
      if (response.ok) {
        // redirect to the thank you page.
        router.push("/contact-success");
      }
    });
  };

  const randomPlaceholder = placeholders[
    Math.floor(Math.random() * placeholders.length)
  ] || {
    email: "you@example.com",
    name: "Your name",
    message: "Your message."
  };

  return (
    <PageLayout page={page} popups={popups}>
      <div className="columns">
        <div className="column">
          <p className="editor-link">
            <a
              href="cloudcannon:collections/data/organization.json"
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

          <label>Office Hours</label>
          <a
            className="contact-info btn btn-small btn-go"
            href={data.organization.officeHoursLink}
            rel="noreferrer"
          >
            {data.organization.officeHoursLinkText}
            <Icon icon="Go" />
          </a>

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

        <div className="column" style={{ flexGrow: 4 }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={randomPlaceholder.name}
            />

            <label htmlFor="email_address">Your Email Address</label>
            <input
              id="email_address"
              type="email"
              name="email"
              placeholder={randomPlaceholder.email}
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

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "contact");
  const placeholders = await getCollection("form-placeholders");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      placeholders,
      popups
    }
  };
}
