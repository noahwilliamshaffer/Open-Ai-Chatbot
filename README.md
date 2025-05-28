# OpenAI Chatbot

A simple Node.js application that demonstrates how to use the OpenAI API to create a chatbot.

## Features

- OpenAI API integration
- RESTful API endpoints
- In-memory storage for chat completions
- Docker support

## Prerequisites

- Node.js 18 or higher
- Docker (optional)
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an `api-key.txt` file with your OpenAI API key or set the `OPENAI_API_KEY` environment variable

## Running the Application

### Local Development

```bash
npm start
```

### Docker

Build the image:
```bash
docker build -t openai-chatbot .
```

Run the container:
```bash
docker run -d -p 3000:3000 -e OPENAI_API_KEY="your-api-key" --name openai-chatbot openai-chatbot
```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/completions` - Generate a new completion
- `GET /api/completions` - Get recent completions
- `GET /api/completions/search?term=search_term` - Search completions
- `GET /api/completions/:id` - Get completion by ID

## Project Structure

- `server.js` - Main application file
- `package.json` - Project dependencies and scripts
- `Dockerfile` - Docker configuration
- `.env` - Environment variables (optional)

## License

MIT 