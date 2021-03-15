const nodemailer = require("nodemailer");
const creds = require("./credentials");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: creds.user,
    password: creds.password,
  },
});

let assignmentData = {
  assignmentName: "Nikola Tesla",
  name: "Sally Teacher",
  courseName: "Physics",
};

const EmailTemplate = require("email-templates");
const path = require("path");

function sendEmail(obj) {
  return transporter.sendMail(obj);
}

async function loadTemplate(templateName, context) {
  const templatePath = path.join(__dirname, "templates", templateName);
  let template = new EmailTemplate({
    views: { options: { extension: "hbs" } },
  });
  return await template.renderAll(templatePath, context);
}

async function run() {
  let res = await loadTemplate("data", assignmentData);
  console.log(JSON.stringify(res));
}

run();
