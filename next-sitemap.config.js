const siteData = require("./data/site.json");

module.exports = {
  siteUrl: siteData.url,
  generateRobotsTxt: true,
  exclude: ["/404", "/contact-success"]
};
