FROM node:12

LABEL "com.github.actions.name"="Publisher Deployment Handler"
LABEL "com.github.actions.description"="Deployment handler"
LABEL "com.github.actions.icon"="package"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="http://github.com/publisher/gh-actions"

WORKDIR /

RUN echo "//registry.npmjs.org/:_authToken = \${NPM_AUTH_TOKEN}" > ~/.npmrc && \
    echo "//registry.npmjs.org/:access = public" >> ~/.npmrc && \
    echo "registry = https://registry.npmjs.org" >> ~/.npmrc

COPY . /
RUN npm ci

ENTRYPOINT [ "node", "/index.js" ]
