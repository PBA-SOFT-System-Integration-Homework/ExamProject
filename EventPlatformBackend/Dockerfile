FROM node:10


ARG NODE_ENV
ARG BACKEND_PORT
ARG DB_HOST
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG MOM_SERVICE_URL
ARG CAR_RENTAL_SERVICE_URL

ENV NODE_ENV=$NODE_ENV
ENV PORT=$BACKEND_PORT
ENV DB_HOST=$DB_HOST
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV MOM_SERVICE_URL=$MOM_SERVICE_URL
ENV CAR_RENTAL_SERVICE_URL=$CAR_RENTAL_SERVICE_URL

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=prod

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
# CMD [ "node", "-r", "dotenv/config", "bin/www", "dotenv_config_path=/usr/src/app/env/.env" ]
CMD [ "node", "-r", "dotenv/config", "bin/www" ]