module.exports = {
  "_comments": {
    author_staff_member: "The staff member writing this post",
    buttonText: "The text on the button",
    calendar: "Whether a calendar is shown on the page",
    callToAction: "Type of request shown at the bottom of this page",
    calUsername: "Username for https://cal.com/",
    contactEmailAddress: "Address to be displayed on the Contact page",
    descriptionHTML: "A paragraph description of the program. Shown second",
    excerptHtml: "The HTML preview for a project summary",
    executive: "Toggles whether the leader is a member of the executive team",
    fullWidth:
      "Content stretches to the full width of the page. (Not recommended unless you know what you're doing.)",
    hidden: "Whether the element is shown",
    introHTML: "1-2 sentence introduction to the program. Shown first",
    maxEvents: "The maximum number of events to show on the page",
    newTab: "Whether the link opens a new browser tab",
    page: 'Page to display on. ("index" for home page.)',
    popupEnabled: "Show popup on page load. Can only show one popup per page.",
    previous:
      "Toggles whether the leader is no longer a part of leadership or the program is no longer active",
    priority:
      "Helps adjust the position on the page — lower value is higher on the page",
    pronouns: "Shown as subtext on leadership team member summaries",
    redirectURL:
      "URL to redirect to. Please note: you need to change this setting in data/navbar.json as well for the navbar to work.",
    role: "Shown as subtext on leadership team member summaries",
    semester:
      "Displays as a small horizontal banner at the bottom of the program box",
    showTitle: "Toggles the title on the page",
    startingDate: "The first day of the week when the fellowship begins",
    testimonials: "Update, add or remove testimonials",
    whoShouldApplyHTML:
      "A paragraph description of who should apply. Shown last"
  },

  "_select_data": {
    callToActions: ["Contact", "Subscribe"],
    socialIcons: [
      "Facebook",
      "GitHub",
      "Instagram",
      "Link",
      "LinkedIn",
      "Pinterest",
      "RSS",
      "Slack",
      "Tumblr",
      "Twitter",
      "WIN",
      "YouTube"
    ]
  },

  // As of August 22, 2023, the _input and _structures sections
  // are just for content/pages/programs. But feel free to edit this
  // as needed.
  // https://cloudcannon.com/documentation/articles/using-arrays-to-edit-your-data/
  "_input": {
    topics: {
      type: "array",
      structures: "_structures.topics"
    }
  },

  // https://cloudcannon.com/documentation/articles/defining-what-adds-to-an-array-with-array-structures/
  "_structures": {
    topics: {
      values: [
        {
          value: {
            title: null,
            contentHTML: null
          }
        }
      ]
    }
  },

  "paths": {
    collections: "content",
    data: "data",
    static: "public",
    uploads: "public/images/uploads"
  },

  "collections-config": {
    webpages: {
      path: "content/pages",
      url: "/[slug]",
      output: true,
      name: "Pages",
      _icon: "wysiwyg",
      _enabled_editors: ["visual", "data"]
    },
    leadership_team: {
      path: "content/leadership-team",
      output: false,
      _icon: "people"
    },
    programs: {
      path: "content/programs",
      output: false,
      _icon: "school"
    },
    popups: {
      path: "content/popups",
      output: false,
      _icon: "filter_frames"
    },
    data: {
      path: "data",
      output: false
    }
  }
};
