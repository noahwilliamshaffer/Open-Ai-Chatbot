FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Create a non-privileged user to run the app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy the API key from a build argument (safer than embedding in the image)
ARG OPENAI_API_KEY
RUN if [ -n "$OPENAI_API_KEY" ]; then \
      echo "$OPENAI_API_KEY" > api-key.txt; \
    fi

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /usr/src/app

# Use the non-privileged user
USER nodejs

# OpenAI env var can also be passed at runtime
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"] 