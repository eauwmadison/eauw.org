/* Next.js imports */
import ExportedImage from "next-image-export-optimizer";

/* first-party component imports */
import PageLayout from "../components/layouts/page";
import Calendar from "../components/calendar";
import Icon from "../components/icon";
import MailingList from "../components/mailing-list";
/* third-party component imports */
import useMediaQuery from "@mui/material/useMediaQuery";

/* site data */
import data from "../lib/data";
import { getCollection, getCollectionItem } from "../lib/collections";

export default function Home({ page, popups }) {
  const small = useMediaQuery("(max-width: 600px)");

  return (
    <PageLayout page={page} popups={popups}>
      <section className="main container">
        <div className="two-columns-uneven">
          <div className="grid-left blue">
            <h2 className="editable">
              We’re a community at UW&ndash;Madison aiming to tackle the world’s
              most pressing problems.
            </h2>
            <p className="editable">
              Our student group is part of the effective altruism community — a
              social movement that asks: how can we best improve the lives of
              others, using our limited time and resources?
            </p>
            <p className="editable">
              Effective Altruism at UW&ndash;Madison aims to offer students
              tools to figure out how they can make a greater social impact,
              combining our compassion with evidence and reasoning. We’re also a
              community of people supporting each other in our shared pursuit of
              helping others.
            </p>
          </div>

          <div className="grid-right small-blue-section two-rows">
            <MailingList
              className="grid-top"
              useClubName={false}
              useDescription={false}
              userAsk="Join our mailing list!"
            />

            <div className="grid-bottom justify-self-center align-self-end">
              <a
                className="contact-info btn-light btn btn-small btn-go"
                href={data.social.links[0].link}
                rel="noreferrer"
              >
                <b>Join our Slack!</b>
                <Icon icon="Slack" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="banner-image">
        <ExportedImage
          className="image"
          src="/images/uploads/banner-image.jpg"
          alt="EA UW&ndash;Madison members"
          width="1146"
          height="828"
        />
      </div>

      <section className="beige-section">
        <div className="container">
          <h2>What is effective altruism?</h2>
          <p>
            Effective altruism is a project that aims to find the best ways to
            help others, and put them into practice. It’s both a research field,
            which aims to identify the world’s most pressing problems and the
            best solutions to them, and a practical community that aims to use
            those findings to do good.
          </p>
          <p>
            This project matters because, while many attempts to do good fail,
            some are enormously effective. For instance, some charities help 100
            or even 1,000 times as many people as others, when given the same
            amount of resources. This means that by thinking carefully about the
            best ways to help, we can do far more to tackle the world’s biggest
            problems.
          </p>
          <p>
            People inspired by effective altruism have worked on projects that
            range from funding the distribution of 200 million malaria nets, to
            academic research on the future of AI, to campaigning for policies
            to prevent the next pandemic.
          </p>
          <p>
            They’re not united by any particular solution to the world’s
            problems, but by a way of thinking. They try to find unusually good
            ways of helping, such that a given amount of effort goes an
            unusually long way.
          </p>
          <a
            className="btn btn-go"
            href="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism"
            target="_blank"
            rel="noreferrer"
          >
            {small ? "Learn more" : "Learn more about effective altruism"}
            <Icon icon="Go" />
          </a>
        </div>
      </section>

      {page.calendar && (
        <section className="white-section calendar container">
          <h2>Upcoming Events</h2>
          <div className="info-subtitle">
            <Icon icon="Info" />
            <p className="editable">
              All events are free and open to the public unless otherwise noted.
            </p>
          </div>
          <Calendar maxEvents={page.maxEvents} />
        </section>
      )}

      <section className="beige-section">
        <div className="container">
          <h2>What We Offer</h2>
        </div>
      </section>

      {page.testimonials && (
        <section className="white-section">
          <div className="container">
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
                    />{" "}
                    <span className="testimonial-author-name-and-subtitle">
                      {testimonial.name}
                      <span className="testimonial-author-subtitle">
                        {testimonial.subtitle}
                      </span>
                    </span>
                  </p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = await getCollectionItem("pages", "index");
  const popups = await getCollection("popups");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      popups
    }
  };
}
