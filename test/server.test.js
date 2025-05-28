const request = require('supertest');
const express = require('express');
const app = require('../server');

describe('Server Endpoints', () => {
  test('GET /health should return status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('POST /api/completions should require a prompt', async () => {
    const response = await request(app)
      .post('/api/completions')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Prompt is required');
  });

  test('GET /api/completions should return an array', async () => {
    const response = await request(app).get('/api/completions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/completions/search should require a search term', async () => {
    const response = await request(app).get('/api/completions/search');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Search term is required');
  });
}); 