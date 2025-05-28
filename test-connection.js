const OpenAI = require('openai');

// Get API key from command line
let apiKey;
process.argv.forEach(arg => {
  if (arg.startsWith('--api-key=')) {
    apiKey = arg.split('=')[1];
  }
});

if (!apiKey) {
  console.error('Please provide your API key: node test-connection.js --api-key=your-key');
  process.exit(1);
}

async function testConnection() {
  console.log('Testing connection to OpenAI API...');
  
  try {
    const openai = new OpenAI({ apiKey });
    
    // Simple API call to test connectivity
    const models = await openai.models.list();
    
    console.log('Successfully connected to OpenAI API!');
    console.log(`Available models: ${models.data.length}`);
    console.log('First few models:');
    models.data.slice(0, 3).forEach(model => {
      console.log(`- ${model.id}`);
    });
    
    return true;
  } catch (error) {
    console.error('Failed to connect to OpenAI API:');
    console.error(error.message);
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Response:', error.response.data);
    }
    
    return false;
  }
}

testConnection(); 