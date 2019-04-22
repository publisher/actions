"use strict";

const pushHandler = require("publisher-push-handler");

const token = process.env.GITHUB_TOKEN;
const eventPayload = require(process.env.GITHUB_EVENT_PATH);

pushHandler(token, eventPayload).catch(err => {
  console.error(err);
  process.exit(1);
});
