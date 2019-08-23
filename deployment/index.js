"use strict";

const deploymentHandler = require("@publisher/deployment-handler");

const setupAuth = require("./auth");

const npmToken = process.env.NPM_AUTH_TOKEN;
const ghToken = process.env.GITHUB_TOKEN;
const eventPayload = require(process.env.GITHUB_EVENT_PATH);

console.log(eventPayload);

setupAuth(npmToken)
  .then(() => deploymentHandler(ghToken, eventPayload))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
