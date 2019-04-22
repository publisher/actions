"use strict";

const deploymentHandler = require("publisher-deployment-handler");

const token = process.env.GITHUB_TOKEN;
const eventPayload = require(process.env.GITHUB_EVENT_PATH);

deploymentHandler(token, eventPayload).catch(err => {
  console.error(err);
  process.exit(1);
});
