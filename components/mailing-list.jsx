/* React imports */
import { useState } from "react";

/* site data */
import siteData from "../lib/data";

export default function MailingList({ useDescription = true }) {
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

  return (
    <>
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
        {useDescription && (
          <li className="organization-description">
            {siteData.organization.description}
          </li>
        )}
        <li>
          <form className="footer-subscription-form" onSubmit={handleSubmit}>
            <h3>Stay up-to-date!</h3>
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
              <div className="footer-subscription-confirmation">
                <p>
                  Thanks, {firstName}! Check your inbox for a confirmation. 🙂
                </p>
              </div>
            )}
          </form>
        </li>
      </ul>
    </>
  );
}
