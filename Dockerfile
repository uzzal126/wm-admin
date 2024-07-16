############################
# Multi-stage Docker Build #
############################

# Build Stage A #
# Using the latest Node.js runtime to install NPM packages/dependencies
# This stage helps us cache the "node_modules" directory until the "package.json" file is modified
FROM node:20.10.0-alpine as buildStageA

# Setting the working directory of build stage A
WORKDIR /admin.webmanza.com

# Copying "package.json" from the project's root directory (local disk) to the container's working directory
# This excludes the files/directories mentioned in the .dockerignore file
COPY package.json .

# Installing the NPM packages/dependencies
RUN npm install

# Build Stage B #
# Using the latest Node.js runtime to build the project
FROM node:20.10.0-alpine as buildStageB

# Setting the working directory of build stage B
WORKDIR /admin.webmanza.com

# Copying all the contents from build stage A to build stage B (current stage)
# e.g. "node_modules" directory and "package-lock.json" file
COPY --from=buildStageA /admin.webmanza.com /admin.webmanza.com

# Copying the entire project from current directory (local disk) to the container's working directory
# This excludes the files/directories mentioned in the .dockerignore file
COPY . .

# Building the project
RUN npm run fastbuild

# Build Stage C #
# Using the latest NGINX to serve the files
FROM nginx:1.25.3-alpine-slim

# Copying our custom NGINX virtual host configuration file to the container
COPY default.conf /etc/nginx/conf.d

# Now, we shall copy all the production ready files from Build Stage A
# to Build Stage B's NGINX root directory
COPY --from=buildStageB /admin.webmanza.com/dist /usr/share/nginx/html

# The NGINX server runs at port 80

# Starting NGINX in foreground so that the container does not halt
CMD [ "nginx", "-g", "daemon off;" ]
