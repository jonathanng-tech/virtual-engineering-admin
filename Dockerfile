# Stage 1: Build the application
FROM node:18-alpine AS build
ARG env
# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app (production build)
RUN npm run build:${env}

ENV NODE_ENV=production

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine
ARG env

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.${env}.conf /etc/nginx/conf.d/default.conf

# Map the SSL certificates from the host
VOLUME ["/etc/letsencrypt"]

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Add a health check to ensure the web server is alive
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:80 || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
