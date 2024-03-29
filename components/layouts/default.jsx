/* eslint-disable @next/next/no-img-element */

/* React imports */
import { useState } from "react";

/* Next.js imports */
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";

/* first-party component imports */
import Icon from "../../components/icon";
import NavigationBar from "../navigation-bar";
import MailingList from "../mailing-list";

/* site data */
import siteData from "../../lib/data";

export default function DefaultLayout({ children, page }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");

  // handles the submit event on email subscription form submit.
  const handleSubmit = async (event) => {
    // stop the form from submitting and refreshing the page.
    event.preventDefault();

    setFirstName(event.target.firstName.value);

    const data = {
      firstName: event.target.firstName.value,
      email: event.target.email.value,
      source: "new website!"
    };

    const stringifiedData = JSON.stringify(data);

    const endpoint = "https://api.eauw.org/email";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: stringifiedData
    };

    await fetch(endpoint, options).then((response) => {
      if (response.ok) {
        setFormSubmitted(true);
      }
    });
  };

  const title = page.title
    ? `${page.title} | ${siteData.seo.siteTitle}`
    : siteData.seo.siteTitle;
  const description = page.description || siteData.seo.description;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/ico/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/ico/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/ico/favicon-16x16.png"
        />
        <link rel="manifest" href="/ico/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/ico/safari-pinned-tab.svg"
          color="#068294"
        />
        <link rel="shortcut icon" href="/ico/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="EA UW" />
        <meta name="application-name" content="EA UW&ndash;Madison" />
        <meta name="msapplication-TileColor" content="#e4f4f7" />
        <meta name="msapplication-config" content="/ico/browserconfig.xml" />
        <meta name="theme-color" content="#e4f4f7" />
      </Head>

      <NextSeo
        title={title}
        description={description}
        openGraph={{
          siteName: siteData.seo.siteName,
          url: siteData.site.url,
          title: title,
          description: description,
          images: siteData.seo.images.map((image) => ({
            url: image.image,
            width: image.height,
            height: image.width,
            alt: image.description
          }))
        }}
      />

      <NavigationBar links={siteData.navbar.links} currentPage={page.slug} />

      <section className={page.fullWidth ? "" : "main"}>
        <div className={page.fullWidth ? "" : "container"}>{children}</div>
      </section>

      {page.callToAction === "Contact" && (
        <section className="quote-section">
          <h2 className="container editable">
            <Link href="/contact">Contact us</Link> today to find out how we can
            help you do more good.
          </h2>
        </section>
      )}

      {page.callToAction === "Subscribe" && (
        <section className="quote-section">
          <h2 className="container editable">
            Find out about our latest opportunities.
          </h2>
          <form className="hero-subscription-form" onSubmit={handleSubmit}>
            {!formSubmitted ? (
              <>
                <input
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  required
                />
                <input placeholder="Email" type="email" name="email" required />
                <button className="btn" type="submit">
                  <span>Subscribe</span>
                </button>
              </>
            ) : (
              <div className="box beige-section hero-subscription-confirmation">
                <p>
                  Thanks, {firstName}! Check your inbox for a confirmation. 🙂
                </p>
              </div>
            )}
          </form>
        </section>
      )}

      <footer>
        <div className="container">
          <div
            className="footer-columns"
            data-cms-editor-link="cloudcannon:collections/data/footer.json"
          >
            <ul className="footer-links">
              <li>
                <h2>Pages</h2>
              </li>

              {siteData.footer.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.link}
                    target={link.external ? "_blank" : "_self"}
                  >
                    {link.external && <Icon icon="Link" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="footer-links">
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

            <MailingList />
          </div>
        </div>

        <div className="bottom-line">
          <p className="container">Made with ❤️ in Madison, WI.</p>
          <p className="container">
            Based on{" "}
            <a
              className="ea-footer-link"
              href="https://effectivealtruism.org"
              target="_blank"
              rel="noreferrer"
            >
              effectivealtruism.org
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
