# # Stage 1: Compile and build angular codebase
# # Use the official Node.js image as the base image
# FROM node:18 as build

# # Set the working directory..
# WORKDIR /app

# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Install Angular CLI globally
# RUN npm install -g @angular/cli@16

# # Install project dependencies
# RUN npm install

# # Copy the Angular app source code to the container
# COPY . .

# # Build the Angular app for production
# # RUN ng build
# RUN npm run build

# Stage 2: Create an Nginx container
FROM nginx:alpine

# Copy the built Angular app from the build stage to the Nginx web root
COPY dist/frontend_angular /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]