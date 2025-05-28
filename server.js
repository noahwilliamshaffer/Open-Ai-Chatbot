const express = require('express');
const fs = require('fs');
const OpenAI = require('openai');

// Initialize app
const app = express();
app.use(express.json());

// Simple in-memory storage
const storage = {
  completions: new Map(),
  nextId: 1
};

// Helper function to load API key
function loadApiKey() {
  try {
    // Try to load from environment variable first
    if (process.env.OPENAI_API_KEY) {
      return process.env.OPENAI_API_KEY;
    }
    // Fall back to file
    return fs.readFileSync('api-key.txt', 'utf8').trim();
  } catch (error) {
    console.error('Error loading API key:', error.message);
    console.error('Make sure api-key.txt exists or OPENAI_API_KEY environment variable is set.');
    process.exit(1);
  }
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: loadApiKey(),
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Generate and store completion
app.post('/api/completions', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Generate completion with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
    });
    
    const completionText = completion.choices[0].message.content;
    
    // Store in memory
    const id = storage.nextId++;
    const completionData = {
      id,
      prompt,
      completion: completionText,
      model: completion.model,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
      totalTokens: completion.usage.total_tokens,
      timestamp: new Date()
    };
    
    storage.completions.set(id, completionData);
    
    res.status(201).json({
      id,
      prompt,
      completion: completionText,
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens
      }
    });
  } catch (error) {
    console.error('Error handling completion request:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message
    });
  }
});

// Get recent completions
app.get('/api/completions', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    
    const completions = Array.from(storage.completions.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
    
    res.status(200).json(completions);
  } catch (error) {
    console.error('Error retrieving completions:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve completions',
      message: error.message
    });
  }
});

// Search completions
app.get('/api/completions/search', async (req, res) => {
  try {
    const { term } = req.query;
    
    if (!term) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    
    const results = Array.from(storage.completions.values())
      .filter(doc => doc.prompt.toLowerCase().includes(term.toLowerCase()));
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching completions:', error);
    res.status(500).json({ 
      error: 'Failed to search completions',
      message: error.message
    });
  }
});

// Get completion by ID
app.get('/api/completions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const completion = storage.completions.get(parseInt(id));
    
    if (!completion) {
      return res.status(404).json({ error: 'Completion not found' });
    }
    
    res.status(200).json(completion);
  } catch (error) {
    console.error('Error retrieving completion:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve completion',
      message: error.message
    });
  }
});

// Only start the server if this file is run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app; 