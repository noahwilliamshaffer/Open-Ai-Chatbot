# OpenAI Chatbot

A simple Node.js application that demonstrates how to use the OpenAI API to create a chatbot. The application includes automated testing, code quality checks, and CI/CD pipeline integration.

## Features

- OpenAI API integration for chat completions
- In-memory storage for chat history
- Docker support for easy deployment
- Automated testing with Jest
- Code quality tools (ESLint, Prettier)
- Git hooks with Husky
- CI/CD pipeline with GitHub Actions

## Prerequisites

- Node.js 18 or higher
- Docker (optional, for containerized deployment)
- OpenAI API key

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/openai-chatbot.git
   cd openai-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your OpenAI API key:
   - Create a file named `api-key.txt` in the root directory and paste your API key
   - Or set the `OPENAI_API_KEY` environment variable

## Development

### Available Scripts

- `npm start` - Start the server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Code Quality Tools

The project uses several tools to maintain code quality:

- **ESLint**: For code linting and style enforcement
- **Prettier**: For code formatting
- **Husky**: For git hooks
- **lint-staged**: For running checks on staged files

### Testing

Tests are written using Jest and Supertest. The test suite includes:

- API endpoint tests
- Input validation tests
- Error handling tests

Run tests with:
```bash
npm test
```

## Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t openai-chatbot .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:3000 -e OPENAI_API_KEY="your-api-key" --name openai-chatbot openai-chatbot
   ```

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs linting and formatting checks
2. Executes test suite
3. Builds and pushes Docker image
4. Deploys to production server

The pipeline is triggered on:
- Push to main branch
- Pull requests to main branch

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/completions` - Generate chat completion
- `GET /api/completions` - Get recent completions
- `GET /api/completions/search` - Search completions
- `GET /api/completions/:id` - Get completion by ID

## Project Structure

```
.
├── .github/workflows/    # CI/CD configuration
├── .husky/              # Git hooks
├── test/                # Test files
├── server.js           # Main application file
├── package.json        # Project configuration
├── .eslintrc.json     # ESLint configuration
├── .prettierrc        # Prettier configuration
└── Dockerfile         # Docker configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License. 