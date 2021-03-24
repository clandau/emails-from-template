const nodemailer = require("nodemailer");
const creds = require("./credentials");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: creds,
});

let assignmentData = {
  assignmentName: "Nikola Tesla",
  name: "Sally Teacher",
  courseName: "Physics",
  pieChart:
      "https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27pie%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B84%2C%2028%2C%2057%2C%2019%2C%2097%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20159%2C%2064)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20205%2C%2086)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(75%2C%20192%2C%20192)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20label%3A%20%27Dataset%201%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20labels%3A%20%5B%27Red%27%2C%20%27Orange%27%2C%20%27Yellow%27%2C%20%27Green%27%2C%20%27Blue%27%5D%2C%0A%20%20%7D%2C%0A%7D%0A",
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
  res.to = "celstudenttest@learnics.com";
  res.from = "courtney@learnics.com"
  await sendEmail(res);
  console.log("sent!");
}

run();


