FROM node:11

LABEL "com.github.actions.name"="Publisher Push Handler"
LABEL "com.github.actions.description"="Push handler"
LABEL "com.github.actions.icon"="package"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="http://github.com/publisher/gh-actions"

WORKDIR /
COPY . /
RUN npm ci

ENTRYPOINT [ "node", "/index.js" ]
