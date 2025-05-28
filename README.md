# OpenAI API with Firebase Integration

This project demonstrates how to integrate OpenAI API with Firebase Firestore for NoSQL storage.

## Setup

1. Create a `.env` file in the project root with your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
   
   Or use the api-key.txt file (already created).

2. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore database
   - Go to Project Settings > General > Your apps > Web app
   - Register a new web app and copy the configuration

3. Update `firebase-config.js` with your Firebase project credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. Install dependencies:
   ```
   npm install
   ```

## Usage

### Basic OpenAI API Integration

Run the application:
```
npm start:cli
```

### Firebase Storage + OpenAI Integration

Use the OpenAI with Firebase integration:
```
node openai-with-firebase.js generate "Your prompt here"
node openai-with-firebase.js recent [limit]
node openai-with-firebase.js search "Search term"
```

### RESTful API Server

Run the Express server:
```
npm start
```

API Endpoints:
- `POST /api/completions` - Generate and store a completion
- `GET /api/completions` - Get recent completions
- `GET /api/completions/search?term=search_term` - Search for completions
- `GET /api/completions/:id` - Get a specific completion

## Docker Deployment

### Build and Run with Docker

1. Build the Docker image:
   ```
   docker build -t openai-firebase-app --build-arg OPENAI_API_KEY=your-api-key .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 openai-firebase-app
   ```

### Using Docker Compose

1. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key
   ```

2. Run with Docker Compose:
   ```
   docker-compose up
   ```

### Testing the Deployed Service

1. Check the health endpoint:
   ```
   curl http://localhost:3000/health
   ```

2. Generate a completion:
   ```
   curl -X POST http://localhost:3000/api/completions \
     -H "Content-Type: application/json" \
     -d '{"prompt":"What is Docker?"}'
   ```

## Project Structure

- `app.js` - Main OpenAI API examples
- `index.js` - Simple OpenAI API integration
- `firebase-config.js` - Firebase configuration
- `firestore.js` - Firebase Firestore operations
- `openai-with-firebase.js` - Integration between OpenAI and Firebase
- `server.js` - Express server with RESTful API

## Security Notes

- Never commit your `.env` file or api-key.txt to version control
- The `.gitignore` file is configured to prevent this
- Keep your API keys secure and rotate them if you suspect they have been compromised
- Your Firebase project should have appropriate security rules
- When deploying with Docker, prefer using environment variables over build arguments for secrets

## API Key Information

When using the OpenAI API, be aware that:
- API usage incurs costs according to your account's billing settings
- Your API key has specific rate limits
- Provia API keys (starting with 'sk-proj-') may have different capabilities than standard keys 