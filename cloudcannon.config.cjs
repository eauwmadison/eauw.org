module.exports = {
  "_comments": {
    largeHeader: "Toggles the size of the top banner",
    showTitle: "Toggles the title on the page",
    author_staff_member: "The staff member writing this post",
    callToAction: "Type of request shown at the bottom of this page",
    testimonials: "Update, add or remove testimonials",
    role: "Shown as subtext on leadership team member summaries",
    pronouns: "Shown as subtext on leadership team member summaries",
    executive: "True or false, whether the leader is a member of the executive team",
    previous: "True or false, whether the leader is no longer a part of leadership",
    contactEmailAddress: "Address for the contact form to send to",
    newTab: "Whether the link opens a new browser tab",
    calendar: "Whether a calendar is shown on the page",
    pinned: "Whether a post is pinned to the top of the Posts page",
    excerptHtml: "The HTML preview for a post summary"
  },

  "_select_data": {
    callToActions: ["Contact", "Blog"],
    socialIcons: [
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Pinterest",
      "Tumblr",
      "Twitter",
      "YouTube",
      "RSS",
      "GitHub",
      "WIN",
      "Slack",
      "Link"
    ]
  },

  "paths": {
    collections: "content",
    data: "data",
    static: "public",
    uploads: "public/uploads"
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
    posts: {
      path: "content/posts",
      url: "/posts/[slug]",
      output: true,
      _enabled_editors: ["visual", "content", "data"]
    },
    leadership_team: {
      path: "content/leadership-team",
      output: false,
      _icon: "people"
    },
    data: {
      path: "data",
      output: false
    }
  }
};
