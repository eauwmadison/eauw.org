module.exports = {
  "_comments": {
    author_staff_member: "The staff member writing this post",
    buttonText: "The text on the button",
    calendar: "Whether a calendar is shown on the page",
    callToAction: "Type of request shown at the bottom of this page",
    calUsername: "Username for https://cal.eauw.org/",
    contactEmailAddress: "Address to be displayed on the Contact page",
    excerptHtml: "The HTML preview for a project summary",
    executive: "Toggles whether the leader is a member of the executive team",
    fullWidth:
      "Content stretches to the full width of the page. (Not recommended unless you know what you're doing.)",
    hidden: "Whether the element is shown",
    largeHeader: "Toggles the size of the top banner",
    maxEvents: "The maximum number of events to show on the page",
    newTab: "Whether the link opens a new browser tab",
    page: 'Page to display on. ("index" for home page.)',
    popupEnabled: "Show popup on page load. Can only show one popup per page.",
    previous:
      "Toggles whether the leader is no longer a part of leadership or the program is no longer active",
    priority:
      "Helps adjust the position on the page — lower value is higher on the page",
    pronouns: "Shown as subtext on leadership team member summaries",
    role: "Shown as subtext on leadership team member summaries",
    semester:
      "Displays as a small horizontal banner at the bottom of the program box",
    showTitle: "Toggles the title on the page",
    startingDate: "The first day of the week when the fellowship begins",
    testimonials: "Update, add or remove testimonials"
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
    projects: {
      path: "content/projects",
      url: "/projects/[slug]",
      output: true,
      _enabled_editors: ["visual", "content", "data"]
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
