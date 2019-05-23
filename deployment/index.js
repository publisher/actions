"use strict";

const deploymentHandler = require("@publisher/deployment-handler");

const ghToken = process.env.GITHUB_TOKEN;
const eventPayload = require(process.env.GITHUB_EVENT_PATH);

deploymentHandler(ghToken, eventPayload).catch(err => {
  console.error(err);
  process.exit(1);
});
