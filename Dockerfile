###########################################################
# Compile angular codebase

# Use official node image as the base image
FROM node:16.17.1-alpine as dev

# Set the working directory
WORKDIR /home/node/app

# Install all the dependencies
COPY --chown=node:node package*.json .
RUN npm install

# Add the source code to app
COPY --chown=node:node ./ /home/node/app

# Expose port 4200
EXPOSE 4200

CMD  ["npm", "start"]

############################################################
# Compile and Build angular codebase
FROM dev as build

# Generate the build of the application
RUN npm run build

############################################################################
# Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest as prod

# Copy the build output to replace the default nginx contents.
COPY --from=build /home/node/app/dist/angular-docker-example /usr/share/nginx/html

# Expose port 80
EXPOSE 80