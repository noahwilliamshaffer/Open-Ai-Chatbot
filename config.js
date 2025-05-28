require('dotenv').config();

// Check for API key in command line arguments first (--api-key=YOUR_KEY)
let apiKeyFromArgs;
process.argv.forEach(arg => {
  if (arg.startsWith('--api-key=')) {
    apiKeyFromArgs = arg.split('=')[1];
  }
});

const config = {
  openai: {
    apiKey: apiKeyFromArgs || process.env.OPENAI_API_KEY,
  }
};

// Validate essential configuration
if (!config.openai.apiKey) {
  console.error('Error: OpenAI API key not found.');
  console.error('Please provide your API key using one of these methods:');
  console.error('1. Create a .env file with OPENAI_API_KEY=your-key');
  console.error('2. Run with command line argument: node index.js --api-key=your-key');
  process.exit(1);
}

module.exports = config; 