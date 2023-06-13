const pug = require("pug");
const path = require("path");

const page = (url, template) => {
  return pug.renderFile(
    path.join(__dirname, "..", "..", "views", "html", `${template}.pug`),
    {
      url,
    }
  );
};
module.exports = { page };
