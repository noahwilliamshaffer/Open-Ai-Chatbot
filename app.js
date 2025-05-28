const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();

/**
 * OpenAI API Integration Example
 * 
 * This file demonstrates different ways to use the OpenAI API
 * including chat completions, image generation, and more.
 */

// Helper function to load API key
function loadApiKey() {
  // First try to get from environment variable
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  
  // For development only, fallback to file if it exists
  try {
    if (fs.existsSync('api-key.txt')) {
      return fs.readFileSync('api-key.txt', 'utf8').trim();
    }
    console.error('Error: No API key found in environment or api-key.txt');
    console.error('Please set the OPENAI_API_KEY environment variable or create api-key.txt');
    process.exit(1);
  } catch (error) {
    console.error('Error loading API key:', error.message);
    console.error('Please set the OPENAI_API_KEY environment variable.');
    process.exit(1);
  }
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: loadApiKey(),
});

// Example 1: Chat completion
async function generateChatCompletion() {
  try {
    console.log('Example 1: Generating chat completion...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant who provides concise answers." },
        { role: "user", content: "What are the key features of Node.js?" }
      ],
      max_tokens: 150,
    });
    
    console.log('Response:');
    console.log(completion.choices[0].message.content);
    console.log('-----------------------------------');
    return completion;
  } catch (error) {
    handleApiError('chat completion', error);
  }
}

// Example 2: Image generation with DALL-E
async function generateImage() {
  try {
    console.log('Example 2: Generating image with DALL-E...');
    
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: "A serene landscape with mountains and a lake at sunset",
      n: 1,
      size: "1024x1024",
    });
    
    console.log('Image URL:');
    console.log(response.data[0].url);
    console.log('-----------------------------------');
    return response;
  } catch (error) {
    handleApiError('image generation', error);
  }
}

// Example 3: Text embeddings
async function generateEmbeddings() {
  try {
    console.log('Example 3: Generating text embeddings...');
    
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: "The quick brown fox jumps over the lazy dog",
    });
    
    console.log(`Embedding dimensions: ${response.data[0].embedding.length}`);
    console.log('First 5 values of embedding:');
    console.log(response.data[0].embedding.slice(0, 5));
    console.log('-----------------------------------');
    return response;
  } catch (error) {
    handleApiError('text embeddings', error);
  }
}

// Error handler for API calls
function handleApiError(operation, error) {
  console.error(`Error during ${operation}:`);
  console.error(error.message);
  
  if (error.response) {
    console.error(`Status: ${error.response.status}`);
    
    // Handle common API errors
    switch (error.response.status) {
      case 401:
        console.error('Authentication error: Check your API key');
        break;
      case 429:
        console.error('Rate limit or quota exceeded: Check your usage limits and billing');
        break;
      case 500:
        console.error('OpenAI server error: Try again later');
        break;
      default:
        if (error.response.data) {
          console.error('Response:', error.response.data);
        }
    }
  }
  
  return null;
}

// Main function to run examples
async function main() {
  console.log('OpenAI API Integration Examples');
  console.log('================================');
  
  // Only run the examples if explicitly requested to avoid accidental charges
  if (process.argv.includes('--run-examples')) {
    await generateChatCompletion();
    await generateImage();
    await generateEmbeddings();
  } else {
    console.log('Connection to OpenAI API established successfully!');
    console.log('API key is valid.');
    console.log('\nTo run the examples (this will use your API quota):');
    console.log('node app.js --run-examples');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
}); 