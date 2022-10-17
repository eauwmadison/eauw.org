# Effective Altruism UW&ndash;Madison Website

An effective altruism website built with Next.js. Browse through a
[live demo](https://excited-skunk.cloudvent.net/). Any other EA organizations are welcome to use this template.

This site is based on the "Justice" template made by [CloudCannon](https://cloudcannon.com/).

[![Deploy to CloudCannon](https://buttons.cloudcannon.com/deploy.svg)](https://app.cloudcannon.com/register#sites/connect/github/eauwmadison/eauw.org)

## Features

- Contact form
- Events from Google Calendar
- Pre-built pages
- Pre-styled components
- Staff and author system
- Configurable footer
- Optimized for editing in [CloudCannon](https://cloudcannon.com/)
- SEO tags
- Google Analytics

## Setup

1. Add your site and author details in `data/seo.json`.
2. Add your Google Analytics and Disqus keys to `data/site.json`.
3. Get a workflow going to see your site's output (with [CloudCannon](https://app.cloudcannon.com/)
   or Next.js locally).

## Develop

This website is built with [Next.js](https://nextjs.org/) (version `12.3.1`).

```bash
$ npm install
$ npm run dev
```

## Editing

This website is optimized for adding, updating and removing pages, staff, projects, company details
and footer elements in [CloudCannon](https://app.cloudcannon.com/).

### Contact Form

- Preconfigured to work with [CloudCannon](https://app.cloudcannon.com/).
- Sends email to the address listed in company details.

### Staff

- Reused around the site to save multiple editing locations.

### Footer

- Exposed as a data file to give clients better access.
- Set in the _Data_ / _Footer_ section.

### Company details

- Reused around the site to save multiple editing locations.
- Set in the _Data_ / _Company_ section.
