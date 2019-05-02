"use strict";

const setupAuth = require("@publisher/npm-auth");
const deploymentHandler = require("@publisher/deployment-handler");

const npmToken = process.env.NPM_AUTH_TOKEN;
const ghToken = process.env.GITHUB_TOKEN;
const eventPayload = require(process.env.GITHUB_EVENT_PATH);

setupAuth(npmToken)
  .then(() => deploymentHandler(ghToken, eventPayload))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
