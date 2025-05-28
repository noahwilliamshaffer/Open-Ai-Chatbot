const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();

// Get API key from environment variable or file
function getApiKey() {
  // First try to get from environment variable
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  
  // Fallback to file for development only
  try {
    if (fs.existsSync('api-key.txt')) {
      return fs.readFileSync('api-key.txt', 'utf8').trim();
    }
    console.error('Error: No API key found in environment or api-key.txt');
    console.error('Please set the OPENAI_API_KEY environment variable or create api-key.txt');
    process.exit(1);
  } catch (error) {
    console.error('Error loading API key:', error.message);
    process.exit(1);
  }
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: getApiKey(),
});

async function main() {
  try {
    console.log('Connecting to OpenAI API...');
    
    // Example: Generate a chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, world!" }
      ],
    });

    console.log('Response from OpenAI:');
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error connecting to OpenAI:');
    console.error(error.message);
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    }
  }
}

main(); 