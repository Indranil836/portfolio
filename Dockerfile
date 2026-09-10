FROM node:20-alpine

WORKDIR /app

# Copy package manifest and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Set environment variables for React dev server
ENV PORT=3000
ENV HOST=0.0.0.0
ENV BROWSER=none
ENV CHOKIDAR_USEPOLLING=true
ENV PUBLIC_URL=

EXPOSE 3000

CMD ["npm", "start"]
