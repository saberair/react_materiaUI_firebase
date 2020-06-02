#simple docker file
# assumes located in the same folder as the application itself

# start with node  base image
FROM node:13.11.0

#Install git
RUN apt-get update && \
    apt-get install -y git

# Create an app directory (in the Docker container)
RUN mkdir -p /usr/apps/test-technique-web
RUN git clone https://github.com/saberair/test-technique-web.git /usr/apps/test-technique-web/

WORKDIR /usr/apps/test-technique-web

# install dependencies
RUN npm i

# expose it from Docker container
EXPOSE 3000

# Finally start the container command
CMD ["npm", "start"]