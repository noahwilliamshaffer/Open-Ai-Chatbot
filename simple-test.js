const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();

// Get API key from environment variable or file
function getApiKey() {
  // First try to get from environment variable
  if (process.env.OPENAI_API_KEY) {
    console.log('Using API key from environment variable');
    return process.env.OPENAI_API_KEY;
  }
  
  // Fallback to file for development only
  try {
    if (fs.existsSync('api-key.txt')) {
      console.log('Using API key from file');
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

const apiKey = getApiKey();
console.log('Testing connection to OpenAI API...');

async function testConnection() {
  try {
    const openai = new OpenAI({ apiKey });
    
    // Simple API call to test connectivity
    console.log('Requesting models list...');
    const models = await openai.models.list();
    
    console.log('Success! Connected to OpenAI API.');
    console.log(`Found ${models.data.length} models.`);
    
    if (models.data.length > 0) {
      console.log('First few models:');
      models.data.slice(0, 3).forEach(model => {
        console.log(`- ${model.id}`);
      });
    }
  } catch (error) {
    console.error('Error connecting to OpenAI:');
    console.error(error.message);
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Response:', error.response.data);
    }
  }
}

testConnection(); 