const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const client = new MailtrapClient({ token: process.env.MAILTRAP });

const sender = {
  email: "hello@demomailtrap.com",
  name: "Top Aiglons",
};

module.exports = { client, sender };
