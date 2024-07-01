# Use the official Node.js image
FROM node:22

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container image.
COPY . .

# Make port 3000 and 3001 available to the world outside this container
EXPOSE 3000
EXPOSE 3001

# Run the web service on container startup.
CMD [ "npm", "start" ]
