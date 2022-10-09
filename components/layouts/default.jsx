/* eslint-disable @next/next/no-img-element */

/* React imports */
import { useState } from "react";

/* Next.js imports */
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";
import ExportedImage from "next-image-export-optimizer";

/* first-party component imports */
import Calendar from "../../components/calendar";
import Icon from "../../components/icon";

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
        <meta name="msapplication-TileColor" content="#CBE5E9" />
        <meta name="msapplication-config" content="/ico/browserconfig.xml" />
        <meta name="theme-color" content="#CBE5E9" />
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

      <header className={page.largeHeader ? "large-header" : ""}>
        <div className="container">
          <Link href="/" passHref>
            <div className="organization-group">
              <img
                className="logo"
                src="/images/Effective Altruism Lightbulb.svg"
                alt="EA lightbulb Logo"
              ></img>
              <div className="organization-text">
                <h1 className="organization-name">
                  {siteData.organization.organizationName}
                </h1>
                <h1 className="organization-subheading">
                  {siteData.organization.organizationSubheading}
                </h1>
              </div>
            </div>
          </Link>
          <nav>
            <ul>
              {siteData.navbar.links.map((link) => (
                <li key={link.link}>
                  <Link href={link.link}>
                    <a
                      className={"/" + page.slug === link.link ? "active" : ""}
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="main">
        <div className="container">{children}</div>
      </section>

      {page.calendar && (
        <section className="beige-section">
          <div className="container">
            <h2>Upcoming Events</h2>
            <Calendar />
          </div>
        </section>
      )}

      {page.testimonials && (
        <section className="container">
          <div className="testimonials">
            {page.testimonials.map((testimonial, i) => (
              <blockquote className="testimonial" key={i}>
                <p className="testimonial-message">{testimonial.message}</p>
                <p className="testimonial-author">
                  <ExportedImage
                    src={testimonial.testimonialImage}
                    alt={`Photo of ${testimonial.name}`}
                    width={60}
                    height={60}
                    unoptimized
                  />{" "}
                  {testimonial.name}
                </p>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {page.callToAction === "Contact" && (
        <section className="quote-section">
          <p className="container editable">
            <Link href="/contact">Contact us</Link> today to find out how we can
            help you do more good.
          </p>
        </section>
      )}

      {page.callToAction === "Subscribe" && (
        <section className="quote-section">
          <p className="container editable">Find out about our latest opportunities.</p>
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
                  <Link href={link.link}>
                    <a target={link.external ? "_blank" : "_self"}>
                      {link.external && <Icon icon="Link" />} {link.name}
                    </a>
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
                  <Link href={link.link}>
                    <a target={link.newTab ? "_blank" : "_self"}>
                      {link.socialIcon && <Icon icon={link.socialIcon} />}
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="footer-links">
              <li>
                <div className="organization-group">
                  <h2 className="organization-name">
                    {siteData.organization.organizationName}
                  </h2>
                  <h2 className="organization-subheading">
                    {siteData.organization.organizationSubheading}
                  </h2>
                </div>
              </li>
              <li className="organization-description">
                {siteData.organization.description}
              </li>
              <li>
                <form
                  className="footer-subscription-form"
                  onSubmit={handleSubmit}
                >
                  <h4>Stay up-to-date!</h4>
                  {!formSubmitted ? (
                    <>
                      <input
                        placeholder="First name"
                        type="text"
                        name="firstName"
                        required
                      />
                      <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                      />
                      <button className="btn" type="submit">
                        <span>Subscribe</span>
                      </button>
                    </>
                  ) : (
                    <div className="footer-subscription-confirmation">
                    <p>
                      Thanks, {firstName}! Check your inbox for a confirmation.
                      🙂
                    </p>
                    </div>
                  )}
                </form>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottom-line">
          <p className="container">Made with ❤️ in Madison, WI.</p>
        </div>
      </footer>
    </>
  );
}
